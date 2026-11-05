import { describe, expect, it } from "vitest";
import { doctoraliaSummary, authorizedDoctoraliaOpiniones } from "@/lib/homepage-reviews";
import { parseDoctoralia } from "@/lib/doctoralia.functions";

describe("Homepage Doctoralia summary", () => {
  it("does not publish publicly available testimonials without authorization", () => {
    const source = { opiniones: [{ name: "Persona", text: "Texto original", rating: 5 }] };
    expect(authorizedDoctoraliaOpiniones(source)).toEqual([]);
    expect(authorizedDoctoraliaOpiniones(source, true)).toEqual(source.opiniones);
  });
  it("uses the verified current score of 5 and count of 7 when unavailable", () => {
    expect(doctoraliaSummary(null)).toEqual({ rating: 5, count: 7 });
  });
  it("keeps a changed score and count exactly as supplied by Doctoralia", () => {
    expect(doctoraliaSummary({ rating: 4.8, count: 8 })).toEqual({ rating: 4.8, count: 8 });
  });
  it("retains the individual Doctoralia rating instead of substituting the aggregate", () => {
    const source = { aggregateRating: { ratingValue: 5, reviewCount: 7 }, review: [
      { author: { name: "N.P.M" }, reviewBody: "Comentario original", reviewRating: { ratingValue: 4 } },
      { author: { name: "Mabe" }, reviewBody: "Sin valoración individual" },
    ] };
    const parsed = parseDoctoralia(`<script type="application/ld+json">${JSON.stringify(source)}</script>`);
    expect(parsed?.opiniones[0]?.rating).toBe(4);
    expect(parsed?.opiniones[1]?.rating).toBeUndefined();
    expect(parsed?.count).toBe(7);
  });
});