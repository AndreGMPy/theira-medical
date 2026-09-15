import { Instagram, MapPin } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/ui/brand-logo";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-beige)] bg-[var(--color-warm-white)]">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-[18px] py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <BrandLogo className="size-14" />
            <div>
              <p className="font-[family-name:var(--font-heading)] text-[1.35rem] font-semibold leading-none text-[var(--color-coffee)]">
                {siteConfig.name}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-terracotta)]">
                {siteConfig.businessName}
              </p>
            </div>
          </div>
          <p className="mt-5 text-[0.92rem] leading-6 text-[var(--color-muted)]">
            Medicina Estética · Regenerativa · Antienvejecimiento
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">Contacto</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-coffee)]">
            <span className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-[var(--color-terracotta)]" aria-hidden="true" />{siteConfig.address}</span>
            <a className="flex items-center gap-2 hover:text-[var(--color-terracotta)]" href={siteConfig.instagram} target="_blank" rel="noreferrer"><Instagram className="size-4 text-[var(--color-terracotta)]" aria-hidden="true" />@theira_medical</a>
            <WhatsAppLink className="flex items-center gap-2 hover:text-[var(--color-terracotta)]" showIcon><span>WhatsApp</span></WhatsAppLink>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">Información</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-coffee)]">
            <Link className="hover:text-[var(--color-terracotta)]" href="/catalogo">Catálogo de servicios</Link>
            <Link className="hover:text-[var(--color-terracotta)]" href="/catalogo#depilacion-laser">Depilación láser</Link>
            <span>{siteConfig.phoneDisplay}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-beige)] px-[18px] py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {siteConfig.name}. Todos los derechos reservados.</span>
          <span>Diseño y desarrollo por <a className="font-bold text-[var(--color-coffee)] underline decoration-[var(--color-nude)] underline-offset-4 hover:text-[var(--color-terracotta)]" href="https://ingenixhub.com" target="_blank" rel="noreferrer">Ingenix Hub</a></span>
        </div>
      </div>
    </footer>
  );
}
