import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolLayout from "@/components/ToolLayout";
import { unixToHuman, dateToUnix, timestampSample, dateSample } from "@/utils/timestampUtils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tools } from "@/types/tool.types";

const TimestampConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"toHuman" | "toUnix">("toHuman");

  const convert = () => {
    try {
      setError("");
      setOutput(mode === "toHuman" ? unixToHuman(input) : dateToUnix(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Unix Timestamp Converter Online – Epoch to Date Free | DevTools</title>
        <meta name="description" content="Convert Unix timestamps to human-readable dates and dates to epoch time. Free online timestamp converter — runs entirely in your browser." />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/timestamp" />
      </Helmet>
      <ToolLayout
        title="Timestamp Converter"
        description="Convert between Unix timestamps and human-readable dates"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={mode === "toHuman" ? timestampSample : dateSample}
        actionLabel="Convert"
        inputLabel={mode === "toHuman" ? "Unix Timestamp" : "Date String"}
        outputLabel="Result"
        extraControls={
          <div className="flex gap-1 p-1 rounded-lg bg-secondary w-fit">
            <Button
              size="sm"
              variant="ghost"
              className={cn("text-xs", mode === "toHuman" && "bg-background shadow-sm")}
              onClick={() => { setMode("toHuman"); setInput(""); setOutput(""); setError(""); }}
            >
              Unix → Date
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={cn("text-xs", mode === "toUnix" && "bg-background shadow-sm")}
              onClick={() => { setMode("toUnix"); setInput(""); setOutput(""); setError(""); }}
            >
              Date → Unix
            </Button>
          </div>
        }
      >
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Online Unix Timestamp Converter — Epoch Time to Date and Back
          </h2>
          <p>
            Unix timestamps (also called epoch time or POSIX time) represent the number of seconds elapsed since January 1, 1970 00:00:00 UTC. They are used extensively in databases, log files, APIs, and system internals because they are timezone-independent and easy to compare mathematically. This free converter lets you instantly translate between Unix timestamps and human-readable date formats.
          </p>
          <p>
            Whether you are debugging timestamps in server logs, converting API response dates for display, calculating time differences between events, or setting expiration times for caches and tokens, this tool provides instant bidirectional conversion between epoch time and readable dates.
          </p>

          <h2 className="text-lg font-semibold text-foreground">How Timestamp Conversion Works</h2>
          <p>
            In Unix → Date mode, enter a numeric timestamp (seconds since epoch) and the tool converts it to a formatted date string showing the full date, time, and timezone. In Date → Unix mode, enter a human-readable date string and the tool returns the corresponding Unix timestamp. The tool handles both seconds and milliseconds precision and supports standard date formats including ISO 8601.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Common Use Cases</h2>
          <p>
            Developers encounter Unix timestamps when reading database records that store dates as integers, parsing server logs with epoch timestamps, debugging JWT token expiration (the <code>exp</code> claim is a Unix timestamp), setting TTL values for caching systems like Redis, and working with cron jobs and scheduled tasks that reference epoch time.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          <p>
            All conversions run entirely in your browser using JavaScript's built-in Date object. No data is transmitted to any server. This makes the tool safe for converting timestamps from production logs and sensitive systems.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">What is the Unix epoch?</summary>
              <p className="mt-1 pl-4">The Unix epoch is January 1, 1970, 00:00:00 UTC. All Unix timestamps are measured as the number of seconds (or milliseconds) elapsed since this reference point.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Does this tool handle millisecond timestamps?</summary>
              <p className="mt-1 pl-4">Yes. If you enter a 13-digit number, the tool recognizes it as milliseconds. Standard 10-digit timestamps are treated as seconds.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">What timezone does the output use?</summary>
              <p className="mt-1 pl-4">The output displays the date in your browser's local timezone along with the UTC equivalent, so you can see both representations.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">What is the Year 2038 problem?</summary>
              <p className="mt-1 pl-4">Systems using 32-bit signed integers to store Unix timestamps will overflow on January 19, 2038. Modern 64-bit systems are not affected. This tool uses JavaScript's 64-bit floating point numbers and works correctly for dates well beyond 2038.</p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">More Developer Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/timestamp")
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

export default TimestampConverter;
