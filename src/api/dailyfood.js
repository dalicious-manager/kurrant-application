import mSleep from '../helpers/mSleep';
import {fetchJson} from '../utils/fetch';

export const dailyfoodApis = {
  dailyfood: async (spotId, selectedDate, userRole) => {
    if (userRole === 'ROLE_GUEST') {
      await mSleep(100);
      return {
        data: {
          diningTypes: [
            {
              diningType: 2,
              times: ['12:00'],
            },
          ],
          supportPrice: {
            morningSupportPrice: null,
            lunchSupportPrice: '500',
            dinnerSupportPrice: null,
          },
          serviceDays: {
            morningServiceDays: null,
            lunchServiceDays: ['월', '화', '수', '목', '금'],
            dinnerServiceDays: null,
          },
          dailyFoodDtos: [
            {
              id: 53394,
              diningType: 2,
              foodId: 733,
              foodName:
                '[WEIGHT LOSS] Sous vide Chicken Breast 110g AND Sweet pumpkin 120g',
              capacity: 15,
              status: 1,
              spotId: 93,
              serviceDate: '2023-06-07',
              makersName: '플렉스밀',
              minTime: null,
              maxTime: null,
              spicy: null,
              vegan: null,
              image:
                'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001681194291893/2.jpg',
              description:
                'Total Calories 320 _ Protein 28(g) / Carb 20(g) / Fat 3(g)\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n수비드하게 익힌 닭가슴살과 찐 단호박 + 그린채소 샐러드와 아몬드',
              price: 8900.0,
              discountedPrice: 8300.0,
              membershipDiscountPrice: 600,
              membershipDiscountRate: 7,
              makersDiscountPrice: 0,
              makersDiscountRate: 0,
              periodDiscountPrice: 0,
              periodDiscountRate: 0,
              rank: 1,
            },
            {
              id: 53377,
              diningType: 2,
              foodId: 283,
              foodName: '뉴욕비프 샐러드',
              capacity: 43,
              status: 1,
              spotId: 93,
              serviceDate: '2023-06-07',
              makersName: '라이브볼',
              minTime: null,
              maxTime: null,
              spicy: null,
              vegan: null,
              image:
                'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001678239703165/%EB%89%B4%EC%9A%95%EB%B9%84%ED%94%84%20%EC%83%90%EB%9F%AC%EB%93%9C.png',
              description:
                '기본 + 수비드  부채살 + 화이트 발사믹 드레싱으로 구성되어 있습니다.',
              price: 14900.0,
              discountedPrice: 12800.0,
              membershipDiscountPrice: 2100,
              membershipDiscountRate: 14,
              makersDiscountPrice: 0,
              makersDiscountRate: 0,
              periodDiscountPrice: 0,
              periodDiscountRate: 0,
              rank: null,
            },
            {
              id: 53378,
              diningType: 2,
              foodId: 284,
              foodName: '하와이 새우와 오징어 샐러드',
              capacity: 43,
              status: 1,
              spotId: 93,
              serviceDate: '2023-06-07',
              makersName: '라이브볼',
              minTime: null,
              maxTime: null,
              spicy: null,
              vegan: null,
              image:
                'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001678239728934/%ED%95%98%EC%99%80%EC%9D%B4%20%EC%83%88%EC%9A%B0%EC%99%80%20%EC%98%A4%EC%A7%95%EC%96%B4%20%EC%83%90%EB%9F%AC%EB%93%9C.png',
              description:
                '라이브볼에 마늘오일로 그릴링한 새우와 오징어가 토핑된 볼',
              price: 14900.0,
              discountedPrice: 12800.0,
              membershipDiscountPrice: 2100,
              membershipDiscountRate: 14,
              makersDiscountPrice: 0,
              makersDiscountRate: 0,
              periodDiscountPrice: 0,
              periodDiscountRate: 0,
              rank: null,
            },
            {
              id: 53379,
              diningType: 2,
              foodId: 285,
              foodName: '쿄토두부와 버섯샐러드',
              capacity: 43,
              status: 1,
              spotId: 93,
              serviceDate: '2023-06-07',
              makersName: '라이브볼',
              minTime: null,
              maxTime: null,
              spicy: null,
              vegan: null,
              image:
                'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001678239746721/%EA%B5%90%ED%86%A0%EB%91%90%EB%B6%80%EC%99%80%20%EB%B2%84%EC%84%AF%EC%83%90%EB%9F%AC%EB%93%9C.png',
              description:
                '기본 + 구운 두부 + 새송이 느타리버섯 + 트러플 오일  + 오리엔탈 드레싱',
              price: 12900.0,
              discountedPrice: 11000.0,
              membershipDiscountPrice: 1900,
              membershipDiscountRate: 15,
              makersDiscountPrice: 0,
              makersDiscountRate: 0,
              periodDiscountPrice: 0,
              periodDiscountRate: 0,
              rank: null,
            },
            {
              id: 53380,
              diningType: 2,
              foodId: 286,
              foodName: '할리우드 닭가슴살 샐러드',
              capacity: 43,
              status: 1,
              spotId: 93,
              serviceDate: '2023-06-07',
              makersName: '라이브볼',
              minTime: null,
              maxTime: null,
              spicy: null,
              vegan: null,
              image:
                'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001678239763694/%ED%95%A0%EB%A6%AC%EC%9A%B0%EB%93%9C%20%EB%8B%AD%EA%B0%80%EC%8A%B4%EC%82%B4%20%EC%83%90%EB%9F%AC%EB%93%9C.png',
              description:
                '기본 + 수비드 닭가슴살 + 버터밀크 렌치 드레싱으로 구성되어 있습니다.',
              price: 12900.0,
              discountedPrice: 11000.0,
              membershipDiscountPrice: 1900,
              membershipDiscountRate: 15,
              makersDiscountPrice: 0,
              makersDiscountRate: 0,
              periodDiscountPrice: 0,
              periodDiscountRate: 0,
              rank: null,
            },
          ],
        },
      };
    }
    return await fetchJson(
      `/dailyfoods?spotId=${spotId}&selectedDate=${selectedDate}`,
      'GET',
    );
  },
};
