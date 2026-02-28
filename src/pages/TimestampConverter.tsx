import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolLayout from "@/components/ToolLayout";
import { unixToHuman, dateToUnix, timestampSample, dateSample } from "@/utils/timestampUtils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TimestampConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"toHuman" | "toUnix">("toHuman");

  const convert = () => {
    try {
      setError("");
      setOutput(mode === "toHuman" ? unixToHuman(input) : dateToUnix(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Timestamp Converter - DevTools</title>
        <meta name="description" content="Convert Unix timestamps to human-readable dates and vice versa. Free and private." />
      </Helmet>
      <ToolLayout
        title="Timestamp Converter"
        description="Convert between Unix timestamps and human-readable dates"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={mode === "toHuman" ? timestampSample : dateSample}
        actionLabel="Convert"
        inputLabel={mode === "toHuman" ? "Unix Timestamp" : "Date String"}
        outputLabel="Result"
        extraControls={
          <div className="flex gap-1 p-1 rounded-lg bg-secondary w-fit">
            <Button
              size="sm"
              variant="ghost"
              className={cn("text-xs", mode === "toHuman" && "bg-background shadow-sm")}
              onClick={() => { setMode("toHuman"); setInput(""); setOutput(""); setError(""); }}
            >
              Unix → Date
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={cn("text-xs", mode === "toUnix" && "bg-background shadow-sm")}
              onClick={() => { setMode("toUnix"); setInput(""); setOutput(""); setError(""); }}
            >
              Date → Unix
            </Button>
          </div>
        }
      />
    </>
  );
};

export default TimestampConverter;
