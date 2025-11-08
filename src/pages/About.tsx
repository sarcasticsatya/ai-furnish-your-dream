import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-light text-foreground mb-8">About Bytras</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Bytras manufactures panel-based modular furniture — AI-powered and made from 100% recycled polymer panels.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We design modular kitchens, wardrobes, lofts, beds, tables, and storage units perfectly tailored to your spaces while reducing plastic waste and replacing wood-based materials.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              From AI-generated concepts to precision-cut modular panels, assembled on-site with professional installation, Bytras blends technology, sustainability, and craftsmanship into a seamless experience.
            </p>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Based in <strong>Hubli, Karnataka</strong>, we are creating India's most accessible eco-friendly furniture ecosystem.
            </p>

            <div className="flex gap-4 mt-12">
              <Link to="/contact">
                <Button size="lg">Get in Touch</Button>
              </Link>
              <Link to="/partners">
                <Button size="lg" variant="outline">Partner With Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
