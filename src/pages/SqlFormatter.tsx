import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolLayout from "@/components/ToolLayout";
import { formatSql, sqlSample } from "@/utils/sqlUtils";

const SqlFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      setOutput(formatSql(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Formatting failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>SQL Formatter - DevTools</title>
        <meta name="description" content="Format and beautify SQL queries online with proper indentation and keyword casing. Free and private." />
      </Helmet>
      <ToolLayout
        title="SQL Formatter"
        description="Format SQL queries with proper indentation and keyword casing"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={sqlSample}
        actionLabel="Format"
        inputLabel="Raw SQL"
        outputLabel="Formatted SQL"
      />
    </>
  );
};

export default SqlFormatter;
