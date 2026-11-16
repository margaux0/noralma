import { describe, expect, it } from "vitest";
import { mainPageStructuredData, onlineTherapyService, psychologyBusiness, psychologyProfessional } from "@/lib/structured-data";

describe("Datos públicos de la consulta", () => {
  it("identifica a la profesional con su colegiación real", () => {
    expect(psychologyProfessional.name).toBe("Nora Gallardo Cano");
    expect(psychologyProfessional.jobTitle).toBe("Psicóloga General Sanitaria");
    expect(psychologyProfessional.identifier.value).toBe("34583");
  });
  it("usa la localidad y teléfono confirmados sin inventar dirección ni horarios", () => {
    expect(psychologyBusiness.address.addressLocality).toBe("Vilanova i la Geltrú");
    expect(psychologyBusiness.telephone).toBe("+34611525410");
    expect(psychologyBusiness.address).not.toHaveProperty("streetAddress");
    expect(psychologyBusiness).not.toHaveProperty("openingHours");
    expect(psychologyBusiness).not.toHaveProperty("aggregateRating");
  });
  it("mantiene el precio confirmado por sesión", () => {
    expect(onlineTherapyService.offers.price).toBe("60");
    expect(onlineTherapyService.offers.priceCurrency).toBe("EUR");
  });
  it("conecta cada página con el mismo negocio y profesional", () => {
    for (const path of ["/", "/acerca-de-mi", "/terapia-online", "/servicios", "/contacto"] as const) {
      const data = mainPageStructuredData(path);
      expect(data["@context"]).toBe("https://schema.org");
      const ids = data["@graph"].map(node => node["@id"]);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids).toContain("https://noralmapsicologia.com/#consulta");
      expect(ids).toContain("https://noralmapsicologia.com/#nora");
      expect(ids).toContain(`https://noralmapsicologia.com${path}#webpage`);
    }
  });
});