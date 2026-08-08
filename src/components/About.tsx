import { User, CheckCircle2, Sparkles, Users2, TrendingUp, RefreshCw } from 'lucide-react';
import { profile as defaultProfile } from '@/data';

interface AboutProps {
  about?: {
    intro: string;
    closing: string;
    points: string[];
    traits: string[];
  };
  profile?: typeof defaultProfile;
  aboutImage?: string;
}

const traitIcons: Record<string, React.ElementType> = {
  'Continuous Learning': RefreshCw,
  Adaptability: Sparkles,
  'Professional Growth': TrendingUp,
  Teamwork: Users2,
};

export default function About({ about, profile = defaultProfile, aboutImage }: AboutProps) {
  const intro = about?.intro;
  const closing = about?.closing;
  const points = about?.points ?? [];
  const traits = about?.traits ?? [];

  return (
    <section id="about" className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">Get to know me</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            About Me
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            A professional journey built through learning, experience, and adaptability.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image placeholder */}
          <div className="reveal reveal-delay-1">
            <div className="group relative mx-auto max-w-md">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-navy-100 to-accent-100 opacity-60 blur-xl transition-opacity group-hover:opacity-80" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-navy-50 to-white shadow-card">
                {aboutImage ? (
                  <img src={aboutImage} alt={`${profile.name} profile`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-navy-900 text-white shadow-soft">
                      <User className="h-12 w-12" />
                    </div>
                    <span className="text-sm font-medium text-navy-400">Professional Profile Image</span>
                  </div>
                )}
              </div>
              {/* Badge */}
              <div className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-2xl border border-navy-100 bg-white px-4 py-3 shadow-card">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold text-navy-900">Open to Work</p>
                  <p className="text-[11px] text-navy-500">WordPress · Web</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-2">
            <h3 className="font-display text-2xl font-bold text-navy-900">
              {profile.name}
            </h3>
            <p className="mt-1 text-accent-600 font-semibold">{profile.title}</p>

            {intro && <p className="mt-5 text-base leading-relaxed text-navy-600">{intro}</p>}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-xl border border-navy-100 bg-navy-50/50 px-4 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-sm font-medium text-navy-800">{point}</span>
                </div>
              ))}
            </div>

            {closing && <p className="mt-6 text-base leading-relaxed text-navy-600">{closing}</p>}

            <div className="mt-7 flex flex-wrap gap-2.5">
              {traits.map((label) => {
                const Icon = traitIcons[label] ?? Sparkles;
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-semibold text-navy-700 shadow-soft"
                  >
                    <Icon className="h-3.5 w-3.5 text-accent-500" />
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
