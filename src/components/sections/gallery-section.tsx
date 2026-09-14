import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { SectionHeading } from "@/components/ui/section-heading";

const galleryItems = [
  {
    src: "/Gallery/tratamiento-laser-facial.jpg",
    alt: "Imagen editorial sobre tratamiento láser facial",
    label: "Tecnología y cuidado profesional",
    className: "aspect-[4/3] sm:col-span-2",
  },
  {
    src: "/Gallery/cuidado-facial-referencia.jpg",
    alt: "Imagen ilustrativa de cuidado facial",
    label: "Cuidado facial",
    className: "aspect-[4/3]",
  },
  {
    src: "/Gallery/consultorio-referencia-ia.jpg",
    alt: "Imagen ilustrativa de un espacio de atención",
    label: "Espacio de atención",
    className: "aspect-[4/3]",
  },
  {
    src: "/Gallery/sala-espera-referencia-ia.jpg",
    alt: "Imagen ilustrativa de una sala de espera",
    label: "Sala de espera ilustrativa",
    className: "aspect-[4/3]",
  },
  {
    src: "/Gallery/lifestyle-verano-sin-vello.jpg",
    alt: "Imagen editorial de bienestar en verano",
    label: "Bienestar a tu medida",
    className: "aspect-[4/3]",
  },
];

export function GallerySection() {
  return (
    <section className="bg-[var(--color-ivory)] py-12 sm:py-14 lg:py-[72px]">
      <div className="mx-auto max-w-[1280px] px-[18px] sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Cuidado profesional"
            title="Una atención pensada con detalle"
            description="Imágenes editoriales e ilustrativas para acompañar la información sobre cuidado profesional y espacio de atención."
          />
          <p className="max-w-xs text-[0.9rem] leading-5 text-[var(--color-muted)]">
            Algunas imágenes son de referencia y no representan pacientes, resultados ni instalaciones reales.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {galleryItems.map((item) => (
            <figure key={item.src} className={`relative overflow-hidden rounded-[20px] bg-[var(--color-beige)] ${item.className}`}>
              <ImageWithFallback src={item.src} alt={item.alt} label={item.label} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 28vw" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(58,45,42,0.68)] to-transparent px-4 pb-4 pt-10 text-xs font-bold uppercase tracking-[0.12em] text-white">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
