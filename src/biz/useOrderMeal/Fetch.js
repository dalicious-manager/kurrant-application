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
