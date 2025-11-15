import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import SizeInputDialog from "./SizeInputDialog";
import modularKitchen from "@/assets/modular-kitchen.jpg";
import modularWardrobe from "@/assets/modular-wardrobe.jpg";
import modularBed from "@/assets/modular-bed.jpg";
import modularShelving from "@/assets/modular-shelving.jpg";

const categories = [
  {
    id: "modular-kitchens",
    title: "Modular Kitchens",
    description: "Complete modular kitchen solutions with cabinets, shelving, and storage—designed with AI and built from recycled polymer panels for durability and sustainability",
    image: modularKitchen,
  },
  {
    id: "modular-wardrobes",
    title: "Modular Wardrobes & Storage",
    description: "Customizable wardrobes, lofts, and storage units crafted from 100% recycled panels—fire retardant, termite-proof, and built to last",
    image: modularWardrobe,
  },
  {
    id: "beds-tables",
    title: "Modular Beds & Tables",
    description: "Panel-based box beds, study tables, and workstations—modular designs that fit perfectly in your space",
    image: modularBed,
  },
  {
    id: "modular-shelving",
    title: "Modular Shelving & Units",
    description: "Wall-mounted shelves, entertainment units, and display storage—all made from eco-friendly recycled polymer panels",
    image: modularShelving,
  },
];

const ProductCategories = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [isSizeDialogOpen, setIsSizeDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"cart" | "buy">("cart");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    
    // Handle bedroom-all to highlight both bedroom categories
    if (hash === 'bedroom-all') {
      setHighlightedId('bedroom-all');
      setTimeout(() => {
        const element = document.getElementById('beds-tables');
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
      }, 10);
      setTimeout(() => setHighlightedId(null), 1500);
    } else if (hash && categories.some(cat => cat.id === hash)) {
      setHighlightedId(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
      }, 10);
      setTimeout(() => setHighlightedId(null), 1500);
    }
  }, [location]);

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

  const handleSizeConfirm = (dimensions: { height: number; depth: number; width: number; price: number; area: number }) => {
    if (!selectedCategory) return;

    const cartItem = {
      id: "", // Will be set by CartContext
      categoryId: selectedCategory.id,
      categoryTitle: selectedCategory.title,
      height: dimensions.height,
      depth: dimensions.depth,
      width: dimensions.width,
      quantity: 1,
      image: selectedCategory.image,
      price: dimensions.price,
      area: dimensions.area,
    };

    if (actionType === "cart") {
      addToCart(cartItem);
      toast.success("Added to Cart ✅", {
        description: `Item added for ₹${dimensions.price.toLocaleString('en-IN')}`,
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
              className={`group relative overflow-hidden rounded-lg animate-fade-in transition-all duration-300 ${
                (highlightedId === category.id || (highlightedId === 'bedroom-all' && (category.id === 'beds-tables' || category.id === 'modular-wardrobes'))) 
                  ? 'ring-4 ring-primary shadow-2xl scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
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
