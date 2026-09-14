export type LaserPrice = {
  name: string;
  price: number;
};

export type ServiceCategory =
  | "Depilación láser"
  | "Despigmentación"
  | "Dermapen"
  | "Eliminación de tatuajes"
  | "Lipoenzimas"
  | "Botox";

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imagePosition?: string;
  priceLabel: string;
  requiresAssessment: boolean;
  whatsappMessage: string;
  category: ServiceCategory;
  featured: boolean;
  laserPrices?: readonly LaserPrice[];
};

export const laserPrices = [
  { name: "Axila", price: 250 },
  { name: "Bikini completo", price: 300 },
  { name: "Bigote", price: 130 },
  { name: "Piernas completas", price: 425 },
  { name: "Media pierna", price: 340 },
  { name: "Brazos completos", price: 320 },
  { name: "Medio brazo", price: 250 },
  { name: "Abdomen", price: 300 },
  { name: "Media espalda", price: 300 },
  { name: "Espalda completa", price: 450 },
  { name: "Línea del abdomen", price: 180 },
  { name: "Glúteos", price: 300 },
  { name: "Media cara", price: 270 },
] as const satisfies readonly LaserPrice[];

export const services = [
  {
    id: "depilacion-laser",
    slug: "depilacion-laser",
    name: "Depilación láser",
    shortDescription:
      "Sesiones por zona adaptadas a las características de cada paciente.",
    fullDescription:
      "Sesiones por zona adaptadas a las características de cada paciente. Consulta las zonas disponibles y recibe orientación para elegir la opción adecuada para ti.",
    image: "/Gallery/servicio-depilacion-laser.jpg",
    imagePosition: "center center",
    priceLabel: "Desde $130 por sesión",
    requiresAssessment: false,
    whatsappMessage:
      "Hola, me gustaría recibir información sobre depilación láser y conocer cuál zona o paquete es adecuado para mí.",
    category: "Depilación láser",
    featured: true,
    laserPrices,
  },
  {
    id: "despigmentacion-zonas-oscuras",
    slug: "despigmentacion-zonas-oscuras",
    name: "Despigmentación de zonas oscuras",
    shortDescription:
      "Tratamiento enfocado en mejorar la apariencia de zonas con pigmentación.",
    fullDescription:
      "Tratamiento enfocado en mejorar la apariencia de zonas con pigmentación. Requiere una valoración profesional para orientar cada caso.",
    image: "/Gallery/servicio-despigmentacion.jpg",
    imagePosition: "center 45%",
    priceLabel: "Consultar precio",
    requiresAssessment: true,
    whatsappMessage:
      "Hola, me gustaría recibir información sobre el tratamiento de despigmentación de zonas oscuras.",
    category: "Despigmentación",
    featured: true,
  },
  {
    id: "dermapen",
    slug: "dermapen",
    name: "Dermapen",
    shortDescription: "Procedimiento estético sujeto a valoración profesional.",
    fullDescription:
      "Procedimiento estético sujeto a valoración profesional. Durante la valoración se comparte la información adecuada para cada paciente.",
    image: "/Gallery/servicio-dermapen-referencia.jpg",
    imagePosition: "center 38%",
    priceLabel: "Requiere valoración",
    requiresAssessment: true,
    whatsappMessage:
      "Hola, me gustaría recibir información y agendar una valoración para Dermapen.",
    category: "Dermapen",
    featured: true,
  },
  {
    id: "eliminacion-tatuajes",
    slug: "eliminacion-tatuajes",
    name: "Eliminación de tatuajes",
    shortDescription:
      "Tratamiento láser cuya duración y costo dependen del tatuaje.",
    fullDescription:
      "Tratamiento láser cuya duración y costo dependen del tatuaje. Se requiere valoración para conocer la información de cada caso.",
    image: "/Gallery/servicio-eliminacion-tatuajes-temporal.jpg",
    imagePosition: "center 45%",
    priceLabel: "Consultar precio",
    requiresAssessment: true,
    whatsappMessage:
      "Hola, me gustaría recibir información sobre eliminación de tatuajes y saber si necesito una valoración.",
    category: "Eliminación de tatuajes",
    featured: true,
  },
  {
    id: "lipoenzimas",
    slug: "lipoenzimas",
    name: "Lipoenzimas",
    shortDescription:
      "Tratamiento corporal que requiere una valoración previa.",
    fullDescription:
      "Tratamiento corporal que requiere una valoración previa. La información se proporciona de forma personalizada durante la valoración.",
    image: "/Gallery/servicio-lipoenzimas-referencia.jpg",
    imagePosition: "center 35%",
    priceLabel: "Requiere valoración",
    requiresAssessment: true,
    whatsappMessage:
      "Hola, me gustaría recibir información y agendar una valoración para lipoenzimas.",
    category: "Lipoenzimas",
    featured: true,
  },
  {
    id: "botox",
    slug: "botox",
    name: "Botox",
    shortDescription:
      "Aplicación estética personalizada después de una valoración profesional.",
    fullDescription:
      "Aplicación estética personalizada después de una valoración profesional. Consulta la información adecuada para ti durante la valoración.",
    image: "/Gallery/servicio-botox.jpg",
    imagePosition: "center 42%",
    priceLabel: "Consultar precio",
    requiresAssessment: true,
    whatsappMessage:
      "Hola, me gustaría recibir información y agendar una valoración para Botox.",
    category: "Botox",
    featured: true,
  },
] as const satisfies readonly Service[];

export const serviceCategories = [
  "Depilación láser",
  "Despigmentación",
  "Dermapen",
  "Eliminación de tatuajes",
  "Lipoenzimas",
  "Botox",
] as const satisfies readonly ServiceCategory[];

export const laserService = services[0];
