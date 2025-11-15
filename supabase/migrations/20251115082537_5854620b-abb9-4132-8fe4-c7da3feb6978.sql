-- Drop the existing table to recreate with new schema
DROP TABLE IF EXISTS public.generated_designs;

-- Create storage buckets for design images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('original-images', 'original-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('generated-images', 'generated-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for original images
CREATE POLICY "Anyone can view original images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'original-images');

CREATE POLICY "Anyone can upload original images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'original-images');

-- Create storage policies for generated images
CREATE POLICY "Anyone can view generated images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'generated-images');

CREATE POLICY "Anyone can upload generated images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'generated-images');

-- Recreate generated_designs table with only prompt and user_id
CREATE TABLE public.generated_designs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.generated_designs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can create designs" 
ON public.generated_designs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view designs" 
ON public.generated_designs 
FOR SELECT 
USING (true);