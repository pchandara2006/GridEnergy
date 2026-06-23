import { FileSearch, FileText, Layers3 } from 'lucide-react';
import { documentSignals } from '../data/gridreadyData.js';
import { SectionHeader } from './ui.jsx';

const documents = [
  {
    icon: FileText,
    title: 'Utility planning PDF',
    meta: 'Integrated resource plan - demo file',
    status: 'Parsed',
  },
  {
    icon: Layers3,
    title: 'Interconnection report',
    meta: 'Queue cluster study - demo file',
    status: 'Signal review',
  },
  {
    icon: FileSearch,
    title: 'Permit and zoning filing',
    meta: 'Local hearing packet - demo file',
    status: 'Extracted',
  },
];

export function DocumentIntelligence() {
  return (
    <section id="intelligence" className="py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="AI document intelligence"
          title="Turn utility and permitting documents into infrastructure signals."
          body="The MVP mockup shows how GridReady AI can organize unstructured planning files into risks that site selection teams can actually use."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-panel rounded-2xl p-6">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Source documents</p>
            <div className="space-y-4">
              {documents.map((document) => {
                const Icon = document.icon;
                return (
                  <article key={document.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-cyanline/20 bg-cyanline/10 text-cyanline">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="font-semibold text-white">{document.title}</h3>
                          <span className="w-fit rounded-full border border-gridgreen/25 bg-gridgreen/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gridgreen">
                            {document.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">{document.meta}</p>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyanline to-gridgreen" />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-300">
              MVP demo - document extraction workflow mockup.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Extracted signals</p>
            <div className="grid gap-4 md:grid-cols-2">
              {documentSignals.map((signal) => (
                <article key={signal.label} className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanline">{signal.label}</p>
                  <p className="mt-4 leading-7 text-slate-300">{signal.value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
