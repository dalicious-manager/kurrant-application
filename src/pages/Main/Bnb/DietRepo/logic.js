import {toStringByFormatting} from '../../../../utils/dateFormatter';

const sampleData = [
  {
    reportId: 1,
    diningType: 2,
    title: '조재신님의 식사',
    foodName: '뼈찜',
    calorie: 150,
    carbohydrate: 40,
    protein: 100,
    fat: 50,
    imgLocation: null,
  },
  {
    reportId: 2,
    diningType: 1,
    title: '조재신님의 식사2',
    foodName: '뼈찜',
    calorie: 150,
    carbohydrate: 40,
    protein: 100,
    fat: 50,
    imgLocation: null,
  },
  {
    reportId: 3,
    diningType: 3,
    title: '조재신님의 식사3',
    foodName: '뼈찜',
    calorie: 150,
    carbohydrate: 40,
    protein: 100,
    fat: 50,
    imgLocation: null,
  },
  {
    reportId: 4,
    diningType: 2,
    title: '조재신님의 식사4',
    foodName: '뼈찜',
    calorie: 250,
    carbohydrate: 40,
    protein: 100,
    fat: 50,
    imgLocation: null,
  },
  {
    reportId: 4,
    diningType: 3,
    title: '조재신님의 식사5',
    foodName: '뼈찜',
    calorie: 250,
    carbohydrate: 40,
    protein: 100,
    fat: 50,
    imgLocation: null,
  },
];

export const sampleData2 = [
  {
    makersName: '후레쉬빌',
    foodName: '수비드닭가슴살샐러드',
    spotName: '달리셔스',
    count: 1,
    imageLocation:
      'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001678329854957/%EC%88%98%EB%B9%84%EB%93%9C%20%EB%8B%AD%EA%B0%80%EC%8A%B4%EC%82%B4%20%EC%83%90%EB%9F%AC%EB%93%9C.png',
  },
  {
    makersName: '후레쉬빌2',
    foodName: '수비드닭가슴살샐러드2',
    spotName: '달리셔스2',
    count: 2,
    imageLocation:
      'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001678329854957/%EC%88%98%EB%B9%84%EB%93%9C%20%EB%8B%AD%EA%B0%80%EC%8A%B4%EC%82%B4%20%EC%83%90%EB%9F%AC%EB%93%9C.png',
  },
];

export const modifyDietRepoMainData = (
  data = sampleData,
  date = toStringByFormatting(new Date(Date.now())),
) => {
  let breakfastArr = [];
  let lunchArr = [];
  let dinnerArr = [];

  data.forEach((v, i) => {
    if (v.diningType === 1) {
      breakfastArr.push(v);
    } else if (v.diningType === 2) {
      lunchArr.push(v);
    } else if (v.diningType === 3) {
      dinnerArr.push(v);
    }
  });

  return [
    {menuTime: '아침', menuList: breakfastArr, diningType: 1, date: date},
    {menuTime: '점심', menuList: lunchArr, diningType: 2, date: date},
    {menuTime: '저녁', menuList: dinnerArr, diningType: 3, date: date},
  ];
};

// 2023-05-02 -> [5,2] : 0이 없는 버젼

export const extractMonthAndDateFromDate1 = (date, seperator) => {
  const arr1 = date.split(seperator);
  let month = arr1[1];
  let date2 = arr1[2];

  if (month[0] === '0') {
    month = month.substring(1);
  }
  if (date2[0] === '0') {
    date2 = date2.substring(1);
  }

  return [month, date2];
};

// 2023-05-02 -> [05,02] : 0이 없는 버젼
export const extractMonthAndDateFromDate2 = (date, seperator) => {
  const arr1 = date.split(seperator);
  let month = arr1[1];
  let date2 = arr1[2];

  // if (month[0] === '0') {
  //   month = month.substring(1);
  // }
  // if (date2[0] === '0') {
  //   date2 = date2.substring(1);
  // }

  return [month, date2];
};

// 2023-05-05 ->
// [월요일 자바스크립트 date객체,
// 화요일 자바스크립트 date객체,
// 수요일 자바스크립트 date객체,
// 목요일 자바스크립트 date객체,
// 금요일 자바스크립트 date객체,
// 토요일 자바스크립트 date객체,
// 일요일 자바스크립트 date객체]

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
