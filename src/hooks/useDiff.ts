import { useState, useCallback, useRef, useEffect } from "react";
import type { DiffLine, DiffResult, DiffRequest } from "@/workers/diffCompare.worker";

export type DiffMode = "line" | "word";

interface UseDiffReturn {
  compare: (original: string, modified: string, mode: DiffMode) => void;
  lines: DiffLine[];
  stats: DiffResult["stats"] | null;
  loading: boolean;
  clear: () => void;
}

export function useDiff(): UseDiffReturn {
  const [lines, setLines] = useState<DiffLine[]>([]);
  const [stats, setStats] = useState<DiffResult["stats"] | null>(null);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const worker = new Worker(
      new URL("@/workers/diffCompare.worker.ts", import.meta.url),
      { type: "module" }
    );
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<DiffResult>) => {
      const { lines: diffLines, stats: diffStats } = e.data;
      setLines(diffLines);
      setStats(diffStats);
      setLoading(false);
    };

    return () => worker.terminate();
  }, []);

  const compare = useCallback((original: string, modified: string, mode: DiffMode) => {
    if (!workerRef.current) return;
    setLoading(true);
    const id = String(++idRef.current);
    const req: DiffRequest = { id, original, modified, mode };
    workerRef.current.postMessage(req);
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setStats(null);
  }, []);

  return { compare, lines, stats, loading, clear };
}
