/** Show at most three source reviews without altering their author, text or rating. */
export function selectHomepageReviews<T>(opiniones: readonly T[]): T[] {
  return opiniones.slice(0, 3);
}