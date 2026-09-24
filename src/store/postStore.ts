"use client";

import { create } from "zustand";
import { DEFAULT_POST, type PostData } from "@/types/post";
import { normalizeUsername } from "@/lib/formatting";

interface PostStore extends PostData {
  isExporting: boolean;
  toast: string | null;
  update: (partial: Partial<PostData>) => void;
  setUsername: (raw: string) => void;
  setToast: (msg: string | null) => void;
  setExporting: (v: boolean) => void;
  reset: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  ...DEFAULT_POST,
  isExporting: false,
  toast: null,
  update: (partial) => set(partial),
  setUsername: (raw) =>
    set(() => {
      if (raw.trim() === "") return { username: "" } as Partial<PostStore>;
      return { username: normalizeUsername(raw) } as Partial<PostStore>;
    }),
  setToast: (msg) => set({ toast: msg }),
  setExporting: (v) => set({ isExporting: v }),
  reset: () =>
    set({
      ...DEFAULT_POST,
      isExporting: false,
      toast: "Canvas reset to defaults",
    }),
}));
