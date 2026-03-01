import { memo } from "react";
import { Beaker, Trash2, Copy, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onFormat: () => void;
  onClear: () => void;
  onSample: () => void;
  onCopy: () => void;
  onDownload: () => void;
  hasOutput: boolean;
  loading: boolean;
}

const JsonToolbar = memo(
  ({ onFormat, onClear, onSample, onCopy, onDownload, hasOutput, loading }: Props) => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onFormat} disabled={loading} className="gap-1.5">
        <Eye className="h-3.5 w-3.5" />
        {loading ? "Parsing…" : "Format & View"}
      </Button>
      <Button variant="outline" size="sm" onClick={onSample} className="gap-1.5">
        <Beaker className="h-3.5 w-3.5" /> Sample
      </Button>
      <Button variant="outline" size="sm" onClick={onClear} className="gap-1.5">
        <Trash2 className="h-3.5 w-3.5" /> Clear
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="gap-1.5"
        disabled={!hasOutput}
      >
        <Copy className="h-3.5 w-3.5" /> Copy
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        className="gap-1.5"
        disabled={!hasOutput}
      >
        <Download className="h-3.5 w-3.5" /> Download
      </Button>
    </div>
  )
);

JsonToolbar.displayName = "JsonToolbar";

export default JsonToolbar;
