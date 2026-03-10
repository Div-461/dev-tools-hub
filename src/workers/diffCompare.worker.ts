import DiffMatchPatch from "diff-match-patch";

export interface DiffRequest {
  id: string;
  original: string;
  modified: string;
  mode: "line" | "word";
}

export interface DiffLine {
  lineNum: { left: number | null; right: number | null };
  type: "equal" | "added" | "removed" | "modified";
  left: string;
  right: string;
  wordDiffs?: { text: string; type: "equal" | "added" | "removed" }[];
}

export interface DiffResult {
  id: string;
  lines: DiffLine[];
  stats: { added: number; removed: number; modified: number; unchanged: number; timeMs: number };
}

function computeLineDiff(original: string, modified: string): DiffLine[] {
  const leftLines = original.split("\n");
  const rightLines = modified.split("\n");
  const dmp = new DiffMatchPatch();

  const a = dmp.diff_linesToChars_(original, modified);
  const diffs = dmp.diff_main(a.chars1, a.chars2, false);
  dmp.diff_cleanupSemantic(diffs);
  dmp.diff_charsToLines_(diffs, a.lineArray);

  const result: DiffLine[] = [];
  let leftIdx = 0;
  let rightIdx = 0;

  for (const [op, text] of diffs) {
    const lines = text.replace(/\n$/, "").split("\n");
    if (op === 0) {
      for (const line of lines) {
        leftIdx++;
        rightIdx++;
        result.push({ lineNum: { left: leftIdx, right: rightIdx }, type: "equal", left: line, right: line });
      }
    } else if (op === -1) {
      for (const line of lines) {
        leftIdx++;
        result.push({ lineNum: { left: leftIdx, right: null }, type: "removed", left: line, right: "" });
      }
    } else if (op === 1) {
      for (const line of lines) {
        rightIdx++;
        result.push({ lineNum: { left: null, right: rightIdx }, type: "added", left: "", right: line });
      }
    }
  }

  return result;
}

function computeWordDiff(original: string, modified: string): DiffLine[] {
  const leftLines = original.split("\n");
  const rightLines = modified.split("\n");
  const maxLen = Math.max(leftLines.length, rightLines.length);
  const dmp = new DiffMatchPatch();
  const result: DiffLine[] = [];

  for (let i = 0; i < maxLen; i++) {
    const l = leftLines[i] ?? "";
    const r = rightLines[i] ?? "";

    if (l === r) {
      result.push({
        lineNum: { left: i < leftLines.length ? i + 1 : null, right: i < rightLines.length ? i + 1 : null },
        type: "equal", left: l, right: r,
      });
    } else if (i >= leftLines.length) {
      result.push({ lineNum: { left: null, right: i + 1 }, type: "added", left: "", right: r });
    } else if (i >= rightLines.length) {
      result.push({ lineNum: { left: i + 1, right: null }, type: "removed", left: l, right: "" });
    } else {
      const diffs = dmp.diff_main(l, r);
      dmp.diff_cleanupSemantic(diffs);
      const wordDiffs = diffs.map(([op, text]) => ({
        text,
        type: op === 0 ? "equal" as const : op === -1 ? "removed" as const : "added" as const,
      }));
      result.push({
        lineNum: { left: i + 1, right: i + 1 },
        type: "modified", left: l, right: r, wordDiffs,
      });
    }
  }

  return result;
}

self.onmessage = (e: MessageEvent<DiffRequest>) => {
  const { id, original, modified, mode } = e.data;
  const start = performance.now();

  const lines = mode === "word"
    ? computeWordDiff(original, modified)
    : computeLineDiff(original, modified);

  const stats = { added: 0, removed: 0, modified: 0, unchanged: 0, timeMs: 0 };
  for (const line of lines) {
    if (line.type === "added") stats.added++;
    else if (line.type === "removed") stats.removed++;
    else if (line.type === "modified") stats.modified++;
    else stats.unchanged++;
  }
  stats.timeMs = Math.round(performance.now() - start);

  const resp: DiffResult = { id, lines, stats };
  self.postMessage(resp);
};
