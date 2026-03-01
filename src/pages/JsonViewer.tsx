import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useJsonWorker } from "@/hooks/useJsonWorker";
import { useClipboard } from "@/hooks/useClipboard";
import { generateSampleJson } from "@/utils/jsonFormatter";
import JsonInput from "@/components/jsonViewer/JsonInput";
import JsonToolbar from "@/components/jsonViewer/JsonToolbar";
import JsonVirtualizedViewer from "@/components/jsonViewer/JsonVirtualizedViewer";
import ErrorMessage from "@/components/ErrorMessage";
import { tools } from "@/types/tool.types";

const JsonViewer = () => {
  const [input, setInput] = useState("");
  const { parse, loading, error, result, clear: clearResult } = useJsonWorker();
  const { copy } = useClipboard();

  const handleFormat = useCallback(() => {
    parse(input);
  }, [input, parse]);

  const handleClear = useCallback(() => {
    setInput("");
    clearResult();
  }, [clearResult]);

  const handleSample = useCallback(() => {
    const sample = generateSampleJson();
    setInput(sample);
    parse(sample);
  }, [parse]);

  const handleCopy = useCallback(() => {
    if (result?.data) {
      copy(JSON.stringify(result.data, null, 2));
    }
  }, [result, copy]);

  const handleDownload = useCallback(() => {
    if (!result?.data) return;
    const blob = new Blob([JSON.stringify(result.data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  return (
    <>
      <Helmet>
        <title>Large JSON Viewer – Online JSON Formatter for Big Files | DevTools</title>
        <meta
          name="description"
          content="Free online JSON viewer optimized for large files up to 20MB+. Collapsible tree view, syntax highlighting, and Web Worker parsing. No data leaves your browser."
        />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/json-viewer" />
      </Helmet>

      <div className="container max-w-6xl py-6 md:py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">JSON Viewer</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View, format, and explore large JSON files with a high-performance virtualized tree view.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-4">
          <JsonToolbar
            onFormat={handleFormat}
            onClear={handleClear}
            onSample={handleSample}
            onCopy={handleCopy}
            onDownload={handleDownload}
            hasOutput={!!result}
            loading={loading}
          />
        </div>

        {/* Input */}
        <div className="mb-4">
          <JsonInput value={input} onChange={setInput} />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Stats */}
        {result?.stats && (
          <div className="mb-3 flex gap-4 text-xs text-muted-foreground">
            <span>
              Size: {(result.stats.sizeBytes / 1024).toFixed(1)} KB
            </span>
            <span>Parsed in {result.stats.parseTimeMs}ms</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="ml-3 text-sm text-muted-foreground">
              Parsing JSON in background…
            </span>
          </div>
        )}

        {/* Tree viewer */}
        {result?.data && !loading && (
          <div className="mb-8">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tree View
            </label>
            <JsonVirtualizedViewer data={result.data} height={520} />
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Large JSON Viewer — Online JSON Formatter for Big Files
          </h2>
          <p>
            Working with large JSON files can be a frustrating experience. Most online JSON viewers
            struggle with payloads beyond a few hundred kilobytes, freezing the browser or crashing
            altogether. This JSON Viewer is purpose-built for developers who routinely handle API
            responses, database exports, log files, and configuration dumps that range from 1MB to
            20MB and beyond.
          </p>
          <p>
            Unlike traditional formatters that render the entire document into the DOM, this tool
            uses <strong>virtualized rendering</strong> powered by react-window. Only the rows
            visible in your viewport are rendered at any given time, keeping memory consumption low
            and scroll performance smooth — even with files containing hundreds of thousands of
            lines.
          </p>

          <h2 className="text-lg font-semibold text-foreground">
            How It Works
          </h2>
          <p>
            When you paste or upload a JSON file, the raw text is sent to a dedicated
            <strong> Web Worker</strong> running in a separate thread. The worker validates and
            parses the JSON using native <code>JSON.parse</code>, then returns the structured data
            back to the main thread. This architecture ensures the user interface remains fully
            responsive during parsing — no frozen tabs, no unresponsive-page warnings.
          </p>
          <p>
            The parsed data is then converted into a flat list of renderable lines, each annotated
            with depth, type, and collapse state. The virtualized list component renders only the
            visible portion, and you can expand or collapse any object or array node with a single
            click. Syntax highlighting uses color-coded types: strings in green, numbers in blue,
            booleans in amber, and null values in red.
          </p>

          <h2 className="text-lg font-semibold text-foreground">
            Privacy & Security
          </h2>
          <p>
            Every operation runs entirely within your browser. No data is transmitted to any server,
            no input is logged, and nothing persists after you close or refresh the page. This makes
            the tool safe for use with sensitive payloads including authentication tokens, personal
            data, and internal API responses.
          </p>

          <h2 className="text-lg font-semibold text-foreground">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                How large of a JSON file can I view?
              </summary>
              <p className="mt-1 pl-4">
                The viewer comfortably handles files up to 20MB. Files above 50MB are rejected to
                prevent excessive memory usage. For files between 5MB and 50MB, we recommend using
                the file upload button instead of pasting for better performance.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                Does my data leave my computer?
              </summary>
              <p className="mt-1 pl-4">
                No. All processing happens locally in your browser using a Web Worker. No data is
                sent to any server or third-party service.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                Why is the tree collapsed by default?
              </summary>
              <p className="mt-1 pl-4">
                Collapsing deep nodes by default ensures fast initial rendering. You can expand any
                node by clicking the arrow icon. The root level is automatically expanded.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I search within the JSON?
              </summary>
              <p className="mt-1 pl-4">
                Search functionality is planned for a future release. Currently, you can use your
                browser's built-in Ctrl+F / Cmd+F to search the visible portion of the tree.
              </p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">
            More Developer Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/json-viewer")
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
      </div>
    </>
  );
};

export default JsonViewer;
