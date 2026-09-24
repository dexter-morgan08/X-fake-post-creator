"use client";

import { Check } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { Field, Section, Segmented } from "@/components/ui/controls";
import type { FontSize, ThemeName } from "@/types/post";
import { cn } from "@/lib/utils";

const THEMES: { value: ThemeName; label: string; swatch: string; ring: string }[] = [
  { value: "light", label: "Light", swatch: "#ffffff", ring: "#e4e4e7" },
  { value: "dark", label: "Dark", swatch: "#15202b", ring: "#2f3336" },
  { value: "soft", label: "Soft", swatch: "#f6f4ef", ring: "#e7e2d6" },
  { value: "minimal", label: "Minimal", swatch: "#fafafa", ring: "#e4e4e7" },
];

export function ThemeEditor() {
  const theme = usePostStore((s) => s.theme);
  const fontSize = usePostStore((s) => s.fontSize);
  const cardWidth = usePostStore((s) => s.cardWidth);
  const update = usePostStore((s) => s.update);

  return (
    <Section title="Appearance" hint="Theme, type size and mockup width.">
      <div className="grid grid-cols-4 gap-2">
        {THEMES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => update({ theme: t.value })}
            aria-pressed={theme === t.value}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition",
              theme === t.value
                ? "border-zinc-900 bg-white"
                : "border-zinc-200 bg-white hover:border-zinc-400"
            )}
          >
            <span
              className="flex h-8 w-full items-center justify-center rounded-lg border"
              style={{ backgroundColor: t.swatch, borderColor: t.ring }}
            >
              {theme === t.value ? <Check size={14} /> : null}
            </span>
            <span className="text-[11px] font-medium text-zinc-700">{t.label}</span>
          </button>
        ))}
      </div>

      <Field label="Font size">
        <Segmented<FontSize>
          ariaLabel="Font size"
          value={fontSize}
          onChange={(v) => update({ fontSize: v })}
          options={[
            { value: "sm", label: "Compact" },
            { value: "base", label: "Regular" },
            { value: "lg", label: "Large" },
          ]}
        />
      </Field>

      <Field label={`Mockup width · ${cardWidth}px`} htmlFor="cardWidth">
        <input
          id="cardWidth"
          type="range"
          min={380}
          max={680}
          step={10}
          value={cardWidth}
          onChange={(e) => update({ cardWidth: Number(e.target.value) })}
          className="w-full accent-zinc-900"
        />
      </Field>
    </Section>
  );
}
