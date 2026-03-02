import { memo } from "react";

interface Props {
  value: string;
}

const SqlOutput = memo(({ value }: Props) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
      Formatted SQL
    </label>
    <textarea
      value={value}
      readOnly
      className="min-h-[320px] w-full resize-y rounded-lg border border-border bg-input p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      placeholder="Formatted output will appear here..."
      spellCheck={false}
    />
  </div>
));

SqlOutput.displayName = "SqlOutput";
export default SqlOutput;
