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
  description: "Consulta el catálogo de servicios de medicina estética, regenerativa, antienvejecimiento, depilación láser y bienestar funcional de Theira Medical.",
  openGraph: {
    title: "Catálogo de servicios | Theira Medical",
    description: "Consulta el catálogo de servicios de medicina estética, regenerativa, antienvejecimiento, depilación láser y bienestar funcional de Theira Medical.",
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
            <p className={styles.intro}>Una guía web para recorrer los tratamientos de la Dra. Jenifer Gordillo Salazar y elegir el siguiente paso desde tu teléfono.</p>
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
