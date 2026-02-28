export function unixToHuman(timestamp: string): string {
  const num = Number(timestamp.trim());
  if (isNaN(num)) throw new Error("Invalid timestamp: must be a number");
  const ms = num > 1e12 ? num : num * 1000;
  const date = new Date(ms);
  if (isNaN(date.getTime())) throw new Error("Invalid timestamp value");
  return JSON.stringify({
    utc: date.toUTCString(),
    iso: date.toISOString(),
    local: date.toLocaleString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    unix_seconds: Math.floor(ms / 1000),
    unix_milliseconds: ms,
  }, null, 2);
}

export function dateToUnix(dateStr: string): string {
  const date = new Date(dateStr.trim());
  if (isNaN(date.getTime())) throw new Error("Invalid date string. Try formats like: 2024-01-15, Jan 15 2024, 2024-01-15T10:30:00Z");
  return JSON.stringify({
    unix_seconds: Math.floor(date.getTime() / 1000),
    unix_milliseconds: date.getTime(),
    iso: date.toISOString(),
    utc: date.toUTCString(),
  }, null, 2);
}

export const timestampSample = "1700000000";
export const dateSample = "2024-06-15T14:30:00Z";
