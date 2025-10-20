import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-muted overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-background" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
          AI-POWERED CUSTOM FURNITURE
        </p>
        
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-6">
          FURNITURE DESIGNED
          <br />
          FOR YOUR SPACE
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Upload your room. Describe your vision. Get custom furniture crafted from 100% recycled plastic (PP), engineered to be fire retardant and smoke suppressant—designed, built, and installed in one seamless experience.
        </p>
        
        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => document.getElementById('design-studio')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Start Designing
        </Button>
      </div>
    </section>
  );
};

export default Hero;
