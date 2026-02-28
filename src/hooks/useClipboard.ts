import { useCallback } from "react";
import { toast } from "sonner";

export function useClipboard() {
  const copy = useCallback(async (text: string) => {
    if (!text) {
      toast.error("Nothing to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  }, []);
  return { copy };
}
