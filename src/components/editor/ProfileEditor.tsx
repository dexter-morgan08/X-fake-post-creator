"use client";

import { useRef } from "react";
import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { validateImageFile, fileToObjectUrl, revokeObjectUrl } from "@/lib/image";
import { Field, Section, TextInput, Toggle } from "@/components/ui/controls";

export function ProfileEditor() {
  const displayName = usePostStore((s) => s.displayName);
  const username = usePostStore((s) => s.username);
  const showBadge = usePostStore((s) => s.showBadge);
  const profileImage = usePostStore((s) => s.profileImage);
  const update = usePostStore((s) => s.update);
  const setUsername = usePostStore((s) => s.setUsername);
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
    revokeObjectUrl(profileImage);
    update({ profileImage: fileToObjectUrl(f) });
    setToast("Profile photo updated");
  }

  return (
    <Section title="Profile" hint="Fictional identity for this mockup only.">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-900 text-sm font-semibold text-white">
          {profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profileImage} alt="Profile preview" className="h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/profile.jpg" alt="Default profile" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex flex-1 gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white hover:bg-zinc-700 transition"
          >
            <ImagePlus size={14} />
            {profileImage ? "Replace" : "Upload"}
          </button>
          {profileImage ? (
            <button
              type="button"
              aria-label="Remove profile image"
              onClick={() => {
                revokeObjectUrl(profileImage);
                update({ profileImage: null });
              }}
              className="flex items-center justify-center rounded-lg border border-zinc-300 px-2.5 text-zinc-600 hover:bg-zinc-100 transition"
            >
              <Trash2 size={14} />
            </button>
          ) : null}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onPick}
          aria-label="Upload profile image"
        />
      </div>

      <Field label="Display name" htmlFor="displayName">
        <TextInput
          id="displayName"
          value={displayName}
          maxLength={50}
          placeholder="mydarkdesire"
          onChange={(e) => update({ displayName: e.target.value.slice(0, 50) })}
        />
      </Field>

      <Field label="Username" htmlFor="username">
        <TextInput
          id="username"
          value={username}
          maxLength={31}
          placeholder="@mydark.desire"
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="mt-1 text-[11px] text-zinc-500">@ is added automatically.</p>
      </Field>

      <Toggle
        checked={showBadge}
        onChange={(v) => update({ showBadge: v })}
        label="Show badge (generic design element)"
      />
      <p className="text-[11px] text-zinc-500 flex items-start gap-1.5">
        <RefreshCw size={11} className="mt-0.5 shrink-0" />
        Not a real verification claim — purely decorative for the mockup.
      </p>
    </Section>
  );
}
