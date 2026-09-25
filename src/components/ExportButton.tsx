"use client";

import { useState } from "react";
import { ClipboardCopy, Download, Loader2, Shapes } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { exportNodeToPng, exportNodeToSvg, copyNodeToClipboard } from "@/lib/export";

export function ExportButton({ targetId }: { targetId: string }) {
  const isExporting = usePostStore((s) => s.isExporting);
  const vectorOverlay = usePostStore((s) => s.vectorOverlay);
  const setExporting = usePostStore((s) => s.setExporting);
  const setToast = usePostStore((s) => s.setToast);
  const [copying, setCopying] = useState(false);

  async function onExport() {
    const node = document.getElementById(targetId) as HTMLElement | null;
    if (!node) {
      setToast("Preview not found — try again.");
      return;
    }
    setExporting(true);
    try {
      if (vectorOverlay) {
        await exportNodeToSvg(node, "fictional-post-overlay.svg");
        setToast("Overlay exported as SVG");
      } else {
        await exportNodeToPng(node, "fictional-post-mockup.png");
        setToast("Mockup exported as PNG");
      }
    } catch (e) {
      console.error("[export] onExport failed:", e);
      const msg = e instanceof Error && e.message ? e.message : "Export failed.";
      // Never show "[object Event]" to the user — it comes from failed
      // resource fetches inside html-to-image.
      setToast(
        /failed to fetch/i.test(msg)
          ? "Export failed while loading resources — check connection/ad-blocker and retry."
          : msg.length > 120
            ? "Export failed — please retry."
            : msg
      );
    } finally {
      setExporting(false);
    }
  }

  async function onCopy() {
    const node = document.getElementById(targetId) as HTMLElement | null;
    if (!node) return;
    setCopying(true);
    const ok = await copyNodeToClipboard(node);
    setCopying(false);
    setToast(ok ? "Preview copied to clipboard" : "Copy not supported in this browser.");
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onCopy}
        disabled={isExporting || copying}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-50 transition"
      >
        {copying ? <Loader2 size={14} className="animate-spin" /> : <ClipboardCopy size={14} />}
        <span className="hidden sm:inline">Copy</span>
      </button>
      <button
        type="button"
        onClick={onExport}
        disabled={isExporting}
        title={vectorOverlay ? "Export scalable SVG overlay with empty media slot" : "Export PNG mockup"}
        className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-zinc-700 disabled:opacity-60 transition"
      >
        {isExporting ? <Loader2 size={14} className="animate-spin" /> : vectorOverlay ? <Shapes size={14} /> : <Download size={14} />}
        {isExporting ? "Exporting…" : vectorOverlay ? "Export SVG" : "Export Mockup"}
      </button>
    </div>
  );
}
