-- Multi-cloud storage tables for journal system

-- Create cloud_files table to track files across multiple providers
CREATE TABLE IF NOT EXISTS public.cloud_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('article', 'issue', 'review', 'author_profile', 'supplementary')),
  entity_id UUID NOT NULL,
  file_location JSONB NOT NULL, -- Stores FileLocation object
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage_usage table to monitor storage across providers
CREATE TABLE IF NOT EXISTS public.storage_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_type TEXT NOT NULL UNIQUE,
  used_space_mb NUMERIC DEFAULT 0,
  total_space_mb NUMERIC DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  health_status TEXT DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'warning', 'error'))
);

-- Create storage_logs table for monitoring and analytics
CREATE TABLE IF NOT EXISTS public.storage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL, -- 'upload', 'download', 'delete', 'verify'
  provider_type TEXT NOT NULL,
  file_id TEXT,
  file_size_mb NUMERIC,
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update articles table to support multi-cloud storage
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS primary_pdf_location JSONB,
ADD COLUMN IF NOT EXISTS backup_pdf_locations JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS supplementary_files JSONB DEFAULT '[]'::jsonb;

-- Insert initial storage provider data
INSERT INTO public.storage_usage (provider_type, total_space_mb) VALUES
('github', 999999), -- Unlimited for public repos
('google_drive', 15360), -- 15GB
('dropbox', 2048), -- 2GB (can be expanded)
('onedrive', 5120), -- 5GB
('mega', 20480) -- 20GB
ON CONFLICT (provider_type) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cloud_files_entity ON public.cloud_files(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_cloud_files_primary ON public.cloud_files(is_primary) WHERE is_primary = true;
CREATE INDEX IF NOT EXISTS idx_storage_logs_provider ON public.storage_logs(provider_type, created_at);

-- Enable RLS
ALTER TABLE public.cloud_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view file locations for published content" ON public.cloud_files
  FOR SELECT USING (
    entity_type IN ('article', 'issue') AND 
    EXISTS (
      SELECT 1 FROM public.articles 
      WHERE id = entity_id AND status = 'published'
    )
  );

CREATE POLICY "Public can view storage usage" ON public.storage_usage
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can view storage logs" ON public.storage_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to update storage usage
CREATE OR REPLACE FUNCTION update_storage_usage(
  p_provider_type TEXT,
  p_file_size_mb NUMERIC,
  p_operation TEXT -- 'add' or 'remove'
)
RETURNS VOID AS $$
BEGIN
  IF p_operation = 'add' THEN
    UPDATE public.storage_usage 
    SET used_space_mb = used_space_mb + p_file_size_mb,
        last_updated = NOW()
    WHERE provider_type = p_provider_type;
  ELSIF p_operation = 'remove' THEN
    UPDATE public.storage_usage 
    SET used_space_mb = GREATEST(0, used_space_mb - p_file_size_mb),
        last_updated = NOW()
    WHERE provider_type = p_provider_type;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to log storage operations
CREATE OR REPLACE FUNCTION log_storage_operation(
  p_action TEXT,
  p_provider_type TEXT,
  p_file_id TEXT,
  p_file_size_mb NUMERIC DEFAULT NULL,
  p_success BOOLEAN DEFAULT TRUE,
  p_error_message TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.storage_logs (
    action, provider_type, file_id, file_size_mb, success, error_message
  ) VALUES (
    p_action, p_provider_type, p_file_id, p_file_size_mb, p_success, p_error_message
  );
END;
$$ LANGUAGE plpgsql;
