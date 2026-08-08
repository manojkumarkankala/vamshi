import { useEffect, useState } from 'react';
import {
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Image as ImageIcon,
  GripVertical,
  Star,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react';
import { FUNCTION_URL } from '@/supabaseClient';
import {
  fetchAllContent,
  type AllContent,
  type ExperienceRow,
  type SkillRow,
  type EducationRow,
  type QualityRow,
  type StatRow,
  type PortfolioRow,
} from '@/useContent';

const PASSWORD = 'VAMSHI@123';
const STORAGE_KEY = 'kv_admin_auth';

type Tab = 'profile' | 'about' | 'experience' | 'skills' | 'education' | 'qualities' | 'stats' | 'portfolio';

const tabs: { id: Tab; label: string }[] = [
  { id: 'profile', label: 'Profile & Contact' },
  { id: 'about', label: 'About & Objective' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'qualities', label: 'Why Work With Me' },
  { id: 'stats', label: 'Quick Stats' },
  { id: 'portfolio', label: 'Portfolio' },
];

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const [content, setContent] = useState<AllContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('profile');

  useEffect(() => {
    if (authed) loadContent();
  }, [authed]);

  async function loadContent() {
    setLoading(true);
    try {
      const c = await fetchAllContent();
      setContent(c);
    } catch {
      setContent(null);
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return <LoginGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-navy-50/40">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
              <Lock className="h-4.5 w-4.5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-navy-900">Admin Panel</h1>
              <p className="text-xs text-navy-500">Kankala Vamshi — Portfolio Editor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 rounded-xl border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
            >
              <ArrowLeft className="h-4 w-4" />
              View Site
            </a>
            <button
              onClick={() => {
                sessionStorage.removeItem(STORAGE_KEY);
                setAuthed(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {loading || !content ? (
          <div className="flex items-center justify-center py-32 text-navy-400">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
            {/* Sidebar */}
            <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-navy-100 bg-white p-2 no-scrollbar lg:flex-col">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                    tab === t.id
                      ? 'bg-navy-900 text-white'
                      : 'text-navy-600 hover:bg-navy-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            {/* Content */}
            <div className="min-w-0">
              {tab === 'profile' && <ProfileEditor content={content} onSaved={loadContent} />}
              {tab === 'about' && <AboutEditor content={content} onSaved={loadContent} />}
              {tab === 'experience' && <CollectionEditor<ExperienceRow> content={content} onSaved={loadContent} collection="experiences" title="Experience" fields={experienceFields} />}
              {tab === 'skills' && <CollectionEditor<SkillRow> content={content} onSaved={loadContent} collection="skills" title="Skills" fields={skillFields} />}
              {tab === 'education' && <CollectionEditor<EducationRow> content={content} onSaved={loadContent} collection="education" title="Education" fields={educationFields} />}
              {tab === 'qualities' && <CollectionEditor<QualityRow> content={content} onSaved={loadContent} collection="qualities" title="Qualities" fields={qualityFields} />}
              {tab === 'stats' && <CollectionEditor<StatRow> content={content} onSaved={loadContent} collection="stats" title="Quick Stats" fields={statFields} />}
              {tab === 'portfolio' && <CollectionEditor<PortfolioRow> content={content} onSaved={loadContent} collection="portfolio_items" title="Portfolio Items" fields={portfolioFields} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== Login Gate =====
function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      onSuccess();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-5">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl border border-white/10 bg-navy-900/80 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-6 text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-white">
              <Lock className="h-7 w-7" />
            </span>
            <h1 className="font-display text-2xl font-bold text-white">Admin Access</h1>
            <p className="mt-1 text-sm text-navy-300">Enter your password to edit the portfolio</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError('');
              }}
              placeholder="Admin password"
              autoFocus
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-navy-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
            />
            {error && <p className="text-sm font-medium text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-600 active:scale-95"
            >
              Unlock Admin
            </button>
          </form>
          <a href="#home" className="mt-5 block text-center text-xs text-navy-400 hover:text-navy-200">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}

// ===== Shared helpers =====
async function adminFetch(body: Record<string, unknown>) {
  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Password': PASSWORD,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

async function uploadImage(file: File, field: string): Promise<string> {
  const reader = new FileReader();
  const base64: string = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const data = await adminFetch({
    action: 'upload-image',
    base64,
    fileName: file.name,
    contentType: file.type || 'image/png',
    field,
  });
  return data.url as string;
}

async function uploadFile(file: File, field: string): Promise<string> {
  const reader = new FileReader();
  const base64: string = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const data = await adminFetch({
    action: 'upload-file',
    base64,
    fileName: file.name,
    contentType: file.type || 'application/octet-stream',
    field,
  });
  return data.url as string;
}

function SaveButton({ saving, onSave, label = 'Save Changes' }: { saving: boolean; onSave: () => void; label?: string }) {
  return (
    <button
      onClick={onSave}
      disabled={saving}
      className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-600 active:scale-95 disabled:opacity-50"
    >
      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {saving ? 'Saving…' : label}
    </button>
  );
}

function SavedToast({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
      <CheckCircle2 className="h-4 w-4" /> Saved!
    </span>
  );
}

function ImageUpload({ field, currentUrl, onUploaded }: { field: string; currentUrl?: string; onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const url = await uploadImage(file, field);
      onUploaded(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500">
        Image
      </label>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-navy-200 bg-navy-50">
          {currentUrl ? (
            <img src={currentUrl} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-8 w-8 text-navy-300" />
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? 'Uploading…' : 'Upload Image'}
          <input type="file" accept="image/*" onChange={handle} className="hidden" />
        </label>
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {currentUrl && (
        <p className="mt-1.5 truncate text-xs text-navy-400">{currentUrl}</p>
      )}
    </div>
  );
}

// ===== File Upload (resume, PDF, Word, etc.) =====
function FileUpload({ field, currentUrl, onUploaded }: { field: string; currentUrl?: string; onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const url = await uploadFile(file, field);
      onUploaded(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const fileName = currentUrl ? currentUrl.split('/').pop() ?? currentUrl : '';

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500">
        Resume File
      </label>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-navy-200 bg-navy-50">
          {currentUrl ? (
            <FileText className="h-9 w-9 text-accent-500" />
          ) : (
            <FileText className="h-8 w-8 text-navy-300" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Uploading…' : 'Upload Resume'}
            <input type="file" accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handle} className="hidden" />
          </label>
          {currentUrl && (
            <div className="flex items-center gap-2">
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent-600 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                View / Download
              </a>
            </div>
          )}
        </div>
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {currentUrl && (
        <p className="mt-1.5 truncate text-xs text-navy-400">{fileName}</p>
      )}
      <p className="mt-1.5 text-xs text-navy-400">Upload PDF, Word, or text file. Visitors can download it from the site.</p>
    </div>
  );
}

// ===== Profile Editor =====
function ProfileEditor({ content, onSaved }: { content: AllContent; onSaved: () => void }) {
  const p = content.siteContent.profile;
  const [form, setForm] = useState({
    name: p.name,
    title: p.title,
    tagline: p.tagline,
    email: p.email,
    phone: p.phone,
    languages: p.languages.join(', '),
    linkedin: p.socials.linkedin,
    github: p.socials.github,
    instagram: p.socials.instagram,
  });
  const [heroImage, setHeroImage] = useState(content.siteContent.hero_image_url);
  const [resumePath, setResumePath] = useState(content.siteContent.resume_path);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await adminFetch({
        action: 'update-site-content',
        profile: {
          name: form.name,
          title: form.title,
          tagline: form.tagline,
          email: form.email,
          phone: form.phone,
          languages: form.languages.split(',').map((s) => s.trim()).filter(Boolean),
          socials: { linkedin: form.linkedin, github: form.github, instagram: form.instagram },
        },
        hero_image_url: heroImage,
        resume_path: resumePath,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      onSaved();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Profile & Contact Info" subtitle="Your name, title, contact details, and social links.">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Input label="Professional Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <div className="sm:col-span-2"><Input label="Tagline / Hero Description" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} multiline /></div>
        <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Input label="Languages (comma-separated)" value={form.languages} onChange={(v) => setForm({ ...form, languages: v })} full />
        <Input label="LinkedIn URL" value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} />
        <Input label="GitHub URL" value={form.github} onChange={(v) => setForm({ ...form, github: v })} />
        <Input label="Instagram URL" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <ImageUpload field="hero" currentUrl={heroImage} onUploaded={setHeroImage} />
        <FileUpload field="resume" currentUrl={resumePath} onUploaded={setResumePath} />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <SaveButton saving={saving} onSave={save} />
        <SavedToast show={saved} />
      </div>
    </Card>
  );
}

// ===== About & Objective Editor =====
function AboutEditor({ content, onSaved }: { content: AllContent; onSaved: () => void }) {
  const a = content.siteContent.about;
  const o = content.siteContent.objective;
  const [form, setForm] = useState({
    intro: a.intro,
    closing: a.closing,
    points: a.points.join('\n'),
    traits: a.traits.join('\n'),
    objective: o.text,
  });
  const [aboutImage, setAboutImage] = useState(content.siteContent.about_image_url);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await adminFetch({
        action: 'update-site-content',
        about: {
          intro: form.intro,
          closing: form.closing,
          points: form.points.split('\n').map((s) => s.trim()).filter(Boolean),
          traits: form.traits.split('\n').map((s) => s.trim()).filter(Boolean),
        },
        objective: { text: form.objective },
        about_image_url: aboutImage,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      onSaved();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="About & Career Objective" subtitle="Your about text, experience points, traits, and career objective.">
      <div className="grid gap-5">
        <Input label="About Intro" value={form.intro} onChange={(v) => setForm({ ...form, intro: v })} multiline />
        <Input label="About Closing" value={form.closing} onChange={(v) => setForm({ ...form, closing: v })} multiline />
        <Input label="Experience Points (one per line)" value={form.points} onChange={(v) => setForm({ ...form, points: v })} multiline />
        <Input label="Traits (one per line)" value={form.traits} onChange={(v) => setForm({ ...form, traits: v })} multiline />
        <Input label="Career Objective" value={form.objective} onChange={(v) => setForm({ ...form, objective: v })} multiline />
        <ImageUpload field="about" currentUrl={aboutImage} onUploaded={setAboutImage} />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <SaveButton saving={saving} onSave={save} />
        <SavedToast show={saved} />
      </div>
    </Card>
  );
}

// ===== Field definitions for collection editors =====
interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'checkbox';
}

const experienceFields: FieldDef[] = [
  { key: 'role', label: 'Role' },
  { key: 'company', label: 'Company' },
  { key: 'duration', label: 'Duration' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'highlighted', label: 'Highlighted (Primary Role)', type: 'checkbox' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

const skillFields: FieldDef[] = [
  { key: 'name', label: 'Skill Name' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'is_primary', label: 'Primary Skill', type: 'checkbox' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

const educationFields: FieldDef[] = [
  { key: 'degree', label: 'Degree / Qualification' },
  { key: 'institution', label: 'Institution' },
  { key: 'location', label: 'Location' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

const qualityFields: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

const statFields: FieldDef[] = [
  { key: 'value', label: 'Value', type: 'number' },
  { key: 'suffix', label: 'Suffix (e.g. " Months")' },
  { key: 'label', label: 'Label' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

const portfolioFields: FieldDef[] = [
  { key: 'name', label: 'Project Name' },
  { key: 'description', label: 'Project Description', type: 'textarea' },
  { key: 'technologies', label: 'Technologies Used' },
  { key: 'live_url', label: 'Live Website URL' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
];

// ===== Generic Collection Editor =====
function CollectionEditor<T extends { id?: string; sort_order?: number }>({
  content,
  onSaved,
  collection,
  title,
  fields,
}: {
  content: AllContent;
  onSaved: () => void;
  collection: string;
  title: string;
  fields: FieldDef[];
}) {
  const rows = (content as unknown as Record<string, T[]>)[collection] ?? [];
  const [items, setItems] = useState<T[]>(rows);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Local image state for portfolio items
  const [screenshotUrls, setScreenshotUrls] = useState<Record<string, string>>(
    Object.fromEntries(rows.map((r) => [r.id ?? '', ((r as unknown as Record<string, unknown>).screenshot_url as string) ?? '']))
  );

  useEffect(() => {
    setItems(rows);
    setScreenshotUrls(Object.fromEntries(rows.map((r) => [r.id ?? '', ((r as unknown as Record<string, unknown>).screenshot_url as string) ?? ''])));
  }, [content]);

  const update = (idx: number, key: string, value: unknown) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [key]: value } : it)));
  };

  const add = () => {
    const maxOrder = items.reduce((mx, it) => Math.max(mx, it.sort_order ?? 0), 0);
    setItems([...items, { sort_order: maxOrder + 1 } as T]);
  };

  const remove = async (idx: number) => {
    const item = items[idx];
    if (item.id) {
      if (!confirm('Delete this item? This cannot be undone.')) return;
      try {
        await adminFetch({ action: 'delete', table: collection, id: item.id });
      } catch (err) {
        alert((err as Error).message);
        return;
      }
    }
    setItems((prev) => prev.filter((_, i) => i !== idx));
    onSaved();
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = items.map((it, idx) => ({
        ...it,
        id: it.id ?? undefined,
        sort_order: it.sort_order ?? idx + 1,
        screenshot_url: collection === 'portfolio_items' ? (screenshotUrls[it.id ?? `new-${idx}`] ?? '') : undefined,
      }));
      await adminFetch({ action: 'upsert', table: collection, rows: payload });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      onSaved();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title={title} subtitle={`Manage your ${title.toLowerCase()}. Add, edit, reorder, and delete.`}>
      <div className="space-y-4">
        {items.map((item, idx) => {
          const itemId = item.id ?? `new-${idx}`;
          return (
            <div key={itemId} className="rounded-2xl border border-navy-100 bg-navy-50/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-semibold text-navy-400">
                  <GripVertical className="h-4 w-4" />
                  Entry {idx + 1}
                </span>
                <button
                  onClick={() => remove(idx)}
                  className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((f) => {
                  const val = (item as Record<string, unknown>)[f.key];
                  if (f.type === 'textarea') {
                    return (
                      <div key={f.key} className="sm:col-span-2">
                        <Input label={f.label} value={(val as string) ?? ''} onChange={(v) => update(idx, f.key, v)} multiline />
                      </div>
                    );
                  }
                  if (f.type === 'checkbox') {
                    return (
                      <div key={f.key} className="flex items-center gap-2 sm:col-span-2">
                        <input
                          type="checkbox"
                          checked={Boolean(val)}
                          onChange={(e) => update(idx, f.key, e.target.checked)}
                          className="h-4 w-4 rounded border-navy-300 text-accent-500 focus:ring-accent-400"
                        />
                        <span className="text-sm font-medium text-navy-700">{f.label}</span>
                        {f.key === 'is_primary' && Boolean(val) && <Star className="h-3.5 w-3.5 text-accent-500" />}
                        {f.key === 'highlighted' && Boolean(val) && <Star className="h-3.5 w-3.5 text-accent-500" />}
                      </div>
                    );
                  }
                  if (f.type === 'number') {
                    return (
                      <Input
                        key={f.key}
                        label={f.label}
                        value={String(val ?? '')}
                        onChange={(v) => update(idx, f.key, Number(v) || 0)}
                        type="number"
                      />
                    );
                  }
                  return (
                    <Input
                      key={f.key}
                      label={f.label}
                      value={(val as string) ?? ''}
                      onChange={(v) => update(idx, f.key, v)}
                    />
                  );
                })}
                {/* Portfolio screenshot upload */}
                {collection === 'portfolio_items' && (
                  <div className="sm:col-span-2">
                    <ImageUpload
                      field={`portfolio-${itemId}`}
                      currentUrl={screenshotUrls[itemId]}
                      onUploaded={(url) => setScreenshotUrls((prev) => ({ ...prev, [itemId]: url }))}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={add}
          className="inline-flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
        >
          <Plus className="h-4 w-4" />
          Add New
        </button>
        <SaveButton saving={saving} onSave={save} />
        <SavedToast show={saved} />
      </div>
    </Card>
  );
}

// ===== UI primitives =====
function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-soft sm:p-7">
      <h2 className="font-display text-xl font-bold text-navy-900">{title}</h2>
      <p className="mt-1 text-sm text-navy-500">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  multiline,
  full,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-navy-200 bg-navy-50/30 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-navy-200 bg-navy-50/30 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
        />
      )}
    </label>
  );
}
