export const siteConfig = {
  name: "Dra. Jenifer Gordillo Salazar",
  businessName: "Theira Medical",
  whatsappNumber: "524452151625",
  whatsappMessage:
    "Hola, me gustaría recibir información y agendar una valoración con la Dra. Jenifer Gordillo Salazar.",
  instagram: "https://www.instagram.com/theira_medical/",
  location: "Moroleón, Gto.",
  address: "Calle Jaime Nuno 512, Moroleón, Gto.",
  phoneDisplay: "+52 445 215 1625",
  appointmentNote: "Valoración médica previa.",
  positioning: "Medicina Estética · Regenerativa · Antienvejecimiento",
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Sobre la doctora", href: "/#doctora" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Depilación láser", href: "/catalogo#depilacion-laser" },
    { label: "Contacto", href: "/#contacto" },
  ],
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theira-medical.example";
