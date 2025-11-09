const Footer = () => {
  return <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">BYTRAS</h3>
            <p className="text-background/70 text-sm leading-relaxed">​The Future of Furniture.</p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#modular-shelving" className="text-background/70 hover:text-background transition-colors">
                  Living
                </a>
              </li>
              <li>
                <a href="/#modular-kitchens" className="text-background/70 hover:text-background transition-colors">
                  Kitchen
                </a>
              </li>
              <li>
                <a href="/#beds-tables" className="text-background/70 hover:text-background transition-colors">
                  Bedroom
                </a>
              </li>
              <li>
                <a href="/#design-studio" className="text-background/70 hover:text-background transition-colors">
                  Custom Design
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#how-it-works" className="text-background/70 hover:text-background transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-background/70 hover:text-background transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/impact" className="text-background/70 hover:text-background transition-colors">
                  Impact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-background/70 hover:text-background transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/team" className="text-background/70 hover:text-background transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="/partners" className="text-background/70 hover:text-background transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="/contact" className="text-background/70 hover:text-background transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-center text-sm text-background/60">
          <p>© 2025 Bytras. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;