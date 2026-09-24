export type ImageAspectRatio = "auto" | "1:1" | "4:3" | "16:9";
export type ImageFit = "cover" | "contain";
export type TimestampMode = "relative" | "absolute";
export type ThemeName = "light" | "dark" | "soft" | "minimal";
export type FontSize = "sm" | "base" | "lg";

export interface PostData {
  profileImage: string | null;
  displayName: string;
  username: string;
  showBadge: boolean;

  content: string;

  postImage: string | null;
  imageAspectRatio: ImageAspectRatio;
  imageFit: ImageFit;
  imageRadius: number;
  imageZoom: number;

  timestampMode: TimestampMode;
  timestamp: string;
  date: string;
  relativeTime: string;

  replies: number;
  reposts: number;
  likes: number;
  views: number;
  bookmarks: number;

  theme: ThemeName;
  fontSize: FontSize;
  cardWidth: number;
}

export const DEFAULT_POST: PostData = {
  profileImage: null,
  displayName: "mydarkdesire",
  username: "@mydark.desire",
  showBadge: true,
  content: "Building something I've wanted to build for a long time.\n\nFinally shipping the first version 🚀",
  postImage: null,
  imageAspectRatio: "16:9",
  imageFit: "cover",
  imageRadius: 16,
  imageZoom: 100,
  timestampMode: "relative",
  timestamp: "10:42 AM",
  date: "Sep 24, 2026",
  relativeTime: "1h",
  replies: 24,
  reposts: 102,
  likes: 842,
  views: 8400,
  bookmarks: 18,
  theme: "light",
  fontSize: "base",
  cardWidth: 600,
};
