export type ConfirmedPrice = {
  name: string;
  price: number;
};

export type SupportingInfo = {
  id: string;
  title: string;
  description?: string;
  additionalText?: string;
  items?: readonly string[];
};

export type ApplicationSite = {
  label: string;
};

export type ClinicalSituation = {
  label: string;
  description?: string;
};

export type Treatment = {
  id: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  priceLabel: string;
  requiresAssessment: boolean;
  whatsappMessage: string;
  anchors: readonly string[];
  actionLabel?: string;
  actionHref?: string;
  confirmedPrices?: readonly ConfirmedPrice[];
  priceNotes?: readonly string[];
};

export type Category = {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  treatments: readonly Treatment[];
  supportingInfo?: readonly SupportingInfo[];
  applicationSites?: readonly ApplicationSite[];
  clinicalSituations?: readonly ClinicalSituation[];
};

const imagePath = (name: string) => `/Gallery/catalogo-fiel-pdf/${name}.jpg`;

const whatsappFor = (treatment: string) =>
  `Hola, me gustaría recibir información y agendar una valoración para ${treatment} con la Dra. Jenifer Gordillo Salazar.`;

const treatment = (
  id: string,
  title: string,
  description: string | undefined,
  image: string,
  priceLabel = "Requiere valoración",
  options?: Pick<Treatment, "actionLabel" | "actionHref" | "confirmedPrices" | "priceNotes">,
): Treatment => ({
  id,
  title,
  description,
  image: imagePath(image),
  imageAlt: `Representación visual de ${title}`,
  priceLabel,
  requiresAssessment: priceLabel !== "Desde $130 por sesión",
  whatsappMessage: whatsappFor(title),
  anchors: [id],
  ...options,
});

export const confirmedLaserPrices = [
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
] as const satisfies readonly ConfirmedPrice[];

