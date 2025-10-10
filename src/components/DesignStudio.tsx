import { useState } from "react";
import { Upload, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const DesignStudio = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (uploadedImage && prompt) {
      setShowResults(true);
    }
  };

  return (
    <section className="py-24 bg-muted" id="design-studio">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">
            DESIGN STUDIO
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Create Your Custom Furniture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your space and let AI design furniture that perfectly matches your style and requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="text-xl font-medium mb-4">Upload Your Space</h3>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded space"
                        className="max-h-64 mx-auto rounded"
                      />
                      <Button
                        variant="secondary"
                        onClick={() => setUploadedImage(null)}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-medium mb-4">Describe Your Vision</h3>
                <Textarea
                  placeholder="Example: I want a modern L-shaped sofa in gray fabric with clean lines, around 8 feet long, with built-in storage..."
                  className="min-h-[120px] mb-4"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={!uploadedImage || !prompt}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Designs
                </Button>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-light">Your Custom Designs</h3>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate All
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] bg-secondary relative">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        Design Option {i}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">Modern Design {i}</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Custom crafted to match your space
                      </p>
                      <Button className="w-full" variant="outline">
                        Select & Order
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowResults(false)}
                >
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DesignStudio;
