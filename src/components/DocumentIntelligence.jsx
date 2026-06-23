import { documentSignals } from '../data/gridreadyData.js';
import { SectionHeader } from './ui.jsx';

const documents = [
  {
    title: 'Utility Resource Plan.pdf',
    meta: 'Integrated resource plan - demo file',
    status: 'Reviewed',
    confidence: '84%',
  },
  {
    title: 'Interconnection Queue Study.pdf',
    meta: 'Queue cluster study - demo file',
    status: 'Needs review',
    confidence: '71%',
  },
  {
    title: 'County Zoning Notes.pdf',
    meta: 'Local hearing packet - demo file',
    status: 'Reviewed',
    confidence: '78%',
  },
];

const snippets = [
  'Capacity constraint referenced in near-term substation planning horizon.',
  'Water demand assumptions require confirmation against local drought guidance.',
  'Community record includes concerns related to land use and cooling infrastructure.',
];

export function DocumentIntelligence() {
  return (
    <section id="intelligence" className="section-light py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="AI document intelligence"
          title="Turn utility and permitting documents into infrastructure signals."
          body="The MVP mockup shows how GridReady AI can organize unstructured planning files into risks that site selection teams can actually use."
        />
        <div className="product-frame mt-12 overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="border-b border-black/[0.08] bg-white p-6 lg:border-b-0 lg:border-r">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-[#6b716d]">Document list</p>
            <div className="space-y-4">
              {documents.map((document) => (
                <article key={document.title} className="memo-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-10 w-8 rounded-sm border border-black/[0.12] bg-white shadow-sm">
                      <div className="h-2 border-b border-black/[0.08] bg-[#eef1ed]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-semibold text-ink">{document.title}</h3>
                        <span className="w-fit rounded-full border border-forest/20 bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-forest">
                          {document.confidence} confidence
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#6b716d]">{document.meta}</p>
                      <p className="mt-3 text-sm font-semibold text-[#4e5752]">{document.status}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-black/[0.08] bg-[#eef1ed] px-4 py-3 text-sm leading-6 text-[#4e5752]">
              Demo workflow. Human review required before investment decisions.
            </p>
          </div>
          <div className="bg-[#fbfaf7] p-6">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-[#6b716d]">Extracted signals</p>
            <div className="grid gap-4 md:grid-cols-2">
              {documentSignals.slice(0, 5).map((signal, index) => (
                <article key={signal.label} className="product-card p-5 shadow-none">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-steel">{signal.label}</p>
                    <span className="rounded-full bg-[#eef1ed] px-2.5 py-1 text-xs font-bold text-[#4e5752]">{82 - index * 5}%</span>
                  </div>
                  <p className="mt-4 leading-7 text-[#4e5752]">{signal.value}</p>
                  <p className="mt-4 border-l-2 border-forest/30 pl-3 text-sm leading-6 text-[#6b716d]">{snippets[index % snippets.length]}</p>
                </article>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
