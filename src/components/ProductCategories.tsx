import { Button } from "@/components/ui/button";
import seatingImage from "@/assets/seating-hero.jpg";
import livingImage from "@/assets/living-hero.jpg";
import bedroomImage from "@/assets/bedroom-hero.jpg";

const categories = [
  {
    id: "seating",
    title: "Seating",
    description: "Custom sofas, chairs, and benches designed for comfort and style",
    image: seatingImage,
  },
  {
    id: "living",
    title: "Living",
    description: "Complete living room solutions from coffee tables to entertainment units",
    image: livingImage,
  },
  {
    id: "bedroom",
    title: "Bedroom",
    description: "Beds, nightstands, and storage crafted for your perfect sanctuary",
    image: bedroomImage,
  },
];

const ProductCategories = () => {
  const scrollToDesignStudio = () => {
    document.getElementById('design-studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
            EXPLORE CATEGORIES
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
            Furniture For Every Space
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              id={category.id}
              className="group relative overflow-hidden rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-light text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {category.description}
                </p>
                <Button
                  onClick={scrollToDesignStudio}
                  variant="outline"
                  className="w-fit transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                >
                  Design Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
