import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolLayout from "@/components/ToolLayout";
import { decodeJwt, jwtSample } from "@/utils/jwtUtils";
import { tools } from "@/types/tool.types";

const JwtDecoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      setOutput(decodeJwt(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed");
      setOutput("");
    }
  };

  return (
    <>
      <Helmet>
        <title>JWT Decoder Online – Decode JSON Web Tokens Free | DevTools</title>
        <meta name="description" content="Decode and inspect JSON Web Tokens (JWT) online for free. View header, payload, claims, and expiration. No data sent to any server — fully client-side." />
        <link rel="canonical" href="https://code-helper-suite.lovable.app/jwt-decoder" />
      </Helmet>
      <ToolLayout
        title="JWT Decoder"
        description="Decode and inspect JSON Web Tokens — header, payload, and expiration"
        input={input}
        output={output}
        error={error}
        onInputChange={setInput}
        onConvert={convert}
        onClear={() => { setInput(""); setOutput(""); setError(""); }}
        sampleInput={jwtSample}
        actionLabel="Decode"
        inputLabel="JWT Token"
        outputLabel="Decoded Token"
      >
        <section className="mt-12 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Online JWT Decoder — Inspect JSON Web Tokens Instantly
          </h2>
          <p>
            JSON Web Tokens (JWT) are the industry standard for stateless authentication and authorization across web applications and APIs. A JWT consists of three Base64URL-encoded parts separated by dots: the header, the payload, and the signature. This free JWT decoder lets you instantly inspect any JWT to view its algorithm, claims, expiration time, and custom data — all without sending the token to any server.
          </p>
          <p>
            Whether you are debugging authentication issues, verifying token claims during API development, inspecting OAuth2 access tokens and ID tokens, or checking token expiration before making API calls, this tool provides instant visibility into your JWT's contents.
          </p>

          <h2 className="text-lg font-semibold text-foreground">How JWT Decoding Works</h2>
          <p>
            A JWT token is split at the dot (.) separators. The first part is the header, which contains the signing algorithm (HS256, RS256, etc.) and token type. The second part is the payload, containing the claims — standard claims like <code>iss</code> (issuer), <code>sub</code> (subject), <code>exp</code> (expiration), <code>iat</code> (issued at), plus any custom claims your application includes. Each part is Base64URL-decoded and displayed as formatted JSON.
          </p>
          <p>
            <strong>Important:</strong> This tool decodes JWTs for inspection purposes only. It does not verify signatures. Never make security decisions based solely on decoded token contents — always verify signatures on your server.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Understanding JWT Claims</h2>
          <p>
            Standard JWT claims include <code>iss</code> (token issuer), <code>sub</code> (subject identifier), <code>aud</code> (intended audience), <code>exp</code> (expiration timestamp), <code>nbf</code> (not valid before), <code>iat</code> (issued at), and <code>jti</code> (unique token ID). Custom claims can include user roles, permissions, email addresses, and any application-specific data. This decoder displays all claims in a structured, readable format.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          <p>
            JWT tokens often contain sensitive information including user IDs, email addresses, and permissions. This decoder runs entirely in your browser — no tokens are transmitted to any server, logged, or stored. Your token data is discarded the moment you close or refresh the page.
          </p>

          <h2 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Does this tool verify JWT signatures?</summary>
              <p className="mt-1 pl-4">No. This tool is a decoder only — it extracts and displays the header and payload. Signature verification requires the signing key and should be done server-side.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">Is it safe to paste my JWT here?</summary>
              <p className="mt-1 pl-4">Yes. All decoding happens locally in your browser. No data is sent to any server. However, avoid sharing JWTs in public forums or screenshots as they may contain sensitive claims.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">What JWT algorithms are supported?</summary>
              <p className="mt-1 pl-4">The decoder can read JWTs signed with any algorithm (HS256, HS384, HS512, RS256, RS384, RS512, ES256, PS256, etc.) since decoding does not require signature verification.</p>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium text-foreground">How can I check if my JWT has expired?</summary>
              <p className="mt-1 pl-4">Decode the token and look for the <code>exp</code> claim in the payload. This is a Unix timestamp representing the expiration time. Compare it with the current time to determine validity.</p>
            </details>
          </div>

          <h2 className="text-lg font-semibold text-foreground">More Developer Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools
              .filter((t) => t.path !== "/jwt-decoder")
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

export default JwtDecoder;
