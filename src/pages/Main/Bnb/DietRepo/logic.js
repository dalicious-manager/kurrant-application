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

export const modifyDietRepoMainData = (data = sampleData, date) => {
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
