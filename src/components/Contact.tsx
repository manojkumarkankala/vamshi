import { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, Languages, CheckCircle2 } from 'lucide-react';
import { profile as defaultProfile } from '@/data';

interface ContactProps {
  profile?: typeof defaultProfile;
}

export default function Contact({ profile = defaultProfile }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields before sending.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="section-py bg-navy-50/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">Get in touch</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            Let's Connect
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Interested in working together or discussing an opportunity? Feel free to get in touch.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info card */}
          <div className="reveal reveal-delay-1">
            <div className="flex h-full flex-col gap-5 rounded-3xl border border-navy-100 bg-white p-7 shadow-soft sm:p-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-navy-900">
                  {profile.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-600">{profile.title}</p>
              </div>

              <div className="space-y-3">
                <ContactRow icon={Mail} label="Email">
                  <a href={`mailto:${profile.email}`} className="hover:text-accent-600">
                    {profile.email}
                  </a>
                </ContactRow>
                <ContactRow icon={Phone} label="Mobile">
                  <a href={`tel:${profile.phone}`} className="hover:text-accent-600">
                    {profile.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={Languages} label="Languages">
                  {profile.languages.join(' | ')}
                </ContactRow>
              </div>

              <div className="mt-auto pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Connect
                </p>
                <div className="flex gap-2.5">
                  <SocialBtn href={profile.socials.linkedin} label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </SocialBtn>
                  <SocialBtn href={profile.socials.github} label="GitHub">
                    <Github className="h-5 w-5" />
                  </SocialBtn>
                  <SocialBtn href={`mailto:${profile.email}`} label="Email">
                    <Mail className="h-5 w-5" />
                  </SocialBtn>
                  <SocialBtn href={`tel:${profile.phone}`} label="Phone">
                    <Phone className="h-5 w-5" />
                  </SocialBtn>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-navy-100 bg-white p-7 shadow-soft sm:p-8"
            >
              <div className="grid gap-5">
                <Field label="Name">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-navy-200 bg-navy-50/30 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-navy-200 bg-navy-50/30 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
                  />
                </Field>
                <Field label="Message">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-navy-200 bg-navy-50/30 px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
                  />
                </Field>

                {error && (
                  <p className="text-sm font-medium text-red-600">{error}</p>
                )}

                {sent && (
                  <p className="flex items-center gap-2 text-sm font-medium text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Opening your email app to send the message…
                  </p>
                )}

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-accent-600 hover:shadow-glow active:scale-95"
                >
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-navy-100 bg-navy-50/30 px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-accent-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">{label}</p>
        <p className="text-sm font-medium text-navy-800">{children}</p>
      </div>
    </div>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy-200 bg-white text-navy-700 transition-all hover:border-accent-400 hover:bg-accent-500 hover:text-white active:scale-90"
    >
      {children}
    </a>
  );
}
