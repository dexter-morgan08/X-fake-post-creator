"use client";

import { useRef } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { validateImageFile, fileToObjectUrl, revokeObjectUrl } from "@/lib/image";
import { Field, Section, Segmented, TextInput, Toggle } from "@/components/ui/controls";
import type { ImageAspectRatio, ImageFit } from "@/types/post";

export function ImageEditor() {
  const postImage = usePostStore((s) => s.postImage);
  const imageAspectRatio = usePostStore((s) => s.imageAspectRatio);
  const imageFit = usePostStore((s) => s.imageFit);
  const imageRadius = usePostStore((s) => s.imageRadius);
  const imageZoom = usePostStore((s) => s.imageZoom);
  const vectorOverlay = usePostStore((s) => s.vectorOverlay);
  const update = usePostStore((s) => s.update);
  const setToast = usePostStore((s) => s.setToast);
  const fileRef = useRef<HTMLInputElement>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    const v = validateImageFile(f);
    if (!v.ok) {
      setToast(v.error ?? "Invalid image.");
      return;
    }
    revokeObjectUrl(postImage);
    update({ postImage: fileToObjectUrl(f) });
    setToast("Post image added");
  }

  return (
    <Section title="Post image" hint="Optional. Stays in your browser — never uploaded.">
      {!postImage ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition"
        >
          <ImagePlus size={20} />
          <span className="text-sm font-medium">+ Add image</span>
          <span className="text-[11px]">JPG, PNG or WEBP · max 5MB</span>
        </button>
      ) : (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={postImage} alt="Post attachment preview" className="max-h-44 w-full object-cover" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                revokeObjectUrl(postImage);
                update({ postImage: null });
              }}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition"
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onPick}
        aria-label="Upload post image"
      />

      <Field label="Aspect ratio">
        <Segmented<ImageAspectRatio>
          ariaLabel="Aspect ratio"
          value={imageAspectRatio}
          onChange={(v) => update({ imageAspectRatio: v })}
          options={[
            { value: "auto", label: "Auto" },
            { value: "1:1", label: "1:1" },
            { value: "4:3", label: "4:3" },
            { value: "16:9", label: "16:9" },
            { value: "3:4", label: "3:4" },
          ]}
        />
      </Field>

      <Toggle
        checked={vectorOverlay}
        onChange={(v) => {
          update({ vectorOverlay: v });
          setToast(v ? "Vector overlay ON — media slot stays empty" : "Vector overlay OFF");
        }}
        label="Vector overlay (empty media slot)"
      />
      {vectorOverlay ? (
        <p className="text-[11px] leading-relaxed text-zinc-500">
          Transparent media window with a thin frame outline — no image, no label. The area inside the frame stays see-through. Exports as a scalable SVG overlay for video editors.
        </p>
      ) : null}

      <Field label="Image fit">
        <Segmented<ImageFit>
          ariaLabel="Image fit"
          value={imageFit}
          onChange={(v) => update({ imageFit: v })}
          options={[
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
          ]}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={`Radius · ${imageRadius}px`} htmlFor="imgRadius">
          <input
            id="imgRadius"
            type="range"
            min={0}
            max={24}
            value={imageRadius}
            onChange={(e) => update({ imageRadius: Number(e.target.value) })}
            className="w-full accent-zinc-900"
          />
        </Field>
        <Field label={`Zoom · ${imageZoom}%`} htmlFor="imgZoom">
          <input
            id="imgZoom"
            type="range"
            min={50}
            max={200}
            value={imageZoom}
            onChange={(e) => update({ imageZoom: Number(e.target.value) })}
            className="w-full accent-zinc-900"
          />
        </Field>
      </div>
      <Field label="Or type radius" htmlFor="imgRadiusNum">
        <TextInput
          id="imgRadiusNum"
          inputMode="numeric"
          value={String(imageRadius)}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (Number.isFinite(n)) update({ imageRadius: Math.min(24, Math.max(0, n)) });
          }}
        />
      </Field>
    </Section>
  );
}
