"use client";

import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  type Service,
  type ServiceCategory,
  serviceCategories,
  services,
} from "@/data/services";
import { formatMexicanPrice } from "@/lib/utils";

import { WhatsAppLink } from "@/components/ui/whatsapp-link";

type ServiceFilter = "Todos" | ServiceCategory;

const filters = ["Todos", ...serviceCategories] as const satisfies readonly ServiceFilter[];

const serviceImageAlt = (service: Service) =>
  `Imagen ilustrativa del servicio de ${service.name}`;

export function PricesCatalog() {
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("Todos");
  const visibleServices =
    activeFilter === "Todos"
      ? services
      : services.filter((service) => service.category === activeFilter);

  return (
    <div className="mt-8 sm:mt-10">
      <section aria-labelledby="services-summary-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
              Catálogo completo
            </p>
            <h2
              id="services-summary-heading"
              className="mt-2 font-[family-name:var(--font-heading)] text-[clamp(2rem,3.5vw,2.7rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--color-coffee)]"
            >
              Servicios disponibles
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--color-muted)]">
            Selecciona un servicio para ver su información y estado de precio.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((service) => {
            const isSelected = activeFilter === service.category;

            return (
              <button
                key={service.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveFilter(service.category)}
                className={`group overflow-hidden rounded-[22px] border bg-[var(--color-warm-white)] text-left transition-shadow hover:shadow-[0_8px_18px_rgba(58,45,42,0.07)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)] ${
                  isSelected
                    ? "border-[var(--color-terracotta)] ring-1 ring-[var(--color-terracotta)]"
                    : "border-[var(--color-beige)]"
                }`}
              >
                <div className="relative h-[145px] overflow-hidden bg-[var(--color-beige)] sm:h-[160px]">
                  <Image
                    src={service.image}
                    alt={serviceImageAlt(service)}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-[filter] duration-300 group-hover:brightness-[0.98]"
                    style={{ objectPosition: service.imagePosition }}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="font-[family-name:var(--font-heading)] text-[1.35rem] font-semibold leading-[1.12] text-[var(--color-coffee)]">
                    {service.name}
                  </p>
                  <p className="mt-2 text-[0.93rem] font-bold text-[var(--color-terracotta)]">
                    {service.priceLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10 border-t border-[var(--color-beige)] pt-8 sm:mt-12 sm:pt-10" aria-labelledby="filter-heading">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
              Consulta por categoría
            </p>
            <h2
              id="filter-heading"
              className="mt-2 font-[family-name:var(--font-heading)] text-[clamp(2rem,3.5vw,2.7rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--color-coffee)]"
            >
              Información y precios
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filtrar servicios">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-10 rounded-full border px-4 text-[0.88rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)] ${
                    isActive
                      ? "border-[var(--color-coffee)] bg-[var(--color-coffee)] text-white"
                      : "border-[var(--color-beige)] bg-[var(--color-warm-white)] text-[var(--color-coffee)] hover:bg-[var(--color-beige)]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          {visibleServices.map((service) =>
            "laserPrices" in service && service.laserPrices ? (
              <LaserPriceList key={service.id} service={service} />
            ) : (
              <AssessmentService key={service.id} service={service} />
            ),
          )}
        </div>
      </section>
    </div>
  );
}

function LaserPriceList({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="scroll-mt-8 overflow-hidden rounded-[24px] border border-[var(--color-beige)] bg-[var(--color-warm-white)]"
    >
      <div className="grid lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="relative min-h-[220px] bg-[var(--color-beige)] lg:h-[360px] lg:min-h-0">
          <Image
            src={service.image}
            alt={serviceImageAlt(service)}
            fill
            sizes="(max-width: 1023px) 100vw, 35vw"
            className="object-cover"
            style={{ objectPosition: service.imagePosition }}
          />
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
            Precios por sesión
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-[1.08] text-[var(--color-coffee)]">
            {service.name}
          </h3>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-6 text-[var(--color-muted)]">
            {service.fullDescription}
          </p>

          <div className="mt-5 grid overflow-hidden rounded-[18px] border border-[var(--color-beige)] sm:grid-cols-2">
            {service.laserPrices?.map((zone) => (
              <div
                key={zone.name}
                className="flex items-center justify-between gap-4 border-b border-[var(--color-beige)] px-3.5 py-2.5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 sm:[&:nth-child(odd)]:border-r"
              >
                <span className="text-[0.9rem] font-semibold text-[var(--color-coffee)]">
                  {zone.name}
                </span>
                <span className="shrink-0 text-[1.05rem] font-bold text-[var(--color-terracotta)]">
                  {formatMexicanPrice(zone.price)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[18px] bg-[var(--color-ivory)] p-4 text-[0.92rem] leading-6 text-[var(--color-muted)]">
            <p className="font-bold text-[var(--color-coffee)]">Precios por sesión.</p>
            <p className="mt-2">
              El número de sesiones recomendado puede variar según la zona, el tipo de vello y las características de cada paciente. Durante la valoración se brindará una recomendación personalizada.
            </p>
          </div>
          <WhatsAppLink
            message={service.whatsappMessage}
            showIcon
            className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-coffee)] px-6 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
          >
            Consultar por WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}

function AssessmentService({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="scroll-mt-8 overflow-hidden rounded-[24px] border border-[var(--color-beige)] bg-[var(--color-warm-white)]"
    >
      <div className="grid md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div className="relative min-h-[210px] bg-[var(--color-beige)] md:h-[300px] md:min-h-0">
          <Image
            src={service.image}
            alt={serviceImageAlt(service)}
            fill
            sizes="(max-width: 767px) 100vw, 32vw"
            className="object-cover"
            style={{ objectPosition: service.imagePosition }}
          />
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
            {service.category}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-[1.08] text-[var(--color-coffee)]">
            {service.name}
          </h3>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-6 text-[var(--color-muted)]">
            {service.fullDescription}
          </p>
          <div className="mt-5 flex flex-col gap-3 rounded-[18px] bg-[var(--color-ivory)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-terracotta)]">
                Estado de precio
              </p>
              <p className="mt-1 text-[1.2rem] font-bold text-[var(--color-coffee)]">
                {service.priceLabel}
              </p>
            </div>
            <CircleAlert className="size-6 shrink-0 text-[var(--color-terracotta)]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-[0.92rem] leading-6 text-[var(--color-muted)]">
            La información y el precio final pueden variar según la valoración.
          </p>
          <WhatsAppLink
            message={service.whatsappMessage}
            showIcon
            className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-coffee)] px-6 text-[0.92rem] font-semibold text-white transition-colors hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]"
          >
            Consultar por WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
