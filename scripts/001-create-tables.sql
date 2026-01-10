-- Journal Database Schema for SVLNS GDC Multidisciplinary Journal
-- This script creates all necessary tables for the journal management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- AUTHORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    affiliation VARCHAR(500),
    department VARCHAR(255),
    position VARCHAR(255),
    orcid_id VARCHAR(50),
    bio TEXT,
    profile_image_url TEXT,
    phone VARCHAR(50),
    office_location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- EDITORIAL BOARD TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS editorial_board (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    position VARCHAR(255) NOT NULL,
    affiliation VARCHAR(500),
    email VARCHAR(255),
    bio TEXT,
    expertise_areas TEXT[],
    profile_url TEXT,
    is_active BOOLEAN DEFAULT true,
    order_position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ISSUES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volume INTEGER NOT NULL,
    issue_number INTEGER NOT NULL,
    year INTEGER NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    publication_date DATE,
    is_special_issue BOOLEAN DEFAULT false,
    special_issue_theme VARCHAR(500),
    cover_image_url TEXT,
    pdf_url TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    article_count INTEGER DEFAULT 0,
    total_pages VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(volume, issue_number)
);

-- ============================================
-- ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(1000) NOT NULL,
    abstract TEXT NOT NULL,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    article_type VARCHAR(50) NOT NULL CHECK (article_type IN (
        'research_article', 'review_article', 'short_communication', 
        'case_study', 'editorial', 'letter_to_editor'
    )),
    subject_area VARCHAR(255) NOT NULL,
    intended_audience TEXT,
    primary_author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
    corresponding_author_email VARCHAR(255) NOT NULL,
    co_authors JSONB DEFAULT '[]',
    manuscript_file_url TEXT,
    supplementary_files JSONB DEFAULT '[]',
    cover_letter TEXT,
    ethics_declaration TEXT,
    permissions_note TEXT,
    funding_information TEXT,
    conflict_of_interest TEXT,
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    publication_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN (
        'submitted', 'under_review', 'revision_required', 
        'accepted', 'published', 'rejected'
    )),
    volume INTEGER,
    issue INTEGER,
    pages VARCHAR(50),
    doi VARCHAR(255),
    github_content_url TEXT,
    github_pdf_url TEXT,
    github_metadata_url TEXT,
    word_count INTEGER,
    page_count INTEGER,
    download_count INTEGER DEFAULT 0,
    citation_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SUBMISSIONS TABLE (for public submissions)
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(1000) NOT NULL,
    authors VARCHAR(1000) NOT NULL,
    email VARCHAR(255) NOT NULL,
    institution VARCHAR(500) NOT NULL,
    abstract TEXT NOT NULL,
    keywords TEXT NOT NULL,
    pdf_url TEXT,
    year INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN (
        'submitted', 'under_review', 'accepted', 'rejected'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES authors(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
        'pending', 'accepted', 'declined', 'completed'
    )),
    recommendation VARCHAR(50) CHECK (recommendation IN (
        'accept', 'minor_revision', 'major_revision', 'reject'
    )),
    comments TEXT,
    confidential_comments TEXT,
    review_file_url TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- REVIEWERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviewers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    affiliation VARCHAR(500),
    expertise_areas TEXT[] DEFAULT '{}',
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FACULTY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    expertise_areas TEXT[] DEFAULT '{}',
    research_interests TEXT,
    publications_count INTEGER DEFAULT 0,
    experience_years INTEGER DEFAULT 0,
    phone VARCHAR(50),
    office_location VARCHAR(255),
    bio TEXT,
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- JOURNAL SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS journal_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- GITHUB LINKS TABLE (for PDF storage)
-- ============================================
CREATE TABLE IF NOT EXISTS github_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('article', 'issue', 'submission')),
    entity_id UUID NOT NULL,
    github_url TEXT NOT NULL,
    file_type VARCHAR(50) DEFAULT 'pdf',
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADMIN USERS TABLE (for journal administration)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'reviewer')),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_volume_issue ON articles(volume, issue);
CREATE INDEX IF NOT EXISTS idx_articles_publication_date ON articles(publication_date);
CREATE INDEX IF NOT EXISTS idx_articles_subject_area ON articles(subject_area);
CREATE INDEX IF NOT EXISTS idx_issues_volume_issue ON issues(volume, issue_number);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
CREATE INDEX IF NOT EXISTS idx_issues_year ON issues(year);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_year ON submissions(year);
CREATE INDEX IF NOT EXISTS idx_editorial_board_active ON editorial_board(is_active);
CREATE INDEX IF NOT EXISTS idx_editorial_board_position ON editorial_board(order_position);
CREATE INDEX IF NOT EXISTS idx_github_links_entity ON github_links(entity_type, entity_id);

-- ============================================
-- CREATE UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
DROP TRIGGER IF EXISTS update_authors_updated_at ON authors;
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_editorial_board_updated_at ON editorial_board;
CREATE TRIGGER update_editorial_board_updated_at BEFORE UPDATE ON editorial_board FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_issues_updated_at ON issues;
CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_submissions_updated_at ON submissions;
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviewers_updated_at ON reviewers;
CREATE TRIGGER update_reviewers_updated_at BEFORE UPDATE ON reviewers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_faculty_updated_at ON faculty;
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON faculty FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_journal_settings_updated_at ON journal_settings;
CREATE TRIGGER update_journal_settings_updated_at BEFORE UPDATE ON journal_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_github_links_updated_at ON github_links;
CREATE TRIGGER update_github_links_updated_at BEFORE UPDATE ON github_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
