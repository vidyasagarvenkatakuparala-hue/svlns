-- Create Admin User Script
-- Run this after a user has signed up via Supabase Auth to make them an admin

-- This is a template - replace the email with the actual admin email
-- after the user has signed up through the application

-- First, the user must sign up via the application's /login page or directly in Supabase Auth
-- Then run this script to grant them admin access:

/*
-- Example: Make a user an admin
INSERT INTO admin_users (user_id, email, role, first_name, last_name, is_active)
SELECT 
    id as user_id,
    email,
    'admin' as role,
    'Admin' as first_name,
    'User' as last_name,
    true as is_active
FROM auth.users
WHERE email = 'your-admin-email@example.com'
ON CONFLICT (email) DO UPDATE SET
    role = 'admin',
    is_active = true,
    updated_at = NOW();
*/

-- Create a function to easily add admin users
CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT, admin_role TEXT DEFAULT 'admin')
RETURNS VOID AS $$
BEGIN
    INSERT INTO admin_users (user_id, email, role, is_active)
    SELECT 
        id as user_id,
        email,
        admin_role as role,
        true as is_active
    FROM auth.users
    WHERE email = user_email
    ON CONFLICT (email) DO UPDATE SET
        role = admin_role,
        is_active = true,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage: SELECT make_user_admin('admin@example.com', 'admin');
-- Or for editor: SELECT make_user_admin('editor@example.com', 'editor');
