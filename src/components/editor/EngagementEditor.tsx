"use client";

import { useState } from "react";
import { usePostStore } from "@/store/postStore";
import { formatWithCommas, parseCountInput } from "@/lib/formatting";
import { Field, Section, TextInput } from "@/components/ui/controls";

function CountField({
  label,
  id,
  value,
  onCommit,
}: {
  label: string;
  id: string;
  value: number;
  onCommit: (n: number) => void;
}) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const shown = text ?? String(value);

  return (
    <Field label={`${label} · ${formatWithCommas(value)}`} htmlFor={id}>
      <TextInput
        id={id}
        inputMode="decimal"
        value={shown}
        placeholder="0"
        onChange={(e) => {
          setText(e.target.value);
          setError(null);
        }}
        onBlur={() => {
          const parsed = parseCountInput(shown);
          if (parsed === null) {
            setError("Use a number like 128, 1.2K or 3M.");
            setText(String(value));
          } else {
            onCommit(parsed);
            setText(null);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
      />
      {error ? <p className="mt-1 text-[11px] text-red-600">{error}</p> : null}
    </Field>
  );
}

export function EngagementEditor() {
  const replies = usePostStore((s) => s.replies);
  const reposts = usePostStore((s) => s.reposts);
  const likes = usePostStore((s) => s.likes);
  const views = usePostStore((s) => s.views);
  const bookmarks = usePostStore((s) => s.bookmarks);
  const update = usePostStore((s) => s.update);

  return (
    <Section title="Engagement" hint="Fictional numbers. Type 128, 1.2K or 3M.">
      <div className="grid grid-cols-2 gap-3">
        <CountField label="Replies" id="replies" value={replies} onCommit={(n) => update({ replies: n })} />
        <CountField label="Reposts" id="reposts" value={reposts} onCommit={(n) => update({ reposts: n })} />
        <CountField label="Likes" id="likes" value={likes} onCommit={(n) => update({ likes: n })} />
        <CountField label="Views" id="views" value={views} onCommit={(n) => update({ views: n })} />
      </div>
      <CountField label="Bookmarks" id="bookmarks" value={bookmarks} onCommit={(n) => update({ bookmarks: n })} />
    </Section>
  );
}
