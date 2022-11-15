/**
 *
 * @param {number} price
 */
export default function withCommas(price) {
  if (!price) return '';

  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
