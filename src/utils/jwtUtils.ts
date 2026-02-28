export function decodeJwt(token: string): string {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT: token must have 3 parts separated by dots");

  const decodeSegment = (str: string) => {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(decodeURIComponent(escape(atob(padded))));
  };

  try {
    const header = decodeSegment(parts[0]);
    const payload = decodeSegment(parts[1]);
    const result: Record<string, unknown> = { header, payload };
    if (payload.exp) {
      const expDate = new Date(payload.exp * 1000);
      result.expiration = {
        date: expDate.toISOString(),
        local: expDate.toLocaleString(),
        expired: expDate < new Date(),
      };
    }
    if (payload.iat) {
      result.issued_at = new Date(payload.iat * 1000).toISOString();
    }
    return JSON.stringify(result, null, 2);
  } catch (e) {
    throw new Error("Failed to decode JWT: " + (e instanceof Error ? e.message : "unknown error"));
  }
}

export const jwtSample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzUwODk2MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
