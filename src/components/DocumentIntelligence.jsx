import { documentSignals } from '../data/gridreadyData.js';
import { SectionHeader } from './ui.jsx';

const documents = [
  { title: 'Utility Resource Plan.pdf', meta: 'Integrated resource plan - demo file', status: 'Reviewed', confidence: '84%' },
  { title: 'Interconnection Queue Study.pdf', meta: 'Queue cluster study - demo file', status: 'Needs review', confidence: '71%' },
  { title: 'County Zoning Notes.pdf', meta: 'Local hearing packet - demo file', status: 'Reviewed', confidence: '78%' },
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
              <div className="divide-y divide-black/[0.08]">
                {documents.map((document) => (
                  <article key={document.title} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-ink">{document.title}</h3>
                        <p className="mt-2 text-sm text-[#6b716d]">{document.meta}</p>
                      </div>
                      <p className="text-sm text-[#4e5752]">{document.status} · {document.confidence}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-6 border-t border-black/[0.08] pt-5 text-sm leading-6 text-[#4e5752]">
                Demo workflow. Human review required before investment decisions.
              </p>
            </div>
            <div className="bg-[#fbfaf7] p-6">
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-[#6b716d]">Extracted signals</p>
              <div className="divide-y divide-black/[0.08]">
                {documentSignals.slice(0, 5).map((signal, index) => (
                  <article key={signal.label} className="py-5 first:pt-0 last:pb-0">
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#6b716d]">{signal.label}</p>
                    <p className="mt-3 leading-7 text-[#4e5752]">{signal.value}</p>
                    <p className="mt-3 text-sm leading-6 text-[#6b716d]">{snippets[index % snippets.length]}</p>
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
