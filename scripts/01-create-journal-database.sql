-- Create the main journal database schema
-- This script creates all necessary tables for the SVLNS GDC Multidisciplinary Journal

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    affiliation TEXT NOT NULL,
    orcid VARCHAR(50),
    github_profile_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    keywords JSONB NOT NULL DEFAULT '[]',
    article_type VARCHAR(50) NOT NULL CHECK (article_type IN ('research', 'review', 'short_communication', 'case_study', 'editorial')),
    subject_area VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'in_review', 'draft')),
    volume INTEGER NOT NULL,
    issue INTEGER NOT NULL,
    pages VARCHAR(20),
    doi VARCHAR(100),
    github_content_url TEXT,
    github_pdf_url TEXT,
    github_metadata_url TEXT,
    author_id UUID NOT NULL REFERENCES authors(id),
    co_authors JSONB DEFAULT '[]',
    publication_date DATE,
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Issues table
CREATE TABLE IF NOT EXISTS issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volume INTEGER NOT NULL,
    issue INTEGER NOT NULL,
    year INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publish_date DATE NOT NULL,
    cover_image_url TEXT,
    github_issue_url TEXT,
    special_issue BOOLEAN DEFAULT FALSE,
    article_count INTEGER DEFAULT 0,
    total_pages VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(volume, issue)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id),
    reviewer_id UUID NOT NULL REFERENCES authors(id),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'declined')),
    recommendation VARCHAR(20) CHECK (recommendation IN ('accept', 'minor_revision', 'major_revision', 'reject')),
    github_review_url TEXT,
    confidential_comments_url TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Editorial Board table
CREATE TABLE IF NOT EXISTS editorial_board (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(100) NOT NULL,
    affiliation TEXT NOT NULL,
    expertise_areas JSONB NOT NULL DEFAULT '[]',
    bio TEXT,
    order_position INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Faculty table
CREATE TABLE IF NOT EXISTS faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    expertise_areas JSONB NOT NULL DEFAULT '[]',
    research_interests TEXT,
    publications_count INTEGER DEFAULT 0,
    experience_years INTEGER DEFAULT 0,
    phone VARCHAR(20),
    office_location VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GitHub Links table
CREATE TABLE IF NOT EXISTS github_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('article', 'issue', 'review', 'author_profile')),
    entity_id UUID NOT NULL,
    github_url TEXT NOT NULL,
    file_type VARCHAR(20) NOT NULL CHECK (file_type IN ('markdown', 'pdf', 'json', 'image')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_volume_issue ON articles(volume, issue);
CREATE INDEX IF NOT EXISTS idx_reviews_article_id ON reviews(article_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_github_links_entity ON github_links(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_editorial_board_active ON editorial_board(is_active);
CREATE INDEX IF NOT EXISTS idx_faculty_department ON faculty(department);

-- Add some constraints
ALTER TABLE articles ADD CONSTRAINT check_volume_positive CHECK (volume > 0);
ALTER TABLE articles ADD CONSTRAINT check_issue_positive CHECK (issue > 0);
ALTER TABLE issues ADD CONSTRAINT check_year_valid CHECK (year >= 1984 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 5);
