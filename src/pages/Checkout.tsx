import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2 } from "lucide-react";

const Checkout = () => {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Location details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [locationType, setLocationType] = useState("home");

  // Contact details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!address || !city || !pincode) {
        toast.error("Please fill in all required location details");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!name || !phone || !email) {
        toast.error("Please fill in all contact details");
        return;
      }
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    const formData = {
      name,
      phone,
      email,
      address: `${address}, ${city} - ${pincode}${landmark ? `, Near ${landmark}` : ""}`,
      locationType,
      items: cart.map((item) => ({
        category: item.categoryTitle,
        dimensions: `${item.height}ft × ${item.depth}ft × ${item.width}ft`,
        quantity: item.quantity,
      })),
    };

    // Validate phone (10 digits)
    if (phone.replace(/\D/g, "").length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mldarnnv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: "New Order Submission - Bytras",
        }),
      });

      if (response.ok) {
        toast.success("Order Received! 🎉", {
          description: "Our team will contact you within 12 hours to confirm your design and finalize your order.",
          duration: 5000,
        });
        clearCart();
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Failed to submit order. Please try again or contact us directly.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-light text-foreground mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                1
              </div>
              <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>Location</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-4" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </div>
              <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>Contact</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-4" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                3
              </div>
              <span className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>Review</span>
            </div>
          </div>

          {/* Step 1: Location Details */}
          {step === 1 && (
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-light text-foreground mb-6">Location Details</h2>

              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="House no., Street name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    placeholder="Nearby landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label>Delivery Location Type *</Label>
                  <RadioGroup value={locationType} onValueChange={setLocationType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home" className="font-normal cursor-pointer">
                        Home
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="office" id="office" />
                      <Label htmlFor="office" className="font-normal cursor-pointer">
                        Office
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="font-normal cursor-pointer">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button onClick={handleNextStep} className="w-full mt-8" size="lg">
                Next → Contact Info
              </Button>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {step === 2 && (
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-light text-foreground mb-6">Contact Details</h2>

              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1" size="lg">
                  ← Back
                </Button>
                <Button onClick={handleNextStep} className="flex-1" size="lg">
                  Next → Review Order
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-light text-foreground mb-6">Order Summary</h2>

                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-border last:border-0">
                    <img src={item.image} alt={item.categoryTitle} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.categoryTitle}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.height}ft × {item.depth}ft × {item.width}ft
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Qty:</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-light text-foreground mb-4">Delivery & Contact Info</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Address: </span>
                    <span className="text-foreground">
                      {address}, {city} - {pincode}
                    </span>
                  </div>
                  {landmark && (
                    <div>
                      <span className="text-muted-foreground">Landmark: </span>
                      <span className="text-foreground">{landmark}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Type: </span>
                    <span className="text-foreground capitalize">{locationType}</span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <span className="text-muted-foreground">Contact: </span>
                    <span className="text-foreground">{name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone: </span>
                    <span className="text-foreground">{phone}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email: </span>
                    <span className="text-foreground">{email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-accent/20 border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground">
                  Our team will contact you within 12 hours to confirm your design, provide a detailed quote, and guide
                  you through the next steps.
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1" size="lg">
                  ← Back
                </Button>
                <Button onClick={handlePlaceOrder} className="flex-1" size="lg">
                  Place Order →
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
