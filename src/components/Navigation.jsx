import { Activity, Menu } from 'lucide-react';

const links = [
  { label: 'Platform', href: '#platform' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Demo', href: '#analyzer' },
  { label: 'Why Now', href: '#why-now' },
];

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite/78 backdrop-blur-xl">
      <nav className="section-shell flex h-18 items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3" aria-label="GridReady AI home">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyanline/30 bg-cyanline/10 text-cyanline shadow-glow">
            <Activity size={20} />
          </span>
          <span className="text-lg font-semibold tracking-tight">GridReady AI</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#analyzer"
            className="hidden rounded-lg bg-white px-4 py-2 text-sm font-semibold text-graphite transition hover:bg-cyanline sm:inline-flex"
          >
            Analyze a Site
          </a>
          <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-300 lg:hidden" aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
