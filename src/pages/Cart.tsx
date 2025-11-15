import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

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
                      <p className="text-sm text-muted-foreground mb-2">
                        Area: {item.area.toFixed(2)} sq. ft. @ ₹1,199/sq.ft.
                      </p>
                      <p className="text-lg font-semibold text-primary">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-sm text-muted-foreground">Quantity:</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
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
                    <span>Total Items</span>
                    <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Total Area</span>
                    <span>{cart.reduce((total, item) => total + (item.area * item.quantity), 0).toFixed(2)} sq. ft.</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between text-xl font-semibold text-foreground">
                      <span>Total Price</span>
                      <span>₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-foreground mb-3 text-sm">Payment Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">30% Advance (Now)</span>
                      <span className="font-medium">₹{(cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.30).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">20% Design Finalization</span>
                      <span className="font-medium">₹{(cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.20).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">50% After Installation</span>
                      <span className="font-medium">₹{(cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.50).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-6">
                  *Our team will contact you to finalize the design and confirm the installation timeline
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
