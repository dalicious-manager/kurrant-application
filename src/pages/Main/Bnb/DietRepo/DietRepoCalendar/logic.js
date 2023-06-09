import {toStringByFormatting} from '../../../../../utils/dateFormatter';

export const calcWeekArr = date => {
  let yo = [];
  const day = date.getDay();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - day + i + 1,
    );

    // yo.push(toStringByFormatting(nextDate));
    yo.push(nextDate);
  }
  return yo;
};

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
