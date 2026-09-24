"use client";

import { usePostStore } from "@/store/postStore";

function DecorativeBadge() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 22 22"
      fill="#1d9bf0"
      focusable="false"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d="M20.396 11a3.487 3.487 0 00-2.008-3.062 3.474 3.474 0 00-.742-3.584 3.474 3.474 0 00-3.584-.742A3.468 3.468 0 0011 1.604a3.463 3.463 0 00-3.053 2.008 3.472 3.472 0 00-1.902-.14c-.635.13-1.22.436-1.69.882a3.461 3.461 0 00-.734 3.584A3.49 3.49 0 001.604 11a3.496 3.496 0 002.017 3.062 3.471 3.471 0 00.733 3.584 3.49 3.49 0 003.584.742A3.487 3.487 0 0011 20.396a3.476 3.476 0 003.062-2.007 3.335 3.335 0 004.326-4.327A3.487 3.487 0 0020.396 11zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

export function ProfileHeader({ dark, muted }: { dark: boolean; muted: string }) {
  const displayName = usePostStore((s) => s.displayName);
  const username = usePostStore((s) => s.username);
  const showBadge = usePostStore((s) => s.showBadge);
  const profileImage = usePostStore((s) => s.profileImage);
  const timestampMode = usePostStore((s) => s.timestampMode);
  const timestamp = usePostStore((s) => s.timestamp);
  const relativeTime = usePostStore((s) => s.relativeTime);

  const timeLabel =
    timestampMode === "relative" ? relativeTime || "1h" : `${timestamp || "10:42 AM"}`;

  return (
    <div className="flex items-start gap-3">
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 999,
          overflow: "hidden",
          flexShrink: 0,
          backgroundColor: dark ? "#333639" : "#18181b",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        {profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profileImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/profile.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span
            className="truncate font-bold"
            style={{ fontSize: 15, lineHeight: "20px", color: dark ? "#e7e9ea" : "#111827" }}
          >
            {displayName.trim() || "Nameless Mock"}
          </span>
          {showBadge ? (
            <span title="Decorative badge — not real verification" aria-label="Decorative badge">
              <DecorativeBadge />
            </span>
          ) : null}
        </div>
        <div className="truncate" style={{ color: muted, fontSize: 15, lineHeight: "20px" }}>
          {username.trim() || "@mockuser"} · {timeLabel}
        </div>
      </div>
      <div style={{ color: muted, fontSize: 18, lineHeight: 1, fontWeight: 700 }}>···</div>
    </div>
  );
}
