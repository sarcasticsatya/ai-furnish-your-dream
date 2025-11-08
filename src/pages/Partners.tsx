import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Partners = () => {
  const benefits = [
    "Access to innovative eco-materials",
    "Fast, reliable fabrication and installation",
    "Co-branding opportunities",
    "Priority pricing for recurring partners",
    "Dedicated project support from the Bytras team"
  ];

  const partners = [
    "Interior architecture firms",
    "Independent designers",
    "Modular kitchen and home interior companies",
    "Commercial space designers",
    "Contractors and décor consultants"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
              PARTNER WITH US
            </p>
            <h1 className="text-5xl font-light text-foreground mb-6">
              Build the Future of Furniture With Bytras
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We collaborate with interior designers, architects, and design studios to create sustainable, custom furniture using our advanced recycled-polymer materials.
            </p>
            <p className="text-xl font-medium text-foreground mt-4">
              You design — we manufacture and install.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8">
              <h2 className="text-3xl font-light text-foreground mb-6">
                Why Partner With Bytras
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 bg-muted">
              <h2 className="text-3xl font-light text-foreground mb-6">
                Who We Work With
              </h2>
              <ul className="space-y-4">
                {partners.map((partner, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-lg">{partner}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="text-center bg-primary text-primary-foreground p-12 rounded-lg">
            <h2 className="text-4xl font-light mb-4">
              Let's Create Better Spaces Together
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Bring your designs. We bring materials, manufacturing, and execution at scale.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
