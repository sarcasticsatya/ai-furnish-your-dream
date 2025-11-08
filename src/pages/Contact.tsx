import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (formData.phone.replace(/\D/g, '').length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xdkogevr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: "New Contact Form Submission - Bytras"
        }),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Our team will contact you within 12 hours."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        toast({
          title: "Failed to send",
          description: "Please try again or contact us directly.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
              GET IN TOUCH
            </p>
            <h1 className="text-5xl font-light text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">We'd love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8">
              <h2 className="text-2xl font-light text-foreground mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="10-digit mobile number" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} pattern="[0-9]{10}" maxLength={10} required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} className="min-h-[120px]" required />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>

            <div className="space-y-8">
              <Card className="p-8">
                <h2 className="text-2xl font-light text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-foreground mb-1">Location</div>
                      <div className="text-muted-foreground">
                        Hubli, Karnataka, India
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-foreground mb-1">Email</div>
                      <div className="text-muted-foreground">
                        satya@bytras.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-medium text-foreground mb-1">Phone</div>
                      <div className="text-muted-foreground">
                        +91 73488 91598
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-muted">
                <h3 className="text-xl font-medium text-foreground mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Contact;