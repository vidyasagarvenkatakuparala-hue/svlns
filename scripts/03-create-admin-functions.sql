-- Administrative functions for SVLNS GDC Multidisciplinary Journal
-- This script creates stored procedures and functions for journal administration

-- Function to get article statistics
CREATE OR REPLACE FUNCTION get_article_statistics()
RETURNS TABLE (
    total_articles BIGINT,
    published_articles BIGINT,
    in_review_articles BIGINT,
    draft_articles BIGINT,
    total_authors BIGINT,
    current_volume INTEGER,
    current_issue INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM articles) as total_articles,
        (SELECT COUNT(*) FROM articles WHERE status = 'published') as published_articles,
        (SELECT COUNT(*) FROM articles WHERE status = 'in_review') as in_review_articles,
        (SELECT COUNT(*) FROM articles WHERE status = 'draft') as draft_articles,
        (SELECT COUNT(*) FROM authors) as total_authors,
        (SELECT COALESCE(MAX(volume), 1) FROM issues) as current_volume,
        (SELECT COALESCE(MAX(issue), 1) FROM issues WHERE volume = (SELECT COALESCE(MAX(volume), 1) FROM issues)) as current_issue;
END;
$$ LANGUAGE plpgsql;

-- Function to publish an article
CREATE OR REPLACE FUNCTION publish_article(
    article_id UUID,
    publication_date DATE DEFAULT CURRENT_DATE,
    doi_value VARCHAR(100) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    article_exists BOOLEAN;
BEGIN
    -- Check if article exists and is not already published
    SELECT EXISTS(
        SELECT 1 FROM articles 
        WHERE id = article_id AND status != 'published'
    ) INTO article_exists;
    
    IF NOT article_exists THEN
        RETURN FALSE;
    END IF;
    
    -- Update article status
    UPDATE articles 
    SET 
        status = 'published',
        publication_date = publish_article.publication_date,
        doi = COALESCE(publish_article.doi_value, doi)
    WHERE id = article_id;
    
    -- Update issue article count
    UPDATE issues 
    SET article_count = article_count + 1
    WHERE volume = (SELECT volume FROM articles WHERE id = article_id)
    AND issue = (SELECT issue FROM articles WHERE id = article_id);
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to create a new issue
CREATE OR REPLACE FUNCTION create_new_issue(
    volume_num INTEGER,
    issue_num INTEGER,
    year_val INTEGER,
    title_val VARCHAR(255),
    description_val TEXT DEFAULT NULL,
    publish_date_val DATE DEFAULT CURRENT_DATE,
    special_issue_val BOOLEAN DEFAULT FALSE
)
RETURNS UUID AS $$
DECLARE
    new_issue_id UUID;
    issue_exists BOOLEAN;
BEGIN
    -- Check if issue already exists
    SELECT EXISTS(
        SELECT 1 FROM issues 
        WHERE volume = volume_num AND issue = issue_num
    ) INTO issue_exists;
    
    IF issue_exists THEN
        RAISE EXCEPTION 'Issue % of Volume % already exists', issue_num, volume_num;
    END IF;
    
    -- Insert new issue
    INSERT INTO issues (volume, issue, year, title, description, publish_date, special_issue)
    VALUES (volume_num, issue_num, year_val, title_val, description_val, publish_date_val, special_issue_val)
    RETURNING id INTO new_issue_id;
    
    RETURN new_issue_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get editorial board members by position
CREATE OR REPLACE FUNCTION get_editorial_board_by_position(position_filter VARCHAR(100) DEFAULT NULL)
RETURNS TABLE (
    id UUID,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    position VARCHAR(100),
    affiliation TEXT,
    expertise_areas JSONB,
    bio TEXT,
    order_position INTEGER
) AS $$
BEGIN
    IF position_filter IS NULL THEN
        RETURN QUERY
        SELECT eb.id, eb.first_name, eb.last_name, eb.email, eb.position, 
               eb.affiliation, eb.expertise_areas, eb.bio, eb.order_position
        FROM editorial_board eb
        WHERE eb.is_active = TRUE
        ORDER BY eb.order_position;
    ELSE
        RETURN QUERY
        SELECT eb.id, eb.first_name, eb.last_name, eb.email, eb.position, 
               eb.affiliation, eb.expertise_areas, eb.bio, eb.order_position
        FROM editorial_board eb
        WHERE eb.is_active = TRUE AND eb.position ILIKE '%' || position_filter || '%'
        ORDER BY eb.order_position;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to search articles
CREATE OR REPLACE FUNCTION search_articles(
    search_term TEXT DEFAULT NULL,
    subject_area_filter VARCHAR(100) DEFAULT NULL,
    status_filter VARCHAR(20) DEFAULT NULL,
    volume_filter INTEGER DEFAULT NULL,
    issue_filter INTEGER DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    abstract TEXT,
    keywords JSONB,
    article_type VARCHAR(50),
    subject_area VARCHAR(100),
    status VARCHAR(20),
    volume INTEGER,
    issue INTEGER,
    pages VARCHAR(20),
    doi VARCHAR(100),
    author_name TEXT,
    publication_date DATE,
    submission_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id, a.title, a.abstract, a.keywords, a.article_type, a.subject_area,
        a.status, a.volume, a.issue, a.pages, a.doi,
        CONCAT(au.first_name, ' ', au.last_name) as author_name,
        a.publication_date, a.submission_date
    FROM articles a
    JOIN authors au ON a.author_id = au.id
    WHERE 
        (search_term IS NULL OR 
         a.title ILIKE '%' || search_term || '%' OR 
         a.abstract ILIKE '%' || search_term || '%' OR
         a.keywords::text ILIKE '%' || search_term || '%')
    AND (subject_area_filter IS NULL OR a.subject_area = subject_area_filter)
    AND (status_filter IS NULL OR a.status = status_filter)
    AND (volume_filter IS NULL OR a.volume = volume_filter)
    AND (issue_filter IS NULL OR a.issue = issue_filter)
    ORDER BY a.publication_date DESC, a.submission_date DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get faculty research statistics
CREATE OR REPLACE FUNCTION get_faculty_research_stats()
RETURNS TABLE (
    total_faculty BIGINT,
    total_publications BIGINT,
    avg_experience NUMERIC,
    departments_count BIGINT,
    top_department TEXT,
    most_publications INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM faculty) as total_faculty,
        (SELECT SUM(publications_count) FROM faculty) as total_publications,
        (SELECT ROUND(AVG(experience_years), 1) FROM faculty) as avg_experience,
        (SELECT COUNT(DISTINCT department) FROM faculty) as departments_count,
        (SELECT department FROM faculty GROUP BY department ORDER BY COUNT(*) DESC LIMIT 1) as top_department,
        (SELECT MAX(publications_count) FROM faculty) as most_publications;
END;
$$ LANGUAGE plpgsql;

-- Function to update article GitHub URLs
CREATE OR REPLACE FUNCTION update_article_github_urls(
    article_id UUID,
    content_url TEXT DEFAULT NULL,
    pdf_url TEXT DEFAULT NULL,
    metadata_url TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    article_exists BOOLEAN;
BEGIN
    -- Check if article exists
    SELECT EXISTS(SELECT 1 FROM articles WHERE id = article_id) INTO article_exists;
    
    IF NOT article_exists THEN
        RETURN FALSE;
    END IF;
    
    -- Update GitHub URLs
    UPDATE articles 
    SET 
        github_content_url = COALESCE(content_url, github_content_url),
        github_pdf_url = COALESCE(pdf_url, github_pdf_url),
        github_metadata_url = COALESCE(metadata_url, github_metadata_url)
    WHERE id = article_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create view for published articles with author information
CREATE OR REPLACE VIEW published_articles_view AS
SELECT 
    a.id,
    a.title,
    a.abstract,
    a.keywords,
    a.article_type,
    a.subject_area,
    a.volume,
    a.issue,
    a.pages,
    a.doi,
    a.github_content_url,
    a.github_pdf_url,
    a.publication_date,
    CONCAT(au.first_name, ' ', au.last_name) as author_name,
    au.email as author_email,
    au.affiliation as author_affiliation,
    a.co_authors
FROM articles a
JOIN authors au ON a.author_id = au.id
WHERE a.status = 'published'
ORDER BY a.publication_date DESC, a.volume DESC, a.issue DESC;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_article_statistics() TO PUBLIC;
GRANT EXECUTE ON FUNCTION publish_article(UUID, DATE, VARCHAR) TO PUBLIC;
GRANT EXECUTE ON FUNCTION create_new_issue(INTEGER, INTEGER, INTEGER, VARCHAR, TEXT, DATE, BOOLEAN) TO PUBLIC;
GRANT EXECUTE ON FUNCTION get_editorial_board_by_position(VARCHAR) TO PUBLIC;
GRANT EXECUTE ON FUNCTION search_articles(TEXT, VARCHAR, VARCHAR, INTEGER, INTEGER) TO PUBLIC;
GRANT EXECUTE ON FUNCTION get_faculty_research_stats() TO PUBLIC;
GRANT EXECUTE ON FUNCTION update_article_github_urls(UUID, TEXT, TEXT, TEXT) TO PUBLIC;
GRANT SELECT ON published_articles_view TO PUBLIC;
