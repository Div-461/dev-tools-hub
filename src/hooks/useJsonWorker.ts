import { useCallback, useEffect, useRef, useState } from "react";

interface ParseResult {
  data: unknown;
  stats: { sizeBytes: number; parseTimeMs: number };
}

export function useJsonWorker() {
  const workerRef = useRef<Worker | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ParseResult | null>(null);

  useEffect(() => {
    const w = new Worker(
      new URL("../workers/jsonParser.worker.ts", import.meta.url),
      { type: "module" }
    );
    workerRef.current = w;

    w.onmessage = (e) => {
      const msg = e.data;
      setLoading(false);
      if (msg.success) {
        setError("");
        setResult({ data: msg.data, stats: msg.stats });
      } else {
        setError(msg.error);
        setResult(null);
      }
    };

    w.onerror = () => {
      setLoading(false);
      setError("Worker encountered an unexpected error.");
    };

    return () => w.terminate();
  }, []);

  const parse = useCallback((jsonString: string) => {
    if (!jsonString.trim()) {
      setError("");
      setResult(null);
      return;
    }
    setLoading(true);
    setError("");
    workerRef.current?.postMessage({
      id: crypto.randomUUID(),
      jsonString,
    });
  }, []);

  const clear = useCallback(() => {
    setError("");
    setResult(null);
    setLoading(false);
  }, []);

  return { parse, loading, error, result, clear };
}
