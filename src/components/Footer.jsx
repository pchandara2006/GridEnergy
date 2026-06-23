export function Footer() {
  return (
    <footer className="section-dark-clean py-12">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-lg font-semibold">GridReady AI</span>
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
