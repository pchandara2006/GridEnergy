import { Menu } from 'lucide-react';

const links = [
  { label: 'Platform', href: '#platform' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Demo', href: '#analyzer' },
  { label: 'Why Now', href: '#why-now' },
];

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] bg-[#fbfaf7]/88 backdrop-blur-xl">
      <nav className="section-shell flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3" aria-label="GridReady AI home">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-white shadow-sm">
            <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-forest" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-steel" />
            <span className="absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-graphite" />
            <span className="h-px w-5 rotate-45 bg-black/20" />
            <span className="absolute h-px w-5 -rotate-45 bg-black/20" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">GridReady AI</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#4e5752] lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#analyzer"
            className="hidden rounded-full bg-graphite px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest sm:inline-flex"
          >
            Analyze a Site
          </a>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-ink lg:hidden" aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}
