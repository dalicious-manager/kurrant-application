import {formattedDate} from '../../utils/dateFormatter';

// '현재 클릭된 날짜가 몇주차 인지 알려줌'
export const calculateSelectDatePosition = (selectDate, weekly) => {
  const sliced = weekly.map(v1 => {
    return v1.map(v2 => formattedDate(v2, '-'));
  });

  let calculatedWeek = undefined;
  sliced.forEach((v, i) => {
    if (v.includes(selectDate)) {
      calculatedWeek = i;
    }
  });

  return calculatedWeek;
};
