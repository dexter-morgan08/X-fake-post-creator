"use client";

import { useRef } from "react";
import { Header } from "@/components/Header";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { PostPreview } from "@/components/preview/PostPreview";
import { Toaster } from "@/components/Toaster";
import { ShieldAlert } from "lucide-react";
import { usePostStore } from "@/store/postStore";

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);
  const theme = usePostStore((s) => s.theme);
  const previewBg = theme === "dark" ? "#15202b" : "#ececee";

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f4f5]">
      <Header />
      <div className="border-b border-amber-200 bg-amber-50">
        <p className="mx-auto flex max-w-[1280px] items-center justify-center gap-2 px-4 py-2 text-center text-[12px] font-medium text-amber-900">
          <ShieldAlert size={14} className="shrink-0" />
          Everything here is fictional. Outputs are labeled mockups — never real posts or real people.
        </p>
      </div>

      <main className="mx-auto grid w-full max-w-[1280px] flex-1 grid-cols-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-6">
        <aside className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm lg:sticky lg:top-4 lg:max-h-[calc(100vh-140px)] lg:flex lg:flex-col">
          <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-3">
            <h2 className="text-[13px] font-semibold text-zinc-900">Editor</h2>
            <p className="text-[11px] text-zinc-500">Edit → instant preview → export</p>
          </div>
          <EditorSidebar />
        </aside>

        <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[13px] font-semibold text-zinc-900">Live preview</h2>
              <p className="text-[11px] text-zinc-500">Updates instantly as you type</p>
            </div>
            <span className="rounded-full border border-zinc-300 px-2.5 py-1 text-[10px] font-bold tracking-widest text-zinc-500">
              FICTIONAL
            </span>
          </div>
          <div className="flex justify-center rounded-xl px-2 py-8 sm:px-6" style={{ backgroundColor: previewBg }}>
            <PostPreview ref={previewRef} />
          </div>
          <p className="mt-4 text-center text-[11px] text-zinc-500">
            Exported PNG and SVG overlay always retain the FICTIONAL MOCKUP indicator — it cannot be removed.
          </p>
        </section>
      </main>
      <Toaster />
    </div>
  );
}
