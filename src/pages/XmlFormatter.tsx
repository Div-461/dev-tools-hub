import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolLayout from "@/components/ToolLayout";
import { formatXml, xmlSample } from "@/utils/xmlUtils";

const XmlFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      setOutput(formatXml(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Formatting failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>XML Formatter - DevTools</title>
        <meta name="description" content="Pretty-print and validate XML documents online. Free, fast, and private." />
      </Helmet>
      <ToolLayout
        title="XML Formatter"
        description="Pretty-print and validate XML documents"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={xmlSample}
        actionLabel="Format"
        inputLabel="Raw XML"
        outputLabel="Formatted XML"
      />
    </>
  );
};

export default XmlFormatter;
