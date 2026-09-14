import { ContactSection } from "@/components/sections/contact-section";
import { DoctorSection } from "@/components/sections/doctor-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeCatalogSection } from "@/components/sections/home-catalog-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFloatingButton } from "@/components/ui/whatsapp-floating-button";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HomeCatalogSection />
        <DoctorSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
