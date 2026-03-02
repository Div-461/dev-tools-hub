import { memo } from "react";
import { Beaker, Trash2, Copy, Download, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type SqlDialect, dialectLabels } from "@/utils/sqlUtils";

interface Props {
  dialect: SqlDialect;
  onDialectChange: (d: SqlDialect) => void;
  onFormat: () => void;
  onSample: () => void;
  onClear: () => void;
  onCopy: () => void;
  onDownload: () => void;
  hasOutput: boolean;
}

const SqlToolbar = memo(
  ({
    dialect,
    onDialectChange,
    onFormat,
    onSample,
    onClear,
    onCopy,
    onDownload,
    hasOutput,
  }: Props) => (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={dialect} onValueChange={(v) => onDialectChange(v as SqlDialect)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.entries(dialectLabels) as [SqlDialect, string][]).map(
            ([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>

      <Button onClick={onFormat} className="gap-1.5">
        <Wand2 className="h-3.5 w-3.5" /> Format
      </Button>
      <Button variant="outline" size="sm" onClick={onSample} className="gap-1.5">
        <Beaker className="h-3.5 w-3.5" /> Sample
      </Button>
      <Button variant="outline" size="sm" onClick={onClear} className="gap-1.5">
        <Trash2 className="h-3.5 w-3.5" /> Clear
      </Button>
      <Button variant="outline" size="sm" onClick={onCopy} disabled={!hasOutput} className="gap-1.5">
        <Copy className="h-3.5 w-3.5" /> Copy
      </Button>
      <Button variant="outline" size="sm" onClick={onDownload} disabled={!hasOutput} className="gap-1.5">
        <Download className="h-3.5 w-3.5" /> Download
      </Button>
    </div>
  )
);

SqlToolbar.displayName = "SqlToolbar";
export default SqlToolbar;
