// 퍼센트 string -> 숫자로바꾸기
// '10%' -> 0.1
// '10.12%'  -> 0.1012
export const percentStringToNum = percentVal => {
  const stringVal = percentVal.slice(0, -1);

  // return parseInt(stringVal)/100
  // return parseInt(stringVal)
  return parseFloat(stringVal) / 100;
};
