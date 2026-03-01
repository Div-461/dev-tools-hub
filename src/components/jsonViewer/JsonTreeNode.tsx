import { memo } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import type { JsonLine } from "@/utils/jsonFormatter";

interface JsonTreeNodeProps {
  line: JsonLine;
  onToggle: (path: string) => void;
  style: React.CSSProperties;
}

const TYPE_COLORS: Record<string, string> = {
  string: "text-green-600 dark:text-green-400",
  number: "text-blue-600 dark:text-blue-400",
  boolean: "text-amber-600 dark:text-amber-400",
  null: "text-red-500 dark:text-red-400",
  object: "text-muted-foreground",
  array: "text-muted-foreground",
  bracket: "text-foreground",
};

const JsonTreeNode = memo(({ line, onToggle, style }: JsonTreeNodeProps) => {
  const indent = line.depth * 20;

  return (
    <div
      style={{ ...style, paddingLeft: indent + 12 }}
      className="flex items-center gap-0.5 font-mono text-xs leading-5 select-text"
    >
      {/* Expand/Collapse toggle */}
      {line.isExpandable ? (
        <button
          onClick={() => onToggle(line.path)}
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-muted"
          aria-label={line.isExpanded ? "Collapse" : "Expand"}
        >
          {line.isExpanded ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
      ) : (
        <span className="inline-block w-4 shrink-0" />
      )}

      {/* Key */}
      {line.key !== undefined && (
        <>
          <span className="text-purple-600 dark:text-purple-400">
            &quot;{line.key}&quot;
          </span>
          <span className="text-foreground">:&nbsp;</span>
        </>
      )}

      {/* Value or bracket */}
      {line.bracket && (
        <span className="text-foreground">{line.bracket}</span>
      )}

      {line.value !== undefined && !line.bracket && (
        <span className={TYPE_COLORS[line.valueType] ?? "text-foreground"}>
          {line.value}
        </span>
      )}

      {line.comma && <span className="text-foreground">,</span>}
    </div>
  );
});

JsonTreeNode.displayName = "JsonTreeNode";

export default JsonTreeNode;
