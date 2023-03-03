import {useAtom} from 'jotai';
import mSleep from '../../helpers/mSleep';
import {getStorage} from '../../utils/asyncStorage';
import {fetchJson} from '../../utils/fetch';
import useAuth from '../useAuth';

export async function DailyFood(spotId, selectedDate, userRole) {
  if (userRole === 'ROLE_GUEST') {
    await mSleep(100);
    return {
      data: {
        diningTypes: [1],
        dailyFoodDtos: [
          {
            id: 157,
            diningType: 1,
            foodId: 1,
            foodName: 'BLT 샌드위치',
            capacity: 15,
            status: 1,
            spotId: 1,
            serviceDate: '2023-03-21',
            makersName: '커런트 샌드위치',
            spicy: '맵지 않음',
            image:
              'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001677724188788/BLT%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98.jpg',
            description: null,
            price: 13000.0,
            discountedPrice: 10530.0,
            membershipDiscountPrice: 0,
            membershipDiscountRate: 0,
            makersDiscountPrice: 1300,
            makersDiscountRate: 10,
            periodDiscountPrice: 1170,
            periodDiscountRate: 10,
          },
        ],
      },
    };
  }

  const fetchRes = await fetchJson(
    `/dailyfoods?spotId=${spotId}&selectedDate=${selectedDate}`,
    'GET',
  );

  return fetchRes;

  // return {
  //     dailyFood:[{
  //         id: 0,
  //         makers:'폴어스',
  //         name: '리코타 치즈샐러드',
  //         price: 15000,
  //         description: '치즈치즈치즈',
  //         diningType: '점심',
  //         img: 'string',
  //         spicy: '불닭볶음탕탕면맵기임',
  //         isSoldOut : false

  //         },
  //         {
  //         id: 1,
  //         makers:'폴어스',
  //         name: '샌드위치',
  //         price: 15000,
  //         description: '샐러드에 샐러드 없는 ',
  //         diningType: '아침',
  //         img: 'string',
  //         spicy: '신라면맵기',
  //         isSoldOut : true

  //         },
  //         {
  //             id: 2,
  //             makers:'폴어스',
  //             name: '삼겹살',
  //             price: 10000,
  //             description: '샐러드에 샐러드 없는 그런샐러드에 리코타치즈를 얹은 프리미엄 상품',
  //             diningType: '아침',
  //             img: 'string',
  //             spicy: '불닭맵기',
  //             isSoldOut : false

  //             },
  //             {
  //                 id: 3,
  //                 makers:'폴어스',
  //                 name: '황소곱창',
  //                 price: 10000,
  //                 description: '곱창 막창 대창',
  //                 diningType: '저녁',
  //                 img: 'string',
  //                 spicy: null,
  //                 isSoldOut : false

  //                 },
  //                 {
  //                     id: 4,
  //                     makers:'폴어스',
  //                     name: '황소곱창',
  //                     price: 10000,
  //                     description: '곱창 막창 대창',
  //                     diningType: '점심',
  //                     img: 'string',
  //                     spicy: null,
  //                     isSoldOut : true

  //                     }
  //     ]
  // }
}
