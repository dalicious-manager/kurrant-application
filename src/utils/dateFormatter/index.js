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

  return `${hour < 12 ? '오전' : '오후'} ${hour > 12 ? hour - 12 : hour}:${minute}`;
  // return `${hour}:${minute}`;
}

export function formattedDate(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  if (delimiter === "년월일") {
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
  return month + '월' + day + '일'
}

// 취소 날짜
export function formattedDateWeekBtn(data, delimiter = ".") {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];
  return `${[month, day].join(delimiter)}(${dayOfWeek})`
}
export function formattedWeekDate(data, delimiter = '-') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return `${[year, month, day].join(delimiter)}`
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
  return `${[year, month, day]}`.replace(/[^0-9 ^\-]/g, "");
}

export function formattedDateType(data) {
  switch (data) {
    case 0:
      return '아침';
    case 1:
      return '점심';
    case 2:
      return '저녁';
    default:
      break;
  }
}
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
