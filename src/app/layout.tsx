import type { Metadata } from "next";

import { siteUrl } from "@/config/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dra. Jenifer Gordillo Salazar | Theira Medical",
  description:
    "Medicina estética, regenerativa y antienvejecimiento en Moroleón, Guanajuato. Consulta tratamientos y agenda una valoración con la Dra. Jenifer Gordillo Salazar.",
  openGraph: {
    title: "Dra. Jenifer Gordillo Salazar | Theira Medical",
    description:
      "Medicina estética, regenerativa y antienvejecimiento en Moroleón, Guanajuato.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
