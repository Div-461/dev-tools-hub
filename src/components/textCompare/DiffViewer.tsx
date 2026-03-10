import { memo, useCallback, useRef, useMemo } from "react";
import type { DiffLine } from "@/workers/diffCompare.worker";

interface Props {
  lines: DiffLine[];
  height?: number;
}

const ROW_HEIGHT = 24;

const bgClass: Record<DiffLine["type"], string> = {
  equal: "",
  added: "bg-green-500/15",
  removed: "bg-red-500/15",
  modified: "bg-amber-500/15",
};

const DiffRow = memo(({ line }: { line: DiffLine }) => {
  const bg = bgClass[line.type];

  return (
    <div className={`flex font-mono text-xs ${bg} border-b border-border/40`} style={{ minHeight: ROW_HEIGHT }}>
      {/* Left side */}
      <div className="flex flex-1 min-w-0">
        <span className="w-10 shrink-0 select-none text-right pr-2 text-muted-foreground/60 leading-6" aria-label={`Original line ${line.lineNum.left ?? ""}`}>
          {line.lineNum.left ?? ""}
        </span>
        <span className="flex-1 whitespace-pre-wrap break-all px-2 leading-6 text-foreground">
          {line.type === "modified" && line.wordDiffs
            ? line.wordDiffs.filter(d => d.type !== "added").map((d, i) => (
                <span key={i} className={d.type === "removed" ? "bg-red-500/30 rounded-sm" : ""}>
                  {d.text}
                </span>
              ))
            : line.left}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px shrink-0 bg-border" />

      {/* Right side */}
      <div className="flex flex-1 min-w-0">
        <span className="w-10 shrink-0 select-none text-right pr-2 text-muted-foreground/60 leading-6" aria-label={`Modified line ${line.lineNum.right ?? ""}`}>
          {line.lineNum.right ?? ""}
        </span>
        <span className="flex-1 whitespace-pre-wrap break-all px-2 leading-6 text-foreground">
          {line.type === "modified" && line.wordDiffs
            ? line.wordDiffs.filter(d => d.type !== "removed").map((d, i) => (
                <span key={i} className={d.type === "added" ? "bg-green-500/30 rounded-sm" : ""}>
                  {d.text}
                </span>
              ))
            : line.right}
        </span>
      </div>
    </div>
  );
});
DiffRow.displayName = "DiffRow";

const DiffViewer = memo(({ lines, height = 520 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (lines.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 flex border-b border-border bg-muted/80 backdrop-blur text-xs font-medium text-muted-foreground">
        <div className="flex-1 px-3 py-1.5">Original</div>
        <div className="w-px bg-border" />
        <div className="flex-1 px-3 py-1.5">Modified</div>
      </div>

      {/* Lines */}
      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ maxHeight: height }}
        role="region"
        aria-label="Diff comparison results"
      >
        {lines.map((line, i) => (
          <DiffRow key={i} line={line} />
        ))}
      </div>
    </div>
  );
});

DiffViewer.displayName = "DiffViewer";
export default DiffViewer;
