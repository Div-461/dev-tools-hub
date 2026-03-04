import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolLayout from "@/components/ToolLayout";
import { jsonToCsv, jsonToCsvSample } from "@/utils/jsonUtils";
import { tools } from "@/types/tool.types";

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
        <title>JSON to CSV Converter Online – Free Data Export Tool | DevTools</title>
        <meta name="description" content="Convert JSON arrays to CSV format online for free. Export structured JSON data to comma-separated values for spreadsheets. Runs entirely in your browser." />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/json-to-csv" />
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
      >
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Online JSON to CSV Converter — Export JSON Data to Spreadsheets
          </h2>
          <p>
            JSON is the standard data format for web APIs and modern applications, but many business workflows still rely on spreadsheets and CSV files for reporting, analysis, and data sharing. This free JSON to CSV converter transforms JSON arrays of objects into clean, properly formatted CSV that can be opened directly in Excel, Google Sheets, or any spreadsheet application.
          </p>
          <p>
            The converter automatically extracts all unique keys from your JSON objects to create CSV column headers, then maps each object's values into corresponding rows. This makes it ideal for exporting API responses, database query results, and application data into a format that non-technical stakeholders can easily work with.
          </p>

          <h2 className="text-lg font-semibold text-foreground">How the Conversion Works</h2>
          <p>
            Paste a JSON array of objects into the input area and click Convert. The tool parses the JSON, collects all unique keys across all objects to build the header row, then iterates through each object to produce CSV rows. Values containing commas, quotes, or newlines are automatically escaped following RFC 4180 standards. The output is formatted and ready for download.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Common Use Cases</h2>
          <p>
            Developers and analysts use JSON to CSV conversion when exporting REST API responses for analysis in Excel or Google Sheets, generating reports from application data stored in JSON format, preparing datasets for import into legacy systems that only accept CSV, sharing data with team members who prefer spreadsheet workflows, and creating data exports for business intelligence tools.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          <p>
            The entire conversion process runs in your browser. No JSON data is transmitted to any server, stored, or logged. This makes the tool safe for converting sensitive data including customer records, financial data, and proprietary business information.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">What JSON format does this tool accept?</summary>
              <p className="mt-1 pl-4">The tool accepts JSON arrays of objects, e.g., <code>[{`{"name":"Alice","age":30}`}, ...]</code>. Each object becomes a CSV row, and all unique keys become column headers.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">How does it handle nested JSON objects?</summary>
              <p className="mt-1 pl-4">Nested objects and arrays are serialized as JSON strings in the CSV cells. For deeply nested data, consider flattening the JSON before converting.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Can I open the output directly in Excel?</summary>
              <p className="mt-1 pl-4">Yes. Click the Download button to save the CSV file, then open it in Excel, Google Sheets, LibreOffice Calc, or any spreadsheet application.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Can I convert CSV back to JSON?</summary>
              <p className="mt-1 pl-4">Absolutely! Use our <Link to="/csv-to-json" className="text-primary hover:underline">CSV to JSON Converter</Link> to parse CSV data back into structured JSON arrays.</p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">More Developer Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/json-to-csv")
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

export default JsonToCsv;
