import { useEffect, useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { navLinks, profile } from '@/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-soft border-b border-navy-100/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between lg:h-20">
        <a
          href="#home"
          className={`group flex items-center gap-2 text-lg font-bold tracking-tight transition-colors ${
            scrolled ? 'text-navy-900' : 'text-navy-900'
          }`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white shadow-soft transition-transform group-hover:scale-105">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="font-display">{profile.name}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-accent-600 hover:shadow-glow active:scale-95"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-navy-900 transition-colors hover:bg-navy-50 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-navy-100/60 glass transition-all duration-300 lg:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-accent-500 px-5 py-3 text-base font-semibold text-white shadow-soft transition-all hover:bg-accent-600 active:scale-95"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
