import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolLayout from "@/components/ToolLayout";
import { encodeBase64, decodeBase64, base64Sample } from "@/utils/base64Utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convert = () => {
    try {
      setError("");
      setOutput(mode === "encode" ? encodeBase64(input) : decodeBase64(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Operation failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Base64 Encoder / Decoder - DevTools</title>
        <meta name="description" content="Encode and decode Base64 strings online. Free, fast, and private." />
      </Helmet>
      <ToolLayout
        title="Base64 Encoder / Decoder"
        description="Encode text to Base64 or decode Base64 to text"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={base64Sample}
        actionLabel={mode === "encode" ? "Encode" : "Decode"}
        inputLabel={mode === "encode" ? "Plain Text" : "Base64 String"}
        outputLabel={mode === "encode" ? "Base64 String" : "Plain Text"}
        extraControls={
          <div className="flex gap-1 p-1 rounded-lg bg-secondary w-fit">
            {(["encode", "decode"] as const).map((m) => (
              <Button
                key={m}
                size="sm"
                variant="ghost"
                className={cn("capitalize text-xs", mode === m && "bg-background shadow-sm")}
                onClick={() => { setMode(m); setInput(""); setOutput(""); setError(""); }}
              >
                {m}
              </Button>
            ))}
          </div>
        }
      />
    </>
  );
};

export default Base64Tool;
