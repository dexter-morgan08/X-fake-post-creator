"use client";

import { toPng, toSvg } from "html-to-image";

export function getExportBackground(node: HTMLElement): string {
  // Prefer the inline hex background we set on the preview card.
  // Avoid getComputedStyle here: Tailwind v4 can return oklch(), which canvas can't parse.
  const inline = node.style.backgroundColor;
  if (inline && inline !== "") return inline;
  const dataBg = node.getAttribute("data-export-bg");
  if (dataBg) return dataBg;
  return "#ffffff";
}

function logExportFailure(stage: string, err: unknown): void {
  console.error(`[export] ${stage} failed:`, err);
  try {
    const sheets = Array.from(document.styleSheets).map((s) => {
      try {
        return s.href ?? "(inline <style>)";
      } catch {
        return "(unreadable stylesheet)";
      }
    });
    console.error("[export] stylesheets present:", sheets);
  } catch {
    // ignore logging errors
  }
}

export async function exportNodeToPng(node: HTMLElement, filename: string): Promise<void> {
  if (!node) throw new Error("Preview node not found.");
  // skipFonts: html-to-image embeds webfonts by fetching every document
  // stylesheet (including next/font/google CSS). A single CORS-blocked or
  // unreachable font URL rejects the whole export with "Failed to fetch".
  // The preview node itself only uses system fonts (see PostPreview
  // fontFamily), so skipping font embedding is visually lossless here.
  // cacheBust:false: cacheBust appends ?query to URLs which breaks blob:
  // object URLs used for uploaded profile/post images.
  const dataUrl = await toPng(node, {
    cacheBust: false,
    pixelRatio: 2,
    backgroundColor: getExportBackground(node),
    imagePlaceholder: "",
    skipFonts: true,
    fetchRequestInit: { cache: "force-cache" },
    onImageErrorHandler: (url, err) => {
      console.error(`[export] image embed failed for ${url}:`, err);
    },
  }).catch((err: unknown) => {
    logExportFailure("toPng", err);
    throw err instanceof Error ? err : new Error("Export failed — the preview could not be rendered to PNG.");
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportNodeToSvg(node: HTMLElement, filename: string): Promise<void> {
  if (!node) throw new Error("Preview node not found.");
  // toSvg serializes the preview DOM into a scalable vector file.
  // Same safeguards as PNG: skip webfont embedding (system fonts only),
  // no cache-busting (preserves blob: URLs), empty placeholder on image errors.
  const dataUrl = await toSvg(node, {
    cacheBust: false,
    backgroundColor: getExportBackground(node),
    imagePlaceholder: "",
    skipFonts: true,
    fetchRequestInit: { cache: "force-cache" },
    onImageErrorHandler: (url, err) => {
      console.error(`[export] image embed failed for ${url}:`, err);
    },
  }).catch((err: unknown) => {
    logExportFailure("toSvg", err);
    throw err instanceof Error ? err : new Error("Export failed — the preview could not be rendered to SVG.");
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyNodeToClipboard(node: HTMLElement): Promise<boolean> {
  try {
    if (typeof ClipboardItem === "undefined" || !navigator.clipboard) return false;
    const dataUrl = await toPng(node, {
      cacheBust: false,
      pixelRatio: 2,
      backgroundColor: getExportBackground(node),
      imagePlaceholder: "",
      skipFonts: true,
      fetchRequestInit: { cache: "force-cache" },
    });
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    return true;
  } catch {
    return false;
  }
}
