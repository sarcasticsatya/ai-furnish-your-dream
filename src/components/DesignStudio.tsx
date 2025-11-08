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
        setUploadedImage(reader.result as string);
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
      const { data, error } = await supabase.functions.invoke('generate-furniture-design', {
        body: { 
          imageBase64: uploadedImage,
          prompt: prompt 
        }
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
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
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
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'right';
      const dateText = `Created: ${new Date().toLocaleDateString()}`;
      const textWidth = ctx.measureText(dateText).width;
      const textX = img.width - padding;
      const textY = img.height - padding;
      
      // Background for date text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(textX - textWidth - 10, textY - fontSize - 5, textWidth + 20, fontSize + 15);
      
      ctx.fillStyle = '#000000';
      ctx.fillText(dateText, textX, textY);

      // Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bytras-design-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast({
          title: "Download Started",
          description: "Your design with watermark is being downloaded.",
        });
      }, 'image/png');
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
          {!generatedImage ? (
            <div className="space-y-8 animate-fade-in">
              <Card className="p-8">
                <h3 className="text-xl font-medium mb-4">Upload Your Space</h3>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4 animate-scale-in">
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
                  disabled={!uploadedImage || !prompt || isGenerating}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {isGenerating ? "Generating Your Design..." : "Generate Design"}
                </Button>
              </Card>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-light">Your Custom Design</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addWatermarkAndDownload} disabled={isGenerating}>
                    <Download className="mr-2 h-4 w-4" />
                    Save Image
                  </Button>
                  <Button variant="outline" onClick={handleRegenerate} disabled={isGenerating}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? "Regenerating..." : "Regenerate"}
                  </Button>
                  <Button variant="ghost" onClick={handleStartOver}>
                    Start Over
                  </Button>
                </div>
              </div>

              <Card className="overflow-hidden animate-scale-in">
                {isGenerating ? (
                  <div className="aspect-[4/3] bg-secondary relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Sparkles className="w-16 h-16 text-primary animate-pulse mb-4" />
                      <p className="text-muted-foreground animate-fade-in">
                        Creating your custom furniture design...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={generatedImage}
                      alt="Generated furniture design"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-left">
                        <h4 className="text-xl font-medium text-foreground mb-2">Your Custom Design</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Made from 100% recycled plastic (PP) - Fire retardant & eco-friendly
                        </p>
                        <Button className="w-full sm:w-auto" onClick={() => window.location.href = '/contact'}>
                          Request Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {!isGenerating && (
                <div className="text-center animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-4">
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
