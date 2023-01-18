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

export function formattedTimer(remainSeconds) {
  const minutes = Math.floor(remainSeconds / 60);
  const seconds = remainSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}
// formattedTimer(40) -> '00:40'
// formattedTimer(80) -> '01:20'

export function formattedTime(data) {
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${hour}:${minute}`;
}

// formattedTime(Date.now()) -> '11:31'

export function formattedMealTime(data) {
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());

  return `${hour < 12 ? '오전' : '오후'} ${
    hour > 12 ? hour - 12 : hour
  }:${minute}`;
  // return `${hour}:${minute}`;
}

// formattedMealTime(Date.now()) -> '오전 11:31'

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

// formattedDate(Date.now(), '') -> '20230118'
// formattedDate(Date.now(), ',') -> '2023,01,18'
// formattedDate(Date.now(), '.') -> '2023.01.18'

export function formattedDateAndTime(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${[year, month, day].join(delimiter)} ${hour}:${minute}`;
}

// formattedDateAndTime(Date.now()) -> '2023.01.18 11:34'
// formattedDateAndTime(Date.now(), '') -> '20230118 11:35'
// formattedDateAndTime(Date.now(), '.') -> '2023.01.18 11:35'

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

// formattedFullDate(Date.now()) -> '2023-01-18 11:37:00'
// formattedFullDate(Date.now(), '') -> '20230118 11:37:17'
// formattedFullDate(Date.now(), '.') -> '2023.01.18 11:37:38'

export function formattedDateAndDay(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];

  return `${[year, month, day].join(delimiter)} ${dayOfWeek}`;
}

// formattedDateAndDay(Date.now()) -> '2023.01.18 수'

// 식사구매 날짜 버튼
export function formattedDateBtn(data) {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return month + '월' + day + '일';
}

// formattedDateBtn(Date.now()) -> '01월18일'

export function formattedWeekDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day].join(delimiter)}`;
}

// formattedWeekDate(Date.now()) -> '2023-01-18'

export function formattedMonthDay(data) {
  const dateTime = transDateType(data);

  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];
  return `${month}월 ${day}일(${dayOfWeek})`;
}

// formattedMonthDay(Date.now()) -> '01월 18일(수)'

export function formattedApplicationDate(data) {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day]}`.replace(/[^0-9 ^\-]/g, '');
}

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
    subtraction >= 1000 * 60 * 60 * 24 * 2 &&
    subtraction < 1000 * 60 * 60 * 24
  ) {
    return '어제';
  } else if (
    subtraction >= 1000 * 60 * 60 * 24 * 3 &&
    subtraction < 1000 * 60 * 60 * 24 * 2
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
    return '리뷰 가능한 기한이 지났습니다';
  } else if (leftDate <= 1000 * 60 * 60 * 24) {
    return '기한 D-Day';
  } else {
    return `기한 D-${Math.floor(leftDate / (1000 * 60 * 60 * 24))}`;
  }
};

// '리뷰 가능한 기한이 지났습니다' , '기한 D-Day', '기한 D-1'

// formattedApplicationDate(Date.now()) -> '20230118'

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
