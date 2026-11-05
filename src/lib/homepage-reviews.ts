/** Last verified Doctoralia aggregate; used only while the live source is unavailable. */
export const DOCTORALIA_VERIFIED_SUMMARY = { rating: 5, count: 7 };

export function doctoraliaSummary(source: { rating: number; count: number } | null | undefined) {
  return source ? { rating: source.rating, count: source.count } : DOCTORALIA_VERIFIED_SUMMARY;
}