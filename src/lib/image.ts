export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

export interface ImageValidation {
  ok: boolean;
  error?: string;
}

export function validateImageFile(file: File): ImageValidation {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { ok: false, error: "Please upload JPG, PNG, or WEBP." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "Image is too large. Max 5MB." };
  }
  if (file.size === 0) {
    return { ok: false, error: "That file appears to be empty." };
  }
  return { ok: true };
}

export function fileToObjectUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeObjectUrl(url: string | null): void {
  if (url && url.startsWith("blob:")) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  }
}
