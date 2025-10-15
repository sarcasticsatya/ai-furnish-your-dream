import { Upload, Sparkles, Package, Home } from "lucide-react";
import processBackground from "@/assets/process-background.jpg";

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
    <section id="how-it-works" className="relative py-24 bg-accent/30 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img 
          src={processBackground} 
          alt="Process background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4 animate-fade-in">
            HOW IT WORKS
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4 animate-fade-in [animation-delay:150ms]">
            From Vision to Reality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in [animation-delay:300ms]">
            We've reimagined the furniture buying experience. Four simple steps to custom furniture that perfectly fits your space and style.
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
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary text-primary text-sm font-medium flex items-center justify-center z-10">
                  {index + 1}
                </div>
                
                {/* Icon container */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-background border-2 border-border mb-6 transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:scale-110">
                  <step.icon className="w-9 h-9 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                <h3 className="text-xl font-medium text-foreground mb-3 transition-all duration-300 group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed transition-all duration-300 group-hover:text-foreground">
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
