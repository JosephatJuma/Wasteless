import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, Plus, Search, User } from "lucide-react";
import Logo from "@/assets/adaptive-icon.png";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
export function Navigation() {
  const user = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
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

          <div className="hidden md:flex space-x-2">
            {!user ? (
              <Link to={"/login"}>
                <Button variant="outline" size="sm" asChild>
                  <a href="/login">
                    <User className="h-4 w-4" />
                    Sign In
                  </a>
                </Button>
              </Link>
            ) : (
              <>
                <Avatar
                  className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-primary/50 transition-all duration-300 hover:border-primary hover:scale-105 hover:shadow-md"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <AvatarImage
                    src={user?.session?.user?.user_metadata?.avatar_url}
                    className="h-full w-full object-cover"
                    alt={
                      user?.session?.user?.user_metadata?.name || "User avatar"
                    }
                  />
                  <AvatarFallback className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-lg font-medium text-foreground/80">
                    {user?.session?.user?.user_metadata?.name
                      ? user.session.user.user_metadata.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
          <Button variant="hero" size="sm">
            <Plus className="h-4 w-4" />
            Post Item
          </Button>
        </div>
      </div>
    </nav>
  );
}
