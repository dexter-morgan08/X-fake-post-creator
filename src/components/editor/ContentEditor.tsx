"use client";

import { usePostStore } from "@/store/postStore";
import { countChars } from "@/lib/formatting";
import { Field, Section, TextArea } from "@/components/ui/controls";

const LIMIT = 280;

export function ContentEditor() {
  const content = usePostStore((s) => s.content);
  const update = usePostStore((s) => s.update);
  const len = countChars(content);
  const over = len > LIMIT;

  return (
    <Section title="Post content" hint="Plain text, line breaks, emojis, #hashtags and @mentions.">
      <Field label="Caption" htmlFor="caption">
        <TextArea
          id="caption"
          value={content}
          rows={5}
          maxLength={2000}
          placeholder="What's happening?"
          onChange={(e) => update({ content: e.target.value.slice(0, 2000) })}
          aria-describedby="caption-count"
        />
      </Field>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-zinc-500">Supports line breaks & emoji.</p>
        <p
          id="caption-count"
          className={`text-[11px] font-medium tabular-nums ${over ? "text-red-600" : len > LIMIT - 40 ? "text-amber-600" : "text-zinc-500"}`}
        >
          {len}/{LIMIT}
        </p>
      </div>
      {over ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          Over {LIMIT} characters — preview will still render, but consider shortening.
        </p>
      ) : null}
    </Section>
  );
}
