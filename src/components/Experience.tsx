import { Briefcase, Calendar, Building2, Star } from 'lucide-react';
import { experiences as staticExperiences } from '@/data';

interface ExperienceProps {
  experiences?: typeof staticExperiences;
}

export default function Experience({ experiences = staticExperiences }: ExperienceProps) {
  return (
    <section id="experience" className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">My journey</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            Professional Experience
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            My professional journey and work experience.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-2 h-full w-px bg-navy-200 lg:left-1/2 lg:-translate-x-1/2" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <TimelineItem key={exp.role + exp.company} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof staticExperiences)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const delay = (index % 3) + 1;

  return (
    <div className={`relative reveal reveal-delay-${delay}`}>
      {/* Dot */}
      <div className="absolute left-5 top-6 z-10 lg:left-1/2 lg:-translate-x-1/2">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-soft ${
            exp.highlighted ? 'bg-accent-500 text-white' : 'bg-navy-900 text-white'
          }`}
        >
          <Briefcase className="h-4 w-4" />
        </span>
        {exp.highlighted && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 ring-2 ring-white">
            <Star className="h-2.5 w-2.5 text-white" />
          </span>
        )}
      </div>

      {/* Card */}
      <div
        className={`ml-16 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${
          isLeft ? 'lg:mr-auto lg:pr-0' : 'lg:ml-auto'
        }`}
      >
        <div
          className={`group rounded-2xl border p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card ${
            exp.highlighted
              ? 'border-accent-200 bg-accent-50/40 ring-1 ring-accent-200'
              : 'border-navy-100 bg-white hover:border-navy-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-600">
            <Calendar className="h-3.5 w-3.5" />
            {exp.duration}
          </div>

          <h3 className="mt-2 font-display text-xl font-bold text-navy-900">
            {exp.role}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-navy-500">
            <Building2 className="h-4 w-4" />
            {exp.company}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-navy-600">
            {exp.description}
          </p>

          {exp.highlighted && (
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              <Star className="h-3 w-3" />
              Primary Role
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
