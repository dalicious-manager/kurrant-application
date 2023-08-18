/**
 * @copyright Copyright © 2018-2019 Corretto, Inc. All rights reserved.
 */

function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

function transDateType(val) {
  if (!(val instanceof Date)) {
    return new Date(val);
  }
  return val;
}
//
export function formattedTimer(remainSeconds) {
  const minutes = Math.floor(remainSeconds / 60);
  const seconds = remainSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formattedTime(data) {
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${hour}:${minute}`;
}

export function formattedMealTime(data) {
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());

  return `${hour < 12 ? '오전' : '오후'} ${
    hour > 12 ? hour - 12 : hour
  }:${minute}`;
}

export function formattedDate(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  if (delimiter === '년월일') {
    return `${year}년 ${month}월 ${day}일`;
  }
  if (delimiter === '/') {
    return `${year}/${month}/${day}`;
  }
  return [year, month, day].join(delimiter);
}

export function formattedDateAndTime(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${[year, month, day].join(delimiter)} ${hour}:${minute}`;
}

export function formattedFullDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  const second = leftPad(dateTime.getSeconds());
  return `${[year, month, day].join(delimiter)} ${hour}:${minute}:${second}`;
}

export function formattedDateAndDay(data, delimiter = '. ') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];

  return `${[year, month, day].join(delimiter)} (${dayOfWeek})`;
}

// 식사구매 날짜 버튼
export function formattedDateBtn(data) {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return month + '월' + day + '일';
}

// 취소 날짜
export function formattedDateWeekBtn(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];
  return `${[month, day].join(delimiter)}(${dayOfWeek})`;
}
export function formattedWeekDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day].join(delimiter)}`;
}

export function formattedMonthDay(data) {
  const dateTime = transDateType(data);

  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];
  return `${month}월 ${day}일(${dayOfWeek})`;
}

export function formattedApplicationDate(data) {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day]}`?.replace(/[^0-9 ^\-]/g, '');
}
export function formattedSameDate(startData, endDate) {
  const dateTime1 = transDateType(
    startData
      ?.replace('년', '-')
      ?.replace('월', '-')
      ?.replace('일', '')
      ?.replace(/\s/gi, ''),
  );
  const dateTime2 = transDateType(endDate);

  const diffMSec = dateTime1.getTime() - dateTime2.getTime();
  const diffHour = diffMSec / (60 * 60 * 1000 * 24);
  return Math.round(diffHour);
}

export function formattedDateType(data) {
  switch (data) {
    case 1:
      return '아침';
    case 2:
      return '점심';
    case 3:
      return '저녁';
    default:
      break;
  }
}

// '기준일로부터 몇일 전인가?'
export const timePassIndicator = (criterionDate, compareDate) => {
  const subtraction = criterionDate.getTime() - compareDate.getTime();

  // if (subtraction < 1000 * 60) {
  //   // return `${Math.floor(subtraction / 1000)}초전`;
  //   return `몇 초전`;
  // } else if (subtraction >= 1000 * 60 && subtraction < 1000 * 60 * 60) {
  //   return `${Math.floor(subtraction / (1000 * 60))}분전`;
  // } else if (
  //   subtraction >= 1000 * 60 * 60 &&
  //   subtraction < 1000 * 60 * 60 * 24
  // ) {
  //   return `${Math.floor(subtraction / (1000 * 60 * 60))}시간전`;
  // } else

  // if (subtraction >= 1000 * 60 * 60 && subtraction < 1000 * 60 * 60 * 24) {
  if (subtraction <= 1000 * 60 * 60 * 24) {
    return '오늘';
  } else if (
    subtraction >= 1000 * 60 * 60 * 24 &&
    subtraction < 1000 * 60 * 60 * 24 * 2
  ) {
    return '어제';
  } else if (
    subtraction >= 1000 * 60 * 60 * 24 * 2 &&
    subtraction < 1000 * 60 * 60 * 24 * 3
  ) {
    return '그저께';
  } else {
    return `${Math.floor(subtraction / (1000 * 60 * 60 * 24))}일전`;
  }
};

// '기준일로부터 몇일 남았는가'
export const timeLeftIndicator = (criterionDayLength, compareDate) => {
  const subtraction =
    compareDate.getTime() + criterionDayLength * 1000 * 60 * 60 * 24;

  const deadlineDate = new Date(subtraction);

  const leftDate = deadlineDate.getTime() - new Date(Date.now()).getTime();

  if (leftDate < 0) {
    return ['리뷰 가능한 기한이 지났습니다', false];
  } else if (leftDate <= 1000 * 60 * 60 * 24) {
    return ['기한 마지막 날', true];
  } else {
    return [`기한 D-${Math.floor(leftDate / (1000 * 60 * 60 * 24))}`, true];
  }
};

