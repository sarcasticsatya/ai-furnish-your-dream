import { Upload, Sparkles, Package, Home } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Space",
    description: "Share photos of your room—living room, bedroom, kitchen, or any space you want to transform.",
  },
  {
    icon: Sparkles,
    title: "Describe Your Vision",
    description: "Tell our AI what you're looking for. Style, size, materials—we'll generate 5 custom options just for you.",
  },
  {
    icon: Package,
    title: "We Build & Ship",
    description: "Choose your favorite design. We craft your custom furniture with precision and ship it directly to you.",
  },
  {
    icon: Home,
    title: "Professional Installation",
    description: "Our team arrives at your location and expertly installs your new furniture. Hassle-free, perfect fit.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
            HOW IT WORKS
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            From Vision to Reality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've reimagined the furniture buying experience. Four simple steps to custom furniture that perfectly fits your space and style.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                <step.icon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
