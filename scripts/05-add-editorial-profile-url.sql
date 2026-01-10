-- Migration: Add profile_url to editorial_board to show profile links near email
-- Safe to run multiple times

ALTER TABLE public.editorial_board
  ADD COLUMN IF NOT EXISTS profile_url text;

-- Optional: Add a comment for documentation
COMMENT ON COLUMN public.editorial_board.profile_url IS 'External profile URL for the board member (e.g., department profile, Google Scholar, LinkedIn).';
