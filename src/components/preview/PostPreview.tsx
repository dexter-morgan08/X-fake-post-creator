"use client";

import { forwardRef, type CSSProperties } from "react";
import { usePostStore } from "@/store/postStore";
import { ProfileHeader } from "./ProfileHeader";
import { PostContent } from "./PostContent";
import { PostImage } from "./PostImage";
import { EngagementRow } from "./EngagementRow";
import type { ThemeName } from "@/types/post";

const THEME_STYLES: Record<
  ThemeName,
  { card: string; border: string; muted: string; dark: boolean; shadow: string }
> = {
  light: { card: "#ffffff", border: "#e4e4e7", muted: "#71717a", dark: false, shadow: "0 8px 30px rgba(0,0,0,0.08)" },
  dark: { card: "#000000", border: "#2f3336", muted: "#71767b", dark: true, shadow: "0 8px 30px rgba(0,0,0,0.45)" },
  soft: { card: "#fffdf7", border: "#e7e2d6", muted: "#78716c", dark: false, shadow: "0 8px 24px rgba(120,100,60,0.10)" },
  minimal: { card: "#fafafa", border: "#e9e9ea", muted: "#a1a1aa", dark: false, shadow: "none" },
};

const X_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

function PanelWatermark({ dark }: { dark: boolean }) {
  return (
    <div
      data-watermark="true"
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: 0.05,
      }}
    >
      <span
        style={{
          transform: "rotate(-18deg)",
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: "0.1em",
          color: dark ? "#ffffff" : "#000000",
          whiteSpace: "nowrap",
        }}
      >
        MOCKUP
      </span>
    </div>
  );
}

export const PostPreview = forwardRef<HTMLDivElement>(function PostPreview(_, ref) {
  const theme = usePostStore((s) => s.theme);
  const cardWidth = usePostStore((s) => s.cardWidth);
  const vectorOverlay = usePostStore((s) => s.vectorOverlay);
  const t = THEME_STYLES[theme];

  if (vectorOverlay) {
    // Overlay mode: the export root itself is transparent and the opaque
    // card background lives on the sections around the media slot, so the
    // ratio-sized slot is a genuine see-through hole framed by the card.
    // The outer border + shadow paint only the silhouette, never over the hole.
    const section: CSSProperties = {
      position: "relative",
      overflow: "hidden",
      backgroundColor: t.card,
    };
    return (
      <div className="flex w-full justify-center">
        <div
          ref={ref}
          id="mockpost-export-node"
          data-overlay-root="true"
          style={{
            width: `min(100%, ${cardWidth}px)`,
            backgroundColor: "transparent",
            border: `1px solid ${t.border}`,
            borderRadius: 16,
            boxShadow: t.shadow,
            overflow: "hidden",
            position: "relative",
            fontFamily: X_FONT,
          }}
        >
          {/* -13px overlaps: the frame shadow's rounded outer corners leave
              triangular notches (up to ~11.7px deep at max radius) against
              the square panels. Each panel extends over the band edge to
              cover its two notches with same-color paint — under the 14px
              band padding, so the slot hairline is never touched. Both
              panels are positioned, so they paint above the static band. */}
          <div style={{ ...section, padding: 16, marginBottom: -13 }}>
            <PanelWatermark dark={t.dark} />
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
              <ProfileHeader dark={t.dark} muted={t.muted} />
              <PostContent dark={t.dark} />
            </div>
          </div>
          {/* Transparent media band: the slot carries its own frame as a
              spread shadow (concentric with the window — gap-free), so this
              wrapper paints nothing and preserves the see-through hole.
              No watermark here — it would show through the hole. */}
          <div style={{ padding: "14px 16px" }}>
            <PostImage dark={t.dark} frameColor={t.card} />
          </div>
          <div style={{ ...section, padding: 16, marginTop: -13 }}>
            <PanelWatermark dark={t.dark} />
            <div style={{ position: "relative" }}>
              <EngagementRow muted={t.muted} dark={t.dark} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div
        ref={ref}
        id="mockpost-export-node"
        style={{
          width: `min(100%, ${cardWidth}px)`,
          backgroundColor: t.card,
          border: `1px solid ${t.border}`,
          borderRadius: 16,
          boxShadow: t.shadow,
          padding: 16,
          position: "relative",
          overflow: "hidden",
          fontFamily: X_FONT,
        }}
      >
        {/* persistent diagonal watermark — part of export */}
        <PanelWatermark dark={t.dark} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
          <ProfileHeader dark={t.dark} muted={t.muted} />
          <PostContent dark={t.dark} />
          <PostImage dark={t.dark} />
          <EngagementRow muted={t.muted} dark={t.dark} />
        </div>
      </div>
    </div>
  );
});
