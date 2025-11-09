import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
const Header = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/team", label: "Team" },
    { to: "/partners", label: "Partners" },
    { to: "/impact", label: "Impact" },
    { to: "/pricing", label: "Pricing" },
    { href: "#design-studio", label: "Design Studio" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold tracking-tight text-foreground">BYTRAS</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) =>
                    link.to ? (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className="text-lg text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;