import { Download, Mail, FileText } from 'lucide-react';
import { profile as defaultProfile } from '@/data';

interface ResumeCTAProps {
  resumePath?: string;
}

export default function ResumeCTA({ resumePath }: ResumeCTAProps) {
  const path = resumePath || defaultProfile.resumePath;
  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-12 shadow-card sm:px-12 lg:py-16">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">Resume</span>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Want to Know More About My Experience?
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-navy-200">
                "Download my resume to explore my professional experience, skills, education, and
                career background."
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={path}
                  download
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-accent-600 hover:shadow-glow active:scale-95"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                >
                  <Mail className="h-4 w-4" />
                  Contact Me
                </a>
              </div>
            </div>

            {/* Document visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-44 rotate-3 transition-transform hover:rotate-0">
                <div className="rounded-2xl border border-white/15 bg-white p-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-navy-100 pb-2">
                    <FileText className="h-5 w-5 text-accent-500" />
                    <span className="text-[10px] font-semibold text-navy-400">PDF</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-3/4 rounded bg-navy-200" />
                    <div className="h-2 w-full rounded bg-navy-100" />
                    <div className="h-2 w-5/6 rounded bg-navy-100" />
                    <div className="h-2 w-2/3 rounded bg-navy-100" />
                  </div>
                  <div className="mt-4 flex gap-1.5">
                    <div className="h-8 w-6 rounded bg-navy-100" />
                    <div className="h-8 w-6 rounded bg-navy-100" />
                    <div className="h-8 w-6 rounded bg-accent-200" />
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-full rounded bg-navy-50" />
                    <div className="h-1.5 w-4/5 rounded bg-navy-50" />
                  </div>
                </div>
                <div className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl border border-white/10 bg-navy-800/40 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
