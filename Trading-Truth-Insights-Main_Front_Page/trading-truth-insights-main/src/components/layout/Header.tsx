
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-tradingBlue-600 flex items-center justify-center">
              <span className="font-bold text-white">TT</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              Trading Truth
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/journal" className="text-muted-foreground hover:text-foreground transition-colors">
            Journal
          </Link>
          <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
            Analytics
          </Link>
          <Link to="/rules" className="text-muted-foreground hover:text-foreground transition-colors">
            Rules
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Connect Broker
          </Button>
          <Button size="sm" className="hidden md:flex">
            Sign In
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-transform",
                isMobileMenuOpen ? "rotate-90" : ""
              )}
            >
              {isMobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "container md:hidden overflow-hidden transition-all",
          isMobileMenuOpen
            ? "max-h-64 py-4 border-t"
            : "max-h-0"
        )}
      >
        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/journal" className="text-muted-foreground hover:text-foreground transition-colors">
            Journal
          </Link>
          <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
            Analytics
          </Link>
          <Link to="/rules" className="text-muted-foreground hover:text-foreground transition-colors">
            Rules
          </Link>
          <div className="flex flex-col space-y-2 pt-2 border-t">
            <Button variant="outline" size="sm" className="justify-center">
              Connect Broker
            </Button>
            <Button size="sm" className="justify-center">
              Sign In
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
