import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

export const Header: React.FC = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors"
          >
            <div className="p-2 rounded-lg bg-gradient-primary">
              <FileText className="h-5 w-5 text-white" />
            </div>
            PDF Merger
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/privacy"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/privacy') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/terms') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Terms
            </Link>
          </nav>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9 p-0"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};