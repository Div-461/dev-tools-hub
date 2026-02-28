import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolLayout from "@/components/ToolLayout";
import { jsonToCsv, jsonToCsvSample } from "@/utils/jsonUtils";

const JsonToCsv = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      setOutput(jsonToCsv(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>JSON to CSV Converter - DevTools</title>
        <meta name="description" content="Convert JSON arrays to CSV format online. Free, fast, and private — runs entirely in your browser." />
      </Helmet>
      <ToolLayout
        title="JSON to CSV Converter"
        description="Convert JSON arrays of objects into CSV format"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={jsonToCsvSample}
        inputLabel="JSON"
        outputLabel="CSV"
      />
    </>
  );
};

export default JsonToCsv;
