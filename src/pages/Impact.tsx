import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Impact = () => {
  const metrics = [
    {
      value: "925+ tons",
      label: "Plastic Recycled",
      description: "Projected over 5 years"
    },
    {
      value: "27,750+",
      label: "Trees Saved",
      description: "By replacing wood-based materials"
    },
    {
      value: "1,572+ tons",
      label: "CO₂ Reduced",
      description: "Environmental impact mitigation"
    },
    {
      value: "100%",
      label: "Zero-Wood Manufacturing",
      description: "Prevents deforestation-driven plywood demand"
    }
  ];

  const features = [
    "Fully recyclable materials",
    "Durable and long-lasting",
    "Water-proof construction",
    "Termite-proof protection",
    "Fire retardant properties",
    "Smoke suppressant"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
              IMPACT METRICS
            </p>
            <h1 className="text-5xl font-light text-foreground mb-6">
              Our Measurable Sustainability Impact
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every product made with Bytras materials directly contributes to the environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map((metric, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-accent mb-2">
                  {metric.value}
                </div>
                <div className="text-xl font-medium text-foreground mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-12 bg-muted">
            <h2 className="text-3xl font-light text-foreground mb-8 text-center">
              Circular Materials
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-accent rounded-full"></div>
                  <span className="text-lg text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="text-center mt-16">
            <p className="text-2xl text-foreground font-light">
              Every order moves India closer to a greener, circular future.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impact;
