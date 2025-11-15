import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SizeInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (dimensions: { height: number; depth: number; width: number; price: number; area: number }) => void;
  categoryTitle: string;
}

const SizeInputDialog = ({
  isOpen,
  onClose,
  onConfirm,
  categoryTitle,
}: SizeInputDialogProps) => {
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [width, setWidth] = useState("");

  const PRICE_PER_SQ_FT = 1199; // ₹1,199 per sq. ft.

  const calculatePrice = () => {
    const h = parseFloat(height);
    const d = parseFloat(depth);
    const w = parseFloat(width);
    
    if (!h || !d || !w || h <= 0 || d <= 0 || w <= 0) return null;
    
    const area = h * d * w;
    const price = area * PRICE_PER_SQ_FT;
    return { area, price };
  };

  const priceCalculation = calculatePrice();

  const handleConfirm = () => {
    const h = parseFloat(height);
    const d = parseFloat(depth);
    const w = parseFloat(width);

    if (!h || !d || !w || h <= 0 || d <= 0 || w <= 0) {
      toast.error("Please enter valid dimensions (greater than 0)");
      return;
    }

    const area = h * d * w;
    const price = area * PRICE_PER_SQ_FT;

    onConfirm({ height: h, depth: d, width: w, price, area });
    setHeight("");
    setDepth("");
    setWidth("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Input Your Size</DialogTitle>
          <DialogDescription>
            Enter the dimensions for your {categoryTitle} in feet
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="height">Height (ft)</Label>
            <Input
              id="height"
              type="number"
              step="0.1"
              min="0"
              placeholder="e.g., 7.0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="depth">Depth (ft)</Label>
            <Input
              id="depth"
              type="number"
              step="0.1"
              min="0"
              placeholder="e.g., 2.0"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="width">Width (ft)</Label>
            <Input
              id="width"
              type="number"
              step="0.1"
              min="0"
              placeholder="e.g., 8.0"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>

          {priceCalculation && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Area:</span>
                <span className="font-medium">{priceCalculation.area.toFixed(2)} sq. ft.</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Price:</span>
                <span className="text-primary">₹{priceCalculation.price.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-xs text-muted-foreground">@ ₹1,199 per sq. ft.</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Confirm Size →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeInputDialog;
