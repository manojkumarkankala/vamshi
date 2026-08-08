/*
# Create portfolio content tables (single-tenant, no auth)

This migration creates the data layer that powers the public portfolio site
and its password-protected admin editor.

1. New Tables
- `site_content` — single-row table holding editable profile/about/objective/contact info as JSONB.
  - `id` (int, pk, always 1)
  - `profile` (jsonb): name, title, tagline, email, phone, languages, socials, resume_path
  - `about` (jsonb): intro text, image_url, trait tags
  - `objective` (jsonb): career objective text
  - `hero_image_url` (text): optional hero/profile photo
  - `about_image_url` (text): optional about photo
  - `resume_path` (text): path/URL to resume file
  - `updated_at` (timestamptz)
- `experiences` — professional experience timeline entries.
  - `id` (uuid, pk)
  - `role`, `company`, `duration`, `description` (text)
  - `highlighted` (boolean)
  - `sort_order` (int)
  - `created_at`, `updated_at`
- `skills` — technical skill cards.
  - `id` (uuid, pk)
  - `name`, `description` (text)
  - `is_primary` (boolean)
  - `sort_order` (int)
  - `created_at`, `updated_at`
- `education` — education timeline entries.
  - `id` (uuid, pk)
  - `degree`, `institution`, `location` (text)
  - `sort_order` (int)
  - `created_at`, `updated_at`
- `qualities` — "Why work with me" feature cards.
  - `id` (uuid, pk)
  - `title`, `description` (text)
  - `sort_order` (int)
  - `created_at`, `updated_at`
- `stats` — quick professional highlight cards.
  - `id` (uuid, pk)
  - `value` (int), `suffix` (text), `label` (text)
  - `sort_order` (int)
- `portfolio_items` — portfolio project cards.
  - `id` (uuid, pk)
  - `name`, `description`, `technologies`, `live_url`, `screenshot_url` (text)
  - `sort_order` (int)
  - `created_at`, `updated_at`

2. Storage
- Creates a public storage bucket `portfolio-images` for uploaded photos/screenshots.

3. Security
- RLS enabled on every table.
- Public read (anon + authenticated) on all tables so the public site can load content.
- Write access is NOT granted via RLS — all writes go through the `admin-content` edge function,
  which verifies the admin password and uses the service-role key (bypassing RLS) to mutate.
  This keeps the anon key read-only and the admin password server-side only.
- Storage bucket is public for reads; writes are handled by the edge function with the service key.

4. Seed data
- Inserts the default content matching the current hardcoded portfolio so the site looks identical
  before any admin edits are made.
*/

-- ===== site_content =====
CREATE TABLE IF NOT EXISTS site_content (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  profile jsonb NOT NULL DEFAULT '{}'::jsonb,
  about jsonb NOT NULL DEFAULT '{}'::jsonb,
  objective jsonb NOT NULL DEFAULT '{}'::jsonb,
  hero_image_url text DEFAULT '',
  about_image_url text DEFAULT '',
  resume_path text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_content" ON site_content;
CREATE POLICY "public_read_site_content" ON site_content FOR SELECT
  TO anon, authenticated USING (true);

-- ===== experiences =====
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  company text NOT NULL,
  duration text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  highlighted boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_experiences" ON experiences;
CREATE POLICY "public_read_experiences" ON experiences FOR SELECT
  TO anon, authenticated USING (true);

-- ===== skills =====
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  is_primary boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_skills" ON skills;
CREATE POLICY "public_read_skills" ON skills FOR SELECT
  TO anon, authenticated USING (true);

-- ===== education =====
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  degree text NOT NULL,
  institution text NOT NULL,
  location text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE education ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_education" ON education;
CREATE POLICY "public_read_education" ON education FOR SELECT
  TO anon, authenticated USING (true);

-- ===== qualities =====
CREATE TABLE IF NOT EXISTS qualities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE qualities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_qualities" ON qualities;
CREATE POLICY "public_read_qualities" ON qualities FOR SELECT
  TO anon, authenticated USING (true);

-- ===== stats =====
CREATE TABLE IF NOT EXISTS stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value int NOT NULL DEFAULT 0,
  suffix text NOT NULL DEFAULT '',
  label text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_stats" ON stats;
CREATE POLICY "public_read_stats" ON stats FOR SELECT
  TO anon, authenticated USING (true);

-- ===== portfolio_items =====
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  technologies text NOT NULL DEFAULT '',
  live_url text NOT NULL DEFAULT '',
  screenshot_url text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_portfolio_items" ON portfolio_items;
CREATE POLICY "public_read_portfolio_items" ON portfolio_items FOR SELECT
  TO anon, authenticated USING (true);

-- ===== Storage bucket =====
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- ===== Seed: site_content =====
INSERT INTO site_content (id, profile, about, objective, resume_path) VALUES (
  1,
  '{
    "name": "Kankala Vamshi",
    "title": "WordPress Developer | Web Professional",
    "tagline": "Motivated professional with experience in WordPress development, back-office operations, auditing, and sales, with a strong willingness to continuously enhance knowledge, skills, and experience.",
    "email": "kankalavamshi950@gmail.com",
    "phone": "9502202465",
    "languages": ["English", "Hindi", "Telugu"],
    "socials": {
      "linkedin": "https://www.linkedin.com/in/kankala-vamshi",
      "github": "https://github.com/kankalavamshi",
      "instagram": "https://instagram.com/kankalavamshi"
    }
  }'::jsonb,
  '{
    "intro": "I am a motivated professional with hands-on experience across WordPress development, back-office operations, auditing, and sales. My career so far has been shaped by a willingness to continuously learn, adapt to new environments, and grow both personally and professionally.",
    "closing": "I value teamwork and am always willing to take on challenging environments that help me sharpen my skills and contribute meaningfully to an organization''s growth.",
    "points": ["WordPress Development", "Back Office / Non-Voice Operations", "Auditing", "Sales"],
    "traits": ["Continuous Learning", "Adaptability", "Professional Growth", "Teamwork"]
  }'::jsonb,
  '{
    "text": "To continuously enhance my knowledge, skills and experience by getting involved in challenging work environment and utilize them for personal and organization growth to the best of my ability."
  }'::jsonb,
  '/Kankala-Vamshi-Resume.pdf'
)
ON CONFLICT (id) DO NOTHING;

