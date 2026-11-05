import { describe, expect, it } from "vitest";
import { selectHomepageReviews } from "@/lib/homepage-reviews";

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
});