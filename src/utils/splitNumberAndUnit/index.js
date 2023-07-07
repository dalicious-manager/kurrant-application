export const splitNumberAndUnit = str => {
  const onlyNumbersArray = str.match(/[0-9]/g);
  const number = parseInt(str.match(/[0-9]/g)?.join(''));

  let unit = '';
  if (onlyNumbersArray) {
    1;
    unit = str
      .split('')
      .filter(x => !onlyNumbersArray.includes(x))
      .join('');
  }

  return {number, unit};
};

// 세번째 자리수에 , 넣기
// 10000 => 10,000, 10000000 => 10,000,000

export function addCommasInEveryThirdDigit(number) {
  let numberStr = number.toString();
  let result = '';
  let count = 0;

  for (let i = numberStr.length - 1; i >= 0; i--) {
    result = numberStr.charAt(i) + result;
    count++;

    if (count % 3 === 0 && count !== numberStr.length) {
      result = ',' + result;
    }
  }

  return result;
}
