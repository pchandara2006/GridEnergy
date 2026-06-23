import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12">
      <div className="section-shell flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyanline/30 bg-cyanline/10 text-cyanline">
              <Activity size={20} />
            </span>
            <span className="text-lg font-semibold">GridReady AI</span>
          </div>
          <p className="mt-4 max-w-xl text-slate-400">Power, grid, water, climate, and finance intelligence for infrastructure decisions.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-slate-300">
          <a href="#platform" className="hover:text-white">Platform</a>
          <a href="#analyzer" className="hover:text-white">Demo</a>
          <a href="#use-cases" className="hover:text-white">Use Cases</a>
          <a href="mailto:hello@gridready.ai" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
