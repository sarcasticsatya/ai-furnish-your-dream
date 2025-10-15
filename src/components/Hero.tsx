import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-muted overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="Modern furniture interior" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/70" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4 animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          AI-POWERED CUSTOM FURNITURE
        </p>
        
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-6 animate-fade-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
          FURNITURE DESIGNED
          <br />
          FOR YOUR SPACE
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
          Upload your room. Describe your vision. Get custom furniture designed, built, and installed—all in one seamless experience.
        </p>
        
        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 animate-fade-in opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]"
          onClick={() => document.getElementById('design-studio')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Start Designing
        </Button>
      </div>
    </section>
  );
};

export default Hero;
