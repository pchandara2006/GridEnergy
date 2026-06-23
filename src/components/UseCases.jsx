import { useCases } from '../data/gridreadyData.js';
import { SectionHeader } from './ui.jsx';

export function UseCases() {
  return (
    <section id="use-cases" className="section-muted border-y border-black/[0.08] py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Use cases"
          title="Built for teams whose economics depend on power."
          body="GridReady AI is designed for infrastructure developers, operators, utilities, and investors who need earlier conviction on power availability and risk."
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((useCase, index) => {
            return (
              <article key={useCase.title} className="border-t border-black/[0.12] pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b716d]">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">{useCase.title}</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b716d]">Pain point</p>
                    <p className="mt-1 leading-7 text-[#4e5752]">{useCase.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b716d]">GridReady output</p>
                    <p className="mt-1 leading-7 text-[#4e5752]">{useCase.help}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b716d]">Decision improved</p>
                    <p className="mt-1 leading-7 text-[#4e5752]">{useCase.decision}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
