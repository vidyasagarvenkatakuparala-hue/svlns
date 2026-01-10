-- Database Functions for SVLNS GDC Journal
-- This script creates helper functions and stored procedures

-- ============================================
-- FUNCTION: Get Submission Statistics
-- ============================================
CREATE OR REPLACE FUNCTION get_submission_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_submissions', (SELECT COUNT(*) FROM articles),
        'published', (SELECT COUNT(*) FROM articles WHERE status = 'published'),
        'under_review', (SELECT COUNT(*) FROM articles WHERE status = 'under_review'),
        'pending', (SELECT COUNT(*) FROM articles WHERE status = 'submitted'),
        'this_month', (SELECT COUNT(*) FROM articles WHERE submission_date >= date_trunc('month', CURRENT_DATE))
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION: Publish Article
-- ============================================
CREATE OR REPLACE FUNCTION publish_article(
    article_id UUID,
    volume_num INTEGER,
    issue_num INTEGER,
    page_range VARCHAR(50),
    doi_string VARCHAR(255) DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE articles
    SET 
        status = 'published',
        volume = volume_num,
        issue = issue_num,
        pages = page_range,
        doi = doi_string,
        publication_date = NOW(),
        updated_at = NOW()
    WHERE id = article_id;
    
    -- Update issue article count
    UPDATE issues
    SET 
        article_count = article_count + 1,
        updated_at = NOW()
    WHERE volume = volume_num AND issue_number = issue_num;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION: Get Issue with Articles
-- ============================================
CREATE OR REPLACE FUNCTION get_issue_with_articles(issue_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'issue', (SELECT row_to_json(i) FROM issues i WHERE i.id = issue_id),
        'articles', (
            SELECT json_agg(row_to_json(a))
            FROM articles a
            WHERE a.volume = (SELECT volume FROM issues WHERE id = issue_id)
            AND a.issue = (SELECT issue_number FROM issues WHERE id = issue_id)
            AND (a.status = 'published' OR a.status IS NULL)
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION: Search Articles
-- ============================================
CREATE OR REPLACE FUNCTION search_articles(
    search_term TEXT,
    subject_filter TEXT DEFAULT NULL,
    year_filter INTEGER DEFAULT NULL,
    limit_count INTEGER DEFAULT 20,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title VARCHAR(1000),
    abstract TEXT,
    keywords TEXT[],
    subject_area VARCHAR(255),
    publication_date TIMESTAMP WITH TIME ZONE,
    volume INTEGER,
    issue INTEGER,
    pages VARCHAR(50),
    doi VARCHAR(255),
    author_name TEXT,
    relevance_score REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.title,
        a.abstract,
        a.keywords,
        a.subject_area,
        a.publication_date,
        a.volume,
        a.issue,
        a.pages,
        a.doi,
        CONCAT(auth.first_name, ' ', auth.last_name) as author_name,
        ts_rank(
            to_tsvector('english', COALESCE(a.title, '') || ' ' || COALESCE(a.abstract, '')),
            plainto_tsquery('english', search_term)
        ) as relevance_score
    FROM articles a
    LEFT JOIN authors auth ON a.primary_author_id = auth.id
    WHERE (a.status = 'published' OR a.status IS NULL)
    AND (
        search_term IS NULL 
        OR search_term = ''
        OR to_tsvector('english', COALESCE(a.title, '') || ' ' || COALESCE(a.abstract, '')) @@ plainto_tsquery('english', search_term)
        OR a.title ILIKE '%' || search_term || '%'
        OR a.abstract ILIKE '%' || search_term || '%'
    )
    AND (subject_filter IS NULL OR a.subject_area = subject_filter)
    AND (year_filter IS NULL OR EXTRACT(YEAR FROM a.publication_date) = year_filter)
    ORDER BY relevance_score DESC, a.publication_date DESC NULLS LAST
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION: Increment Download Count
-- ============================================
CREATE OR REPLACE FUNCTION increment_download_count(article_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE articles
    SET download_count = download_count + 1
    WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION: Get Journal Statistics
-- ============================================
CREATE OR REPLACE FUNCTION get_journal_statistics()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_articles', (SELECT COUNT(*) FROM articles WHERE status = 'published' OR status IS NULL),
        'total_issues', (SELECT COUNT(*) FROM issues WHERE status = 'published' OR status IS NULL),
        'total_authors', (SELECT COUNT(*) FROM authors),
        'total_downloads', (SELECT COALESCE(SUM(download_count), 0) FROM articles),
        'subjects', (
            SELECT json_agg(DISTINCT subject_area)
            FROM articles
            WHERE (status = 'published' OR status IS NULL)
            AND subject_area IS NOT NULL
        ),
        'years', (
            SELECT json_agg(DISTINCT year ORDER BY year DESC)
            FROM issues
            WHERE (status = 'published' OR status IS NULL)
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
