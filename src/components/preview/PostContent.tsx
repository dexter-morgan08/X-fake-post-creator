"use client";

import { usePostStore } from "@/store/postStore";
import type { FontSize } from "@/types/post";

/** Render text with hashtag/mention tinting, preserving line breaks. */
export function PostContent({ dark }: { dark: boolean }) {
  const content = usePostStore((s) => s.content);
  const fontSize = usePostStore((s) => s.fontSize);

  const sizeMap: Record<FontSize, number> = { sm: 14, base: 15, lg: 17 };
  const text = content.trim() === "" ? "Your fictional post preview will appear here…" : content;
  const isPlaceholder = content.trim() === "";

  const parts = text.split(/(\s+)/g);

  return (
    <p
      style={{
        fontSize: sizeMap[fontSize],
        lineHeight: "24px",
        color: isPlaceholder ? "#9ca3af" : dark ? "#e7e9ea" : "#111827",
        fontWeight: 400,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {parts.map((p, i) => {
        if (/^[#@][\w_]+$/.test(p)) {
          return (
            <span key={i} style={{ color: "#1d9bf0" }}>
              {p}
            </span>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </p>
  );
}
