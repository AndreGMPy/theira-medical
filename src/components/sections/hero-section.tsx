import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ivory)]">
      <div className="absolute -left-20 top-24 size-64 rounded-full border border-[var(--color-nude)] opacity-70" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-[18px] py-12 sm:px-6 sm:py-14 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:px-8 lg:py-[72px]">
        <div className="relative z-10 animate-[fade-up_700ms_ease-out_both]">
          <p className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">{siteConfig.positioning}</p>
          <p className="font-[family-name:var(--font-heading)] text-[1.25rem] font-semibold text-[var(--color-coffee)] sm:text-[1.5rem]">Dra. Jenifer Gordillo Salazar</p>
          <h1 className="max-w-[680px] font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-coffee)]">
            Tu bienestar comienza con una valoración personalizada.
          </h1>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[var(--color-muted)] sm:text-[1.04rem]">
            Médica con formación en Medicina Estética, Antienvejecimiento y Regenerativa, enfocada en el cuidado integral de la salud, la belleza y el bienestar.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-coffee)] px-6 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]" showIcon>
              Agendar valoración
            </WhatsAppLink>
            <Link href="/catalogo" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-coffee)] px-6 text-[0.92rem] font-semibold text-[var(--color-coffee)] transition-colors hover:bg-[var(--color-warm-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]">
              Ver catálogo <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 flex items-center gap-3 text-[0.9rem] text-[var(--color-muted)]">
            <span className="grid size-9 place-items-center rounded-full bg-[var(--color-beige)] text-[var(--color-terracotta)]"><CalendarDays className="size-4" aria-hidden="true" /></span>
            Valoración médica previa.
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[28.5rem] animate-[fade-up_900ms_ease-out_both] lg:ml-auto">
          <div className="absolute -right-3 -top-3 h-36 w-36 rounded-tl-[4rem] border border-[var(--color-terracotta)] sm:-right-6 sm:-top-6" aria-hidden="true" />
          <div className="relative aspect-[5/6] overflow-hidden rounded-[24px] bg-[var(--color-beige)] shadow-[0_18px_44px_rgba(58,45,42,0.1)]">
            <Image src="/Gallery/reales/doctora-jenifer-retrato-bienvenida.png" alt="Dra. Jenifer Gordillo Salazar" fill priority sizes="(max-width: 1024px) 100vw, 44vw" className="object-contain object-center md:object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-2 max-w-48 rounded-2xl border border-white/70 bg-[color:color-mix(in_srgb,var(--color-warm-white),transparent_8%)] p-3.5 shadow-lg backdrop-blur sm:-left-6">
            <p className="font-[family-name:var(--font-heading)] text-[1.1rem] font-semibold leading-none text-[var(--color-coffee)]">Theira Medical</p>
            <p className="mt-1.5 text-[0.74rem] leading-4 text-[var(--color-muted)]">Medicina Estética · Regenerativa · Antienvejecimiento</p>
          </div>
        </div>
      </div>
    </section>
  );
}
