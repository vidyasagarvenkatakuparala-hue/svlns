-- Update submissions table to include manuscript_url field
ALTER TABLE submissions 
ADD COLUMN IF NOT EXISTS manuscript_url TEXT;

-- Add comment to the column
COMMENT ON COLUMN submissions.manuscript_url IS 'URL where the manuscript can be accessed by the editorial team';

-- Update existing submissions with a placeholder URL if needed
-- (This is optional and can be removed if not needed)
UPDATE submissions 
SET manuscript_url = 'https://example.com/placeholder-url' 
WHERE manuscript_url IS NULL AND created_at < NOW();
