import { Quote, GraduationCap, TrendingUp, HeartHandshake } from 'lucide-react';

interface CareerObjectiveProps {
  objective?: { text: string };
}

const defaultText =
  'To continuously enhance my knowledge, skills and experience by getting involved in challenging work environment and utilize them for personal and organization growth to the best of my ability.';

const steps = [
  { icon: GraduationCap, label: 'Learn' },
  { icon: TrendingUp, label: 'Grow' },
  { icon: HeartHandshake, label: 'Contribute' },
];

export default function CareerObjective({ objective }: CareerObjectiveProps) {
  const text = objective?.text || defaultText;

  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="container-px relative mx-auto max-w-4xl text-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
            <Quote className="h-3.5 w-3.5" />
            Career Objective
          </span>
        </div>

        <h2 className="reveal reveal-delay-1 mt-6 font-display text-3xl font-extrabold text-white sm:text-4xl">
          Career Objective
        </h2>

        <div className="reveal reveal-delay-2 mx-auto mt-8 max-w-3xl">
          <Quote className="mx-auto h-10 w-10 text-accent-400/60" />
          <p className="mt-4 font-display text-xl font-medium leading-relaxed text-navy-100 sm:text-2xl lg:text-[1.7rem] lg:leading-relaxed">
            "{text}"
          </p>
        </div>

        {/* Learn → Grow → Contribute */}
        <div className="reveal reveal-delay-3 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center gap-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-accent-300 shadow-soft">
                  <step.icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-white">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden h-px w-12 bg-gradient-to-r from-accent-400/60 to-transparent sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
