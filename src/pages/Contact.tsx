import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Mail, MessageSquare, Bug } from "lucide-react";

const Contact = () => (
  <>
    <Helmet>
      <title>Contact Us – DevToolKitHub</title>
      <meta name="description" content="Get in touch with the DevToolKitHub team. Report bugs, suggest features, or ask questions about our free online developer tools." />
      <link rel="canonical" href="https://code-helper-suite.lovable.app/contact" />
    </Helmet>

    <div className="container max-w-3xl py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-10">
        Have a question, feature request, or bug report? We'd love to hear from you. Choose the best way to reach us below.
      </p>

      <div className="grid gap-6 sm:grid-cols-3 mb-12">
        {[
          { icon: Mail, title: "General Inquiry", desc: "Questions about DevToolKitHub or partnership opportunities.", email: "hello@devtoolkithub.com" },
          { icon: MessageSquare, title: "Feature Request", desc: "Suggest a new tool or improvement to an existing one.", email: "features@devtoolkithub.com" },
          { icon: Bug, title: "Bug Report", desc: "Found something broken? Let us know and we'll fix it.", email: "bugs@devtoolkithub.com" },
        ].map(({ icon: Icon, title, desc, email }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5 text-center">
            <div className="rounded-lg bg-primary/10 p-2 w-fit mx-auto mb-3">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-semibold mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground mb-3">{desc}</p>
            <a href={`mailto:${email}`} className="text-sm text-primary hover:underline break-all">
              {email}
            </a>
          </div>
        ))}
      </div>

      <section className="space-y-4 text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
        <details className="group rounded-lg border border-border bg-card p-4">
          <summary className="cursor-pointer font-medium text-foreground">Is my data safe when using your tools?</summary>
          <p className="mt-2 text-sm">Yes. All processing happens entirely in your browser. No data is ever sent to our servers. Your code, JSON, SQL, and other inputs remain on your device.</p>
        </details>
        <details className="group rounded-lg border border-border bg-card p-4">
          <summary className="cursor-pointer font-medium text-foreground">Are the tools really free?</summary>
          <p className="mt-2 text-sm">Absolutely. All tools on DevToolKitHub are free to use with no registration, rate limits, or hidden paywalls.</p>
        </details>
        <details className="group rounded-lg border border-border bg-card p-4">
          <summary className="cursor-pointer font-medium text-foreground">How can I suggest a new tool?</summary>
          <p className="mt-2 text-sm">
            Send us an email at features@devtoolkithub.com with your idea. We prioritize tools that solve common developer pain points.
          </p>
        </details>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        You can also review our{" "}
        <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
        <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link>.
      </p>
    </div>
  </>
);

export default Contact;
