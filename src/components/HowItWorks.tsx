import { Upload, Sparkles, Package, Home } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Space",
    description: "Share photos of your room—kitchen, bedroom, or any space you want to transform with modular furniture.",
  },
  {
    icon: Sparkles,
    title: "Describe Your Vision",
    description: "Tell our AI what panel-based modular furniture you need—kitchens, wardrobes, lofts, or storage. We'll generate custom designs from 100% recycled polymer panels.",
  },
  {
    icon: Package,
    title: "We Build & Ship",
    description: "Choose your favorite design. We precision-cut modular panels from recycled polymer and ship directly to you.",
  },
  {
    icon: Home,
    title: "On-Site Assembly",
    description: "Our team arrives at your location and expertly assembles your modular furniture. Hassle-free, perfect fit.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
            HOW IT WORKS
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            From Vision to Reality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've reimagined the furniture buying experience. Four simple steps to panel-based modular furniture that perfectly fits your space and style.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative text-center group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary text-primary text-sm font-medium flex items-center justify-center z-10">
                  {index + 1}
                </div>
                
                {/* Icon container */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-background border-2 border-border mb-6 transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:scale-110">
                  <step.icon className="w-9 h-9 text-primary transition-transform duration-300 group-hover:scale-110" />
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
      </div>
    </section>
  );
};

export default HowItWorks;
