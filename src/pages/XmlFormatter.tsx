import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolLayout from "@/components/ToolLayout";
import { formatXml, xmlSample } from "@/utils/xmlUtils";
import { tools } from "@/types/tool.types";

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
        <title>XML Formatter & Validator Online – Pretty Print XML Free | DevTools</title>
        <meta name="description" content="Pretty-print and validate XML documents online for free. Format minified XML with proper indentation. Runs entirely in your browser — no data leaves your machine." />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/xml-formatter" />
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
      >
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Online XML Formatter & Validator — Pretty Print XML Documents
          </h2>
          <p>
            XML (Extensible Markup Language) remains a critical data format in enterprise systems, SOAP web services, configuration files, RSS feeds, and data interchange between legacy systems. Minified or poorly formatted XML can be nearly impossible to read and debug. This free XML formatter transforms compressed, single-line XML into beautifully indented, human-readable output with proper nesting visualization.
          </p>
          <p>
            Whether you are debugging SOAP API responses, inspecting Maven or Gradle build files, reading Spring configuration files, parsing RSS or Atom feeds, or working with SVG graphics, this tool instantly reformats your XML with consistent indentation and proper element alignment.
          </p>

          <h2 className="text-lg font-semibold text-foreground">How XML Formatting Works</h2>
          <p>
            Paste your raw or minified XML into the input area and click Format. The tool parses the XML using the browser's built-in DOMParser, validates the document structure, and then serializes it back with consistent indentation. Each nested element is indented by two spaces, attributes are preserved in their original order, and self-closing tags are maintained. If the XML contains syntax errors, a clear error message is displayed.
          </p>

          <h2 className="text-lg font-semibold text-foreground">XML Validation</h2>
          <p>
            In addition to formatting, the tool validates your XML for well-formedness. Common errors it detects include mismatched opening and closing tags, missing required closing tags, invalid character sequences, improperly nested elements, and malformed attribute values. When an error is found, the tool displays a descriptive error message to help you locate and fix the issue quickly.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Common Use Cases</h2>
          <p>
            Developers use XML formatting when debugging SOAP and REST API responses that return XML, reading and editing configuration files (web.xml, pom.xml, .csproj), inspecting SVG files and understanding their structure, working with data feeds in RSS, Atom, or OPML formats, and reviewing XML-based data exports from enterprise applications.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          <p>
            All XML parsing and formatting runs entirely in your browser using the native DOMParser API. No XML data is uploaded to any server, stored, or logged. This makes the tool safe for formatting sensitive configuration files, API responses containing business data, and internal system exports.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Does this tool validate XML against a schema (XSD)?</summary>
              <p className="mt-1 pl-4">Currently the tool checks for well-formedness (proper nesting and syntax). Full XSD schema validation is planned for a future release.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Can it handle large XML files?</summary>
              <p className="mt-1 pl-4">Yes. The formatter works well with XML documents up to several megabytes. Very large files may take a moment to parse depending on your browser's performance.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Does it preserve XML comments?</summary>
              <p className="mt-1 pl-4">Yes. XML comments are preserved in their original positions during formatting.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Can I minify XML with this tool?</summary>
              <p className="mt-1 pl-4">This tool is focused on pretty-printing. An XML minifier to remove whitespace and compress documents is planned for a future update.</p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">More Developer Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/xml-formatter")
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

export default XmlFormatter;
