import { memo, useCallback, useRef, useState } from "react";
import { Upload, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SIZE_WARNING = 5 * 1024 * 1024; // 5MB

const JsonInput = memo(({ value, onChange }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const sizeBytes = new Blob([value]).size;
  const showWarning = sizeBytes > SIZE_WARNING;

  const [fileError, setFileError] = useState<string | null>(null);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const isJson =
        file.type === "application/json" ||
        file.name.toLowerCase().endsWith(".json");

      if (!isJson) {
        setFileError(
          `Invalid file type "${file.name.split(".").pop()}". Please upload a .json file.`
        );
        e.target.value = "";
        return;
      }

      setFileError(null);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          JSON Input
        </label>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="h-3.5 w-3.5" /> Upload .json
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {fileError && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-2 text-xs text-destructive">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span>{fileError}</span>
        </div>
      )}

      {showWarning && (
        <div className="flex items-center gap-2 rounded-md border border-accent/50 bg-accent/10 p-2 text-xs text-accent-foreground">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            Large input detected ({(sizeBytes / 1024 / 1024).toFixed(1)}MB).
            For best performance, use the file upload button.
          </span>
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="Paste your JSON here or upload a .json file..."
        spellCheck={false}
      />
    </div>
  );
});

JsonInput.displayName = "JsonInput";

export default JsonInput;
