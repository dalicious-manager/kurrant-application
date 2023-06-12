import {toStringByFormatting} from '../../../../../utils/dateFormatter';
import {calcWeekArr} from '../logic';

export const makeDietRepoCalendarDateArr = date => {
  const day = date.getDay();

  const firstArrayDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - day - 8,
  );
  const secondArrayDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - day - 1,
  );

  const thirdArrayDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7 - day,
  );
  const fourthArrayDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 14 - day,
  );

  // return thirdArrayDate

  return [
    [...calcWeekArr(firstArrayDate)],
    [...calcWeekArr(secondArrayDate)],
    [...calcWeekArr(date)],
    [...calcWeekArr(thirdArrayDate)],
    [...calcWeekArr(fourthArrayDate)],
  ];
};
