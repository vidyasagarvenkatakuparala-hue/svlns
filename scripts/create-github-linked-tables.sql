-- Updated database schema for GitHub-linked content

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.manuscripts CASCADE;
DROP TABLE IF EXISTS public.authors CASCADE;

-- Create authors table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.authors (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  affiliation TEXT NOT NULL,
  orcid TEXT,
  github_profile_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table (GitHub-linked)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  article_type TEXT NOT NULL CHECK (article_type IN ('research', 'review', 'short_communication', 'case_study', 'editorial')),
  subject_area TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'in_review', 'draft')),
  volume INTEGER NOT NULL,
  issue INTEGER NOT NULL,
  pages TEXT NOT NULL,
  doi TEXT,
  github_content_url TEXT NOT NULL,  -- Link to GitHub markdown file
  github_pdf_url TEXT NOT NULL,      -- Link to GitHub PDF file
  github_metadata_url TEXT NOT NULL, -- Link to GitHub metadata JSON
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  co_authors TEXT[],
  publication_date TIMESTAMP WITH TIME ZONE,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create issues table (GitHub-linked)
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  volume INTEGER NOT NULL,
  issue INTEGER NOT NULL,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  publish_date TIMESTAMP WITH TIME ZONE NOT NULL,
  cover_image_url TEXT,
  github_issue_url TEXT NOT NULL,    -- Link to GitHub folder containing issue
  special_issue BOOLEAN DEFAULT FALSE,
  article_count INTEGER DEFAULT 0,
  total_pages TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(volume, issue)
);

-- Create reviews table (GitHub-linked)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES public.articles(id) NOT NULL,
  reviewer_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'declined')),
  recommendation TEXT CHECK (recommendation IN ('accept', 'minor_revision', 'major_revision', 'reject')),
  github_review_url TEXT,           -- Link to GitHub review file
  confidential_comments_url TEXT,   -- Link to confidential comments
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create GitHub links tracking table
CREATE TABLE IF NOT EXISTS public.github_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('article', 'issue', 'review', 'author_profile')),
  entity_id UUID NOT NULL,
  github_url TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('markdown', 'pdf', 'json', 'image')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for inaugural issue
INSERT INTO public.issues (volume, issue, year, title, description, publish_date, github_issue_url, special_issue, article_count, total_pages) VALUES
(1, 1, 2024, 'Inaugural Issue: Foundations of Multidisciplinary Research', 'The first issue of SVLNS GDC Multidisciplinary Journal, establishing the foundation for interdisciplinary research publication.', '2024-03-15', 'https://raw.githubusercontent.com/your-username/svlns-journal-content/main/volumes/vol-1/issue-1', true, 11, '1-156');

-- Insert sample articles (you'll need to create the actual GitHub files)
INSERT INTO public.articles (title, abstract, keywords, article_type, subject_area, status, volume, issue, pages, github_content_url, github_pdf_url, github_metadata_url, author_id) VALUES
('Multidisciplinary Research: Bridging Academic Boundaries in the 21st Century', 'This foundational article explores the importance of multidisciplinary research approaches in addressing complex contemporary challenges...', ARRAY['Multidisciplinary Research', 'Academic Collaboration', 'Research Methodology', 'Higher Education'], 'editorial', 'interdisciplinary', 'published', 1, 1, '1-18', 'https://raw.githubusercontent.com/your-username/svlns-journal-content/main/volumes/vol-1/issue-1/articles/001/content.md', 'https://raw.githubusercontent.com/your-username/svlns-journal-content/main/volumes/vol-1/issue-1/articles/001/article.pdf', 'https://raw.githubusercontent.com/your-username/svlns-journal-content/main/volumes/vol-1/issue-1/articles/001/metadata.json', (SELECT id FROM auth.users LIMIT 1));

-- Enable RLS
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view published articles" ON public.articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published issues" ON public.issues
  FOR SELECT USING (true);

CREATE POLICY "Authors can view their own articles" ON public.articles
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authors can insert their own articles" ON public.articles
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.authors (id, first_name, last_name, affiliation, orcid)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'affiliation',
    NEW.raw_user_meta_data->>'orcid'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
