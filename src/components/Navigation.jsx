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
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-black/10 bg-white shadow-sm">
            <span className="h-3 w-3 rounded-sm bg-graphite" />
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
            className="rounded-full bg-graphite px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink"
          >
            Analyze a Site
          </a>
        </div>
      </nav>
    </header>
  );
}
