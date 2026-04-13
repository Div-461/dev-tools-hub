import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeftRight, Trash2, Copy, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/useClipboard";
import { useDiff, type DiffMode } from "@/hooks/useDiff";
import DiffViewer from "@/components/textCompare/DiffViewer";
import FileTextInput from "@/components/textCompare/FileTextInput";
import ErrorMessage from "@/components/ErrorMessage";
import { tools } from "@/types/tool.types";

const SAMPLE_ORIGINAL = `function greet(name) {
  console.log("Hello, " + name);
  return true;
}

const users = ["Alice", "Bob"];
users.forEach(greet);`;

const SAMPLE_MODIFIED = `function greet(name, greeting = "Hi") {
  console.log(greeting + ", " + name + "!");
  return true;
}

const users = ["Alice", "Bob", "Charlie"];
users.forEach(user => greet(user));`;

const TextCompare = () => {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [mode, setMode] = useState<DiffMode>("line");
  const { compare, lines, stats, loading, clear: clearDiff } = useDiff();
  const { copy } = useClipboard();

  const handleCompare = useCallback(() => {
    if (!original && !modified) return;
    compare(original, modified, mode);
  }, [original, modified, mode, compare]);

  const handleSwap = useCallback(() => {
    setOriginal(modified);
    setModified(original);
  }, [original, modified]);

  const handleClear = useCallback(() => {
    setOriginal("");
    setModified("");
    clearDiff();
  }, [clearDiff]);

  const handleSample = useCallback(() => {
    setOriginal(SAMPLE_ORIGINAL);
    setModified(SAMPLE_MODIFIED);
    compare(SAMPLE_ORIGINAL, SAMPLE_MODIFIED, mode);
  }, [compare, mode]);

  const handleCopyResult = useCallback(() => {
    if (lines.length === 0) return;
    const text = lines
      .map((l) => {
        const prefix = l.type === "added" ? "+" : l.type === "removed" ? "-" : l.type === "modified" ? "~" : " ";
        return `${prefix} ${l.type === "removed" ? l.left : l.right}`;
      })
      .join("\n");
    copy(text);
  }, [lines, copy]);

  const handleDownload = useCallback(() => {
    if (lines.length === 0) return;
    const text = lines
      .map((l) => {
        const prefix = l.type === "added" ? "+" : l.type === "removed" ? "-" : l.type === "modified" ? "~" : " ";
        return `${prefix} ${l.type === "removed" ? l.left : l.right}`;
      })
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diff-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [lines]);

  return (
    <>
      <Helmet>
        <title>Text Compare Tool – Free Online Diff Checker | DevTools</title>
        <meta
          name="description"
          content="Compare two texts instantly with this free Text Compare tool. Highlight differences line-by-line and word-by-word. No data leaves your browser."
        />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/text-compare" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Text Compare Tool",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0" },
          "description": "Compare two texts instantly. Highlight differences line-by-line and word-by-word."
        })}</script>
      </Helmet>

      <div className="container max-w-6xl py-6 md:py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">Text Compare</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Compare two texts side-by-side with line-by-line and word-by-word diff highlighting.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Button onClick={handleCompare} className="gap-1.5" disabled={loading}>
            <Play className="h-3.5 w-3.5" /> Compare
          </Button>

          {/* Mode toggle */}
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              onClick={() => setMode("line")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${mode === "line" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
              aria-label="Line-by-line comparison"
            >
              Line
            </button>
            <button
              onClick={() => setMode("word")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${mode === "word" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
              aria-label="Word-by-word comparison"
            >
              Word
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={handleSwap} className="gap-1.5">
            <ArrowLeftRight className="h-3.5 w-3.5" /> Swap
          </Button>
          <Button variant="outline" size="sm" onClick={handleSample} className="gap-1.5">
            Sample
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear} className="gap-1.5">
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyResult} className="gap-1.5" disabled={lines.length === 0}>
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1.5" disabled={lines.length === 0}>
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
        </div>

        {/* File / Text inputs */}
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <FileTextInput
            label="Original Text"
            value={original}
            onChange={setOriginal}
            ariaLabel="Original text file input"
          />
          <FileTextInput
            label="Modified Text"
            value={modified}
            onChange={setModified}
            ariaLabel="Modified text file input"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="ml-3 text-sm text-muted-foreground">Comparing texts…</span>
          </div>
        )}

        {/* Stats */}
        {stats && !loading && (
          <div className="mb-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="text-green-500">+{stats.added} added</span>
            <span className="text-red-500">−{stats.removed} removed</span>
            <span className="text-amber-500">~{stats.modified} modified</span>
            <span>{stats.unchanged} unchanged</span>
            <span>Compared in {stats.timeMs}ms</span>
          </div>
        )}

        {/* Diff output */}
        {lines.length > 0 && !loading && (
          <div className="mb-8">
            <DiffViewer lines={lines} height={520} />
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Text Compare — Free Online Diff Checker for Developers
          </h2>
          <p>
            Comparing two versions of a file is one of the most common tasks in software development.
            Whether you're reviewing code changes, comparing configuration files, checking database
            migration scripts, or validating API response differences, a reliable diff checker saves
            hours of manual inspection. This Text Compare tool provides instant, browser-based
            text comparison with professional-grade diff highlighting.
          </p>

          <h3 className="text-base font-semibold text-foreground">How It Works</h3>
          <p>
            The tool uses the <strong>diff-match-patch</strong> algorithm — the same algorithm that
            powers Google Docs' collaborative editing. When you click Compare, your texts are sent
            to a dedicated <strong>Web Worker</strong> running in a separate browser thread. This
            ensures the UI stays responsive even when comparing files with 100,000+ characters.
          </p>
          <p>
            In <strong>line-by-line mode</strong>, the algorithm identifies entire lines that have
            been added, removed, or remain unchanged. In <strong>word-by-word mode</strong>, it
            goes deeper — comparing individual words within each line to show exactly what changed,
            highlighted inline with color-coded markers.
          </p>

          <h3 className="text-base font-semibold text-foreground">Common Use Cases</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Compare two versions of source code before committing</li>
            <li>Validate configuration file changes across environments</li>
            <li>Review SQL migration scripts for unexpected differences</li>
            <li>Compare API responses between staging and production</li>
            <li>Check document revisions for content changes</li>
            <li>Verify minified vs. unminified code differences</li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">Color Legend</h3>
          <ul className="list-none space-y-1 pl-0">
            <li><span className="inline-block w-3 h-3 rounded-sm bg-green-500/30 mr-2 align-middle" />
              <strong>Green</strong> — Added lines or words (present only in modified text)</li>
            <li><span className="inline-block w-3 h-3 rounded-sm bg-red-500/30 mr-2 align-middle" />
              <strong>Red</strong> — Removed lines or words (present only in original text)</li>
            <li><span className="inline-block w-3 h-3 rounded-sm bg-amber-500/30 mr-2 align-middle" />
              <strong>Yellow</strong> — Modified lines (changed content highlighted inline)</li>
          </ul>

          <h3 className="text-base font-semibold text-foreground">Privacy & Security</h3>
          <p>
            All text comparison runs entirely within your browser. No data is sent to any server,
            no text is logged or stored, and nothing persists after you close the page. This makes
            the tool safe for comparing sensitive code, credentials, and internal documents.
          </p>

          <h2 className="text-lg font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                How large of a text can I compare?
              </summary>
              <p className="mt-1 pl-4">
                The tool handles texts with 100,000+ characters. Comparison runs in a Web Worker
                to keep the interface responsive. Very large files (&gt;1MB) may take a few seconds.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                What's the difference between line and word mode?
              </summary>
              <p className="mt-1 pl-4">
                Line mode shows which entire lines were added, removed, or unchanged — similar to
                <code> git diff</code>. Word mode compares each corresponding line pair at the
                word/character level, highlighting the exact changes inline.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                Does my data leave my browser?
              </summary>
              <p className="mt-1 pl-4">
                No. All processing happens locally using a Web Worker. No text is transmitted to any
                server or third-party service.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I compare code files?
              </summary>
              <p className="mt-1 pl-4">
                Yes. The tool works with any plain text — source code, JSON, XML, SQL, Markdown,
                configuration files, and more. It uses a monospace font for accurate code alignment.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">
                Is this similar to GitHub's diff view?
              </summary>
              <p className="mt-1 pl-4">
                Yes. The side-by-side layout with line numbers and color-coded changes follows the
                same patterns used by GitHub, GitLab, and other code review tools.
              </p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">
            More Developer Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/text-compare")
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

export default TextCompare;
