export function encodeBase64(input: string): string {
  return btoa(unescape(encodeURIComponent(input)));
}

export function decodeBase64(input: string): string {
  try {
    return decodeURIComponent(escape(atob(input.trim())));
  } catch {
    throw new Error("Invalid Base64 string. Make sure the input is properly encoded.");
  }
}

export const base64Sample = `Hello, World! This is a sample text for Base64 encoding.
It supports UTF-8 characters: café, naïve, résumé.`;
