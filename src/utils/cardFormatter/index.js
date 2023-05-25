import cardValidator from 'card-validator';

export function cardNumberFormatter(oldValue, newValue) {
  // user is deleting so return without formatting
  if (oldValue?.length > newValue?.length) {
    return newValue;
  }
  return newValue
    ?.replace(/\W/gi, '')
    ?.replace(/(.{4})/g, ' $1')
    ?.trim()
    ?.substring(0, 19);
}
export const cardSerialNumberFormatter = serialnumber => {
  if (!serialnumber) return;
  if (serialnumber?.replace(/\W/gi, '').length > 16)
    return serialnumber.substring(0, 19);
  const {card} = cardValidator.number(serialnumber);
  if (card?.type === 'american-express') {
    const fir = serialnumber
      ?.replace(/\W/gi, '')
      .match(/[0-9●]{1,10}/)[0]
      ?.substring(0, 4);
    const sec = serialnumber
      ?.replace(/\W/gi, '')
      .match(/[0-9●]{1,10}/)[0]
      ?.substring(4, 10);
    const thir = serialnumber
      ?.replace(/\W/gi, '')
      .match(/[0-9●]{1,15}/)[0]
      ?.substring(10, 15);
    const array = [];
    if (fir?.length > 0) array.push(fir);
    if (sec?.length > 0) array.push(sec);
    if (thir?.length > 0) array.push(thir);

    return array.join(' ');
  }
  return (
    serialnumber
      .match(/[0-9●]{1,4}/g)
      ?.join(' ')
      .substring(0, 19) || serialnumber.substring(0, 19)
  );
};
export function expirationDateFormatter(serialnumber) {
  if (!serialnumber) return;
  if (serialnumber?.replace(/\W/gi, '').length > 4)
    return serialnumber.substring(0, 5);
  return (
    serialnumber
      .match(/[0-9●]{1,2}/g)
      ?.join('/')
      .substring(0, 5) || serialnumber.substring(0, 5)
  );
}

export function checkCorporateRegiNumber(number) {
  var numberMap = number
    ?.replace(/-/gi, '')
    .split('')
    .map(function (d) {
      return parseInt(d, 10);
    });

  if (numberMap.length == 10) {
    var keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
    var chk = 0;

    keyArr.forEach(function (d, i) {
      chk += d * numberMap[i];
    });

    chk += parseInt((keyArr[8] * numberMap[8]) / 10, 10);
    return Math.floor(numberMap[9]) === (10 - (chk % 10)) % 10;
  }

  return false;
}

export const isValidCardNumber = (cardNumber = '') => {
  if (!cardNumber.length) return;
  if (cardNumber.length < 15) return false;
  // 원활한 조작을 위해 배열로 변환
  let cardNumberArray = Array.from(cardNumber);

  // 1. 카드 번호 배열에서 마지막 자리에 있는 숫자 제거하고,
  // 이 제거된 번호는 따로 킵해두기
  const lastNumber = Number(cardNumberArray.pop());

  // 2. 번호 뒤집기
  // reverse()는 원본 배열을 변환한다.
  cardNumberArray.reverse();

  // 3. 홀수번째에 있는 번호들은 2로 곱하기
  // 인덱스로는 0, 2, 4 ... -> 즉 인덱스가 짝수인(=2로 나누어 떨어지는) 애들
  cardNumberArray = cardNumberArray.map((num, idx) =>
    idx % 2 === 0 ? Number(num) * 2 : Number(num),
  );

  // 4. 9보다 큰 숫자에선 9를 빼주기
  cardNumberArray = cardNumberArray.map(num => (num > 9 ? num - 9 : num));

  // 5. 모든 숫자들 다 더하기
  let sum = cardNumberArray.reduce((acc, curr) => acc + curr, 0);

  // 6. {5.에서 구한 합} + {1.에서 킵해뒀던 마지막 숫자}
  sum += lastNumber;

  // 7. 6.에서 구한 합이 10의 배수인지 확인하기
  const modulo = sum % 10;

  // 8. 10의 배수가 맞다면(=나머지 값이 0이라면) 유효하고(true), 아니라면 유효하지 않은(false) 번호!
  return !modulo;
};
