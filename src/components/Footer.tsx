import { Linkedin, Github, Instagram, Code2, ArrowUp, Lock } from 'lucide-react';
import { navLinks, profile as defaultProfile } from '@/data';

interface FooterProps {
  profile?: typeof defaultProfile;
}

export default function Footer({ profile = defaultProfile }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-16 pb-8">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500 text-white">
                <Code2 className="h-5 w-5" />
              </span>
              <span className="font-display">{profile.name}</span>
            </a>
            <p className="mt-3 text-sm text-navy-300">{profile.title}</p>
            <div className="mt-5 flex gap-2.5">
              <FooterSocial href={profile.socials.linkedin} label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </FooterSocial>
              <FooterSocial href={profile.socials.github} label="GitHub">
                <Github className="h-5 w-5" />
              </FooterSocial>
              <FooterSocial href={profile.socials.instagram} label="Instagram">
                <Instagram className="h-5 w-5" />
              </FooterSocial>
            </div>
          </div>

          {/* Nav */}
          <div className="lg:justify-self-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Navigation</p>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-navy-300 transition-colors hover:text-accent-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:justify-self-end">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Contact</p>
            <div className="mt-4 space-y-2 text-sm text-navy-300">
              <a href={`mailto:${profile.email}`} className="block transition-colors hover:text-accent-300">
                {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="block transition-colors hover:text-accent-300">
                {profile.phone}
              </a>
              <p>Languages: {profile.languages.join(' | ')}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-navy-400">
            © 2026 {profile.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="#admin"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-navy-200 transition-all hover:border-accent-400/40 hover:text-accent-300 active:scale-95"
            >
              <Lock className="h-3.5 w-3.5" />
              Admin
            </a>
            <a
              href="#home"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-navy-200 transition-all hover:border-accent-400/40 hover:text-accent-300 active:scale-95"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSocial({
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
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-navy-200 transition-all hover:border-accent-400/40 hover:bg-accent-500/10 hover:text-accent-300 active:scale-90"
    >
      {children}
    </a>
  );
}
