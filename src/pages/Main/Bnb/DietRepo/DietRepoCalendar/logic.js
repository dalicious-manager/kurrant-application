import {toStringByFormatting} from '../../../../../utils/dateFormatter';
import {calcWeekArr} from '../logic';

export const makeDietRepoCalendarDateArr = date => {
  const day = date.getDay();

  const ArrayDate1 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - day - 15,
  );
  const ArrayDate2 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - day - 8,
  );
  const ArrayDate3 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - day - 1,
  );

  const ArrayDate4 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7 - day,
  );
  const ArrayDate5 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 14 - day,
  );
  const ArrayDate6 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 21 - day,
  );

  // return thirdArrayDate

  return [
    [...calcWeekArr(ArrayDate1)],
    [...calcWeekArr(ArrayDate2)],
    [...calcWeekArr(ArrayDate3)],
    [...calcWeekArr(date)],
    [...calcWeekArr(ArrayDate4)],
    [...calcWeekArr(ArrayDate5)],
    [...calcWeekArr(ArrayDate6)],
  ];
};
