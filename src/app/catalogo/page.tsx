import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CatalogExperience } from "@/components/catalog/catalog-experience";
import { WhatsAppFloatingButton } from "@/components/ui/whatsapp-floating-button";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Catálogo de servicios | Theira Medical",
  description: "Menú de servicios de la Dra. Jenifer Gordillo Salazar. Medicina Estética & Bienestar Funcional.",
  openGraph: {
    title: "Catálogo de servicios | Theira Medical",
    description: "Menú de servicios de la Dra. Jenifer Gordillo Salazar. Medicina Estética & Bienestar Funcional.",
  },
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main id="catalogo-indice" className={styles.main}>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Theira Medical</p>
            <h1 className={styles.title}>Menú de servicios</h1>
            <p className={styles.kicker}>Medicina Estética &amp; Bienestar Funcional</p>
            <p className={styles.intro}>Medicina Estética · Regenerativa · Antienvejecimiento.</p>
            <div className={styles.actions}><WhatsAppLink className={styles.primaryButton}>Agendar valoración</WhatsAppLink><a href="#catalogo" className={styles.secondaryButton}>Explorar catálogo</a></div>
          </div>
          <figure className={styles.heroImage}><Image src="/Gallery/catalogo/catalogo-portada-modelo-negro-dorado.png" alt="Portada visual del catálogo de servicios" fill priority sizes="(max-width: 767px) 100vw, 390px" className="object-cover" /></figure>
        </section>
        <div id="catalogo" className={styles.catalog}><CatalogExperience /></div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
