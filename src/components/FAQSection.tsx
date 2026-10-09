import { useState } from 'react';
import { FAQS } from '../data/communityData';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-16 py-16 md:py-24 border-t border-slate-800/80 bg-[#080d11]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.3em] uppercase text-amber-200/70 font-light mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-light tracking-tight text-white/95">
            Questions & <span className="italic text-amber-100 font-normal">Answers</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300/80 font-light tracking-wide font-sans">
            Everything you need to know before stepping into our Discord table.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700/80 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="btn-smooth active:scale-[0.99] w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-white hover:text-amber-200 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300/90 leading-relaxed border-t border-slate-800/50 animate-fade-in font-light tracking-wide font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
