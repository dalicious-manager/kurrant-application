import mSleep from '../../../helpers/mSleep';
import {fetchJson} from '../../../utils/fetch';

export async function getReviewOrderMeal(startdate, enddate) {
  const fetchRes = await fetchJson(
    `/users/me/reviews/items`,

    'GET',
  );

  return fetchRes;
}

export async function orderMealMockData() {
  await mSleep(3000);

  return {
    orderFood: [
      {
        id: 1,
        serviceDate: new Date(Date.now()),
        orderItemDtoList: [
          {
            makersName: '세상의 모든 아침',
            foodName: '맛없는 버섯 그라탕',
            diningType: '아침',
            option: '2옵션 꼬치 소스 꼬치 소스꼬치2',
            imageLocation:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makersName: '세상의 모든 점심',
            foodName: '맛있는 버섯 그라탕',
            diningType: '점심',
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageLocation:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
        ],
      },
      {
        id: 2,
        serviceDate: new Date(2023, 0, 14),
        orderItemDtoList: [
          {
            makersName: '오메 인자오셨소!',
            foodName: '두부',
            diningType: '아침',
            option: '만두 두부무침',
            imageLocation:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makersName: '여자만 장어타운',
            foodName: '장어구이',
            diningType: '점심',
            option: '1옵션 장어 소스 꼬치 소스꼬치1',
            imageLocation:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
        ],
      },
      {
        id: 3,
        serviceDate: new Date(2023, 0, 18),
        orderItemDtoList: [
          {
            makersName: '오메 인자오셨소!',
            foodName: '두부',
            diningType: '아침',
            option: '만두 두부무침',
            imageLocation:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makersName: '여자만 장어타운',
            foodName: '장어구이',
            diningType: '점심',
            option: '1옵션 장어 소스 꼬치 소스꼬치1',
            imageLocation:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
        ],
      },
    ],
  };
}
