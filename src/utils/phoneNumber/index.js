export default function withHyphenNumber(number) {
  if (number?.length === 10) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  if (number?.length === 13) {
    return number
      .replace(/-/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
}
