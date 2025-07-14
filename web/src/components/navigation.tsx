import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, Plus, Search, User } from "lucide-react";
import Logo from "@/assets/adaptive-icon.png";
import { Link } from "react-router-dom";
export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-20 w-20" />
            <span className="text-xl font-bold text-primary">WasteLess</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-foreground hover:text-primary transition-colors"
          >
            Browse Items
          </a>
          <a
            href="#"
            className="text-foreground hover:text-primary transition-colors"
          >
            How It Works
          </a>
          <a
            href="#"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Link to={"/login"}>
            <Button variant="outline" size="sm" asChild>
              <a href="/login">
                <User className="h-4 w-4" />
                Sign In
              </a>
            </Button>
          </Link>
          <Button variant="hero" size="sm">
            <Plus className="h-4 w-4" />
            Post Item
          </Button>
        </div>
      </div>
    </nav>
  );
}
