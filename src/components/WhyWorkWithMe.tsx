import { Zap, Users, Sparkles } from 'lucide-react';
import { qualities as staticQualities } from '@/data';

interface WhyWorkWithMeProps {
  qualities?: typeof staticQualities;
}

const iconMap = [Zap, Users];

export default function WhyWorkWithMe({ qualities = staticQualities }: WhyWorkWithMeProps) {
  return (
    <section className="section-py bg-navy-50/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">My strengths</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            Why Work With Me?
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {qualities.map((q, i) => {
            const Icon = iconMap[i] ?? Sparkles;
            return (
              <div
                key={q.title}
                className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card`}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-100/50 blur-2xl transition-opacity group-hover:opacity-80" />

                <div className="relative">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-accent-400 shadow-soft transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-8 w-8" />
                  </span>

                  <h3 className="mt-6 font-display text-2xl font-bold text-navy-900">
                    {q.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-navy-600">
                    "{q.description}"
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-accent-500 transition-all duration-700 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
