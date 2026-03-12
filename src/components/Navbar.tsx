import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Terminal, ChevronDown } from "lucide-react";
import { tools } from "@/types/tool.types";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/DarkModeToggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [location.pathname]);

  const isToolActive = tools.some((t) => location.pathname === t.path);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 max-w-6xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Terminal className="h-5 w-5 text-primary" />
          <span>DevToolKitHub</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                location.pathname === link.path
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Tools Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                isToolActive ? "bg-secondary text-foreground" : "text-muted-foreground"
              )}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              aria-label="Developer tools menu"
            >
              Tools
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", toolsOpen && "rotate-180")} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 rounded-lg border border-border bg-popover p-2 shadow-lg animate-in fade-in-0 zoom-in-95">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary",
                        location.pathname === tool.path
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <DarkModeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                  location.pathname === link.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Tools Accordion */}
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                isToolActive ? "text-foreground" : "text-muted-foreground"
              )}
              aria-expanded={mobileToolsOpen}
            >
              Tools
              <ChevronDown className={cn("h-4 w-4 transition-transform", mobileToolsOpen && "rotate-180")} />
            </button>

            {mobileToolsOpen && (
              <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-border pl-3">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-secondary",
                        location.pathname === tool.path
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="my-1 border-t border-border" />
            <Link
              to="/privacy-policy"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                location.pathname === "/privacy-policy" ? "bg-secondary text-foreground" : "text-muted-foreground"
              )}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                location.pathname === "/terms" ? "bg-secondary text-foreground" : "text-muted-foreground"
              )}
            >
              Terms
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
