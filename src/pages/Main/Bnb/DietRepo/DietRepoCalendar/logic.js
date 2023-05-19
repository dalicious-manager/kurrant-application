const calcWeekArr = date => {
  let yo = [];
  const day = date.getDay();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - day + i,
    );

    yo.push(toStringByFormatting(nextDate));
  }
  return yo;
};

export const makeDietRepoCalendarDateArr = date => {
  let yo = [];
  const day = date.getDay();

  const firstArrayDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - day - 1,
  );

  const thirdArrayDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 6 - day + 1,
  );

  // return thirdArrayDate

  return [
    [...calcWeekArr(firstArrayDate)],
    [...calcWeekArr(date)],
    [...calcWeekArr(thirdArrayDate)],
  ];
};
