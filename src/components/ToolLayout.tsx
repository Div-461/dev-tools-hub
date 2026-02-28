import { Copy, Download, Trash2, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/useClipboard";
import ErrorMessage from "./ErrorMessage";

interface ToolLayoutProps {
  title: string;
  description: string;
  input: string;
  output: string;
  error: string;
  onInputChange: (val: string) => void;
  onConvert: () => void;
  onClear: () => void;
  sampleInput: string;
  inputLabel?: string;
  outputLabel?: string;
  actionLabel?: string;
  extraControls?: React.ReactNode;
  children?: React.ReactNode;
}

const ToolLayout = ({
  title,
  description,
  input,
  output,
  error,
  onInputChange,
  onConvert,
  onClear,
  sampleInput,
  inputLabel = "Input",
  outputLabel = "Output",
  actionLabel = "Convert",
  extraControls,
  children,
}: ToolLayoutProps) => {
  const { copy } = useClipboard();

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-output.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container max-w-6xl py-6 md:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {extraControls && <div className="mb-4">{extraControls}</div>}

      <div className="mb-3 flex flex-wrap gap-2">
        <Button onClick={onConvert} className="gap-1.5">
          {actionLabel}
        </Button>
        <Button variant="outline" size="sm" onClick={() => onInputChange(sampleInput)} className="gap-1.5">
          <Beaker className="h-3.5 w-3.5" /> Sample
        </Button>
        <Button variant="outline" size="sm" onClick={onClear} className="gap-1.5">
          <Trash2 className="h-3.5 w-3.5" /> Clear
        </Button>
        <Button variant="outline" size="sm" onClick={() => copy(output)} className="gap-1.5" disabled={!output}>
          <Copy className="h-3.5 w-3.5" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1.5" disabled={!output}>
          <Download className="h-3.5 w-3.5" /> Download
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{inputLabel}</label>
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[320px] w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={`Paste your ${inputLabel.toLowerCase()} here...`}
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{outputLabel}</label>
          <textarea
            value={output}
            readOnly
            className="min-h-[320px] w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            placeholder="Output will appear here..."
            spellCheck={false}
          />
        </div>
      </div>

      {error && <div className="mt-3"><ErrorMessage message={error} /></div>}

      {children}
    </div>
  );
};

export default ToolLayout;
