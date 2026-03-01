import { useCallback, useMemo, useState, memo } from "react";
import { List } from "react-window";
import { flattenJson, type JsonLine } from "@/utils/jsonFormatter";
import JsonTreeNode from "./JsonTreeNode";

interface Props {
  data: unknown;
  height?: number;
}

const ROW_HEIGHT = 22;

interface ExtraRowProps {
  lines: JsonLine[];
  onToggle: (path: string) => void;
}

function RowComponent({
  index,
  style,
  lines,
  onToggle,
}: {
  index: number;
  style: React.CSSProperties;
  ariaAttributes: unknown;
} & ExtraRowProps) {
  const line = lines[index];
  return <JsonTreeNode line={line} onToggle={onToggle} style={style} />;
}

const JsonVirtualizedViewer = memo(({ data, height = 500 }: Props) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    initial.add("$");
    return initial;
  });

  const lines: JsonLine[] = useMemo(
    () => flattenJson(data, expandedPaths, 0),
    [data, expandedPaths]
  );

  const handleToggle = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        for (const p of next) {
          if (p === path || p.startsWith(path + ".")) {
            next.delete(p);
          }
        }
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const rowProps: ExtraRowProps = useMemo(
    () => ({ lines, onToggle: handleToggle }),
    [lines, handleToggle]
  );

  if (lines.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <List<ExtraRowProps>
        rowComponent={RowComponent}
        rowCount={lines.length}
        rowHeight={ROW_HEIGHT}
        rowProps={rowProps}
        overscanCount={30}
        style={{ height, overflow: "auto" }}
      />
    </div>
  );
});

JsonVirtualizedViewer.displayName = "JsonVirtualizedViewer";

export default JsonVirtualizedViewer;
