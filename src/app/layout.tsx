import type { Metadata } from "next";

import { siteUrl } from "@/config/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dra. Jenifer Gordillo Salazar | Theira Medical",
  description:
    "Medicina Estética · Regenerativa · Antienvejecimiento. Calle Jaime Nuno 512, Moroleón, Gto.",
  openGraph: {
    title: "Dra. Jenifer Gordillo Salazar | Theira Medical",
    description:
      "Medicina Estética · Regenerativa · Antienvejecimiento. Calle Jaime Nuno 512, Moroleón, Gto.",
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
