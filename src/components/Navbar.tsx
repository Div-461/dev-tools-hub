import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { tools } from "@/types/tool.types";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/DarkModeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 max-w-6xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Terminal className="h-5 w-5 text-primary" />
          <span>DevTools</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {tools.map((t) => (
            <Link
              key={t.path}
              to={t.path}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-secondary hover:text-foreground",
                location.pathname === t.path
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {t.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <DarkModeToggle />
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5 rounded-md hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background p-3">
          <div className="flex flex-col gap-1">
            {tools.map((t) => (
              <Link
                key={t.path}
                to={t.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                  location.pathname === t.path
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
