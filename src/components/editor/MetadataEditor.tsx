"use client";

import { usePostStore } from "@/store/postStore";
import { Field, Section, Segmented, TextInput } from "@/components/ui/controls";
import type { TimestampMode } from "@/types/post";

const RELATIVE_PRESETS = ["5m", "23m", "1h", "3h", "1d"];

export function MetadataEditor() {
  const timestampMode = usePostStore((s) => s.timestampMode);
  const timestamp = usePostStore((s) => s.timestamp);
  const date = usePostStore((s) => s.date);
  const relativeTime = usePostStore((s) => s.relativeTime);
  const update = usePostStore((s) => s.update);

  return (
    <Section title="Timestamp" hint="Mock metadata — purely fictional.">
      <Field label="Mode">
        <Segmented<TimestampMode>
          ariaLabel="Timestamp mode"
          value={timestampMode}
          onChange={(v) => update({ timestampMode: v })}
          options={[
            { value: "relative", label: "Relative" },
            { value: "absolute", label: "Absolute" },
          ]}
        />
      </Field>

      {timestampMode === "relative" ? (
        <div>
          <div className="flex flex-wrap gap-1.5">
            {RELATIVE_PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => update({ relativeTime: p })}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  relativeTime === p
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 text-zinc-600 hover:border-zinc-500"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <TextInput
              value={relativeTime}
              maxLength={8}
              placeholder="1h"
              aria-label="Custom relative time"
              onChange={(e) => update({ relativeTime: e.target.value.slice(0, 8) })}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Time" htmlFor="mockTime">
            <TextInput
              id="mockTime"
              value={timestamp}
              maxLength={20}
              placeholder="10:42 AM"
              onChange={(e) => update({ timestamp: e.target.value.slice(0, 20) })}
            />
          </Field>
          <Field label="Date" htmlFor="mockDate">
            <TextInput
              id="mockDate"
              value={date}
              maxLength={30}
              placeholder="Sep 24, 2026"
              onChange={(e) => update({ date: e.target.value.slice(0, 30) })}
            />
          </Field>
        </div>
      )}
    </Section>
  );
}
