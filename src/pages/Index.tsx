import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { tools } from "@/types/tool.types";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>DevTools - Free Online Developer Tools</title>
        <meta name="description" content="Free online developer tools: JSON to CSV, Base64 encoder, JWT decoder, SQL formatter, and more. Fast, private, client-side." />
      </Helmet>

      <div className="container max-w-6xl py-16 md:py-24">
        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Developer tools,{" "}
            <span className="text-gradient">instantly.</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Free, fast, and private. Every tool runs entirely in your browser — no data ever leaves your machine.
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 tool-card-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div>
                  <h2 className="font-semibold">{tool.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;
