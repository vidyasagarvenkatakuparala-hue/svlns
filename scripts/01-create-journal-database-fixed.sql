-- SVLNS GDC Multidisciplinary Journal Database Schema - Fixed Version
-- Complete database structure with consistent data types and relationships

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS issues CASCADE;
DROP TABLE IF EXISTS github_links CASCADE;
DROP TABLE IF EXISTS faculty CASCADE;
DROP TABLE IF EXISTS editorial_board CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS journal_settings CASCADE;
DROP TABLE IF EXISTS reviewers CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;

-- Journal Settings Table
CREATE TABLE journal_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions Table (for manuscript submissions)
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    institution TEXT NOT NULL,
    abstract TEXT NOT NULL,
    keywords TEXT NOT NULL,
    year INTEGER NOT NULL,
    pdf_url TEXT,
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Authors Table (matches website expectations)
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    affiliation TEXT NOT NULL,
    department VARCHAR(200),
    position VARCHAR(100),
    orcid_id VARCHAR(50),
    bio TEXT,
    profile_image_url TEXT,
    phone VARCHAR(20),
    office_location VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Editorial Board Table (matches website display)
CREATE TABLE editorial_board (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(200) NOT NULL,
    affiliation TEXT NOT NULL,
    expertise_areas JSONB DEFAULT '[]'::jsonb,
    bio TEXT,
    profile_image_url TEXT,
    order_position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Faculty Table (matches faculty research page)
CREATE TABLE faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    expertise_areas JSONB DEFAULT '[]'::jsonb,
    research_interests TEXT,
    publications_count INTEGER DEFAULT 0,
    experience_years INTEGER DEFAULT 0,
    phone VARCHAR(20),
    office_location VARCHAR(100),
    bio TEXT,
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Issues Table
CREATE TABLE issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volume INTEGER NOT NULL,
    issue_number INTEGER NOT NULL,
    year INTEGER NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    publication_date DATE NOT NULL,
    is_special_issue BOOLEAN DEFAULT false,
    special_issue_theme VARCHAR(300),
    cover_image_url TEXT,
    status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    article_count INTEGER DEFAULT 0,
    total_pages VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(volume, issue_number)
);

-- Articles Table (matches website article structure)
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    keywords JSONB DEFAULT '[]'::jsonb,
    article_type VARCHAR(50) NOT NULL CHECK (article_type IN ('research_article', 'review_article', 'short_communication', 'case_study', 'editorial', 'letter_to_editor')),
    subject_area VARCHAR(200) NOT NULL,
    intended_audience TEXT,
    
    -- Author Information
    primary_author_id UUID REFERENCES authors(id),
    corresponding_author_email VARCHAR(255) NOT NULL,
    co_authors JSONB DEFAULT '[]'::jsonb,
    
    -- File Management
    manuscript_file_url TEXT,
    supplementary_files JSONB DEFAULT '[]'::jsonb,
    cover_letter TEXT,
    ethics_declaration TEXT,
    permissions_note TEXT,
    funding_information TEXT,
    conflict_of_interest TEXT,
    
    -- Publication Details
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    publication_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'revision_required', 'accepted', 'published', 'rejected')),
    volume INTEGER,
    issue INTEGER,
    pages VARCHAR(20),
    doi VARCHAR(100),
    
    -- GitHub Integration
    github_content_url TEXT,
    github_pdf_url TEXT,
    github_metadata_url TEXT,
    
    -- Metrics
    word_count INTEGER,
    page_count INTEGER,
    download_count INTEGER DEFAULT 0,
    citation_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviewers Table
CREATE TABLE reviewers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    affiliation TEXT NOT NULL,
    expertise_areas JSONB DEFAULT '[]'::jsonb,
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES reviewers(id),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
    recommendation VARCHAR(50) CHECK (recommendation IN ('accept', 'minor_revision', 'major_revision', 'reject')),
    comments TEXT,
    confidential_comments TEXT,
    review_file_url TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GitHub Links Table
CREATE TABLE github_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('article', 'issue', 'review', 'author_profile', 'faculty_profile')),
    entity_id UUID NOT NULL,
    github_url TEXT NOT NULL,
    file_type VARCHAR(20) NOT NULL CHECK (file_type IN ('markdown', 'pdf', 'json', 'image', 'data')),
    description TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_year ON submissions(year);
CREATE INDEX idx_articles_primary_author ON articles(primary_author_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_publication_date ON articles(publication_date);
CREATE INDEX idx_articles_volume_issue ON articles(volume, issue);
CREATE INDEX idx_articles_subject_area ON articles(subject_area);
CREATE INDEX idx_reviews_article_id ON reviews(article_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_editorial_board_active ON editorial_board(is_active);
CREATE INDEX idx_editorial_board_position ON editorial_board(order_position);
CREATE INDEX idx_faculty_department ON faculty(department);
CREATE INDEX idx_faculty_active ON faculty(is_active);
CREATE INDEX idx_github_links_entity ON github_links(entity_type, entity_id);
CREATE INDEX idx_issues_volume_issue ON issues(volume, issue_number);
CREATE INDEX idx_authors_email ON authors(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_journal_settings_updated_at BEFORE UPDATE ON journal_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_editorial_board_updated_at BEFORE UPDATE ON editorial_board FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON faculty FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviewers_updated_at BEFORE UPDATE ON reviewers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
