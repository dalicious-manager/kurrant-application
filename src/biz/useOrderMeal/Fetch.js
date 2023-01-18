import mSleep from '../../helpers/mSleep';
import {fetchJson} from '../../utils/fetch';

export async function OrderMeal(startdate, enddate) {
  const fetchRes = await fetchJson(
    `/users/me/order?startDate=${startdate}&endDate=${enddate}`,
    'GET',
  );

  return fetchRes;
  // return {
  //     orderFood: [
  //         {
  //             id: 0,
  //             date: '2022-12-28',

  //             orderItemDtoList: [
  //                 {
  //                     makers: '메이커스이름',
  //                     name: '비빔밥',
  //                     diningType: '아침',
  //                     img: 111,
  //                     count: 1
  //                 },
  //                 {
  //                     makers: '메이커스이름',
  //                     name: '원할머니보쌈',
  //                     diningType: '점심',
  //                     img: 111,
  //                     count: 1
  //                 },
  //                 {
  //                     makers: '진천순대국',
  //                     name: '순대국',
  //                     diningType: '점심',
  //                     img: 111,
  //                     count: 1
  //                 },
  //                 {
  //                     makers: '메이커스이름',
  //                     name: '뚝불',
  //                     diningType: '저녁',
  //                     img: 111,
  //                     count: 1
  //                 }
  //             ]

  //         },

  //         {
  //             id: 2,
  //             date: '2022-12-29',

  //             orderItemDtoList: [
  //                 {
  //                 makers: '메이커스이름',
  //                 name: '오리구탕탕',
  //                 diningType: '저녁',
  //                 img: 111,
  //                 count: 1
  //             },
  //             {
  //                 makers: '메이커스이름',
  //                 name: '엽떡',
  //                 diningType: '점심',
  //                 img: 111,
  //                 count: 2
  //             },
  //             {
  //                 makers: '메이커스이름',
  //                 name: '피자',
  //                 diningType: '저녁',
  //                 img: 111,
  //                 count: 1
  //             }

  //         ]

  //         },

  //         {
  //             id: 4,
  //             date: '2022-12-30',

  //             orderItemDtoList: [
  //                 {
  //                     makers: '메이커스이름',
  //                     name: '교촌',
  //                     diningType: '아침',
  //                     img: 111,
  //                     count: 1
  //                 },
  //                 {
  //                     makers: '메이커스이름',
  //                     name: '투움바파스타',
  //                     diningType: '점심',
  //                     img: 111,
  //                     count: 1
  //                 },

  //                 {
  //                     makers: '메이커스이름',
  //                     name: '샌드위치',
  //                     diningType: '저녁',
  //                     img: 111,
  //                     count: 1
  //                 }
  //             ]

  //         },
  //     ]
  // }
}

export async function orderMealMockData() {
  await mSleep(4000);

  return {
    orderFood: [
      {
        id: 0,
        date: '2022-12-28',

        orderItemDtoList: [
          {
            makers: '메이커스이름',
            name: '비빔밥',
            diningType: '아침',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makers: '메이커스이름',
            name: '원할머니보쌈',
            diningType: '점심',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makers: '진천순대국',
            name: '순대국',
            diningType: '점심',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makers: '메이커스이름',
            name: '뚝불',
            diningType: '저녁',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
        ],
      },

      {
        id: 2,
        date: '2022-12-29',

        orderItemDtoList: [
          {
            makers: '메이커스이름',
            name: '오리구탕탕',
            diningType: '저녁',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makers: '메이커스이름',
            name: '엽떡',
            diningType: '점심',
            count: 2,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makers: '메이커스이름',
            name: '피자',
            diningType: '저녁',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
        ],
      },

      {
        id: 4,
        date: '2022-12-30',

        orderItemDtoList: [
          {
            makers: '메이커스이름',
            name: '교촌',
            diningType: '아침',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
          {
            makers: '메이커스이름',
            name: '투움바파스타',
            diningType: '점심',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },

          {
            makers: '메이커스이름',
            name: '샌드위치',
            diningType: '저녁',
            count: 1,
            option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
            imageUrl:
              'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
          },
        ],
      },
    ],
  };
}

[
  {
    id: 1,
    orderDate: new Date(Date.now()),
    orderItemDtoList: [
      {
        restaurentName: '세상의 모든 아침',
        menuName: '맛없는 버섯 그라탕',
        diningType: '아침',
        option: '2옵션 꼬치 소스 꼬치 소스꼬치2',
        imageUrl:
          'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
      },
      {
        restaurentName: '세상의 모든 점심',
        menuName: '맛있는 버섯 그라탕',
        diningType: '점심',
        option: '1옵션 꼬치 소스 꼬치 소스꼬치1',
        imageUrl:
          'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
      },
    ],
  },
  {
    id: 2,
    orderDate: new Date(2023, 0, 14),
    orderItemDtoList: [
      {
        restaurentName: '오메 인자오셨소!',
        menuName: '두부',
        diningType: '아침',
        option: '만두 두부무침',
        imageUrl:
          'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
      },
      {
        restaurentName: '여자만 장어타운',
        menuName: '장어구이',
        diningType: '점심',
        option: '1옵션 장어 소스 꼬치 소스꼬치1',
        imageUrl:
          'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg',
      },
    ],
  },
];
