import { ClipboardCheck, Instagram, MapPin } from "lucide-react";
import Image from "next/image";

import { siteConfig } from "@/config/site";

import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

export function ContactSection() {
  return (
    <section id="contacto" className="scroll-mt-24 bg-[var(--color-ivory)] py-12 sm:py-14 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-[18px] sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading eyebrow="Contacto" title="Agenda tu valoración" description="Tu bienestar comienza con una valoración personalizada. Diseñemos juntos el protocolo adecuado para ti." />
          <WhatsAppLink className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-coffee)] px-6 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]" showIcon>
            Escribir por WhatsApp
          </WhatsAppLink>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-[var(--color-beige)] bg-[var(--color-warm-white)] p-5">
              <MapPin className="size-5 text-[var(--color-terracotta)]" aria-hidden="true" />
              <p className="mt-4 text-sm font-bold text-[var(--color-coffee)]">{siteConfig.location}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{siteConfig.address}</p>
            </div>
            <div className="rounded-[20px] border border-[var(--color-beige)] bg-[var(--color-warm-white)] p-5">
              <ClipboardCheck className="size-5 text-[var(--color-terracotta)]" aria-hidden="true" />
              <p className="mt-4 text-sm font-bold text-[var(--color-coffee)]">Agenda tu cita</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{siteConfig.appointmentNote}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.92rem] font-bold text-[var(--color-coffee)]">
            <WhatsAppLink className="inline-flex items-center gap-2 underline decoration-[var(--color-nude)] underline-offset-4 hover:text-[var(--color-terracotta)]" showIcon><span>WhatsApp</span></WhatsAppLink>
            <a href={`tel:${siteConfig.whatsappNumber}`} className="underline decoration-[var(--color-nude)] underline-offset-4 hover:text-[var(--color-terracotta)]">{siteConfig.phoneDisplay}</a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline decoration-[var(--color-nude)] underline-offset-4 hover:text-[var(--color-terracotta)]"><Instagram className="size-4" aria-hidden="true" />@theira_medical</a>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-[var(--color-beige)] bg-[var(--color-beige)]">
          <Image src="/Gallery/reales/doctora-jenifer-retrato-contacto.png" alt="Dra. Jenifer Gordillo Salazar con estetoscopio" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-center" />
          <div className="absolute inset-x-4 bottom-4 rounded-[18px] border border-white/60 bg-[color:color-mix(in_srgb,var(--color-warm-white),transparent_10%)] p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6"><p className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[var(--color-coffee)]">Agenda tu cita</p><p className="mt-1 text-sm text-[var(--color-muted)]">{siteConfig.phoneDisplay}</p></div>
        </div>
      </div>
    </section>
  );
}
