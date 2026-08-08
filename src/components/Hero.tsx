import { Download, ArrowRight, Linkedin, Github, Instagram, Code2, MousePointerClick } from 'lucide-react';
import { profile as defaultProfile } from '@/data';

interface HeroProps {
  profile?: typeof defaultProfile;
  heroImage?: string;
  resumePath?: string;
}

export default function Hero({ profile = defaultProfile, heroImage, resumePath }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-navy-950 pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-navy-600/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />

      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* Left */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              Hello, I'm
            </span>

            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-up">
              {profile.name.split(' ')[0]}
              <br />
              {profile.name.split(' ').slice(1).join(' ') || ''}
            </h1>

            <p className="mt-4 font-display text-lg font-semibold text-accent-300 sm:text-xl animate-fade-up reveal-delay-1">
              {profile.title}
            </p>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-navy-200 lg:mx-0 sm:text-lg animate-fade-up reveal-delay-2">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start animate-fade-up reveal-delay-3">
              <a
                href="#portfolio"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-accent-600 hover:shadow-glow active:scale-95 sm:w-auto"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={resumePath || profile.resumePath}
                download
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95 sm:w-auto"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </div>

            {/* Socials */}
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start animate-fade-up reveal-delay-4">
              <span className="text-xs font-medium uppercase tracking-wider text-navy-400">Find me on</span>
              <div className="flex gap-2.5">
                <SocialIcon href={profile.socials.linkedin} label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </SocialIcon>
                <SocialIcon href={profile.socials.github} label="GitHub">
                  <Github className="h-5 w-5" />
                </SocialIcon>
                <SocialIcon href={profile.socials.instagram} label="Instagram">
                  <Instagram className="h-5 w-5" />
                </SocialIcon>
              </div>
            </div>
          </div>

          {/* Right — profile photo */}
          <div className="relative mx-auto flex max-w-md items-center justify-center lg:max-w-none">
            <div className="relative aspect-square w-full max-w-sm">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />

              {/* Pulse glow */}
              <div className="absolute inset-8 rounded-full bg-accent-500/20 blur-2xl animate-pulse-ring" />

              {/* Photo container */}
              <div className="absolute inset-6 overflow-hidden rounded-full border-4 border-white/10 bg-gradient-to-br from-navy-700 to-navy-900 shadow-2xl">
                {heroImage ? (
                  <img src={heroImage} alt={`${profile.name} portrait`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
                      <Code2 className="h-10 w-10 text-accent-300" />
                    </div>
                    <span className="text-sm font-medium text-navy-300">Your Photo</span>
                  </div>
                )}
              </div>

              {/* Floating chips */}
              <FloatingChip className="left-0 top-1/4" delay="0s">
                <Code2 className="h-4 w-4 text-accent-400" />
                <span>WordPress</span>
              </FloatingChip>
              <FloatingChip className="right-0 top-1/3" delay="1.5s">
                <MousePointerClick className="h-4 w-4 text-accent-400" />
                <span>Web</span>
              </FloatingChip>
              <FloatingChip className="bottom-8 left-4" delay="3s">
                <span className="text-xs">{'</>'}</span>
                <span>Dev</span>
              </FloatingChip>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 80" className="h-12 w-full text-white lg:h-20" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,80 L1440,80 L1440,40 C1080,80 360,80 0,40 Z" />
        </svg>
      </div>
    </section>
  );
}

function SocialIcon({
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

function FloatingChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-1.5 rounded-xl border border-white/15 bg-navy-800/80 px-3 py-2 text-xs font-medium text-white shadow-card backdrop-blur-sm animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}