-- ===== Seed: stats =====
INSERT INTO stats (value, suffix, label, sort_order) VALUES
  (8, ' Months', 'WordPress Developer', 1),
  (1, ' Year', 'Back Office Executive', 2),
  (6, ' Months', 'Auditor', 3),
  (6, ' Months', 'Sales Executive', 4)
ON CONFLICT DO NOTHING;

-- ===== Seed: experiences =====
INSERT INTO experiences (role, company, duration, description, highlighted, sort_order) VALUES
  ('WordPress Developer', 'Gie Connect Pvt Ltd.', '8 Months — Internship', 'Primary technical role focused on WordPress development, gaining hands-on experience building and working with WordPress websites during an 8-month internship.', true, 1),
  ('Back Office Executive', 'Square Pvt Ltd.', '1 Year', 'Handled non-voice back-office operations, supporting day-to-day administrative and operational workflows.', false, 2),
  ('Auditor', 'Good Health Insurance', '6 Months', 'Worked in an auditing capacity, reviewing and verifying records and processes.', false, 3),
  ('Sales Executive', 'Bajaj Showroom', '6 Months', 'Gained direct sales experience engaging with customers in a showroom environment.', false, 4)
ON CONFLICT DO NOTHING;

-- ===== Seed: skills =====
INSERT INTO skills (name, description, is_primary, sort_order) VALUES
  ('WordPress', 'Building and customizing WordPress websites, themes, and content management workflows.', true, 1),
  ('Photoshop', 'Image editing and visual asset preparation for web and design use.', false, 2),
  ('MS Word', 'Document drafting, formatting, and professional business communication.', false, 3),
  ('MS Excel', 'Data organization, spreadsheets, and back-office record management.', false, 4),
  ('MS PowerPoint', 'Creating clear, structured presentations for reports and meetings.', false, 5)
ON CONFLICT DO NOTHING;

-- ===== Seed: education =====
INSERT INTO education (degree, institution, location, sort_order) VALUES
  ('Intermediate', 'Aravindo Junior College', 'Choutuppal', 1),
  ('Secondary Education', 'Vivekananda Vidyanikethan High School', 'Gundrampally', 2)
ON CONFLICT DO NOTHING;

-- ===== Seed: qualities =====
INSERT INTO qualities (title, description, sort_order) VALUES
  ('Quick Learner', 'Quick to learn, adapt, and develop new knowledge and skills.', 1),
  ('Good Team Player', 'Comfortable working collaboratively and contributing as part of a team.', 2)
ON CONFLICT DO NOTHING;

-- ===== updated_at triggers =====
CREATE OR REPLACE FUNCTION trg_set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS experiences_set_updated_at ON experiences;
CREATE TRIGGER experiences_set_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

DROP TRIGGER IF EXISTS skills_set_updated_at ON skills;
CREATE TRIGGER skills_set_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

DROP TRIGGER IF EXISTS education_set_updated_at ON education;
CREATE TRIGGER education_set_updated_at BEFORE UPDATE ON education
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

DROP TRIGGER IF EXISTS qualities_set_updated_at ON qualities;
CREATE TRIGGER qualities_set_updated_at BEFORE UPDATE ON qualities
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

DROP TRIGGER IF EXISTS portfolio_items_set_updated_at ON portfolio_items;
CREATE TRIGGER portfolio_items_set_updated_at BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

DROP TRIGGER IF EXISTS site_content_set_updated_at ON site_content;
CREATE TRIGGER site_content_set_updated_at BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
