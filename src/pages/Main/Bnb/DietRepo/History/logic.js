import {extractMonthAndDateFromDate2} from '../logic';

export const sampleStackedBarData1 = [
  {
    date: '2023-06-12',
    calorie: 100,
    protein: 90,
    fat: 0,
    carbohydrate: 40,
  },
  {
    date: '2023-06-13',
    calorie: 150,
    protein: 100,
    fat: 50,
    carbohydrate: 40,
  },
  {
    date: '2023-06-14',
    calorie: 50,
    protein: 100,
    fat: 50,
    carbohydrate: 40,
  },
  {
    date: '2023-06-15',
    calorie: 150,
    protein: 100,
    fat: 50,
    carbohydrate: 40,
  },
  {
    date: '2023-06-16',
    calorie: 50,
    protein: 100,
    fat: 50,
    carbohydrate: 40,
  },
  {
    date: '2023-06-17',
    calorie: 120,
    protein: 100,
    fat: 50,
    carbohydrate: 40,
  },
  {
    date: '2023-06-18',
    calorie: 150,
    protein: 100,
    fat: 50,
    carbohydrate: 40,
  },
];

export const modifyStackedBarData = inputData => {
  return inputData.map(v => {
    return {
      x: `${extractMonthAndDateFromDate2(v.date, '-')[1]}일`,
      ...v,
    };
  });
};

export const modifyHistoryLineChartData = inputData =>
  inputData.map(v => {
    return {
      x: `${extractMonthAndDateFromDate2(v.date, '-')[1]}일`,
      y: v.calorie,
    };
  });