// 2023-03-22T12:14:50.559+09:00 -> 2023-03-22

export function toStringByFormatting(source, delimiter = '-') {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

// 2023-03-22 -> 2023. 03. 22
export const convertDateFormat1 = stringDate => {
  // 1. 앞에 날짜 자르기

  const date1 = stringDate.slice(0, 10);

  // 2. - -> '. '

  date1?.replace('-', '. ');

  return date1;
};

// export function daysLeft(endDate) {
//   const dayNow = new Date();

//   const summaryNowDay = new Date(
//     dayNow.getFullYear(),
//     dayNow.getMonth() + 1,
//     dayNow.getDate(),
//   );
//   const summaryEndDay = new Date(
//     endDate.getFullYear(),
//     endDate.getMonth() + 1,
//     endDate.getDate(),
//   );

//   if (summaryEndDay.getTime() >= summaryNowDay.getTime()) {
//     const dayLefted = summaryEndDay.getTime() - summaryNowDay.getTime();
//     return Math.ceil(dayLefted / (1000 * 60 * 60 * 24)) + 1;
//   } else {
//     return 0;
//   }
// }

// 스트링날짜 Date객체로 변환
// 예) '2022-12-27 -> 2022-12-26T15:00:00.000Z

export const stringDateToJavascriptDate = (stringDate, seperator = '-') => {
  const process1 = stringDate.trim();

  const process2 = process1.split(seperator);

  const process3 = new Date(
    parseInt(process2[0]),
    parseInt(process2[1]) - 1,
    parseInt(process2[2]),
  );

  return process3;
};

// 두 날짜의 차이가 해당 일수 보다 더 크다 -> true, 더 작다 -> false
// 예) isTimeDifference(자바스크립트 날짜객체1, 자바스크립트 날짜객체2, 차이(몇 일) )

export const isTimeDifferenceLarger = (date1, date2, dateLength) => {
  // 날짜들을 getTime화 하기

  const date1GetTime = date1.getTime();
  const date2GetTime = date2.getTime();

  // 차이 계산하기

  return date2GetTime - date1GetTime > dateLength * 1000 * 60 * 60 * 24;
};

// 두 날짜의 차이가 해당 일수 보다 더 크다 -> true, 더 작다 -> false 숫자날짜버젼
// (숫자날짜란 Date.now(), 1681401239648 같은 걸 의미한다)

export const isTimeNumberDifferenceLarger = (date1, date2, dateLength) => {
  return Math.abs(date2 - date1) > dateLength * 1000 * 60 * 60 * 24;
};

// 2024-02-12 -> 2024. 01. 11
export const changeSeperator = (dateInput, inputSeperator, outputSeperator) => {
  const process1 = dateInput.trim();

  const process2 = process1.split(inputSeperator);

  const process3 = process2.join(outputSeperator);

  return process3;
};

// 몇 일후의 날짜 계산하기

// 하루 후 -> calcDate(1,date)
// 이틀 후 -> calcDate(2,date)

export const calcDate = (daysPassed = 0, date = new Date()) => {
  const today = date;

  const nextDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysPassed,
  );

  return nextDate;
};

// 두 날짜 사이에 며칠 차이인가 계산하기

// 예1) 2023-05-24(자바스크립트 date객체), 2023-05-26(자바스크립트 date객체) -> 2
// 예2) 2023-05-24(자바스크립트 date객체), 2023-06-07(자바스크립트 date객체) -> 14(2주일 차이)

export const calcTimeBetweenTwoDates = (date1, date2) => {
  const difference = Math.abs(
    stringDateToJavascriptDate(date2, '-').getTime() -
      stringDateToJavascriptDate(date1, '-').getTime(),
  );

  return difference / (1000 * 60 * 60 * 24);
};

export const getDayOfTheSameWeekOfADay = (date, dayNum) => {
  const dayOfDate = date.getDay();
  // 해당
  // 해당 몇요일인가 구하기
  const result = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - dayOfDate + dayNum,
  );

  return result;
};

export const calculateHowManyWeeksBetweenTwoDates = (startDate, endDate) => {
  // startDate -> 그 주의 금요일

  const startDate1 = getDayOfTheSameWeekOfADay(startDate, 5);

  // endDate -> 그 주의 토요일
  const endDate1 = getDayOfTheSameWeekOfADay(endDate, 6);

  const startMillis = startDate1.getTime();
  const endMillis = endDate1.getTime();

  // Calculate the difference in milliseconds between the two dates
  const diffMillis = Math.abs(endMillis - startMillis);

  // Calculate the number of weeks
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeks = Math.ceil(diffMillis / millisecondsPerWeek);

  return weeks;
};
