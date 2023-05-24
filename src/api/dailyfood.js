import mSleep from '../helpers/mSleep';
import {fetchJson} from '../utils/fetch';

export const dailyfoodApis = {
  dailyfood: async (spotId, selectedDate, userRole) => {
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
    return await fetchJson(
      `/dailyfoods?spotId=${spotId}&selectedDate=${selectedDate}`,
      'GET',
    );
  },
};
