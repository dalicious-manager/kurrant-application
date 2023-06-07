import {toStringByFormatting} from '../../../../../utils/dateFormatter';

const calcWeekArr = date => {
  let yo = [];
  const day = date.getDay();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - day + i,
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
    date.getDate() - day - 1,
  );

  const thirdArrayDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7 - day,
  );

  // return thirdArrayDate

  return [
    [...calcWeekArr(firstArrayDate)],
    [...calcWeekArr(date)],
    [...calcWeekArr(thirdArrayDate)],
  ];
};
