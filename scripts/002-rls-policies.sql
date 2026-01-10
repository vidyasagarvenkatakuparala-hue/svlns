-- Row Level Security Policies for SVLNS GDC Journal
-- This script enables RLS and creates appropriate policies

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE editorial_board ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviewers ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTION: Check if user is admin
-- ============================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users 
        WHERE user_id = auth.uid() 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- AUTHORS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Authors are viewable by everyone" ON authors;
CREATE POLICY "Authors are viewable by everyone" ON authors
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert authors" ON authors;
CREATE POLICY "Admins can insert authors" ON authors
    FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update authors" ON authors;
CREATE POLICY "Admins can update authors" ON authors
    FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete authors" ON authors;
CREATE POLICY "Admins can delete authors" ON authors
    FOR DELETE USING (is_admin());

-- ============================================
-- EDITORIAL BOARD POLICIES
-- ============================================
DROP POLICY IF EXISTS "Editorial board is viewable by everyone" ON editorial_board;
CREATE POLICY "Editorial board is viewable by everyone" ON editorial_board
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage editorial board" ON editorial_board;
CREATE POLICY "Admins can manage editorial board" ON editorial_board
    FOR ALL USING (is_admin());

-- ============================================
-- ISSUES POLICIES
-- ============================================
DROP POLICY IF EXISTS "Published issues are viewable by everyone" ON issues;
CREATE POLICY "Published issues are viewable by everyone" ON issues
    FOR SELECT USING (status = 'published' OR status IS NULL OR is_admin());

DROP POLICY IF EXISTS "Admins can manage issues" ON issues;
CREATE POLICY "Admins can manage issues" ON issues
    FOR ALL USING (is_admin());

-- ============================================
-- ARTICLES POLICIES
-- ============================================
DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON articles;
CREATE POLICY "Published articles are viewable by everyone" ON articles
    FOR SELECT USING (status = 'published' OR status IS NULL OR is_admin());

DROP POLICY IF EXISTS "Admins can manage articles" ON articles;
CREATE POLICY "Admins can manage articles" ON articles
    FOR ALL USING (is_admin());

-- ============================================
-- SUBMISSIONS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Anyone can create submissions" ON submissions;
CREATE POLICY "Anyone can create submissions" ON submissions
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all submissions" ON submissions;
CREATE POLICY "Admins can view all submissions" ON submissions
    FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can update submissions" ON submissions;
CREATE POLICY "Admins can update submissions" ON submissions
    FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete submissions" ON submissions;
CREATE POLICY "Admins can delete submissions" ON submissions
    FOR DELETE USING (is_admin());

-- ============================================
-- REVIEWS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Admins can manage reviews" ON reviews;
CREATE POLICY "Admins can manage reviews" ON reviews
    FOR ALL USING (is_admin());

-- ============================================
-- REVIEWERS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Reviewers are viewable by admins" ON reviewers;
CREATE POLICY "Reviewers are viewable by admins" ON reviewers
    FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can manage reviewers" ON reviewers;
CREATE POLICY "Admins can manage reviewers" ON reviewers
    FOR ALL USING (is_admin());

-- ============================================
-- FACULTY POLICIES
-- ============================================
DROP POLICY IF EXISTS "Faculty is viewable by everyone" ON faculty;
CREATE POLICY "Faculty is viewable by everyone" ON faculty
    FOR SELECT USING (is_active = true OR is_admin());

DROP POLICY IF EXISTS "Admins can manage faculty" ON faculty;
CREATE POLICY "Admins can manage faculty" ON faculty
    FOR ALL USING (is_admin());

-- ============================================
-- JOURNAL SETTINGS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Journal settings are viewable by everyone" ON journal_settings;
CREATE POLICY "Journal settings are viewable by everyone" ON journal_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage journal settings" ON journal_settings;
CREATE POLICY "Admins can manage journal settings" ON journal_settings
    FOR ALL USING (is_admin());

-- ============================================
-- GITHUB LINKS POLICIES
-- ============================================
DROP POLICY IF EXISTS "GitHub links are viewable by everyone" ON github_links;
CREATE POLICY "GitHub links are viewable by everyone" ON github_links
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage github links" ON github_links;
CREATE POLICY "Admins can manage github links" ON github_links
    FOR ALL USING (is_admin());

-- ============================================
-- ADMIN USERS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
CREATE POLICY "Admins can view admin users" ON admin_users
    FOR SELECT USING (is_admin() OR user_id = auth.uid());

DROP POLICY IF EXISTS "Super admins can manage admin users" ON admin_users;
CREATE POLICY "Super admins can manage admin users" ON admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
            AND is_active = true
        )
    );
