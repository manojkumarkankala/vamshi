import { useEffect, useState } from 'react';
import { supabase, FUNCTION_URL } from '@/supabaseClient';
import {
  profile as staticProfile,
  stats as staticStats,
  skills as staticSkills,
  experiences as staticExperiences,
  qualities as staticQualities,
  education as staticEducation,
} from '@/data';

export interface SiteContent {
  profile: typeof staticProfile;
  about: {
    intro: string;
    closing: string;
    points: string[];
    traits: string[];
  };
  objective: { text: string };
  hero_image_url: string;
  about_image_url: string;
  resume_path: string;
}

export interface ExperienceRow {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  highlighted: boolean;
  sort_order: number;
}

export interface SkillRow {
  id: string;
  name: string;
  description: string;
  is_primary: boolean;
  sort_order: number;
}

export interface EducationRow {
  id: string;
  degree: string;
  institution: string;
  location: string;
  sort_order: number;
}

export interface QualityRow {
  id: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface StatRow {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sort_order: number;
}

export interface PortfolioRow {
  id: string;
  name: string;
  description: string;
  technologies: string;
  live_url: string;
  screenshot_url: string;
  sort_order: number;
}

export interface AllContent {
  siteContent: SiteContent;
  experiences: ExperienceRow[];
  skills: SkillRow[];
  education: EducationRow[];
  qualities: QualityRow[];
  stats: StatRow[];
  portfolioItems: PortfolioRow[];
}

const defaultSiteContent: SiteContent = {
  profile: staticProfile,
  about: {
    intro:
      'I am a motivated professional with hands-on experience across WordPress development, back-office operations, auditing, and sales. My career so far has been shaped by a willingness to continuously learn, adapt to new environments, and grow both personally and professionally.',
    closing:
      "I value teamwork and am always willing to take on challenging environments that help me sharpen my skills and contribute meaningfully to an organization's growth.",
    points: ['WordPress Development', 'Back Office / Non-Voice Operations', 'Auditing', 'Sales'],
    traits: ['Continuous Learning', 'Adaptability', 'Professional Growth', 'Teamwork'],
  },
  objective: {
    text: 'To continuously enhance my knowledge, skills and experience by getting involved in challenging work environment and utilize them for personal and organization growth to the best of my ability.',
  },
  hero_image_url: '',
  about_image_url: '',
  resume_path: '/Kankala-Vamshi-Resume.pdf',
};

function mapExperiences(rows: ExperienceRow[]) {
  return rows.length
    ? rows.map((r) => ({
        role: r.role,
        company: r.company,
        duration: r.duration,
        description: r.description,
        highlighted: r.highlighted,
      }))
    : staticExperiences;
}

function mapSkills(rows: SkillRow[]) {
  return rows.length
    ? rows.map((r) => ({ name: r.name, description: r.description, primary: r.is_primary }))
    : staticSkills;
}

function mapQualities(rows: QualityRow[]) {
  return rows.length
    ? rows.map((r) => ({ title: r.title, description: r.description }))
    : staticQualities;
}

function mapEducation(rows: EducationRow[]) {
  return rows.length
    ? rows.map((r) => ({ degree: r.degree, institution: r.institution, location: r.location }))
    : staticEducation;
}

function mapStats(rows: StatRow[]) {
  return rows.length
    ? rows.map((r) => ({ value: r.value, suffix: r.suffix, label: r.label }))
    : staticStats;
}

export function useContent() {
  const [content, setContent] = useState<AllContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data: sc } = await supabase
          .from('site_content')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        const [ex, sk, ed, qu, st, pi] = await Promise.all([
          supabase.from('experiences').select('*').order('sort_order'),
          supabase.from('skills').select('*').order('sort_order'),
          supabase.from('education').select('*').order('sort_order'),
          supabase.from('qualities').select('*').order('sort_order'),
          supabase.from('stats').select('*').order('sort_order'),
          supabase.from('portfolio_items').select('*').order('sort_order'),
        ]);

        if (cancelled) return;

        const siteContent: SiteContent = {
          ...defaultSiteContent,
          ...(sc?.profile ? { profile: { ...staticProfile, ...sc.profile } } : {}),
          ...(sc?.about ? { about: { ...defaultSiteContent.about, ...sc.about } } : {}),
          ...(sc?.objective ? { objective: { ...defaultSiteContent.objective, ...sc.objective } } : {}),
          ...(sc?.hero_image_url ? { hero_image_url: sc.hero_image_url } : {}),
          ...(sc?.about_image_url ? { about_image_url: sc.about_image_url } : {}),
          ...(sc?.resume_path ? { resume_path: sc.resume_path } : {}),
        };

        setContent({
          siteContent,
          experiences: (ex.data as ExperienceRow[]) ?? [],
          skills: (sk.data as SkillRow[]) ?? [],
          education: (ed.data as EducationRow[]) ?? [],
          qualities: (qu.data as QualityRow[]) ?? [],
          stats: (st.data as StatRow[]) ?? [],
          portfolioItems: (pi.data as PortfolioRow[]) ?? [],
        });
      } catch {
        if (!cancelled) setContent(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading };
}

/** Fetch all content via the edge function (used by admin page). */
export async function fetchAllContent(): Promise<AllContent> {
  const res = await fetch(`${FUNCTION_URL}/all`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`Failed to load content (${res.status})`);
  const data = await res.json();
  return {
    siteContent: {
      ...defaultSiteContent,
      ...(data.site_content?.profile
        ? { profile: { ...staticProfile, ...data.site_content.profile } }
        : {}),
      ...(data.site_content?.about
        ? { about: { ...defaultSiteContent.about, ...data.site_content.about } }
        : {}),
      ...(data.site_content?.objective
        ? { objective: { ...defaultSiteContent.objective, ...data.site_content.objective } }
        : {}),
      ...(data.site_content?.hero_image_url
        ? { hero_image_url: data.site_content.hero_image_url }
        : {}),
      ...(data.site_content?.about_image_url
        ? { about_image_url: data.site_content.about_image_url }
        : {}),
      ...(data.site_content?.resume_path
        ? { resume_path: data.site_content.resume_path }
        : {}),
    },
    experiences: data.experiences ?? [],
    skills: data.skills ?? [],
    education: data.education ?? [],
    qualities: data.qualities ?? [],
    stats: data.stats ?? [],
    portfolioItems: data.portfolio_items ?? [],
  };
}

export {
  mapExperiences,
  mapSkills,
  mapQualities,
  mapEducation,
  mapStats,
};
