import { memo } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const SqlInput = memo(({ value, onChange }: Props) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
      Raw SQL
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-[320px] w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      placeholder="Paste your SQL here — stored procedures, functions, triggers, views, multi-statement scripts…"
      spellCheck={false}
    />
  </div>
));

SqlInput.displayName = "SqlInput";
export default SqlInput;
