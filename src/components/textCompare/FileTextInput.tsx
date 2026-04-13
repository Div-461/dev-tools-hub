import { memo, useCallback, useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;
  ariaLabel: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ".txt,.csv,.json,.xml,.sql,.md,.log,.js,.ts,.html,.css,.py,.java,.yaml,.yml,.env,.cfg,.ini,.sh";

const FileTextInput = memo(({ label, value, onChange, ariaLabel }: Props) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = useCallback(
    (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        alert("File too large. Maximum size is 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        onChange(text);
        setFileName(file.name);
      };
      reader.readAsText(file);
    },
    [onChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) readFile(file);
      // Reset so same file can be re-uploaded
      e.target.value = "";
    },
    [readFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) readFile(file);
    },
    [readFile]
  );

  const handleClearFile = useCallback(() => {
    setFileName(null);
    onChange("");
  }, [onChange]);

  const charCount = value.length;
  const lineCount = value ? value.split("\n").length : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>

      {/* File upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/40"
        }`}
      >
        {!value ? (
          // Empty state — upload prompt
          <div className="flex flex-col items-center justify-center gap-2 py-8 px-4">
            <Upload className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground text-center">
              Drag & drop a text file here, or
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              className="gap-1.5"
            >
              <FileText className="h-3.5 w-3.5" /> Choose File
            </Button>
            <p className="text-[10px] text-muted-foreground/60">
              Supports .txt, .csv, .json, .xml, .sql, .md, .log and more (max 10MB)
            </p>
          </div>
        ) : (
          // Has content — show preview
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {fileName && (
                  <span className="flex items-center gap-1 rounded bg-muted px-2 py-0.5">
                    <FileText className="h-3 w-3" />
                    {fileName}
                  </span>
                )}
                <span>{lineCount.toLocaleString()} lines</span>
                <span>·</span>
                <span>{charCount.toLocaleString()} chars</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  className="h-6 px-2 text-[10px]"
                >
                  Replace
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFile}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <pre className="max-h-[180px] overflow-auto rounded bg-input p-2 font-mono text-xs text-foreground whitespace-pre-wrap break-all">
              {value.length > 5000
                ? value.slice(0, 5000) + `\n\n… (${(value.length - 5000).toLocaleString()} more characters)`
                : value}
            </pre>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          onChange={handleFileChange}
          className="hidden"
          aria-label={ariaLabel}
        />
      </div>

      {/* Quick paste fallback */}
      {!value && (
        <details className="group">
          <summary className="cursor-pointer text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            Or paste text directly…
          </summary>
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setFileName(null);
            }}
            className="mt-1.5 min-h-[120px] w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={`Paste ${label.toLowerCase()} here...`}
            spellCheck={false}
          />
        </details>
      )}
    </div>
  );
});

FileTextInput.displayName = "FileTextInput";
export default FileTextInput;
