"use client";

import { ContentEditor } from "./ContentEditor";
import { EngagementEditor } from "./EngagementEditor";
import { ImageEditor } from "./ImageEditor";
import { MetadataEditor } from "./MetadataEditor";
import { ProfileEditor } from "./ProfileEditor";
import { ThemeEditor } from "./ThemeEditor";

export function EditorSidebar() {
  return (
    <div className="overflow-y-auto slim-scroll">
      <ProfileEditor />
      <ContentEditor />
      <ImageEditor />
      <MetadataEditor />
      <EngagementEditor />
      <ThemeEditor />
      <div className="px-5 py-4">
        <p className="rounded-xl bg-zinc-900 px-4 py-3 text-[11px] leading-relaxed text-zinc-200">
          For design, prototyping &amp; educational use. Images stay in your browser.
          Exports always include a FICTIONAL MOCKUP label.
        </p>
      </div>
    </div>
  );
}
