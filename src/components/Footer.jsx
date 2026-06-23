export function Footer() {
  return (
    <footer className="section-dark-clean py-12">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/8">
              <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-[#dfe3de]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#8aa4b3]" />
              <span className="absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#8fb397]" />
              <span className="h-px w-5 rotate-45 bg-white/30" />
              <span className="absolute h-px w-5 -rotate-45 bg-white/30" />
            </span>
            <span className="text-lg font-semibold">GridReady AI</span>
          </div>
          <p className="mt-4 max-w-xl text-[#cbd2cc]">Power, grid, water, climate, and finance intelligence for infrastructure decisions.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-[#dfe3de]">
          <a href="#platform" className="hover:text-white">Platform</a>
          <a href="#analyzer" className="hover:text-white">Demo</a>
          <a href="#use-cases" className="hover:text-white">Use Cases</a>
          <a href="mailto:hello@gridready.ai" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
