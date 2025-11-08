import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
const Pricing = () => {
  const includes = ["Premium recycled-polymer material", "Precision fabrication", "Professional finishing", "Assembly and quality checks", "Customization as per your design"];
  return <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
              PRICING
            </p>
            <h1 className="text-5xl font-light text-foreground mb-6">
              Transparent Furniture-Making Costs
            </h1>
          </div>

          <Card className="p-12 text-center mb-8">
            <div className="mb-8">
              <div className="text-6xl font-bold text-accent mb-4">₹1,299</div>
              <div className="text-2xl text-muted-foreground">
                per square foot
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Transportation and on-site installation are charged separately based on location.
            </p>

            <div className="border-t border-border pt-8 mb-8">
              <h3 className="text-2xl font-light text-foreground mb-6">
                This pricing includes:
              </h3>
              <ul className="space-y-4 text-left max-w-md mx-auto">
                {includes.map((item, index) => <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-lg">{item}</span>
                  </li>)}
              </ul>
            </div>

            <p className="text-sm text-muted-foreground mb-8">
              All estimates are shared upfront after confirming sizes and location details.
            </p>

            <Link to="/contact">
              <Button size="lg">
                Request a Quote
              </Button>
            </Link>
          </Card>

          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-xl font-medium text-foreground mb-4">
              How It Works
            </h3>
            <ol className="space-y-3 text-muted-foreground">
              <li>1. Submit your design and requirements</li>
              <li>2. Our team reviews and provides a detailed quote</li>
              <li>3. 50% advance payment to begin production</li>
              <li>4. Manufacturing and quality assurance</li>
              <li>5. Delivery and professional installation</li>
              <li>6. Remaining 50% payment after installation</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Pricing;