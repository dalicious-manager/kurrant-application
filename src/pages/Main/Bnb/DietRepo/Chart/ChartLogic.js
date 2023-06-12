export const numToString = num => `${num}`;

// 자릿 수 계산 예) 12 -> 2, 12.5 -> 3
// 자릿 수 계산 예) 12 -> 1, 12.5 -> 2
export const getDigit = num => {
  if (numToString(num).split('').includes('.')) {
    // 소숫점 있을때
    return numToString(num).length - 2;
    // return numToString(num).length - 1;
  } else {
    // 소숫점 없을때
    return numToString(num).length - 1;
    // return numToString(num).length;
  }
};

// 올림하기, 각 끝값 구하기 : 예) 250 -> [300, 200]

export const getTwoNum = num => {
  const topValue = Math.ceil(num / Math.pow(10, getDigit(num)));
  const bottomValue = Math.ceil(num / Math.pow(10, getDigit(num))) - 1;
  return [
    topValue * Math.pow(10, getDigit(num)),
    bottomValue * Math.pow(10, getDigit(num)),
  ];
};

export const getAverage = (num1, num2) => {
  return (num1 + num2) / 2;
};

// 리턴값 예) 286 -> [300 4]

// y축 label로 가장 적당한 값을 고르고 몊으로 나눌지 알려주는 로직입니다.
// 주의: 3자리 이상값을 쓰는것이 좋음
// 그 이하의 값들은 완벽하지는 않음 (예: 82를 넣으면 [82.5, 5]를 줌)

export const decideTopValueAndDividend = num => {
  // num이 두자리, 한자리일 경우 -> 세자리로 만들어준 후 나누기를 함

  // 두자리일 경우, max 숫자가 소숫점, 3, 4, 5로 나누어 떨어지지 않는 경우 반올림으로 끝자리를 0으로 만들어주고 5로 나눈다

  let isTwoDigitNumber = false;

  if (getDigit(num) === 1) {
    isTwoDigitNumber = true;
  }

  // 한자리일 경우 한자리일경우는 고려하지 않는다.

  // process 1 : 4등분

  const firstTwoNumbers = getTwoNum(num); // 각 끝값  예) 250 -> [300, 200]
  const firstAverage = getAverage(firstTwoNumbers[0], firstTwoNumbers[1]);
  if (firstAverage < num) return [firstTwoNumbers[0], 4];

  // 평균값과 값이 같을 때 5로 나누거나 4로 나눔
  if (firstAverage === num) {
    // 5의 배수
    if (firstAverage % 5 === 0) {
      return [firstAverage, 5];
    }
    // 2의 배수
    if (firstAverage % 2 === 0) {
      return [firstAverage, 4];
    }
  }

  // process 2 : 3등분

  const secondAverage = getAverage(firstAverage, firstTwoNumbers[1]);

  if (secondAverage < num) return [firstAverage, 5];

  if (secondAverage === num) {
    if (secondAverage % 5 === 0) {
      return [secondAverage, 5];
    }
    if (secondAverage % 2 === 0) {
      return [secondAverage, 4];
    }
  }

  // process 3 : 5등분

  if (isTwoDigitNumber) {
    return [firstTwoNumbers[0], 5];
    // 여기에 무조건 곱하기
  } else {
    return [secondAverage, 5];
  }
};
