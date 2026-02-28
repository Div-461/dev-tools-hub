import { Terminal } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 mt-16">
    <div className="container max-w-6xl flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <Terminal className="h-3.5 w-3.5 text-primary" />
        <span className="font-medium">DevTools</span>
      </div>
      <p>Free, open-source developer tools. All processing happens in your browser — nothing is sent to any server.</p>
    </div>
  </footer>
);

export default Footer;
