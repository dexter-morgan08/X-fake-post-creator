"use client";

import { BarChart2, Bookmark, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { formatWithCommas } from "@/lib/formatting";

const ICON_COLOR = "#71767b";
const DIVIDER = "#2f3336";

export function EngagementRow({ muted, dark }: { muted: string; dark: boolean }) {
  const replies = usePostStore((s) => s.replies);
  const reposts = usePostStore((s) => s.reposts);
  const likes = usePostStore((s) => s.likes);
  const views = usePostStore((s) => s.views);
  const bookmarks = usePostStore((s) => s.bookmarks);
  const timestampMode = usePostStore((s) => s.timestampMode);
  const timestamp = usePostStore((s) => s.timestamp);
  const date = usePostStore((s) => s.date);

  const timeText = timestampMode === "relative" ? date || "Sep 24, 2026" : timestamp || "10:42 AM";
  const dateText = timestampMode === "relative" ? undefined : date || "Sep 24, 2026";
  const gray = dark ? ICON_COLOR : muted;
  const strong = dark ? "#e7e9ea" : "#111827";

  const stats: { value: number; label: string }[] = [
    { value: replies, label: "Replies" },
    { value: reposts, label: "Reposts" },
    { value: likes, label: "Likes" },
    { value: bookmarks, label: "Bookmarks" },
  ];

  const icons = [MessageCircle, Repeat2, Heart, BarChart2, Bookmark];
  const iconLabels = ["Reply (fictional)", "Repost (fictional)", "Like (fictional)", "Views (fictional)", "Bookmark (fictional)"];

  return (
    <div>
      <p style={{ color: gray, fontSize: 14, lineHeight: "20px" }}>
        {timeText}
        {dateText ? <span> · {dateText}</span> : null}
        <span> · </span>
        <span style={{ fontWeight: 700, color: strong }}>{formatWithCommas(views)}</span>
        <span> Views</span>
      </p>

      <p style={{ color: gray, fontSize: 14, lineHeight: "20px", marginTop: 8 }}>
        {stats.map((s, i) => (
          <span key={s.label}>
            {i > 0 ? <span>   </span> : null}
            <span style={{ fontWeight: 700, color: strong }}>{formatWithCommas(s.value)}</span>
            <span> {s.label}</span>
          </span>
        ))}
      </p>

      <div
        className="flex items-center justify-between"
        style={{ borderTop: `1px solid ${dark ? DIVIDER : "#e4e4e7"}`, marginTop: 12, paddingTop: 12, paddingBottom: 4 }}
      >
        {icons.map((Icon, i) => (
          <div key={iconLabels[i]} className="flex flex-1 items-center justify-center" title={iconLabels[i]}>
            <Icon size={18} style={{ color: gray }} />
          </div>
        ))}
      </div>
    </div>
  );
}
