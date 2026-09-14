import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { confirmedLaserPrices } from "@/data/catalog";

const details = [
  "Tratamiento dirigido a lograr una reducción progresiva del crecimiento del vello mediante tecnología láser.",
  "Sesiones por zona.",
  "Precios por sesión.",
  "Atención con cita previa.",
];

export function LaserSection() {
  return (
    <section id="depilacion-laser" className="scroll-mt-24 overflow-hidden bg-[var(--color-ivory)] py-12 sm:py-14 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-[18px] sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div className="relative order-2 mx-auto w-full max-w-[430px] lg:order-1">
          <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[var(--color-nude)]">
            <Image src="/Gallery/catalogo-fiel-pdf/depilacion-laser.jpg" alt="Aplicación de depilación láser" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-center" />
          </div>
          <div className="absolute -bottom-4 -right-2 size-28 rounded-full border-[10px] border-[var(--color-ivory)] bg-[var(--color-sage)] sm:-right-6 sm:size-36" aria-hidden="true" />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Conoce el tratamiento"
            title="Depilación láser"
            description="Tratamiento dirigido a lograr una reducción progresiva del crecimiento del vello mediante tecnología láser. Consulta las zonas disponibles y los precios confirmados por sesión."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-3 rounded-[18px] bg-[var(--color-warm-white)] p-3.5 text-[0.92rem] font-semibold text-[var(--color-coffee)]">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-terracotta)]" aria-hidden="true" />
                {detail}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-[var(--color-beige)] py-5 text-[0.84rem] sm:grid-cols-3">
            {confirmedLaserPrices.map((zone) => <div key={zone.name} className="flex items-center justify-between gap-2 border-b border-[var(--color-beige)]/70 py-2"><span>{zone.name}</span><strong className="text-[var(--color-terracotta)]">${zone.price}</strong></div>)}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalogo#depilacion-laser" className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-coffee)] px-6 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]">Ver en catálogo</Link>
            <WhatsAppLink className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-coffee)] px-6 text-[0.92rem] font-semibold text-[var(--color-coffee)] transition-colors hover:bg-[var(--color-warm-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]">Agendar valoración</WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
