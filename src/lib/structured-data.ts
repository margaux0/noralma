import { COLEGIADA, CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, SITE_URL, TIKTOK_URL } from "@/lib/contact";

const businessId = `${SITE_URL}/#consulta`;
const personId = `${SITE_URL}/#nora`;
const websiteId = `${SITE_URL}/#website`;
const onlineServiceId = `${SITE_URL}/terapia-online#servicio`;
const reference = (id: string) => ({ "@id": id });

/** Only confirmed, public facts; no invented street address, opening hours or reviews. */
export const psychologyBusiness = {
  "@type": "MedicalBusiness",
  "@id": businessId,
  name: "Noralma",
  url: `${SITE_URL}/`,
  description: "Consulta de psicología de Nora Gallardo Cano, Psicóloga General Sanitaria. Atención online en España y presencial en Vilanova i la Geltrú.",
  telephone: "+34611525410",
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vilanova i la Geltrú",
    addressCountry: "ES",
  },
  areaServed: { "@type": "Country", name: "España" },
  founder: reference(personId),
  employee: reference(personId),
  sameAs: [INSTAGRAM_URL, TIKTOK_URL],
};

export const psychologyProfessional = {
  "@type": "Person",
  "@id": personId,
  name: "Nora Gallardo Cano",
  url: `${SITE_URL}/acerca-de-mi`,
  jobTitle: "Psicóloga General Sanitaria",
  worksFor: reference(businessId),
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Número de colegiada (Col·legi Oficial de Psicologia de Catalunya)",
    value: COLEGIADA,
  },
  knowsAbout: ["Terapia de Aceptación y Compromiso (ACT)", "Psicología sanitaria", "Acompañamiento psicológico"],
  sameAs: [LINKEDIN_URL, "https://www.doctoralia.es/nora-gallardo-cano/psicologo/vilanova-i-la-geltru"],
};

export const onlineTherapyService = {
  "@type": "Service",
  "@id": onlineServiceId,
  name: "Terapia psicológica online",
  serviceType: "Terapia psicológica online con enfoque ACT",
  description: "Sesiones de 60 minutos con Nora Gallardo Cano, Psicóloga General Sanitaria, desde la Terapia de Aceptación y Compromiso (ACT).",
  url: `${SITE_URL}/terapia-online`,
  provider: reference(businessId),
  areaServed: { "@type": "Country", name: "España" },
  offers: { "@type": "Offer", price: "60", priceCurrency: "EUR", url: `${SITE_URL}/terapia-online` },
};

type MainPage = "/" | "/acerca-de-mi" | "/terapia-online" | "/servicios" | "/contacto";
const pages: Record<MainPage, { name: string; type: string; entity: string }> = {
  "/": { name: "Noralma · Psicología sanitaria online", type: "WebPage", entity: businessId },
  "/acerca-de-mi": { name: "Nora Gallardo Cano · Psicóloga General Sanitaria", type: "ProfilePage", entity: personId },
  "/terapia-online": { name: "Terapia psicológica online · Noralma", type: "WebPage", entity: onlineServiceId },
  "/servicios": { name: "Áreas de acompañamiento psicológico · Noralma", type: "CollectionPage", entity: businessId },
  "/contacto": { name: "Contacto · Noralma", type: "ContactPage", entity: businessId },
};

export function mainPageStructuredData(path: MainPage) {
  const page = pages[path];
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      psychologyBusiness,
      psychologyProfessional,
      { "@type": "WebSite", "@id": websiteId, url: `${SITE_URL}/`, name: "Noralma", inLanguage: "es", publisher: reference(businessId) },
      ...(path === "/terapia-online" ? [onlineTherapyService] : []),
      { "@type": page.type, "@id": `${url}#webpage`, url, name: page.name, inLanguage: "es", isPartOf: reference(websiteId), mainEntity: reference(page.entity), about: reference(businessId) },
      ...(path !== "/" ? [{ "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.name, item: url },
      ] }] : []),
    ],
  };
}

export function mainPageSchemaScript(path: MainPage) {
  return { type: "application/ld+json", children: JSON.stringify(mainPageStructuredData(path)).replace(/</g, "\\u003c") };
}