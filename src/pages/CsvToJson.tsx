import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolLayout from "@/components/ToolLayout";
import { csvToJson, csvToJsonSample } from "@/utils/csvUtils";

const CsvToJson = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      setOutput(csvToJson(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>CSV to JSON Converter - DevTools</title>
        <meta name="description" content="Convert CSV data to JSON format online. Free, fast, and private — runs entirely in your browser." />
      </Helmet>
      <ToolLayout
        title="CSV to JSON Converter"
        description="Parse CSV data into structured JSON arrays"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={csvToJsonSample}
        inputLabel="CSV"
        outputLabel="JSON"
      />
    </>
  );
};

export default CsvToJson;