export const catalogCategories: readonly Category[] = [
  {
    id: "inyectables-rellenos",
    title: "Inyectables & rellenos",
    shortTitle: "Inyectables",
    subtitle: "Armonización · Definición · Expresión natural",
    description: "Tratamientos personalizados para restaurar, definir y armonizar diferentes áreas del rostro.",
    image: imagePath("acido-hialuronico"),
    imageAlt: "Aplicación estética facial",
    treatments: [
      treatment("acido-hialuronico", "Ácido hialurónico", "Tratamiento personalizado para restaurar, definir y armonizar diferentes áreas del rostro.", "acido-hialuronico", "Consultar precio"),
      treatment("toxina-botulinica", "Toxina botulínica", "Suaviza líneas de expresión y ayuda a preservar una apariencia natural y equilibrada.", "toxina-botulinica", "Consultar precio"),
      treatment("lips-booster", "Lips Booster", "Tratamiento enfocado para mejorar hidratación, textura y color de los labios.", "lips-booster", "Consultar precio"),
    ],
    supportingInfo: [{
      id: "tratamientos-inyectables",
      title: "Tratamientos",
      items: ["Rinomodelación", "Perfilamiento mandibular", "Armonización", "Aumento y definición de labios", "Lips Booster", "Mesobotox", "Líneas de expresión", "Bruxismo / maseteros", "Hiperhidrosis"],
    }],
  },
  {
    id: "calidad-piel",
    title: "Calidad de piel",
    shortTitle: "Calidad de piel",
    subtitle: "Hidratación · Revitalización · Bioestimulación",
    description: "Protocolos personalizados para mejorar la hidratación, textura, luminosidad y calidad de la piel.",
    image: imagePath("skinbooster"),
    imageAlt: "Procedimiento para calidad de piel",
    treatments: [
      treatment("skinbooster", "Skinbooster", "Protocolos personalizados para mejorar la hidratación, textura, luminosidad y calidad de la piel.", "skinbooster", "Consultar precio"),
      treatment("bacio", "Bacio", "Protocolos personalizados para mejorar la hidratación, textura, luminosidad y calidad de la piel.", "bacio", "Consultar precio"),
      treatment("pdrn-polinucleotidos", "PDRN / Polinucleótidos", "Protocolos personalizados para mejorar la hidratación, textura, luminosidad y calidad de la piel.", "pdrn-polinucleotidos", "Consultar precio"),
      treatment("bioestimulacion-calidad-piel", "Bioestimulación", "Protocolos personalizados para mejorar la hidratación, textura, luminosidad y calidad de la piel.", "bioestimulacion-calidad-piel", "Consultar precio"),
      treatment("exosomas", "Exosomas", "Protocolos personalizados para mejorar la hidratación, textura, luminosidad y calidad de la piel.", "exosomas", "Consultar precio"),
    ],
  },
  {
    id: "medicina-regenerativa",
    title: "Medicina regenerativa",
    shortTitle: "Regenerativa",
    subtitle: "Regeneración · Bioestimulación · Reparación tisular",
    description: "Protocolos orientados a la regeneración, bioestimulación y reparación tisular, seleccionados de acuerdo con la valoración.",
    image: imagePath("prp-facial"),
    imageAlt: "Procedimiento de medicina regenerativa",
    treatments: [
      treatment("prp-facial", "PRP facial", "Protocolos con plasma autólogo orientados a mejorar la calidad y apariencia de la piel.", "prp-facial", "Consultar precio"),
      treatment("prp-capilar", "PRP capilar", "Tratamiento dirigido al cuero cabelludo como parte de protocolos para mejorar las condiciones del folículo.", "prp-capilar", "Consultar precio"),
      treatment("bioestimulacion-regenerativa", "Bioestimulación", "Tratamientos orientados a favorecer la producción y remodelación de componentes de la matriz extracelular.", "bioestimulacion-regenerativa", "Consultar precio"),
      treatment("protocolos-regenerativos", "Protocolos regenerativos personalizados", "Combinaciones seleccionadas de acuerdo con la valoración y necesidades de cada paciente.", "protocolos-regenerativos"),
    ],
    applicationSites: ["Facial", "Cuello", "Escote", "Manos", "Capilar", "Articular"].map((label) => ({ label })),
  },
  {
    id: "renovacion-textura-cicatrices",
    title: "Renovación · textura · cicatrices",
    shortTitle: "Renovación y textura",
    subtitle: "Protocolos individualizados",
    description: "Protocolos individualizados para acompañar la renovación cutánea y mejorar progresivamente la apariencia de textura y cicatrices.",
    image: imagePath("peeling-acne"),
    imageAlt: "Procedimiento de renovación de la piel",
    treatments: [
      treatment("peeling-acne", "Peeling para acné", "Ayuda a mejorar la apariencia de la piel con tendencia acneica y favorece su renovación.", "peeling-acne", "Consultar precio"),
      treatment("peeling-manchas-melasma", "Peeling para manchas / melasma", "Protocolos orientados a mejorar progresivamente la apariencia de hiperpigmentaciones y favorecer un tono más uniforme.", "peeling-manchas-melasma", "Consultar precio"),
      treatment("dermapen-cicatrices", "Dermapen para cicatrices", "Microneedling orientado a favorecer la remodelación cutánea y mejorar progresivamente la apariencia de cicatrices.", "dermapen-cicatrices", "Consultar precio"),
    ],
  },
  {
    id: "tecnologia-cuidado-remocion",
    title: "Tecnología · cuidado de la piel · remoción",
    shortTitle: "Tecnología y piel",
    subtitle: "Renovación · Láser · Cuidado especializado",
    description: "Tratamientos de tecnología, cuidado de la piel y remoción con información y precio sujetos a valoración cuando corresponde.",
    image: imagePath("hollywood-peel"),
    imageAlt: "Procedimiento facial con tecnología",
    treatments: [
      treatment("despigmentacion-axilas", "Despigmentación de axilas", "Protocolos personalizados para mejorar progresivamente la apariencia de hiperpigmentación y favorecer un tono más uniforme.", "despigmentacion-axilas", "Consultar precio"),
      treatment("despigmentacion-zona-intima", "Despigmentación de zona íntima", "Tratamiento dirigido a mejorar la apariencia del tono de la piel de la región íntima externa, previa valoración.", "despigmentacion-zona-intima"),
      treatment("depilacion-laser", "Depilación láser", "Tratamiento dirigido a lograr una reducción progresiva del crecimiento del vello mediante tecnología láser.", "depilacion-laser", "Desde $130 por sesión", {
        actionLabel: "Ver precios",
        actionHref: "#precios-depilacion",
        confirmedPrices: confirmedLaserPrices,
        priceNotes: ["Precios por sesión.", "El número de sesiones recomendado puede variar según la zona, el tipo de vello y las características de cada paciente."],
      }),
      treatment("hollywood-peel", "Hollywood Peel", "Tratamiento de renovación y revitalización cutánea que ayuda a mejorar luminosidad, textura y apariencia general de la piel.", "hollywood-peel", "Consultar precio"),
      treatment("eliminacion-tatuaje-pico-laser", "Eliminación de tatuaje · Pico Láser", undefined, "eliminacion-tatuaje-pico-laser"),
    ],
  },
  {
    id: "composicion-corporal",
    title: "Evaluación · tratamiento médico · composición corporal",
    shortTitle: "Composición corporal",
    subtitle: "Evaluación · Nutrición · Seguimiento",
    description: "Un abordaje integral puede combinar tratamiento médico, nutrición, seguimiento de composición corporal y protocolos médico-estéticos.",
    image: imagePath("tratamiento-medico-peso"),
    imageAlt: "Consulta médica para el tratamiento del peso",
    treatments: [
      treatment("valoracion-composicion-corporal", "Valoración de composición corporal", "Evaluación integral para conocer la distribución de masa grasa, masa muscular y otros componentes corporales, estableciendo objetivos personalizados.", "valoracion-composicion-corporal"),
      treatment("tratamiento-medico-peso", "Tratamiento médico del peso", "Un abordaje integral puede combinar tratamiento médico, nutrición, seguimiento de composición corporal y protocolos médico-estéticos.", "tratamiento-medico-peso"),
      treatment("tratamiento-glp-1", "Tratamiento con GLP-1", "Tratamiento farmacológico indicado para pacientes candidatos, bajo valoración, prescripción y seguimiento médico.", "glp1"),
      treatment("protocolos-corporales", "Protocolos corporales", "Estrategias médico-estéticas que pueden combinarse con el tratamiento médico para acompañar la reducción de grasa localizada y mejorar la apariencia corporal.", "protocolos-corporales"),
    ],
    supportingInfo: [{
      id: "abordaje-integral",
      title: "Nutrición y suplementación dentro del abordaje",
      description: "Estrategias nutricionales y de suplementación adaptadas a las necesidades y objetivos de cada paciente.",
      additionalText: "Un abordaje integral puede combinar tratamiento médico, nutrición, seguimiento de composición corporal y protocolos médico-estéticos.",
    }],
  },
  {
    id: "salud-hormonal",
    title: "Salud hormonal",
    shortTitle: "Salud hormonal",
    subtitle: "Valoración · Manejo individualizado · Bienestar funcional",
    description: "Hormonas con una estructura molecular equivalente a las hormonas producidas naturalmente por el organismo. Su uso forma parte de un manejo médico individualizado, basado en la valoración clínica y las necesidades de cada paciente.",
    image: imagePath("hormonas-bioidenticas"),
    imageAlt: "Representación visual de salud hormonal",
    treatments: [
      treatment("hormonas-bioidenticas", "Hormonas bioidénticas", "Hormonas con una estructura molecular equivalente a las hormonas producidas naturalmente por el organismo. Su uso forma parte de un manejo médico individualizado, basado en la valoración clínica y las necesidades de cada paciente.", "hormonas-bioidenticas"),
    ],
    clinicalSituations: ["Menopausia", "Andropausia", "Sueño y descanso", "Energía y vitalidad", "Composición corporal", "Bienestar sexual"].map((label) => ({ label })),
  },
  {
    id: "terapia-neural-procedimientos",
    title: "Terapia neural & procedimientos",
    shortTitle: "Procedimientos",
    subtitle: "Valoración clínica · Protocolos indicados",
    description: "Procedimientos médicos que parten de la valoración clínica y de la selección del protocolo adecuado para cada paciente.",
    image: imagePath("terapia-neural"),
    imageAlt: "Procedimiento de terapia neural",
    treatments: [
      treatment("terapia-neural", "Terapia neural", "Procedimiento médico que utiliza aplicaciones locales de anestésicos en puntos específicos de dolor, de acuerdo con la valoración clínica y el protocolo indicado para cada paciente.", "terapia-neural"),
      treatment("eliminacion-verrugas", "Eliminación de verrugas", "Valoración previa de la lesión y selección del procedimiento adecuado según sus características y localización.", "eliminacion-verrugas"),
    ],
  },
];

export const getCategoryHref = (category: Category) => `/catalogo#${category.id}`;
