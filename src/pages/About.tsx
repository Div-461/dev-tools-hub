import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { tools } from "@/types/tool.types";
import { Zap, Shield, Globe } from "lucide-react";

const About = () => (
  <>
    <Helmet>
      <title>About DevToolKitHub – Free Online Developer Tools</title>
      <meta name="description" content="DevToolKitHub provides free, fast, and private online developer tools. All processing happens in your browser — JSON viewer, Base64, SQL formatter, and more." />
      <link rel="canonical" href="https://code-helper-suite.lovable.app/about" />
    </Helmet>

    <div className="container max-w-3xl py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
        About <span className="text-gradient">DevToolKitHub</span>
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-10">
        DevToolKitHub is a collection of free, fast, and privacy-first developer tools built for everyday coding tasks. Every tool runs entirely in your browser — no data ever leaves your machine.
      </p>

      {/* Values */}
      <div className="grid gap-6 sm:grid-cols-3 mb-12">
        {[
          { icon: Zap, title: "Lightning Fast", desc: "Client-side processing means instant results with zero server latency." },
          { icon: Shield, title: "100% Private", desc: "Your data never leaves your browser. No uploads, no tracking of inputs." },
          { icon: Globe, title: "Free & Open", desc: "All tools are free to use with no registration, limits, or paywalls." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5">
            <div className="rounded-lg bg-primary/10 p-2 w-fit mb-3">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-semibold mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* Our Tools */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Our Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 tool-card-hover"
              >
                <div className="rounded-md bg-primary/10 p-1.5">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="space-y-4 text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
        <p>
          We built DevToolKitHub because developers deserve tools that respect their time and privacy. Too many online utilities require sign-ups, inject trackers, or send your data to unknown servers. We believe the best developer tools should be instant, private, and just work.
        </p>
        <p>
          Our tools are built with modern web technologies — React, TypeScript, and Web Workers — to ensure peak performance even with large inputs. Whether you're formatting a 10MB JSON file or comparing thousands of lines of text, everything happens in your browser tab.
        </p>
        <p>
          Have a suggestion or found a bug? We'd love to hear from you on our{" "}
          <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.
        </p>
      </section>
    </div>
  </>
);

export default About;
