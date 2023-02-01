/**
 *
 * @param {number} price
 */
export default function withCommas(price) {
  if (!price) return '0';

  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
