/** Format raw engagement numbers for display. */
export function formatCount(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0";
  if (n < 1000) return Math.floor(n).toString();
  if (n < 1_000_000) {
    const v = n / 1000;
    const str = v >= 100 ? Math.round(v).toString() : trimTrailing(v.toFixed(1));
    return `${str}K`;
  }
  const v = n / 1_000_000;
  const str = v >= 100 ? Math.round(v).toString() : trimTrailing(v.toFixed(1));
  return `${str}M`;
}

function trimTrailing(s: string): string {
  return s.replace(/\.0$/, "");
}

export function formatWithCommas(n: number): string {
  if (!Number.isFinite(n)) return "0";
  return Math.floor(n).toLocaleString("en-US");
}

/** Parse user-typed engagement input like "8.4K", "1.2M", "1,204" -> number */
export function parseCountInput(raw: string): number | null {
  const t = raw.trim().replace(/,/g, "").toLowerCase();
  if (t === "") return 0;
  const m = t.match(/^(\d*\.?\d+)(k|m)?$/);
  if (!m) return null;
  const base = parseFloat(m[1]);
  if (!Number.isFinite(base) || base < 0) return null;
  const mult = m[2] === "k" ? 1000 : m[2] === "m" ? 1_000_000 : 1;
  const val = Math.floor(base * mult);
  if (val > 999_999_999) return null;
  return val;
}

export function normalizeUsername(u: string): string {
  const t = u.trim().replace(/^@+/, "").replace(/\s+/g, "");
  if (!t) return "";
  return `@${t.slice(0, 30)}`;
}

export function countChars(s: string): number {
  return Array.from(s).length;
}
