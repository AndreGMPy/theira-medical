import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { catalogCategories, getCategoryHref } from "@/data/catalog";

export function HomeCatalogSection() {
  return (
    <section id="catalogo-destacado" className="scroll-mt-24 bg-[var(--color-warm-white)] py-12 sm:py-14 lg:py-[72px]">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-[22px] lg:px-7">
        <div className="flex flex-col gap-4 border-b border-[var(--color-beige)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-terracotta)]">Menú de servicios</p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--color-coffee)]">Catálogo de servicios</h2>
            <p className="mt-3 text-[0.94rem] leading-6 text-[var(--color-muted)]">Medicina Estética & Bienestar Funcional</p>
          </div>
          <Link href="/catalogo" className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-[var(--color-coffee)] px-5 text-[0.9rem] font-semibold text-[var(--color-coffee)] transition-colors hover:bg-[var(--color-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)] lg:self-auto">Ver catálogo completo <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {catalogCategories.map((category, index) => (
            <article key={category.id} className="group flex min-h-[270px] flex-col overflow-hidden rounded-[20px] border border-[var(--color-beige)] bg-[var(--color-ivory)]">
              <div className="relative h-[148px] overflow-hidden bg-[var(--color-beige)]">
                <Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className={`object-cover ${category.id === "composicion-corporal" ? "object-[center_35%]" : ""}`} />
              </div>
              <div className="flex flex-1 flex-col p-[18px]">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-terracotta)]">0{index + 1}</span>
                <h3 className="mt-1.5 font-[family-name:var(--font-heading)] text-[1.24rem] font-semibold leading-[1.12] text-[var(--color-coffee)]">{category.title}</h3>
                <Link href={getCategoryHref(category)} className="mt-auto inline-flex min-h-10 items-center gap-2 pt-3 text-[0.86rem] font-semibold text-[var(--color-coffee)] underline decoration-[var(--color-nude)] underline-offset-4 transition-colors hover:text-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)]">Ver tratamientos <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
