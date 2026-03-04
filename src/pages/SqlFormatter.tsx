import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { formatSql, sqlSample, type SqlDialect } from "@/utils/sqlUtils";
import { useClipboard } from "@/hooks/useClipboard";
import ErrorMessage from "@/components/ErrorMessage";
import SqlToolbar from "@/components/sqlFormatter/SqlToolbar";
import SqlInput from "@/components/sqlFormatter/SqlInput";
import SqlOutput from "@/components/sqlFormatter/SqlOutput";
import { tools } from "@/types/tool.types";

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
        <title>SQL Formatter Online – Format Stored Procedures & Functions | DevTools</title>
        <meta
          name="description"
          content="Free online SQL formatter for stored procedures, functions, triggers, views and complex queries. Supports MySQL, PostgreSQL, SQL Server. Client-side only."
        />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/sql-formatter" />
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
            onSample={() => { setInput(sqlSample); setDialect("tsql"); }}
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
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Online SQL Formatter for Stored Procedures and Functions
          </h2>
          <p>
            Writing clean, readable SQL is critical for maintaining large codebases, debugging production issues, and collaborating across teams. This free SQL Formatter transforms messy, single-line queries and complex multi-statement scripts into properly indented, keyword-highlighted SQL that is easy to read, review, and maintain.
          </p>
          <p>
            Unlike many online formatters that only handle simple SELECT statements, this tool is built to format <strong>stored procedures</strong>, <strong>user-defined functions</strong>, <strong>triggers</strong>, <strong>views</strong>, and <strong>multi-statement scripts</strong> containing BEGIN/END blocks, IF/ELSE branching, variable declarations, and nested subqueries. Whether you are working with MySQL, PostgreSQL, SQL Server (T-SQL), or standard SQL, simply select your dialect from the dropdown and click Format.
          </p>

          <h2 className="text-lg font-semibold text-foreground">How It Works</h2>
          <p>
            Paste your raw SQL into the input area, choose your target dialect, and press the Format button. The formatter parses your entire script, applies consistent indentation, uppercases reserved keywords (SELECT, FROM, WHERE, JOIN, CREATE, ALTER, BEGIN, END, etc.), and aligns clauses for maximum readability. Comments — both inline (<code>--</code>) and block (<code>/* */</code>) — are preserved exactly as written. The formatted output appears instantly in the right panel, ready to copy or download.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Supported SQL Constructs</h2>
          <p>
            The formatter handles a wide range of SQL constructs beyond basic queries. <strong>Stored Procedures</strong> with CREATE PROCEDURE, parameters, BEGIN/END blocks, SET, IF/ELSE, and WHILE loops are formatted with proper nesting. <strong>Functions</strong> using CREATE FUNCTION with RETURNS, DECLARE, and local variables receive clean indentation. <strong>Triggers</strong> including AFTER/BEFORE INSERT/UPDATE/DELETE with INSERTED/DELETED references are structured clearly. <strong>Views</strong> with CREATE VIEW and complex joins are aligned for readability. Additionally, complex joins (INNER, LEFT, RIGHT, FULL OUTER, CROSS) with multi-condition ON clauses, nested subqueries, CTEs using WITH, and multi-statement scripts separated by semicolons are all supported.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Why Formatting SQL Matters</h2>
          <p>
            Unformatted SQL is a hidden source of bugs and miscommunication. A misplaced JOIN condition or an ambiguous WHERE clause nested inside a wall of text can cost hours of debugging. Properly formatted SQL makes logic flow visible at a glance, simplifies code reviews, and reduces the risk of errors in production deployments. For teams that store procedures and functions in version control, consistent formatting also produces cleaner diffs and more meaningful commit histories.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          <p>
            All formatting happens entirely in your browser. No SQL is transmitted to any server, stored in any database, or logged anywhere. This makes the tool safe for formatting queries that contain sensitive table names, column names, or business logic. Your data disappears the moment you close or refresh the page.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Can this formatter handle stored procedures?</summary>
              <p className="mt-1 pl-4">Yes. It fully supports CREATE PROCEDURE with parameters, BEGIN/END blocks, control flow, and variable declarations across all supported dialects.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Does it support SQL Server (T-SQL)?</summary>
              <p className="mt-1 pl-4">Yes. Select "SQL Server" from the dialect dropdown to get correct formatting for T-SQL constructs like SET NOCOUNT ON, DECLARE, and @variables.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Will it modify my comments?</summary>
              <p className="mt-1 pl-4">No. Both inline comments (<code>--</code>) and block comments (<code>/* */</code>) are preserved in their original positions.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Is my SQL data safe?</summary>
              <p className="mt-1 pl-4">Absolutely. Everything runs client-side in your browser. No data is ever sent to a server.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">What happens if my SQL has syntax errors?</summary>
              <p className="mt-1 pl-4">The formatter will attempt to format what it can. If the input is too malformed to parse, a clear error message is displayed and your original input is preserved.</p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">More Developer Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/sql-formatter")
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

export default SqlFormatter;
