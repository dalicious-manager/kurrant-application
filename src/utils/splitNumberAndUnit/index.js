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
