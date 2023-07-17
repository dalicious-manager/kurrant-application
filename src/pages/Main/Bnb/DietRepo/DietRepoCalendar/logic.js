import {
  calcDate,
  calculateHowManyWeeksBetweenTwoDates,
  toStringByFormatting,
} from '../../../../../utils/dateFormatter';
import {calcWeekArr} from '../logic';

export const makeDietRepoCalendarDateArr7 = date => {
  const ArrayDate1 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 21,
  );
  const ArrayDate2 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 14,
  );
  const ArrayDate3 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 7,
  );

  const ArrayDate4 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const ArrayDate5 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7,
  );
  const ArrayDate6 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 14,
  );

  const ArrayDate7 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 21,
  );

  // return thirdArrayDate

  return [
    [...calcWeekArr(ArrayDate1)],
    [...calcWeekArr(ArrayDate2)],
    [...calcWeekArr(ArrayDate3)],
    [...calcWeekArr(ArrayDate4)],
    [...calcWeekArr(ArrayDate5)],
    [...calcWeekArr(ArrayDate6)],
    [...calcWeekArr(ArrayDate7)],
  ];
};

export const makeDietRepoCalendarDateArr5 = date => {
  const ArrayDate2 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 14,
  );
  const ArrayDate3 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 7,
  );

  const ArrayDate4 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const ArrayDate5 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7,
  );
  const ArrayDate6 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 14,
  );

  return [
    [...calcWeekArr(ArrayDate2)],
    [...calcWeekArr(ArrayDate3)],
    [...calcWeekArr(ArrayDate4)],
    [...calcWeekArr(ArrayDate5)],
    [...calcWeekArr(ArrayDate6)],
  ];
};

export const makeUltimateDietRepoCalendar = (
  startDate = new Date(2023, 3, 15),
  endDate = new Date(),
) => {
  // startDate부터 endDate날까지 배열에 모든 데이터를 집어 넣어야 한다
  // 중간에 몇 주인가 계산해야 함

  let result = [];

  for (
    let i = 0;
    i < calculateHowManyWeeksBetweenTwoDates(startDate, endDate) + 1;
    i++
  ) {
    result.push([...calcWeekArr(calcDate(7 * i, startDate))]);
  }

  return result;
};

export const makeDietRepoCalendarInitArr = date => {
  const ArrayDate2 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 14,
  );
  const ArrayDate3 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 7,
  );

  const ArrayDate4 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const ArrayDate5 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7,
  );

  return [
    [...calcWeekArr(ArrayDate2)],
    [...calcWeekArr(ArrayDate3)],
    [...calcWeekArr(ArrayDate4)],
    [...calcWeekArr(ArrayDate5)],
  ];
};
