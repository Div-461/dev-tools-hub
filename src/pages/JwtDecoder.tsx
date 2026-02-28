import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ToolLayout from "@/components/ToolLayout";
import { decodeJwt, jwtSample } from "@/utils/jwtUtils";

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
        <title>JWT Decoder - DevTools</title>
        <meta name="description" content="Decode and inspect JSON Web Tokens (JWT) online. View header, payload, and expiration. Free and private." />
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
      />
    </>
  );
};

export default JwtDecoder;
