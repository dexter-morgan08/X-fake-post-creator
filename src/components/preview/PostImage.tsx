"use client";

import { usePostStore } from "@/store/postStore";

function aspectStyle(ratio: string): { aspectRatio?: string } {
  if (ratio === "1:1") return { aspectRatio: "1 / 1" };
  if (ratio === "4:3") return { aspectRatio: "4 / 3" };
  if (ratio === "16:9") return { aspectRatio: "16 / 9" };
  return {};
}

export function PostImage({ dark }: { dark: boolean }) {
  const postImage = usePostStore((s) => s.postImage);
  const imageAspectRatio = usePostStore((s) => s.imageAspectRatio);
  const imageFit = usePostStore((s) => s.imageFit);
  const imageRadius = usePostStore((s) => s.imageRadius);
  const imageZoom = usePostStore((s) => s.imageZoom);

  if (!postImage) return null;

  const zoom = Math.min(200, Math.max(50, imageZoom)) / 100;

  return (
    <div
      style={{
        ...aspectStyle(imageAspectRatio),
        width: "100%",
        borderRadius: imageRadius,
        overflow: "hidden",
        border: dark ? "1px solid #2f3336" : "1px solid #e4e4e7",
        backgroundColor: dark ? "#000000" : "#f4f4f5",
        minHeight: imageAspectRatio === "auto" ? 180 : undefined,
        maxHeight: 500,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={postImage}
        alt="Mock post attachment"
        style={{
          width: "100%",
          height: imageAspectRatio === "auto" ? "auto" : "100%",
          maxHeight: 500,
          objectFit: imageFit,
          display: "block",
          transform: zoom === 1 ? undefined : `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}
