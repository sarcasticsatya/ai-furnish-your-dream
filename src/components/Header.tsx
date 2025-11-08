import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Header = () => {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Bytras Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold tracking-tight text-foreground">BYTRAS</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              About
            </Link>
            <Link to="/team" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Team
            </Link>
            <Link to="/partners" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Partners
            </Link>
            <Link to="/impact" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Impact
            </Link>
            <Link to="/pricing" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Pricing
            </Link>
            <a href="/#design-studio" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Design Studio
            </a>
            <Link to="/contact" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
