-- Create table to store generated furniture designs
CREATE TABLE IF NOT EXISTS public.generated_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  original_image_url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  generated_image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.generated_designs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own designs (or all if not authenticated for now)
CREATE POLICY "Users can view designs"
  ON public.generated_designs
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert designs (for now, before auth is enabled)
CREATE POLICY "Anyone can create designs"
  ON public.generated_designs
  FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_generated_designs_user_id ON public.generated_designs(user_id);
CREATE INDEX idx_generated_designs_created_at ON public.generated_designs(created_at DESC);