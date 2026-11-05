/** Formats VND the way the Stitch designs do: "550.000₫". */
export function formatPrice(vnd: number): string {
  const grouped = Math.round(vnd)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${grouped}₫`;
}
