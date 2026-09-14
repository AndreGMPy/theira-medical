"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

import { BrandLogo } from "@/components/ui/brand-logo";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:color-mix(in_srgb,var(--color-beige),transparent_25%)] bg-[color:color-mix(in_srgb,var(--color-warm-white),transparent_8%)] backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-[18px] sm:gap-5 sm:px-6 lg:h-[92px] lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-3.5" aria-label="Ir al inicio">
          <BrandLogo className="size-[52px] sm:size-[58px] lg:size-[70px]" preload />
          <span className="flex min-w-0 flex-col leading-[1.1]">
            <span className="line-clamp-2 font-[family-name:var(--font-heading)] text-[0.94rem] font-semibold leading-[1.05] text-[var(--color-coffee)] min-[390px]:text-[1rem] sm:text-[1.28rem] lg:text-[1.5rem]">
              Dra. Jenifer Gordillo Salazar
            </span>
            <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--color-terracotta)] sm:text-[0.68rem] lg:text-[0.72rem]">
              Theira Medical
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.94rem] font-semibold text-[var(--color-coffee)] transition-colors hover:text-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppLink className="inline-flex h-12 items-center rounded-full bg-[var(--color-coffee)] px-5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]">
            Agendar cita
          </WhatsAppLink>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-[var(--color-beige)] text-[var(--color-coffee)] transition-colors hover:bg-[var(--color-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)] lg:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-[var(--color-beige)] bg-[var(--color-warm-white)] lg:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-[18px] py-4 sm:px-6" aria-label="Navegación móvil">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-[var(--color-beige)] py-3.5 text-[0.94rem] font-semibold text-[var(--color-coffee)] transition-colors hover:text-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-terracotta)]"
              >
                {item.label}
              </Link>
            ))}
            <WhatsAppLink
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-coffee)] px-5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
              message="Hola, me gustaría agendar una valoración con la Dra. Jenifer Gordillo Salazar."
            >
              Agendar cita
            </WhatsAppLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
