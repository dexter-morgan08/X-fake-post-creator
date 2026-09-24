"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { usePostStore } from "@/store/postStore";

export function Toaster() {
  const toast = usePostStore((s) => s.toast);
  const setToast = usePostStore((s) => s.setToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast, setToast]);

  if (!toast) return null;

  const isError = /invalid|too large|failed|empty|upload/i.test(toast);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full bg-zinc-900 py-2.5 pl-4 pr-3 text-sm text-white shadow-xl">
        {isError ? <AlertTriangle size={15} className="text-amber-400" /> : <CheckCircle2 size={15} className="text-emerald-400" />}
        <span>{toast}</span>
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => setToast(null)}
          className="rounded-full p-1 hover:bg-zinc-700 transition"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
