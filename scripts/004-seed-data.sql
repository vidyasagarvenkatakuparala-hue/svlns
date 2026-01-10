-- Seed Data for SVLNS GDC Multidisciplinary Journal
-- This script inserts initial data for the journal

-- ============================================
-- JOURNAL SETTINGS
-- ============================================
INSERT INTO journal_settings (setting_key, setting_value, description) VALUES
    ('journal_name', 'SVLNS GDC Multidisciplinary Journal', 'Official name of the journal'),
    ('tagline', 'Advancing Knowledge Across Disciplines', 'Journal tagline'),
    ('journal_email', 'svlns.gdc@gmail.com', 'Primary contact email'),
    ('issn', 'Applied', 'Journal ISSN number'),
    ('publisher', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Publisher name'),
    ('address', 'Bheemunipatnam, Visakhapatnam District, Andhra Pradesh, India', 'Publisher address'),
    ('phone', '8247685902', 'Contact phone number'),
    ('established_year', '2024', 'Year journal was established'),
    ('current_volume', '1', 'Current volume number'),
    ('current_issue_number', '1', 'Current issue number')
ON CONFLICT (setting_key) DO UPDATE SET
    setting_value = EXCLUDED.setting_value,
    updated_at = NOW();

-- ============================================
-- EDITORIAL BOARD MEMBERS
-- ============================================
INSERT INTO editorial_board (first_name, last_name, position, affiliation, email, bio, expertise_areas, is_active, order_position) VALUES
    ('Dr. V.', 'Narasimha Rao', 'Editor-in-Chief', 'Department of Chemistry, SVLNS GDC, Bheemunipatnam', 'editor.svlnsgdc@gmail.com', 'Dr. V. Narasimha Rao is a distinguished academician with over 25 years of experience in Chemistry education and research. He has published numerous papers in national and international journals.', ARRAY['Organic Chemistry', 'Environmental Chemistry', 'Analytical Chemistry'], true, 1),
    ('Dr. P.', 'Srinivasa Rao', 'Associate Editor - Sciences', 'Department of Physics, SVLNS GDC, Bheemunipatnam', 'physics.svlnsgdc@gmail.com', 'Dr. P. Srinivasa Rao specializes in condensed matter physics and has contributed significantly to materials science research.', ARRAY['Condensed Matter Physics', 'Materials Science', 'Spectroscopy'], true, 2),
    ('Dr. K.', 'Lakshmi Devi', 'Associate Editor - Arts', 'Department of English, SVLNS GDC, Bheemunipatnam', 'english.svlnsgdc@gmail.com', 'Dr. K. Lakshmi Devi is an expert in English Literature with special focus on Indian English Literature and postcolonial studies.', ARRAY['English Literature', 'Postcolonial Studies', 'Indian English Literature'], true, 3),
    ('Dr. M.', 'Venkata Rao', 'Associate Editor - Commerce', 'Department of Commerce, SVLNS GDC, Bheemunipatnam', 'commerce.svlnsgdc@gmail.com', 'Dr. M. Venkata Rao has extensive experience in commerce education and has published research on rural economics and small business development.', ARRAY['Commerce', 'Business Studies', 'Rural Economics'], true, 4),
    ('Sri. G.', 'Ravi Kumar', 'Managing Editor', 'Department of Computer Science, SVLNS GDC, Bheemunipatnam', 'cs.svlnsgdc@gmail.com', 'Sri. G. Ravi Kumar manages the technical aspects of journal publication and has expertise in digital publishing and academic databases.', ARRAY['Computer Science', 'Digital Publishing', 'Database Management'], true, 5)
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE AUTHORS
-- ============================================
INSERT INTO authors (first_name, last_name, email, affiliation, department, position) VALUES
    ('Srinivas', 'Kumar', 'srinivas.kumar@example.com', 'SVLNS GDC, Bheemunipatnam', 'Chemistry', 'Assistant Professor'),
    ('Lakshmi', 'Devi', 'lakshmi.devi@example.com', 'SVLNS GDC, Bheemunipatnam', 'Botany', 'Associate Professor'),
    ('Venkata', 'Ramana', 'venkata.ramana@example.com', 'SVLNS GDC, Bheemunipatnam', 'History', 'Assistant Professor'),
    ('Padma', 'Sri', 'padma.sri@example.com', 'SVLNS GDC, Bheemunipatnam', 'Economics', 'Assistant Professor')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SAMPLE ISSUE
-- ============================================
INSERT INTO issues (volume, issue_number, year, title, description, publication_date, status, article_count, is_special_issue) VALUES
    (1, 1, 2025, 'Inaugural Issue: Foundations of Multidisciplinary Research', 'The inaugural issue of SVLNS GDC Multidisciplinary Journal, celebrating 40 years of educational excellence and featuring research from various disciplines.', '2025-01-15', 'published', 4, true)
ON CONFLICT (volume, issue_number) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = NOW();

-- ============================================
-- SAMPLE ARTICLES
-- ============================================
INSERT INTO articles (
    title, abstract, keywords, article_type, subject_area, 
    corresponding_author_email, submission_date, publication_date, 
    status, volume, issue, pages
) VALUES
    (
        'Biodiversity Conservation in Coastal Andhra Pradesh: A Community-Based Approach',
        'This study examines community-based conservation initiatives in coastal Andhra Pradesh, with particular focus on the Bheemunipatnam region. Through extensive field surveys and community engagement, we identify key biodiversity hotspots and evaluate the effectiveness of local conservation practices.',
        ARRAY['Biodiversity', 'Conservation', 'Coastal Ecosystems', 'Community Engagement', 'Andhra Pradesh'],
        'research_article',
        'Biology',
        'lakshmi.devi@example.com',
        '2024-10-15',
        '2025-01-15',
        'published',
        1, 1, '1-15'
    ),
    (
        'Historical Significance of Bheemunipatnam: Archaeological Evidence of Maritime Trade',
        'Bheemunipatnam, one of the oldest municipalities in India, holds significant archaeological importance. This paper presents new findings from recent excavations that reveal the town''s role in ancient maritime trade networks connecting the Indian subcontinent with Southeast Asia.',
        ARRAY['Archaeology', 'Maritime History', 'Bheemunipatnam', 'Trade Routes', 'Cultural Heritage'],
        'research_article',
        'History',
        'venkata.ramana@example.com',
        '2024-10-20',
        '2025-01-15',
        'published',
        1, 1, '16-32'
    ),
    (
        'Traditional Medicinal Plants of Coastal Communities: A Phytochemical Analysis',
        'This research documents traditional medicinal plants used by coastal communities near Bheemunipatnam and presents a detailed phytochemical analysis of selected species. The study aims to bridge traditional knowledge with modern scientific validation.',
        ARRAY['Medicinal Plants', 'Phytochemistry', 'Traditional Knowledge', 'Coastal Communities', 'Drug Discovery'],
        'research_article',
        'Chemistry',
        'srinivas.kumar@example.com',
        '2024-11-01',
        '2025-01-15',
        'published',
        1, 1, '33-48'
    ),
    (
        'Socio-Economic Impact of Higher Education: A 40-Year Transformation Study of SVLNS GDC',
        'This longitudinal study analyzes the socio-economic transformation brought about by SVLNS Government Degree College over four decades. Using quantitative and qualitative methods, we measure the impact on employment, income levels, and social mobility of graduates from economically disadvantaged backgrounds.',
        ARRAY['Higher Education', 'Social Transformation', 'Economic Development', 'Rural Education', 'Impact Assessment'],
        'research_article',
        'Economics',
        'padma.sri@example.com',
        '2024-11-10',
        '2025-01-15',
        'published',
        1, 1, '49-65'
    )
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE FACULTY
-- ============================================
INSERT INTO faculty (first_name, last_name, email, department, position, expertise_areas, research_interests, publications_count, experience_years, is_active) VALUES
    ('Dr. V.', 'Narasimha Rao', 'narasimha.rao@svlnsgdc.edu', 'Chemistry', 'Associate Professor & Principal In-Charge', ARRAY['Organic Chemistry', 'Environmental Chemistry'], 'Green Chemistry and Sustainable Development', 45, 28, true),
    ('Dr. P.', 'Srinivasa Rao', 'srinivasa.rao@svlnsgdc.edu', 'Physics', 'Associate Professor', ARRAY['Condensed Matter Physics', 'Materials Science'], 'Nanomaterials and Their Applications', 32, 22, true),
    ('Dr. K.', 'Lakshmi Devi', 'lakshmi.devi@svlnsgdc.edu', 'English', 'Associate Professor', ARRAY['English Literature', 'Postcolonial Studies'], 'Indian English Literature and Cultural Studies', 28, 20, true),
    ('Dr. M.', 'Venkata Rao', 'venkata.rao@svlnsgdc.edu', 'Commerce', 'Associate Professor', ARRAY['Commerce', 'Business Studies'], 'Rural Economics and Small Business Development', 35, 24, true),
    ('Sri. G.', 'Ravi Kumar', 'ravi.kumar@svlnsgdc.edu', 'Computer Science', 'Assistant Professor', ARRAY['Computer Science', 'Data Analytics'], 'Educational Technology and Digital Learning', 15, 12, true)
ON CONFLICT (email) DO UPDATE SET
    position = EXCLUDED.position,
    expertise_areas = EXCLUDED.expertise_areas,
    updated_at = NOW();
