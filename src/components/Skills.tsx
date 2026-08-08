import { Globe, Image, FileText, Table2, MonitorPlay, Star } from 'lucide-react';
import { skills as staticSkills } from '@/data';

interface SkillsProps {
  skills?: typeof staticSkills;
}

const iconMap: Record<string, React.ElementType> = {
  WordPress: Globe,
  Photoshop: Image,
  'MS Word': FileText,
  'MS Excel': Table2,
  'MS PowerPoint': MonitorPlay,
};

export default function Skills({ skills = staticSkills }: SkillsProps) {
  return (
    <section id="skills" className="section-py bg-navy-50/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">What I work with</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            Technical Skills
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Tools and technologies I have worked with.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.name] ?? Star;
            const delay = (i % 3) + 1;
            return (
              <div
                key={skill.name}
                className={`reveal reveal-delay-${delay} group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card ${
                  skill.primary
                    ? 'border-accent-300 ring-1 ring-accent-200'
                    : 'border-navy-100'
                }`}
              >
                {skill.primary && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Star className="h-3 w-3" />
                    Primary
                  </span>
                )}

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all group-hover:scale-110 ${
                    skill.primary
                      ? 'bg-navy-900 text-accent-400'
                      : 'bg-navy-100 text-navy-700'
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-navy-900">
                  {skill.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {skill.description}
                </p>

                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-navy-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      skill.primary ? 'bg-accent-500' : 'bg-navy-400'
                    }`}
                    style={{ width: skill.primary ? '90%' : '70%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
