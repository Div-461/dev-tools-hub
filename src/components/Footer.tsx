import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 mt-16">
    <div className="container max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Left: Brand + description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-semibold">DevToolKitHub</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Free, open-source developer tools. All processing happens in your browser — nothing is sent to any server.
          </p>
        </div>

        {/* Right: Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground md:pt-1">
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DevToolKitHub. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
