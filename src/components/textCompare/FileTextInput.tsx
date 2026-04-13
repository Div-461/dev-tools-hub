import { memo, useCallback, useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;
  ariaLabel: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ".txt,.csv,.json,.xml,.sql,.md,.log,.js,.ts,.html,.css,.py,.java,.yaml,.yml,.env,.cfg,.ini,.sh";

const FileTextInput = memo(({ label, value, onChange, ariaLabel }: Props) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = useCallback(
    (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        alert("File too large. Maximum size is 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
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
      e.target.value = "";
    },
    [readFile]
  );

  const handleClearFile = useCallback(() => {
    setFileName(null);
    onChange("");
  }, [onChange]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>

      {/* File upload bar */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          className="gap-1.5 text-xs"
        >
          <Upload className="h-3 w-3" /> Choose File
        </Button>
        {fileName && (
          <span className="flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            <FileText className="h-3 w-3" />
            {fileName}
            <button onClick={handleClearFile} className="ml-1 hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        <span className="text-[10px] text-muted-foreground/60 ml-auto">
          .txt, .json, .csv, .xml… (max 10MB)
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          onChange={handleFileChange}
          className="hidden"
          aria-label={ariaLabel}
        />
      </div>

      {/* Always-visible textarea */}
      <textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setFileName(null);
        }}
        className="min-h-[220px] w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder={`Paste ${label.toLowerCase()} here...`}
        spellCheck={false}
      />
    </div>
  );
});

FileTextInput.displayName = "FileTextInput";
export default FileTextInput;
