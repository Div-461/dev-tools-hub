import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolLayout from "@/components/ToolLayout";
import { encodeBase64, decodeBase64, base64Sample } from "@/utils/base64Utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tools } from "@/types/tool.types";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convert = () => {
    try {
      setError("");
      setOutput(mode === "encode" ? encodeBase64(input) : decodeBase64(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Operation failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Base64 Encoder / Decoder Online – Free Developer Tool | DevTools</title>
        <meta name="description" content="Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 strings instantly. Runs entirely in your browser — no data sent to any server." />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/base64" />
      </Helmet>
      <ToolLayout
        title="Base64 Encoder / Decoder"
        description="Encode text to Base64 or decode Base64 to text"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={mode === "encode" ? base64Sample : encodeBase64(base64Sample)}
        actionLabel={mode === "encode" ? "Encode" : "Decode"}
        inputLabel={mode === "encode" ? "Plain Text" : "Base64 String"}
        outputLabel={mode === "encode" ? "Base64 String" : "Plain Text"}
        extraControls={
          <div className="flex gap-1 p-1 rounded-lg bg-secondary w-fit">
            {(["encode", "decode"] as const).map((m) => (
              <Button
                key={m}
                size="sm"
                variant="ghost"
                className={cn("capitalize text-xs", mode === m && "bg-background shadow-sm")}
                onClick={() => { setMode(m); setInput(""); setOutput(""); setError(""); }}
              >
                {m}
              </Button>
            ))}
          </div>
        }
      >
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Online Base64 Encoder and Decoder — Free Developer Tool
          </h2>
          <p>
            Base64 encoding is one of the most widely used encoding schemes in software development. It converts binary data into a text format using 64 printable ASCII characters, making it safe to transmit through text-based protocols like HTTP, SMTP, and JSON. This free Base64 encoder and decoder lets you convert strings instantly without any server-side processing.
          </p>
          <p>
            Whether you need to encode authentication credentials for HTTP Basic Auth headers, embed small images as data URIs in HTML or CSS, encode API keys for safe transmission, or decode Base64 strings received from APIs and webhooks, this tool handles it all with a single click.
          </p>

          <h2 className="text-lg font-semibold text-foreground">How Base64 Encoding Works</h2>
          <p>
            Base64 encoding takes every three bytes of input data and converts them into four Base64 characters. The character set includes uppercase letters (A–Z), lowercase letters (a–z), digits (0–9), plus (+), and slash (/). Padding with equals signs (=) is added when the input length is not a multiple of three. The result is a string that is roughly 33% larger than the original but is guaranteed to contain only printable characters.
          </p>
          <p>
            This tool uses the browser's built-in <code>btoa()</code> and <code>atob()</code> functions for encoding and decoding, with proper handling of Unicode characters through UTF-8 encoding. All processing happens client-side in your browser — no data is ever transmitted to a server.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Common Use Cases</h2>
          <p>
            Developers frequently use Base64 encoding for embedding images in HTML and CSS as data URIs, encoding credentials in Authorization headers, transmitting binary data in JSON payloads, encoding email attachments in MIME format, and storing small binary objects in text-based configuration files. This tool supports all of these workflows with instant encode and decode operations.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          <p>
            All encoding and decoding operations run entirely in your browser. No data is sent to any server, logged, or stored. Your input is discarded the moment you close or refresh the page. This makes the tool safe for encoding sensitive data such as API keys, passwords, and authentication tokens.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Is Base64 encryption?</summary>
              <p className="mt-1 pl-4">No. Base64 is an encoding scheme, not encryption. It does not provide any security — anyone can decode a Base64 string. For securing data, use proper encryption algorithms like AES or RSA.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Why is my Base64 output longer than my input?</summary>
              <p className="mt-1 pl-4">Base64 encoding increases data size by approximately 33%. Every 3 bytes of input become 4 Base64 characters, plus potential padding.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Does this tool support Unicode and special characters?</summary>
              <p className="mt-1 pl-4">Yes. The tool handles Unicode text by encoding through UTF-8 first, ensuring characters from any language are properly converted to and from Base64.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Can I encode files with this tool?</summary>
              <p className="mt-1 pl-4">Currently this tool encodes and decodes text strings. For file encoding, you can copy the file's text content into the input area. Binary file encoding is planned for a future release.</p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">More Developer Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/base64")
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

export default Base64Tool;
