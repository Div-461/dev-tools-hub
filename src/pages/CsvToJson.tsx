import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolLayout from "@/components/ToolLayout";
import { csvToJson, csvToJsonSample } from "@/utils/csvUtils";
import { tools } from "@/types/tool.types";

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
        <title>CSV to JSON Converter Online – Free Data Conversion Tool | DevTools</title>
        <meta name="description" content="Convert CSV data to JSON format online for free. Parse comma-separated values into structured JSON arrays. Client-side only — your data stays private." />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/csv-to-json" />
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
      >
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Online CSV to JSON Converter — Parse CSV Data Instantly
          </h2>
          <p>
            CSV (Comma-Separated Values) is one of the most common data exchange formats, used extensively in spreadsheets, databases, and data pipelines. However, modern APIs and web applications predominantly work with JSON. This free CSV to JSON converter bridges the gap by transforming tabular CSV data into structured JSON arrays of objects, ready to use in your applications.
          </p>
          <p>
            The converter uses the first row of your CSV as object keys, then maps each subsequent row into a JSON object. This approach produces clean, readable output that can be directly consumed by JavaScript applications, REST APIs, NoSQL databases like MongoDB, and data processing pipelines.
          </p>

          <h2 className="text-lg font-semibold text-foreground">How the Conversion Works</h2>
          <p>
            Paste your CSV data into the input area and click Convert. The parser reads the header row to determine field names, then iterates through each data row, creating a JSON object with keys matching the headers. The tool handles quoted fields, commas within quoted strings, and various line endings (CRLF, LF). The resulting JSON is formatted with proper indentation for readability.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Common Use Cases</h2>
          <p>
            Developers and data engineers use CSV to JSON conversion when importing spreadsheet exports into web applications, preparing data for API endpoints that accept JSON, migrating data from relational databases to document stores, transforming log files and reports into structured formats, and building data visualization dashboards from tabular data sources.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          <p>
            All conversion happens entirely in your browser. No CSV data is uploaded to any server or stored anywhere. Your data disappears completely when you close or refresh the page, making this tool safe for sensitive datasets including financial records, customer data, and internal reports.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">What CSV format does this tool accept?</summary>
              <p className="mt-1 pl-4">The tool accepts standard CSV with comma delimiters. The first row must contain column headers. Fields containing commas should be wrapped in double quotes.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Can it handle large CSV files?</summary>
              <p className="mt-1 pl-4">The converter works well with CSV files up to several megabytes. For very large files, performance depends on your browser's available memory. Processing happens entirely client-side.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Does it preserve data types?</summary>
              <p className="mt-1 pl-4">CSV is inherently text-based, so all values are output as strings in the JSON. You can post-process the JSON to convert numeric and boolean fields as needed in your application code.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Can I convert JSON back to CSV?</summary>
              <p className="mt-1 pl-4">Yes! Use our <Link to="/json-to-csv" className="text-primary hover:underline">JSON to CSV Converter</Link> to transform JSON arrays back into CSV format.</p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">More Developer Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/csv-to-json")
              .map((t) => (
                <Link
                  key={t.path}
                  to={t.path}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {t.name}
                </Link>
              ))}
          </div>
        </section>
      </ToolLayout>
    </>
  );
};

export default CsvToJson;
