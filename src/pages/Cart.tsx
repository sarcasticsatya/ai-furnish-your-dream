import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Start adding some modular furniture to your cart!</p>
            <Link to="/">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-light text-foreground">Shopping Cart</h1>
            <Button variant="outline" onClick={clearCart}>Clear All</Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.categoryTitle}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {item.categoryTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Dimensions: {item.height}ft (H) × {item.depth}ft (D) × {item.width}ft (W)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Area: {(item.height * item.width * item.depth).toFixed(2)} cubic ft @ ₹{item.pricePerSqFt}/sq ft
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-foreground mb-4">
                        ₹{item.totalPrice.toLocaleString()}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-light text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Charges</span>
                    <span>Location-based (TBD)</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg font-medium text-foreground">
                    <span>Total</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-accent/20 border border-border rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-foreground mb-3 text-sm">Payment Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>30% Advance (Now)</span>
                      <span>₹{(getCartTotal() * 0.3).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>20% Design Finalization</span>
                      <span>₹{(getCartTotal() * 0.2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>50% After Installation</span>
                      <span>₹{(getCartTotal() * 0.5).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-6">
                  *Final price will be confirmed after our team reviews your requirements
                </p>

                <Link to="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link to="/">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
