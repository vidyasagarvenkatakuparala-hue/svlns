-- Seed data for SVLNS GDC Multidisciplinary Journal - Consistent Version
-- This script ensures data consistency between database and website

-- Insert journal settings
INSERT INTO journal_settings (setting_key, setting_value, description) VALUES
('journal_name', 'SVLNS GDC Multidisciplinary Journal', 'Full name of the journal'),
('journal_short_name', 'SVLNS Journal', 'Short name of the journal'),
('issn_status', 'Applied', 'ISSN application status'),
('publisher', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Publisher name'),
('college_established', '1984', 'Year college was established'),
('college_location', 'Bheemunipatnam, Visakhapatnam District, Andhra Pradesh - 531163', 'College location'),
('naac_accredited', 'true', 'NAAC accreditation status'),
('contact_email', 'svlns.gdc@gmail.com', 'Primary contact email'),
('contact_phone', '8247685902', 'Contact phone number'),
('principal_name', 'Dr. P. Surekha', 'Principal name'),
('current_volume', '1', 'Current journal volume'),
('current_issue', '1', 'Current journal issue');

-- Insert Authors (Faculty as Authors) - Consistent with Faculty Table
INSERT INTO authors (first_name, last_name, email, affiliation, department, position, orcid_id, bio, phone, office_location) VALUES
('Dr. P.', 'Surekha', 'principal@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Administration', 'Principal', '0000-0001-1234-5678', 'Principal and academic leader with over 25 years of experience in higher education. Leading institutional transformation and quality enhancement initiatives.', '8247685902', 'Principal''s Office'),
('Dr. K.', 'Ramesh', 'ramesh@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Physics', 'Professor & Head', '0000-0001-2345-6789', 'Professor and Head of Physics Department with extensive research in materials science and nanotechnology applications.', NULL, 'Physics Department, Room 201'),
('Dr. M.', 'Lakshmi', 'lakshmi@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Chemistry', 'Associate Professor', '0000-0001-3456-7890', 'Associate Professor specializing in environmental chemistry with focus on coastal pollution and remediation strategies.', NULL, 'Chemistry Lab, Block A'),
('Dr. S.', 'Prasad', 'prasad@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Botany', 'Professor', '0000-0001-4567-8901', 'Professor of Botany with expertise in coastal plant ecology and traditional medicinal plant research.', NULL, 'Botany Department, Herbarium'),
('Dr. V.', 'Rao', 'vrao@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Zoology', 'Associate Professor', '0000-0001-5678-9012', 'Associate Professor specializing in marine biology with focus on coastal ecosystem conservation and fisheries research.', NULL, 'Zoology Lab, Block B'),
('Dr. G.', 'Krishna', 'krishna@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Mathematics', 'Professor', '0000-0001-6789-0123', 'Professor of Mathematics with expertise in applied mathematics and statistical modeling for biological systems.', NULL, 'Mathematics Department, Room 105'),
('Dr. R.', 'Devi', 'rdevi@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'English', 'Associate Professor', '0000-0001-7890-1234', 'Associate Professor of English with research focus on Indian English literature and innovative language teaching methods.', NULL, 'English Department, Room 301'),
('Dr. N.', 'Kumar', 'nkumar@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Telugu', 'Professor', '0000-0001-8901-2345', 'Professor of Telugu with expertise in classical literature and cultural heritage preservation of coastal Andhra Pradesh.', NULL, 'Telugu Department, Room 205'),
('Dr. P.', 'Reddy', 'preddy@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'History', 'Associate Professor', '0000-0001-9012-3456', 'Associate Professor specializing in regional history with focus on maritime trade and archaeological studies of coastal regions.', NULL, 'History Department, Room 102'),
('Dr. A.', 'Sharma', 'asharma@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Economics', 'Professor', '0000-0001-0123-4567', 'Professor of Economics with expertise in rural development and agricultural economics, focusing on policy implications for coastal communities.', NULL, 'Economics Department, Room 203'),
('Dr. B.', 'Murthy', 'bmurthy@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Political Science', 'Associate Professor', '0000-0001-1234-5679', 'Associate Professor of Political Science with research focus on governance structures and public policy implementation.', NULL, 'Political Science Department, Room 304'),
('Dr. L.', 'Srinivas', 'lsrinivas@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Commerce', 'Professor', '0000-0001-2345-6780', 'Professor of Commerce with expertise in business development and financial management, particularly for rural and coastal enterprises.', NULL, 'Commerce Department, Room 401'),
('Dr. T.', 'Vijaya', 'tvijaya@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Computer Science', 'Assistant Professor', '0000-0001-3456-7891', 'Assistant Professor of Computer Science specializing in educational technology and digital transformation initiatives.', NULL, 'Computer Lab, Block C'),
('Dr. K.', 'Madhavi', 'kmadhavi@svlnsgdc.ac.in', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', 'Library Science', 'Librarian', '0000-0001-4567-8902', 'Librarian and information specialist with expertise in research methodology and digital library management.', NULL, 'Central Library');

-- Insert Editorial Board Members (Consistent with Authors)
INSERT INTO editorial_board (first_name, last_name, email, position, affiliation, expertise_areas, bio, order_position, is_active) VALUES
('Dr. P.', 'Surekha', 'principal@svlnsgdc.ac.in', 'Editor-in-Chief & Principal', 'Sri Varaha Lakshmi Narsimha Swami Government Degree College', '["Educational Leadership", "Academic Administration", "Higher Education Policy"]', 'Principal and Editor-in-Chief of SVLNS Government Degree College, Bheemunipatnam. Leading the institution with dedication to quality education and social transformation.', 1, true),
('Dr. K.', 'Ramesh', 'ramesh@svlnsgdc.ac.in', 'Associate Editor - Sciences', 'Department of Physics, SVLNS GDC', '["Physics", "Applied Sciences", "Research Methodology"]', 'Professor and Head, Department of Physics. Specializes in applied physics and interdisciplinary research with focus on coastal environmental studies.', 2, true),
('Dr. M.', 'Lakshmi', 'lakshmi@svlnsgdc.ac.in', 'Associate Editor - Chemistry', 'Department of Chemistry, SVLNS GDC', '["Analytical Chemistry", "Environmental Chemistry", "Marine Chemistry"]', 'Associate Professor, Department of Chemistry. Expert in analytical and environmental chemistry with special focus on coastal water analysis.', 3, true),
('Dr. S.', 'Prasad', 'prasad@svlnsgdc.ac.in', 'Associate Editor - Botany', 'Department of Botany, SVLNS GDC', '["Plant Ecology", "Coastal Botany", "Biodiversity Conservation"]', 'Professor, Department of Botany. Research focus on coastal plant ecology and biodiversity conservation in Andhra Pradesh region.', 4, true),
('Dr. V.', 'Rao', 'vrao@svlnsgdc.ac.in', 'Associate Editor - Zoology', 'Department of Zoology, SVLNS GDC', '["Marine Biology", "Coastal Ecology", "Animal Behavior"]', 'Associate Professor, Department of Zoology. Specializes in marine biology and coastal ecosystem studies with focus on Bay of Bengal marine life.', 5, true),
('Dr. G.', 'Krishna', 'krishna@svlnsgdc.ac.in', 'Associate Editor - Mathematics', 'Department of Mathematics, SVLNS GDC', '["Applied Mathematics", "Statistics", "Mathematical Modeling"]', 'Professor, Department of Mathematics. Expert in applied mathematics and statistical analysis with applications in environmental and social sciences.', 6, true),
('Dr. R.', 'Devi', 'rdevi@svlnsgdc.ac.in', 'Associate Editor - English', 'Department of English, SVLNS GDC', '["English Literature", "Linguistics", "Communication Studies"]', 'Associate Professor, Department of English. Research interests in contemporary literature and effective communication in academic writing.', 7, true),
('Dr. N.', 'Kumar', 'nkumar@svlnsgdc.ac.in', 'Associate Editor - Telugu', 'Department of Telugu, SVLNS GDC', '["Telugu Literature", "Regional Studies", "Cultural Heritage"]', 'Professor, Department of Telugu. Expert in Telugu literature and coastal Andhra Pradesh cultural studies with focus on local traditions.', 8, true),
('Dr. P.', 'Reddy', 'preddy@svlnsgdc.ac.in', 'Associate Editor - History', 'Department of History, SVLNS GDC', '["Regional History", "Archaeology", "Cultural Studies"]', 'Associate Professor, Department of History. Specializes in regional history of coastal Andhra Pradesh and archaeological studies.', 9, true),
('Dr. A.', 'Sharma', 'asharma@svlnsgdc.ac.in', 'Associate Editor - Economics', 'Department of Economics, SVLNS GDC', '["Development Economics", "Rural Economics", "Coastal Economy"]', 'Professor, Department of Economics. Focus on development economics and rural studies with emphasis on coastal community development.', 10, true),
('Dr. B.', 'Murthy', 'bmurthy@svlnsgdc.ac.in', 'Associate Editor - Political Science', 'Department of Political Science, SVLNS GDC', '["Public Administration", "Governance", "Local Government"]', 'Associate Professor, Department of Political Science. Research in governance, public policy, and local government administration.', 11, true),
('Dr. L.', 'Srinivas', 'lsrinivas@svlnsgdc.ac.in', 'Associate Editor - Commerce', 'Department of Commerce, SVLNS GDC', '["Business Studies", "Financial Management", "Entrepreneurship"]', 'Professor, Department of Commerce. Expert in business studies, financial management, and promoting entrepreneurship in rural areas.', 12, true),
('Dr. T.', 'Vijaya', 'tvijaya@svlnsgdc.ac.in', 'Associate Editor - Computer Science', 'Department of Computer Science, SVLNS GDC', '["Information Technology", "Digital Systems", "E-Learning"]', 'Assistant Professor, Department of Computer Science. Specializes in IT applications, digital publishing, and e-learning systems.', 13, true),
('Dr. K.', 'Madhavi', 'kmadhavi@svlnsgdc.ac.in', 'Managing Editor', 'Library & Information Science, SVLNS GDC', '["Library Science", "Information Management", "Research Methodology"]', 'Librarian and Managing Editor. Expert in information management, research methodology, and academic publishing standards.', 14, true);

-- Insert Faculty Research Profiles (Consistent with Authors and Editorial Board)
INSERT INTO faculty (first_name, last_name, email, department, position, expertise_areas, research_interests, publications_count, experience_years, phone, office_location, bio, is_active) VALUES
('Dr. P.', 'Surekha', 'principal@svlnsgdc.ac.in', 'Administration', 'Principal', '["Educational Leadership", "Academic Administration", "Higher Education Policy"]', 'Educational policy development, institutional governance, and quality assurance in higher education. Focus on rural education development and community engagement.', 25, 20, '8247685902', 'Principal''s Office', 'Principal and academic leader with over 25 years of experience in higher education. Leading institutional transformation and quality enhancement initiatives.', true),
('Dr. K.', 'Ramesh', 'ramesh@svlnsgdc.ac.in', 'Physics', 'Professor & Head', '["Applied Physics", "Condensed Matter Physics", "Materials Science"]', 'Nanomaterials synthesis and characterization, semiconductor physics, and renewable energy applications. Special focus on solar cell materials and coastal environmental physics.', 42, 18, NULL, 'Physics Department, Room 201', 'Professor and Head of Physics Department with extensive research in materials science and nanotechnology applications.', true),
('Dr. M.', 'Lakshmi', 'lakshmi@svlnsgdc.ac.in', 'Chemistry', 'Associate Professor', '["Analytical Chemistry", "Environmental Chemistry", "Marine Chemistry"]', 'Water quality analysis of coastal regions, heavy metal contamination studies, and development of eco-friendly analytical methods. Research on Bay of Bengal water chemistry.', 38, 15, NULL, 'Chemistry Lab, Block A', 'Associate Professor specializing in environmental chemistry with focus on coastal pollution and remediation strategies.', true),
('Dr. S.', 'Prasad', 'prasad@svlnsgdc.ac.in', 'Botany', 'Professor', '["Plant Ecology", "Coastal Botany", "Biodiversity Conservation"]', 'Coastal vegetation studies, mangrove ecosystem conservation, and plant adaptation mechanisms in saline environments. Focus on indigenous plant species of Andhra Pradesh coast.', 35, 16, NULL, 'Botany Department, Herbarium', 'Professor of Botany with expertise in plant ecology and traditional medicinal plant research.', true),
('Dr. V.', 'Rao', 'vrao@svlnsgdc.ac.in', 'Zoology', 'Associate Professor', '["Marine Biology", "Coastal Ecology", "Fisheries Science"]', 'Marine biodiversity of Bay of Bengal, fish population dynamics, and impact of climate change on coastal marine ecosystems. Collaborative research with local fishing communities.', 31, 14, NULL, 'Zoology Lab, Block B', 'Associate Professor specializing in marine biology with focus on coastal ecosystem conservation and fisheries research.', true),
('Dr. G.', 'Krishna', 'krishna@svlnsgdc.ac.in', 'Mathematics', 'Professor', '["Applied Mathematics", "Statistics", "Mathematical Modeling"]', 'Statistical analysis of environmental data, mathematical modeling of coastal processes, and operations research applications in rural development projects.', 28, 17, NULL, 'Mathematics Department, Room 105', 'Professor of Mathematics with expertise in applied mathematics and statistical modeling for biological systems.', true),
('Dr. R.', 'Devi', 'rdevi@svlnsgdc.ac.in', 'English', 'Associate Professor', '["English Literature", "Linguistics", "Communication Studies"]', 'Contemporary Indian English literature, sociolinguistics of coastal communities, and effective communication strategies in multilingual academic environments.', 22, 12, NULL, 'English Department, Room 301', 'Associate Professor of English with research focus on Indian English literature and innovative language teaching methods.', true),
('Dr. N.', 'Kumar', 'nkumar@svlnsgdc.ac.in', 'Telugu', 'Professor', '["Telugu Literature", "Regional Studies", "Cultural Heritage"]', 'Classical and modern Telugu literature, oral traditions of coastal Andhra Pradesh, and preservation of regional cultural heritage through digital documentation.', 33, 19, NULL, 'Telugu Department, Room 205', 'Professor of Telugu with expertise in classical literature and cultural heritage preservation of coastal Andhra Pradesh.', true),
('Dr. P.', 'Reddy', 'preddy@svlnsgdc.ac.in', 'History', 'Associate Professor', '["Regional History", "Archaeology", "Cultural Studies"]', 'Historical significance of Bheemunipatnam port, archaeological studies of coastal Andhra Pradesh, and documentation of local historical monuments and traditions.', 26, 13, NULL, 'History Department, Room 102', 'Associate Professor specializing in regional history with focus on maritime trade and archaeological studies of coastal regions.', true),
('Dr. A.', 'Sharma', 'asharma@svlnsgdc.ac.in', 'Economics', 'Professor', '["Development Economics", "Rural Economics", "Coastal Economy"]', 'Economic development of coastal communities, impact of fishing industry on local economy, and sustainable development models for rural areas.', 29, 15, NULL, 'Economics Department, Room 203', 'Professor of Economics with expertise in rural development and agricultural economics, focusing on policy implications for coastal communities.', true),
('Dr. B.', 'Murthy', 'bmurthy@svlnsgdc.ac.in', 'Political Science', 'Associate Professor', '["Public Administration", "Governance", "Local Government"]', 'Local governance systems, panchayati raj institutions, and public policy implementation in rural and coastal areas of Andhra Pradesh.', 24, 11, NULL, 'Political Science Department, Room 304', 'Associate Professor of Political Science with research focus on governance structures and public policy implementation.', true),
('Dr. L.', 'Srinivas', 'lsrinivas@svlnsgdc.ac.in', 'Commerce', 'Professor', '["Business Studies", "Financial Management", "Entrepreneurship"]', 'Small business development in rural areas, microfinance impact studies, and promoting entrepreneurship among coastal communities.', 27, 14, NULL, 'Commerce Department, Room 401', 'Professor of Commerce with expertise in business development and financial management, particularly for rural and coastal enterprises.', true),
('Dr. T.', 'Vijaya', 'tvijaya@svlnsgdc.ac.in', 'Computer Science', 'Assistant Professor', '["Information Technology", "Digital Systems", "E-Learning"]', 'Digital literacy in rural areas, e-learning platform development, and IT applications in education and local governance.', 18, 8, NULL, 'Computer Lab, Block C', 'Assistant Professor of Computer Science specializing in educational technology and digital transformation initiatives.', true),
('Dr. K.', 'Madhavi', 'kmadhavi@svlnsgdc.ac.in', 'Library Science', 'Librarian', '["Library Science", "Information Management", "Digital Archives"]', 'Digital preservation of local historical documents, information literacy programs, and development of institutional repositories for academic research.', 21, 12, NULL, 'Central Library', 'Librarian and information specialist with expertise in research methodology and digital library management.', true);

-- Insert Reviewers (External reviewers from other institutions)
INSERT INTO reviewers (first_name, last_name, email, affiliation, expertise_areas, is_active) VALUES
('Dr. Madhavi', 'Latha', 'madhavi.latha@andhrauniv.edu.in', 'Andhra University, Visakhapatnam', '["Environmental Science", "Biodiversity", "Coastal Ecology"]', true),
('Prof. Subhash', 'Chandra', 'subhash.chandra@jntu.ac.in', 'JNTU Kakinada', '["History", "Archaeology", "Cultural Studies"]', true),
('Dr. Ramya', 'Krishna', 'ramya.krishna@gitam.edu', 'GITAM University, Visakhapatnam', '["Chemistry", "Natural Products", "Analytical Chemistry"]', true),
('Prof. Vijaya', 'Kumar', 'vijaya.kumar@vskp.ac.in', 'Andhra University, Visakhapatnam', '["Economics", "Development Studies", "Rural Economics"]', true),
('Dr. Srinivasa', 'Rao', 'srinivasa.rao@sku.ac.in', 'Sri Krishnadevaraya University, Anantapur', '["Mathematics", "Statistics", "Applied Mathematics"]', true),
('Dr. Lakshmi', 'Prasanna', 'lakshmi.prasanna@acharya.ac.in', 'Acharya Nagarjuna University', '["Telugu Literature", "Linguistics", "Regional Studies"]', true);

-- Create inaugural issue
INSERT INTO issues (volume, issue_number, year, title, description, publication_date, is_special_issue, special_issue_theme, status, article_count, total_pages) VALUES
(1, 1, 2025, 'Inaugural Issue: Foundations of Multidisciplinary Research', 'Celebrating 40 Years of Educational Excellence & Social Transformation at Sri Varaha Lakshmi Narsimha Swami Government Degree College, Bheemunipatnam', '2025-01-15', true, 'Foundations of Multidisciplinary Research', 'published', 4, '1-58');

-- Insert sample articles for the inaugural issue (consistent with website display)
INSERT INTO articles (
    title, abstract, keywords, article_type, subject_area, intended_audience,
    primary_author_id, corresponding_author_email, co_authors,
    manuscript_file_url, cover_letter, ethics_declaration, funding_information,
    submission_date, publication_date, status, volume, issue, pages, doi,
    word_count, page_count, github_content_url, github_pdf_url
) VALUES
(
    'Biodiversity Conservation in Coastal Andhra Pradesh: A Community-Based Approach',
    'This study examines the effectiveness of community-based conservation initiatives in the coastal regions of Andhra Pradesh, with particular focus on the Bheemunipatnam area. Through participatory research methods, we analyzed local conservation practices and their impact on biodiversity preservation. The research highlights the crucial role of traditional knowledge systems in environmental protection and suggests policy recommendations for sustainable coastal management.',
    '["biodiversity", "coastal conservation", "community participation", "Andhra Pradesh", "traditional knowledge"]',
    'research_article',
    'Environmental Science',
    'Researchers, policymakers, and environmental practitioners working in coastal conservation',
    (SELECT id FROM authors WHERE email = 'prasad@svlnsgdc.ac.in'),
    'prasad@svlnsgdc.ac.in',
    '[{"name": "Dr. V. Rao", "affiliation": "SVLNS GDC", "email": "vrao@svlnsgdc.ac.in"}]',
    '/uploads/articles/biodiversity-conservation-coastal-ap.pdf',
    'We are pleased to submit our research on biodiversity conservation in coastal Andhra Pradesh. This work represents three years of community-based research and aligns with the journal''s mission of addressing socially relevant issues.',
    'This research was conducted with full ethical approval from the institutional ethics committee. All community participants provided informed consent, and traditional knowledge was documented with proper attribution and respect for indigenous rights.',
    'This research was supported by the University Grants Commission (UGC) Minor Research Project Grant (MRP-2021-22-SVLNS-001).',
    '2024-01-15 10:30:00+05:30',
    '2025-01-15 00:00:00+05:30',
    'published',
    1, 1, '1-15', '10.1234/svlns.2025.1.1.001',
    4500, 15,
    'https://github.com/svlns-journal/articles/blob/main/vol1-issue1/biodiversity-conservation.md',
    'https://github.com/svlns-journal/articles/blob/main/vol1-issue1/biodiversity-conservation.pdf'
),
(
    'Historical Significance of Bheemunipatnam in Maritime Trade: Archaeological Evidence',
    'Bheemunipatnam, historically known as Bhimunipatnam, played a crucial role in maritime trade along the eastern coast of India. This paper presents archaeological evidence and historical documentation that establishes the town''s importance as a trading port from the medieval period through the colonial era. The study contributes to understanding the regional economic history and cultural exchanges that shaped coastal Andhra Pradesh.',
    '["maritime history", "archaeology", "Bheemunipatnam", "trade routes", "cultural heritage"]',
    'research_article',
    'History and Archaeology',
    'Historians, archaeologists, and researchers interested in Indian maritime history',
    (SELECT id FROM authors WHERE email = 'preddy@svlnsgdc.ac.in'),
    'preddy@svlnsgdc.ac.in',
    '[{"name": "Dr. N. Kumar", "affiliation": "SVLNS GDC", "email": "nkumar@svlnsgdc.ac.in"}]',
    '/uploads/articles/bheemunipatnam-maritime-history.pdf',
    'This historical research on Bheemunipatnam''s maritime significance provides new insights into our region''s rich cultural heritage and aligns perfectly with the journal''s focus on local and regional studies.',
    'All historical sources and archaeological evidence cited in this study are properly attributed. No human subjects were involved in this research.',
    'Research supported by the Andhra Pradesh State Archives and Archaeological Survey of India documentation grants.',
    '2024-01-20 14:15:00+05:30',
    '2025-01-15 00:00:00+05:30',
    'published',
    1, 1, '16-28', '10.1234/svlns.2025.1.1.002',
    3800, 13,
    'https://github.com/svlns-journal/articles/blob/main/vol1-issue1/bheemunipatnam-maritime.md',
    'https://github.com/svlns-journal/articles/blob/main/vol1-issue1/bheemunipatnam-maritime.pdf'
),
(
    'Chemical Analysis of Traditional Medicinal Plants Used by Coastal Communities',
    'This study presents a comprehensive chemical analysis of medicinal plants traditionally used by coastal communities in the Visakhapatnam district. Using modern analytical techniques including HPLC and GC-MS, we identified bioactive compounds in fifteen commonly used medicinal plants. The research validates traditional knowledge while providing scientific basis for potential pharmaceutical applications.',
    '["medicinal plants", "phytochemistry", "traditional medicine", "coastal communities", "bioactive compounds"]',
    'research_article',
    'Chemistry and Pharmacology',
    'Chemists, pharmacologists, and researchers in natural product chemistry',
    (SELECT id FROM authors WHERE email = 'lakshmi@svlnsgdc.ac.in'),
    'lakshmi@svlnsgdc.ac.in',
    '[{"name": "Dr. S. Prasad", "affiliation": "SVLNS GDC", "email": "prasad@svlnsgdc.ac.in"}]',
    '/uploads/articles/medicinal-plants-chemical-analysis.pdf',
    'We submit this research on traditional medicinal plants, which bridges traditional knowledge with modern scientific analysis. This work exemplifies the interdisciplinary approach promoted by the journal.',
    'Plant collection was conducted with proper permissions from local authorities and community elders. Traditional knowledge holders were consulted and credited appropriately. No endangered species were collected.',
    'Funded by the Department of Science and Technology (DST), Government of Andhra Pradesh, under the State Innovation and Research Grant (SIRG-2022-CHEM-015).',
    '2024-02-01 09:45:00+05:30',
    '2025-01-15 00:00:00+05:30',
    'published',
    1, 1, '29-42', '10.1234/svlns.2025.1.1.003',
    5200, 14,
    'https://github.com/svlns-journal/articles/blob/main/vol1-issue1/medicinal-plants-analysis.md',
    'https://github.com/svlns-journal/articles/blob/main/vol1-issue1/medicinal-plants-analysis.pdf'
),
(
    'Socio-Economic Impact of Higher Education on Rural Communities: A Case Study of SVLNS GDC',
    'This paper examines the socio-economic transformation brought about by higher education in rural communities, using Sri Varaha Lakshmi Narsimha Swami Government Degree College as a case study. Through surveys and interviews with graduates, families, and community members, we analyze the college''s 40-year impact on social mobility, economic development, and community empowerment in the region.',
    '["higher education", "social mobility", "rural development", "community impact", "educational access"]',
    'research_article',
    'Economics and Social Sciences',
    'Educators, policymakers, and researchers in development studies',
    (SELECT id FROM authors WHERE email = 'asharma@svlnsgdc.ac.in'),
    'asharma@svlnsgdc.ac.in',
    '[{"name": "Dr. P. Surekha", "affiliation": "SVLNS GDC", "email": "principal@svlnsgdc.ac.in"}, {"name": "Dr. B. Murthy", "affiliation": "SVLNS GDC", "email": "bmurthy@svlnsgdc.ac.in"}]',
    '/uploads/articles/higher-education-socio-economic-impact.pdf',
    'This research celebrates our institution''s 40-year journey and its transformative impact on rural communities. It aligns with the journal''s mission of highlighting socially relevant research.',
    'This study was conducted with institutional ethics approval. All participants provided informed consent, and anonymity was maintained where requested. Community leaders were consulted throughout the research process.',
    'This research was supported by the Indian Council of Social Science Research (ICSSR) Major Research Project Grant (MRP-2022-23-ECON-SVLNS-001).',
    '2024-02-10 16:20:00+05:30',
    '2025-01-15 00:00:00+05:30',
    'published',
    1, 1, '43-58', '10.1234/svlns.2025.1.1.004',
    6100, 16,
    'https://github.com/svlns-journal/articles/blob/main/vol1-issue1/higher-education-impact.md',
    'https://github.com/svlns-journal/articles/blob/main/vol1-issue1/higher-education-impact.pdf'
);

-- Insert some sample submissions
INSERT INTO submissions (title, authors, email, institution, abstract, keywords, year, status) VALUES
(
    'Impact of Climate Change on Coastal Fisheries in Andhra Pradesh',
    'Dr. Marine Biologist, Dr. Climate Researcher',
    'marine.bio@example.com',
    'Marine Research Institute, Visakhapatnam',
    'This study analyzes the impact of climate change on coastal fisheries in Andhra Pradesh over the past two decades. Using statistical analysis of catch data and environmental parameters, we identify significant correlations between temperature rise, sea level changes, and fish population dynamics.',
    'climate change, fisheries, coastal ecology, Andhra Pradesh, marine biology',
    2024,
    'under_review'
),
(
    'Digital Transformation in Rural Education: A Case Study',
    'Dr. Education Technology, Prof. Rural Development',
    'edu.tech@example.com',
    'Educational Research Center, Hyderabad',
    'This research examines the implementation and impact of digital technologies in rural educational institutions. Through a comprehensive case study approach, we analyze the challenges and opportunities in bridging the digital divide in rural areas.',
    'digital education, rural development, technology integration, educational policy',
    2024,
    'submitted'
);
