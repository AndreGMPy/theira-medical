"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { catalogCategories, type Category, type Treatment } from "@/data/catalog";

import styles from "./catalog-experience.module.css";

function CategoryImage({ category }: { category: Category }) {
  return (
    <figure className={styles.categoryImage}>
      <Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 700px) 100vw, 320px" className={styles.coverImage} />
    </figure>
  );
}

function TreatmentVisual({ treatment }: { treatment: Treatment }) {
  return (
    <div className={styles.treatmentVisual}>
      <Image src={treatment.image} alt={treatment.imageAlt} fill sizes="(max-width: 639px) 112px, 118px" className={styles.treatmentImage} />
    </div>
  );
}

export function CatalogExperience() {
  const [activeCategory, setActiveCategory] = useState("todas");
  const visibleCategories = useMemo(
    () => activeCategory === "todas" ? catalogCategories : catalogCategories.filter((category) => category.id === activeCategory),
    [activeCategory],
  );

  return (
    <div>
      <nav aria-label="Índice del catálogo" className={styles.index}>
        <div className={styles.indexTrack}>
          <button type="button" onClick={() => setActiveCategory("todas")} aria-pressed={activeCategory === "todas"} className={`${styles.indexButton} ${activeCategory === "todas" ? styles.indexButtonActive : ""}`}>Todas</button>
          {catalogCategories.map((category) => (
            <a key={category.id} href={`#${category.id}`} onClick={() => setActiveCategory(category.id)} aria-current={activeCategory === category.id ? "true" : undefined} className={`${styles.indexButton} ${activeCategory === category.id ? styles.indexButtonActive : ""}`}>{category.shortTitle}</a>
          ))}
        </div>
      </nav>

      <div className={styles.categories}>
        {visibleCategories.map((category) => (
          <section id={category.id} key={category.id} className={styles.category}>
            <header className={styles.categoryHeader}>
              <div className={styles.categoryCopy}>
                <p className={styles.categoryNumber}>{String(catalogCategories.indexOf(category) + 1).padStart(2, "0")} / 08</p>
                <h2>{category.title}</h2>
                {category.subtitle ? <p className={styles.categorySubtitle}>{category.subtitle}</p> : null}
                {category.description ? <p className={styles.categoryDescription}>{category.description}</p> : null}
                <WhatsAppLink message={`Hola, me gustaría recibir información sobre la categoría ${category.title} y agendar una valoración con la Dra. Jenifer Gordillo Salazar.`} className={styles.categoryButton}><MessageCircle aria-hidden="true" /> Consultar categoría</WhatsAppLink>
              </div>
              <CategoryImage category={category} />
            </header>

            <div className={styles.treatmentGrid}>
              {category.treatments.map((treatment) => (
                <article id={treatment.anchors[0]} key={treatment.id} className={styles.treatmentCard}>
                  <TreatmentVisual treatment={treatment} />
                  <div className={styles.treatmentContent}>
                    <h3>{treatment.title}</h3>
                    {treatment.description ? <p className={styles.treatmentDescription}>{treatment.description}</p> : null}
                  </div>
                  <div className={styles.cardFooter}>
                    {treatment.priceLabel || treatment.requiresAssessment ? (
                      <span className={treatment.requiresAssessment ? styles.assessmentPill : styles.pricePill}>
                        {treatment.priceLabel ?? "Requiere valoración"}
                      </span>
                    ) : null}
                    {treatment.actionHref ? <a href={treatment.actionHref} className={styles.consultButton}>{treatment.actionLabel}</a> : <WhatsAppLink message={treatment.whatsappMessage} className={styles.consultButton}>Consultar</WhatsAppLink>}
                  </div>
                </article>
              ))}
            </div>

            {category.supportingInfo?.map((info) => (
              <aside key={info.id} className={styles.supportingPanel} aria-labelledby={`${info.id}-title`}>
                <p className={styles.supportingEyebrow}>Información complementaria</p>
                <h3 id={`${info.id}-title`}>{info.title}</h3>
                {info.description ? <p>{info.description}</p> : null}
                {info.additionalText ? <p>{info.additionalText}</p> : null}
                {info.items ? <ul>{info.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </aside>
            ))}

            {category.applicationSites ? (
              <aside className={styles.supportingPanel} aria-labelledby={`${category.id}-sites`}>
                <p className={styles.supportingEyebrow}>Información complementaria</p>
                <h3 id={`${category.id}-sites`}>Sitios de aplicación</h3>
                <ul>{category.applicationSites.map((site) => <li key={site.label}>{site.label}</li>)}</ul>
              </aside>
            ) : null}

            {category.clinicalSituations ? (
              <aside className={styles.supportingPanel} aria-labelledby={`${category.id}-situations`}>
                <p className={styles.supportingEyebrow}>Información complementaria</p>
                <h3 id={`${category.id}-situations`}>¿En qué situaciones pueden utilizarse?</h3>
                <ul>{category.clinicalSituations.map((situation) => <li key={situation.label}>{situation.label}{situation.description ? <span>{situation.description}</span> : null}</li>)}</ul>
              </aside>
            ) : null}

            {category.treatments.flatMap((item) => item.confirmedPrices ?? []).length ? (
              <aside id="precios-depilacion" className={styles.pricePanel} aria-labelledby="precios-depilacion-title">
                <div><p className={styles.supportingEyebrow}>Depilación láser</p><h3 id="precios-depilacion-title">Precios por sesión</h3></div>
                <div className={styles.confirmedPriceGrid}>{category.treatments.flatMap((item) => item.confirmedPrices ?? []).map((price) => <div key={price.name}><span>{price.name}</span><strong>${price.price}</strong></div>)}</div>
                {category.treatments.flatMap((item) => item.priceNotes ?? []).map((note) => <p key={note} className={styles.priceNote}>{note}</p>)}
              </aside>
            ) : null}
          </section>
        ))}
      </div>

      {activeCategory !== "todas" ? <button type="button" onClick={() => { setActiveCategory("todas"); window.scrollTo({ top: document.getElementById("catalogo-indice")?.offsetTop ?? 0, behavior: "smooth" }); }} className={styles.showAllButton}>Ver todas las categorías</button> : null}
      <div className={styles.closing}><p>Tu bienestar comienza con una valoración personalizada.</p><WhatsAppLink className={styles.closingButton}>Agenda tu valoración <ArrowUpRight aria-hidden="true" /></WhatsAppLink></div>
    </div>
  );
}
