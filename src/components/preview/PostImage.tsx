"use client";

import { usePostStore } from "@/store/postStore";

function aspectStyle(ratio: string): { aspectRatio?: string } {
  if (ratio === "1:1") return { aspectRatio: "1 / 1" };
  if (ratio === "4:3") return { aspectRatio: "4 / 3" };
  if (ratio === "16:9") return { aspectRatio: "16 / 9" };
  if (ratio === "3:4") return { aspectRatio: "3 / 4" };
  return {};
}

export function PostImage({ dark, frameColor }: { dark: boolean; frameColor?: string }) {
  const postImage = usePostStore((s) => s.postImage);
  const imageAspectRatio = usePostStore((s) => s.imageAspectRatio);
  const imageFit = usePostStore((s) => s.imageFit);
  const imageRadius = usePostStore((s) => s.imageRadius);
  const imageZoom = usePostStore((s) => s.imageZoom);
  const vectorOverlay = usePostStore((s) => s.vectorOverlay);

  if (vectorOverlay) {
    // Photo-frame opening: transparent interior, hairline edge, and black
    // frame rendered as ONE concentric box-shadow stack. A separate `border`
    // plus spread shadow are two abutting rasterized edges and can leave a
    // subpixel canvas sliver between them; stacked shadows share one center
    // so no seam is possible. (Also drops the 2px content-box overflow the
    // old 1px border added.) The frame's OUTER edge is square-clipped to its
    // exact 17px extent: a rounded outer edge against the square panels
    // leaves triangular notches whose depth grows with the radius, while a
    // square outer edge meets the panels flush at every radius. The window
    // itself stays rounded via borderRadius. The overlay export root behind
    // this slot is transparent, so video on a lower track shows through.
    const frame = frameColor ?? (dark ? "#000000" : "#ffffff");
    const hairline = dark ? "#2f3336" : "#e4e4e7";
    return (
      <div
        data-overlay="true"
        aria-label={`Transparent ${imageAspectRatio} media overlay slot`}
        style={{
          ...aspectStyle(imageAspectRatio),
          width: "100%",
          borderRadius: imageRadius,
          backgroundColor: "transparent",
          boxShadow: `0 0 0 1px ${hairline}, 0 0 0 17px ${frame}`,
          clipPath: "inset(-17px)",
          minHeight: imageAspectRatio === "auto" ? 180 : undefined,
          maxHeight: 500,
          display: "block",
        }}
      />
    );
  }

  if (!postImage) return null;

  const zoom = Math.min(200, Math.max(50, imageZoom)) / 100;

  return (
    <div
      style={{
        ...aspectStyle(imageAspectRatio),
        width: "100%",
        borderRadius: imageRadius,
        overflow: "hidden",
        // Single concentric hairline ring instead of `border`: a separate
        // border + overflow clip are two abutting rasterized edges and leave
        // subpixel white slivers at the 4 rounded corners (live + exported
        // PNG/SVG canvas). A spread shadow shares the box center so no seam
        // is possible, and avoids the 2px content-box overflow a border adds.
        boxShadow: dark ? "0 0 0 1px #2f3336" : "0 0 0 1px #e4e4e7",
        backgroundColor: dark ? "#000000" : "#f4f4f5",
        backgroundClip: "padding-box",
        isolation: "isolate",
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
          borderRadius: "inherit",
          backgroundColor: "inherit",
          transform: zoom === 1 ? undefined : `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}
