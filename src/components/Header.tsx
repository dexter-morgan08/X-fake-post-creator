"use client";

import { RotateCcw, PenSquare } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { ExportButton } from "./ExportButton";

export function Header() {
  const reset = usePostStore((s) => s.reset);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
            <PenSquare size={16} />
          </span>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-zinc-900 leading-none">
              MOCKPOST STUDIO
            </h1>
            <p className="mt-1 text-[11px] text-zinc-500 leading-none">
              Create fictional social-media mockups · For design, prototyping &amp; educational use
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-100 transition"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <ExportButton targetId="mockpost-export-node" />
        </div>
      </div>
    </header>
  );
}
