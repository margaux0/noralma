import { describe, expect, it } from "vitest";
import { selectHomepageReviews } from "@/lib/homepage-reviews";
import { parseDoctoralia } from "@/lib/doctoralia.functions";

describe("Homepage Doctoralia selection", () => {
  it("shows only three opinions when more are available", () => {
    expect(selectHomepageReviews([1, 2, 3, 4, 5])).toEqual([1, 2, 3]);
  });
  it("preserves original authors, comments and source ratings", () => {
    const source = [{ name: "N.P.M", text: "Mi experiencia original.", rating: 4 }];
    expect(selectHomepageReviews(source)[0]).toBe(source[0]);
    expect(selectHomepageReviews(source)).toEqual([{ name: "N.P.M", text: "Mi experiencia original.", rating: 4 }]);
  });
  it("does not invent reviews when the source is empty", () => {
    expect(selectHomepageReviews([])).toEqual([]);
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