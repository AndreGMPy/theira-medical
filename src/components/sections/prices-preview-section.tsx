import { ArrowUpRight, ScanLine } from "lucide-react";
import Link from "next/link";

export function PricesPreviewSection() {
  return (
    <section className="bg-[var(--color-warm-white)] py-12 sm:py-14 lg:py-[72px]">
      <div className="mx-auto max-w-[1280px] px-[18px] sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[var(--color-nude)] px-6 py-9 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="absolute -right-20 -top-24 size-72 rounded-full border border-[var(--color-terracotta)] opacity-40" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <span className="grid size-12 place-items-center rounded-full bg-[var(--color-warm-white)] text-[var(--color-terracotta)]"><ScanLine className="size-5" aria-hidden="true" /></span>
            <p className="mt-5 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--color-coffee)]">Lista independiente</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--color-coffee)]">Conoce nuestros servicios y precios</h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-6 text-[var(--color-muted)]">Consulta las zonas disponibles para depilación láser y agenda tu valoración directamente por WhatsApp.</p>
          </div>
          <Link href="/precios" className="relative mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-coffee)] px-6 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)] lg:mt-0 lg:shrink-0">Ver lista de precios <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
