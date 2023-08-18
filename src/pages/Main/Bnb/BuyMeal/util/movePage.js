import {formattedWeekDate} from '../../../../../utils/dateFormatter';

export const goPrevPage = (
  weekly,
  weeklyService,
  date,
  setDate,
  pager,
  setNowPage,
  isDiningTypes,
) => {
  const result = weeklyService.findIndex(day => {
    return formattedWeekDate(date) === formattedWeekDate(day);
  });
  const nextDate = new Date(weeklyService[result === 0 ? result : result - 1]);
  const week = weekly.map(w => {
    const find = w.findIndex(v => {
      return formattedWeekDate(v) === formattedWeekDate(new Date(nextDate));
    });
    return find !== -1;
  });

  if (week.includes(true)) {
    const prevDate2 = new Date(nextDate);
    const todayDate2 = new Date(date);
    const nowDates = new Date().setDate(new Date().getDate() - 1);
    const nowDate = new Date(nowDates);
    const utc =
      todayDate2.getTime() + todayDate2.getTimezoneOffset() * 60 * 1000;
    const utc2 =
      prevDate2.getTime() + prevDate2.getTimezoneOffset() * 60 * 1000;
    const utc3 = nowDate.getTime() + nowDate.getTimezoneOffset() * 60 * 1000;

    // 3. UTC to KST (UTC + 9시간)
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);
    const kr_curr2 = new Date(utc2 + KR_TIME_DIFF);
    const kr_curr3 = new Date(utc3 + KR_TIME_DIFF);
    if (
      new Date(formattedWeekDate(kr_curr)) >
        new Date(formattedWeekDate(kr_curr2)) &&
      new Date(formattedWeekDate(kr_curr3)) <
        new Date(formattedWeekDate(kr_curr2))
    ) {
      setDate(
        formattedWeekDate(
          new Date(weeklyService[result === 0 ? result : result - 1]),
        ),
      );
      const dateIndex = weekly.map(v => {
        return v.map(s => {
          return formattedWeekDate(s);
        });
      });
      const index = dateIndex.findIndex(v => {
        return v.includes(
          formattedWeekDate(
            new Date(weeklyService[result === 0 ? result : result - 1]),
          ),
        );
      });
      return pager.current?.setPage(index);
      // console.log(index);
      // return setNowPage(index);
    }
  }
};
export const goNextPage = (
  weekly,
  weeklyService,
  date,
  setDate,
  pager,
  setNowPage,
  isDiningTypes,
) => {
  const result = weeklyService.findIndex(day => {
    return formattedWeekDate(date) === formattedWeekDate(day);
  });
  const nextDate = new Date(
    weeklyService[result === weeklyService?.length ? result : result + 1],
  );
  const week = weekly.map(w => {
    const find = w.findIndex(v => {
      return formattedWeekDate(v) === formattedWeekDate(new Date(nextDate));
    });
    return find !== -1;
  });
  if (week.includes(true)) {
    setDate(
      formattedWeekDate(
        new Date(
          weeklyService[result === weeklyService?.length ? result : result + 1],
        ),
      ),
    );
    const dateIndex = weekly.map(v => {
      return v.map(s => {
        return formattedWeekDate(s);
      });
    });
    const index = dateIndex.findIndex(v => {
      return v.includes(
        formattedWeekDate(
          new Date(
            weeklyService[
              result === weeklyService?.length ? result : result + 1
            ],
          ),
        ),
      );
    });
    return pager.current?.setPage(index);
    // return setNowPage(isDiningTypes[0]);
  }
};
