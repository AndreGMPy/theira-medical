"use client";

import { ArrowUpRight, CircleAlert, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { type Service, services } from "@/data/services";
import { formatMexicanPrice } from "@/lib/utils";

import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

const serviceImageAlt = (service: Service) =>
  `Imagen ilustrativa del servicio de ${service.name}`;

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);

  const closePanel = () => setSelectedService(null);

  useEffect(() => {
    if (!selectedService) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      returnFocusRef.current?.focus();
    };
  }, [selectedService]);

  return (
    <section
      id="servicios-precios"
      className="scroll-mt-24 bg-[var(--color-warm-white)] py-12 sm:py-14 lg:py-[72px]"
    >
      <div className="mx-auto max-w-[1280px] px-[18px] sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catálogo"
          title="Servicios y precios"
          description="Conoce los tratamientos disponibles y consulta la información principal de cada servicio. Algunos procedimientos requieren valoración previa."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex overflow-hidden rounded-[24px] border border-[var(--color-beige)] bg-[var(--color-ivory)] shadow-[0_8px_20px_rgba(58,45,42,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_24px_rgba(58,45,42,0.08)]"
            >
              <div className="flex w-full flex-col">
                <div className="relative h-[200px] overflow-hidden bg-[var(--color-beige)] sm:h-[210px] lg:h-[220px]">
                  <Image
                    src={service.image}
                    alt={serviceImageAlt(service)}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-[filter] duration-300 group-hover:brightness-[0.98]"
                    style={{ objectPosition: service.imagePosition }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-[22px] sm:p-6">
                  <p className="text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[var(--color-terracotta)]">
                    {service.category}
                  </p>
                  <h3 className="mt-2.5 font-[family-name:var(--font-heading)] text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--color-coffee)]">
                    {service.name}
                  </h3>
                  <p
                    className="mt-3 line-clamp-2 text-[0.92rem] leading-5 text-[var(--color-muted)]"
                    title={service.shortDescription}
                  >
                    {service.shortDescription}
                  </p>
                  <p className="mt-4 text-[1.2rem] font-bold leading-6 text-[var(--color-terracotta)]">
                    {service.priceLabel}
                  </p>
                  <div className="mt-5 grid gap-2.5 xl:grid-cols-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        returnFocusRef.current = event.currentTarget;
                        setSelectedService(service);
                      }}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--color-coffee)] px-4 text-[0.9rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
                    >
                      Ver servicio
                    </button>
                    <WhatsAppLink
                      message={service.whatsappMessage}
                      ariaLabel={`Consultar por WhatsApp sobre ${service.name}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-coffee)] px-4 text-center text-[0.9rem] font-semibold text-[var(--color-coffee)] transition-colors hover:bg-[var(--color-warm-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
                    >
                      Consultar por WhatsApp
                    </WhatsAppLink>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/precios"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-terracotta)] px-6 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-coffee)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
          >
            Ver todos los servicios y precios
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {selectedService ? (
        <div
          className="fixed inset-0 z-50 flex items-end bg-[rgba(58,45,42,0.55)] p-3 backdrop-blur-[2px] sm:items-center sm:justify-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePanel();
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-panel-title"
            aria-describedby="service-panel-description"
            className="max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[24px] bg-[var(--color-warm-white)] shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
          >
            <div className="relative aspect-[16/7] min-h-44 overflow-hidden bg-[var(--color-beige)] sm:min-h-60">
              <Image
                src={selectedService.image}
                alt={serviceImageAlt(selectedService)}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                style={{ objectPosition: selectedService.imagePosition }}
              />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closePanel}
                className="absolute right-4 top-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--color-warm-white)] px-4 text-sm font-bold text-[var(--color-coffee)] shadow-sm transition-colors hover:bg-[var(--color-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
              >
                <X className="size-4" aria-hidden="true" />
                Cerrar
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
                {selectedService.category}
              </p>
              <h2
                id="service-panel-title"
                className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,2.7rem)] font-semibold leading-[1.05] text-[var(--color-coffee)]"
              >
                {selectedService.name}
              </h2>
              <p
                id="service-panel-description"
                className="mt-4 max-w-2xl text-[0.98rem] leading-6 text-[var(--color-muted)]"
              >
                {selectedService.fullDescription}
              </p>

              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[var(--color-ivory)] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-terracotta)]">
                    Precio
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-heading)] text-3xl font-semibold text-[var(--color-coffee)]">
                    {selectedService.priceLabel}
                  </p>
                </div>
                <CircleAlert
                  className="size-6 shrink-0 text-[var(--color-terracotta)]"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
                La información y el precio final pueden variar según la valoración.
              </p>

              {selectedService.laserPrices ? (
                <div className="mt-7 rounded-2xl border border-[var(--color-beige)] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-coffee)]">
                      Precios por sesión
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-terracotta)]">
                      Vista resumida
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {selectedService.laserPrices.slice(0, 4).map((zone) => (
                      <div
                        key={zone.name}
                        className="flex items-center justify-between gap-3 rounded-xl bg-[var(--color-ivory)] px-3 py-2 text-sm"
                      >
                        <span className="font-semibold text-[var(--color-coffee)]">{zone.name}</span>
                        <span className="font-bold text-[var(--color-terracotta)]">
                          {formatMexicanPrice(zone.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/precios#depilacion-laser"
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-coffee)] px-5 text-sm font-bold text-[var(--color-coffee)] transition-colors hover:bg-[var(--color-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
                  >
                    Ver lista completa de zonas
                  </Link>
                </div>
              ) : null}

              <WhatsAppLink
                message={selectedService.whatsappMessage}
                showIcon
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-coffee)] px-6 text-sm font-bold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)] sm:w-auto"
              >
                Consultar por WhatsApp
              </WhatsAppLink>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
