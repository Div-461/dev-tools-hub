import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { formatSql, sqlSample, type SqlDialect } from "@/utils/sqlUtils";
import { useClipboard } from "@/hooks/useClipboard";
import ErrorMessage from "@/components/ErrorMessage";
import SqlToolbar from "@/components/sqlFormatter/SqlToolbar";
import SqlInput from "@/components/sqlFormatter/SqlInput";
import SqlOutput from "@/components/sqlFormatter/SqlOutput";

const SqlFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [dialect, setDialect] = useState<SqlDialect>("sql");
  const { copy } = useClipboard();

  const handleFormat = useCallback(() => {
    try {
      setError("");
      setOutput(formatSql(input, dialect));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Formatting failed");
      setOutput("");
    }
  }, [input, dialect]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-query.sql";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <>
      <Helmet>
        <title>SQL Formatter Online – Format Stored Procedures & Functions</title>
        <meta
          name="description"
          content="Free online SQL formatter for stored procedures, functions, triggers, views and complex queries. Supports MySQL, PostgreSQL, SQL Server. Client-side only."
        />
      </Helmet>

      <div className="container max-w-6xl py-6 md:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">SQL Formatter</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Format SQL queries, stored procedures, functions, triggers and views with proper indentation and keyword casing.
          </p>
        </div>

        <div className="mb-3">
          <SqlToolbar
            dialect={dialect}
            onDialectChange={setDialect}
            onFormat={handleFormat}
            onSample={() => setInput(sqlSample)}
            onClear={handleClear}
            onCopy={() => copy(output)}
            onDownload={handleDownload}
            hasOutput={!!output}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <SqlInput value={input} onChange={setInput} />
          <SqlOutput value={output} />
        </div>

        {error && (
          <div className="mt-3">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* SEO content */}
        <section className="prose prose-sm dark:prose-invert mt-12 max-w-none">
          <h2>Online SQL Formatter for Stored Procedures and Functions</h2>
          <p>
            Writing clean, readable SQL is critical for maintaining large codebases, debugging production issues, and collaborating across teams. This free SQL Formatter transforms messy, single-line queries and complex multi-statement scripts into properly indented, keyword-highlighted SQL that is easy to read, review, and maintain.
          </p>
          <p>
            Unlike many online formatters that only handle simple SELECT statements, this tool is built to format <strong>stored procedures</strong>, <strong>user-defined functions</strong>, <strong>triggers</strong>, <strong>views</strong>, and <strong>multi-statement scripts</strong> containing BEGIN/END blocks, IF/ELSE branching, variable declarations, and nested subqueries. Whether you are working with MySQL, PostgreSQL, SQL Server (T-SQL), or standard SQL, simply select your dialect from the dropdown and click Format.
          </p>

          <h3>How It Works</h3>
          <p>
            Paste your raw SQL into the input area, choose your target dialect, and press the Format button. The formatter parses your entire script, applies consistent indentation, uppercases reserved keywords (SELECT, FROM, WHERE, JOIN, CREATE, ALTER, BEGIN, END, etc.), and aligns clauses for maximum readability. Comments — both inline (<code>--</code>) and block (<code>/* */</code>) — are preserved exactly as written. The formatted output appears instantly in the right panel, ready to copy or download.
          </p>

          <h3>Supported SQL Constructs</h3>
          <ul>
            <li><strong>Stored Procedures</strong> — CREATE PROCEDURE with parameters, BEGIN/END, SET, IF/ELSE, WHILE loops</li>
            <li><strong>Functions</strong> — CREATE FUNCTION with RETURNS, DECLARE, local variables</li>
            <li><strong>Triggers</strong> — AFTER/BEFORE INSERT/UPDATE/DELETE with INSERTED/DELETED references</li>
            <li><strong>Views</strong> — CREATE VIEW with complex joins and subqueries</li>
            <li><strong>Complex Joins</strong> — INNER, LEFT, RIGHT, FULL OUTER, CROSS joins with multi-condition ON clauses</li>
            <li><strong>Nested Queries</strong> — Correlated subqueries, CTEs (WITH), EXISTS, IN subqueries</li>
            <li><strong>Multi-statement Scripts</strong> — Multiple statements separated by semicolons</li>
          </ul>

          <h3>Why Formatting SQL Matters</h3>
          <p>
            Unformatted SQL is a hidden source of bugs and miscommunication. A misplaced JOIN condition or an ambiguous WHERE clause nested inside a wall of text can cost hours of debugging. Properly formatted SQL makes logic flow visible at a glance, simplifies code reviews, and reduces the risk of errors in production deployments. For teams that store procedures and functions in version control, consistent formatting also produces cleaner diffs and more meaningful commit histories.
          </p>

          <h3>Privacy and Security</h3>
          <p>
            All formatting happens entirely in your browser. No SQL is transmitted to any server, stored in any database, or logged anywhere. This makes the tool safe for formatting queries that contain sensitive table names, column names, or business logic. Your data disappears the moment you close or refresh the page.
          </p>

          <h3>Frequently Asked Questions</h3>
          <h4>Can this formatter handle stored procedures?</h4>
          <p>Yes. It fully supports CREATE PROCEDURE with parameters, BEGIN/END blocks, control flow, and variable declarations across all supported dialects.</p>

          <h4>Does it support SQL Server (T-SQL)?</h4>
          <p>Yes. Select "SQL Server" from the dialect dropdown to get correct formatting for T-SQL constructs like SET NOCOUNT ON, DECLARE, and @variables.</p>

          <h4>Will it modify my comments?</h4>
          <p>No. Both inline comments (<code>--</code>) and block comments (<code>/* */</code>) are preserved in their original positions.</p>

          <h4>Is my SQL data safe?</h4>
          <p>Absolutely. Everything runs client-side in your browser. No data is ever sent to a server.</p>

          <h4>What happens if my SQL has syntax errors?</h4>
          <p>The formatter will attempt to format what it can. If the input is too malformed to parse, a clear error message is displayed and your original input is preserved.</p>

          <h3>More Developer Tools</h3>
          <p>
            Explore our other free developer utilities:{" "}
            <Link to="/json-viewer" className="text-primary hover:underline">JSON Viewer</Link>,{" "}
            <Link to="/json-to-csv" className="text-primary hover:underline">JSON to CSV</Link>,{" "}
            <Link to="/csv-to-json" className="text-primary hover:underline">CSV to JSON</Link>,{" "}
            <Link to="/xml-formatter" className="text-primary hover:underline">XML Formatter</Link>,{" "}
            <Link to="/base64" className="text-primary hover:underline">Base64 Encoder/Decoder</Link>,{" "}
            <Link to="/timestamp" className="text-primary hover:underline">Timestamp Converter</Link>, and{" "}
            <Link to="/jwt-decoder" className="text-primary hover:underline">JWT Decoder</Link>.
          </p>
        </section>
      </div>
    </>
  );
};

export default SqlFormatter;
