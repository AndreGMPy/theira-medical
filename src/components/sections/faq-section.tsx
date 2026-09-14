import { ChevronDown } from "lucide-react";

import { faqs } from "@/data/faq";

import { SectionHeading } from "@/components/ui/section-heading";

export function FaqSection() {
  return (
    <section id="preguntas" className="scroll-mt-24 bg-[var(--color-warm-white)] py-12 sm:py-14 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-[18px] sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Información clara antes de tu cita" description="Resolvemos las dudas más comunes. Para recomendaciones personales, agenda una valoración." />
        <div className="divide-y divide-[var(--color-beige)] border-y border-[var(--color-beige)]">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-[0.98rem] font-bold text-[var(--color-coffee)] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-terracotta)]">
                {faq.question}
                <ChevronDown className="size-5 shrink-0 text-[var(--color-terracotta)] transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-4 pr-8 text-[0.92rem] leading-6 text-[var(--color-muted)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
