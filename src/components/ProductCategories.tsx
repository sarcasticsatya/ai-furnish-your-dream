import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SizeInputDialog from "./SizeInputDialog";
import seatingImage from "@/assets/seating-hero.jpg";
import livingImage from "@/assets/living-hero.jpg";
import bedroomImage from "@/assets/bedroom-hero.jpg";

const categories = [
  {
    id: "modular-kitchens",
    title: "Modular Kitchens",
    description: "Complete modular kitchen solutions with cabinets, shelving, and storage—designed with AI and built from recycled polymer panels for durability and sustainability",
    image: seatingImage,
  },
  {
    id: "modular-wardrobes",
    title: "Modular Wardrobes & Storage",
    description: "Customizable wardrobes, lofts, and storage units crafted from 100% recycled panels—fire retardant, termite-proof, and built to last",
    image: livingImage,
  },
  {
    id: "modular-beds",
    title: "Modular Beds & Tables",
    description: "Panel-based box beds, study tables, and workstations—modular designs that fit perfectly in your space",
    image: bedroomImage,
  },
  {
    id: "modular-shelving",
    title: "Modular Shelving & Units",
    description: "Wall-mounted shelves, entertainment units, and display storage—all made from eco-friendly recycled polymer panels",
    image: seatingImage,
  },
];

const PRICE_PER_SQ_FT = 1115;

const ProductCategories = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [isSizeDialogOpen, setIsSizeDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"cart" | "buy">("cart");

  const scrollToDesignStudio = () => {
    document.getElementById('design-studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    setActionType("cart");
    setIsSizeDialogOpen(true);
  };

  const handleBuyNow = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    setActionType("buy");
    setIsSizeDialogOpen(true);
  };

  const handleSizeConfirm = (dimensions: { height: number; depth: number; width: number }) => {
    if (!selectedCategory) return;

    // Calculate total area (simplified: H*W + 2*D*W for basic panel calculation)
    const totalArea = (dimensions.height * dimensions.width) + (2 * dimensions.depth * dimensions.width);
    const totalPrice = Math.round(totalArea * PRICE_PER_SQ_FT);

    const cartItem = {
      id: Date.now().toString(),
      categoryId: selectedCategory.id,
      categoryTitle: selectedCategory.title,
      height: dimensions.height,
      depth: dimensions.depth,
      width: dimensions.width,
      pricePerSqFt: PRICE_PER_SQ_FT,
      totalPrice,
      image: selectedCategory.image,
    };

    if (actionType === "cart") {
      addToCart(cartItem);
      toast.success("Added to Cart ✅", {
        description: "Item added to your cart successfully",
        action: {
          label: "View Cart",
          onClick: () => navigate("/cart"),
        },
      });
    } else {
      // Buy Now - add to cart and go to checkout
      addToCart(cartItem);
      navigate("/checkout");
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
            EXPLORE CATEGORIES
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
            Modular Furniture For Every Space
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleBuyNow(category)}
                    className="w-full"
                  >
                    Buy Now
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(category)}
                    variant="outline"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={scrollToDesignStudio}
                    variant="ghost"
                    className="w-full text-xs"
                  >
                    Or Design Custom
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <SizeInputDialog
          isOpen={isSizeDialogOpen}
          onClose={() => setIsSizeDialogOpen(false)}
          onConfirm={handleSizeConfirm}
          categoryTitle={selectedCategory.title}
        />
      )}
    </section>
  );
};

export default ProductCategories;
