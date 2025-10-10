import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold tracking-tight text-foreground">
            BYTRAS
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Seating
            </a>
            <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Living
            </a>
            <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Bedroom
            </a>
            <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Custom Design
            </a>
            <a href="#" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              How It Works
            </a>
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
