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

export function formattedDate(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
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

export function formattedDateAndDay(data, delimiter = '.') {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[dateTime.getDay()];

  return `${[year, month, day].join(delimiter)} ${dayOfWeek}`;
}

// 식사구매 날짜 버튼
export function formattedDateBtn(data) {
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  return month + '월' + day + '일'
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
