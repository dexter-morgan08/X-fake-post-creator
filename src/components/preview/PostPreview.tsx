"use client";

import { forwardRef } from "react";
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

export const PostPreview = forwardRef<HTMLDivElement>(function PostPreview(_, ref) {
  const theme = usePostStore((s) => s.theme);
  const cardWidth = usePostStore((s) => s.cardWidth);
  const t = THEME_STYLES[theme];

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
              color: t.dark ? "#ffffff" : "#000000",
              whiteSpace: "nowrap",
            }}
          >
            MOCKUP
          </span>
        </div>

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
