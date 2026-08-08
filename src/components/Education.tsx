import { GraduationCap, MapPin, School } from 'lucide-react';
import { education as staticEducation } from '@/data';

interface EducationProps {
  education?: typeof staticEducation;
}

export default function Education({ education = staticEducation }: EducationProps) {
  return (
    <section id="education" className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">My background</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            Education
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative">
            <div className="absolute left-5 top-2 h-full w-px bg-navy-200" />
            <div className="space-y-8">
              {education.map((edu, i) => (
                <div key={edu.degree} className={`relative reveal reveal-delay-${i + 1}`}>
                  <div className="absolute left-5 top-6 z-10 -translate-x-1/2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-navy-900 text-white shadow-soft">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="ml-12 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                    <h3 className="font-display text-xl font-bold text-navy-900">
                      {edu.degree}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-navy-500">
                      <School className="h-4 w-4" />
                      {edu.institution}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-navy-500">
                      <MapPin className="h-4 w-4" />
                      {edu.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
