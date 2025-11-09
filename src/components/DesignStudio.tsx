import { useState } from "react";
import { Upload, Sparkles, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.jpg";

const DesignStudio = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Preserve original dimensions and orientation
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          setUploadedImage(canvas.toDataURL('image/jpeg', 0.95));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !prompt) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and provide a design prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-furniture-design", {
        body: {
          imageBase64: uploadedImage,
          prompt: prompt,
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.imageUrl);
      toast({
        title: "Design Generated!",
        description: "Your custom furniture design is ready.",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    await handleGenerate();
  };

  const handleStartOver = () => {
    setGeneratedImage(null);
    setUploadedImage(null);
    setPrompt("");
  };

  const addWatermarkAndDownload = async () => {
    if (!generatedImage) return;

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Load the generated image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = generatedImage;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Load and draw logo
      const logoImg = new Image();
      logoImg.src = logo;
      await new Promise((resolve) => {
        logoImg.onload = resolve;
      });

      const logoSize = Math.min(img.width, img.height) * 0.15;
      const padding = 20;
      ctx.globalAlpha = 0.8;
      ctx.drawImage(logoImg, padding, padding, logoSize, logoSize);

      // Add date watermark
      ctx.globalAlpha = 0.7;
      const fontSize = Math.max(16, img.width * 0.02);
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "#000000";
      ctx.textAlign = "right";
      const dateText = `Created: ${new Date().toLocaleDateString()}`;
      const textWidth = ctx.measureText(dateText).width;
      const textX = img.width - padding;
      const textY = img.height - padding;

      // Background for date text
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(textX - textWidth - 10, textY - fontSize - 5, textWidth + 20, fontSize + 15);

      ctx.fillStyle = "#000000";
      ctx.fillText(dateText, textX, textY);

      // Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bytras-design-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast({
          title: "Download Started",
          description: "Your design with watermark is being downloaded.",
        });
      }, "image/png");
    } catch (error) {
      console.error("Watermark error:", error);
      toast({
        title: "Download Failed",
        description: "Could not add watermark. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-24 bg-muted" id="design-studio">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground mb-4">DESIGN STUDIO</p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">Create Your Custom Furniture</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your space and let AI design furniture that perfectly matches your style and requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!generatedImage ? (
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <Card className="p-4 sm:p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-medium mb-4">Upload Your Space</h3>
                <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-12 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4 animate-scale-in">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded space" 
                        className="max-h-48 md:max-h-64 w-auto mx-auto rounded object-contain"
                      />
                      <Button variant="secondary" onClick={() => setUploadedImage(null)} className="w-full sm:w-auto">
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Upload className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-muted-foreground" />
                      <p className="text-sm md:text-base text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs md:text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>
              </Card>

              <Card className="p-4 sm:p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-medium mb-4">Describe Your Vision</h3>
                <Textarea
                  placeholder="Example: Design a modern Wardrobe in teak wood color with brass handles ..."
                  className="min-h-[100px] md:min-h-[120px] mb-4 text-sm md:text-base"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button
                  size="lg"
                  className="w-full text-sm md:text-base"
                  onClick={handleGenerate}
                  disabled={!uploadedImage || !prompt || isGenerating}
                >
                  <Sparkles className="mr-2 h-4 w-5 md:h-5 md:w-5" />
                  {isGenerating ? "Generating Your Design..." : "Generate Design"}
                </Button>
              </Card>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-xl md:text-2xl font-light">Your Custom Design</h3>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    onClick={addWatermarkAndDownload} 
                    disabled={isGenerating}
                    className="flex-1 sm:flex-none text-sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Save Image</span>
                    <span className="sm:hidden">Save</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleRegenerate} 
                    disabled={isGenerating}
                    className="flex-1 sm:flex-none text-sm"
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                    <span className="hidden sm:inline">{isGenerating ? "Regenerating..." : "Regenerate"}</span>
                    <span className="sm:hidden">Regen</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleStartOver}
                    className="w-full sm:w-auto text-sm"
                  >
                    Start Over
                  </Button>
                </div>
              </div>

              <Card className="overflow-hidden animate-scale-in">
                {isGenerating ? (
                  <div className="aspect-[4/3] bg-secondary relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-primary animate-pulse mb-4" />
                      <p className="text-sm md:text-base text-muted-foreground animate-fade-in text-center">
                        Creating your custom furniture design...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <img 
                      src={generatedImage} 
                      alt="Generated furniture design" 
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                      <div className="text-left w-full">
                        <h4 className="text-lg md:text-xl font-medium text-foreground mb-2">Your Custom Design</h4>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                          Made from 100% recycled plastic (PP) - Fire retardant & eco-friendly
                        </p>
                        <Button 
                          className="w-full sm:w-auto text-sm md:text-base" 
                          onClick={() => (window.location.href = "/contact")}
                        >
                          Request Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {!isGenerating && (
                <div className="text-center animate-fade-in px-4">
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    Love this design? Our team will craft it from sustainable recycled materials.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DesignStudio;
