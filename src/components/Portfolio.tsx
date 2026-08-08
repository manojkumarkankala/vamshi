import { Globe as WPIcon, ExternalLink, FolderOpen, Image as ImageIcon, Wrench, ArrowRight, Pencil } from 'lucide-react';
import type { PortfolioRow } from '@/useContent';

interface PortfolioProps {
  portfolioItems?: PortfolioRow[];
}

export default function Portfolio({ portfolioItems = [] }: PortfolioProps) {
  const hasItems = portfolioItems.length > 0;

  return (
    <section id="portfolio" className="section-py bg-navy-50/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">My work</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            My Portfolio
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            WordPress development experience and future projects.
          </p>
        </div>

        {/* Category card */}
        <div className="reveal reveal-delay-1 mx-auto mt-12 max-w-3xl">
          <div className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-soft transition-all hover:shadow-card">
            <div className="flex flex-col gap-0 sm:flex-row">
              {/* Visual side */}
              <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700 sm:w-2/5">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-accent-400 ring-1 ring-white/20">
                  <WPIcon className="h-10 w-10" />
                </span>
                <span className="absolute left-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Category
                </span>
              </div>

              {/* Content side */}
              <div className="flex-1 p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold text-navy-900">
                  WordPress Development
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  "Professional experience in WordPress development gained during an 8-month
                  internship at Gie Connect Pvt Ltd."
                </p>
                <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-800 active:scale-95">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mt-10">
          {hasItems ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`reveal reveal-delay-${(i % 3) + 1} group rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card`}
                >
                  <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-navy-50">
                    {item.screenshot_url ? (
                      <img src={item.screenshot_url} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-navy-300">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-xs font-medium">Project Screenshot</span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{item.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{item.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {item.technologies && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-navy-50 px-2 py-1 text-[10px] font-medium text-navy-500">
                        <Wrench className="h-3 w-3" />
                        {item.technologies}
                      </span>
                    )}
                    {item.live_url && (
                      <a
                        href={item.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md bg-accent-50 px-2 py-1 text-[10px] font-medium text-accent-600 hover:bg-accent-100"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="reveal reveal-delay-2 mb-6 flex items-center gap-2 text-sm font-semibold text-navy-500">
                <Pencil className="h-4 w-4 text-accent-500" />
                Editable project area — add your projects from the admin page
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`reveal reveal-delay-${n} group rounded-2xl border border-dashed border-navy-200 bg-white p-5 transition-all hover:border-accent-300 hover:shadow-soft`}
                  >
                    <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-navy-50">
                      <div className="flex flex-col items-center gap-2 text-navy-300">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-xs font-medium">Project Screenshot</span>
                      </div>
                      <span className="absolute left-3 top-3 rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-navy-500 backdrop-blur-sm">
                        Placeholder
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 w-2/3 rounded bg-navy-100" />
                      <div className="h-3 w-full rounded bg-navy-50" />
                      <div className="h-3 w-5/6 rounded bg-navy-50" />
                      <div className="flex items-center gap-2 pt-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-navy-50 px-2 py-1 text-[10px] font-medium text-navy-500">
                          <Wrench className="h-3 w-3" />
                          Technologies
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-navy-50 px-2 py-1 text-[10px] font-medium text-navy-500">
                          <ExternalLink className="h-3 w-3" />
                          Live Link
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-navy-400">
                      <FolderOpen className="h-3.5 w-3.5" />
                      Project Name · Description
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
