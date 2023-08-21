import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

import {
  monday,
  tuesday,
  wendsday,
  thursday,
  friday,
  saturday,
  sunday,
} from './dummyData';
import mSleep from '../helpers/mSleep';
import {fetchJson} from '../utils/fetch';

export const dailyfoodApis = {
  dailyfood: async (spotId, selectedDate, userRole) => {
    if (userRole === 'ROLE_GUEST') {
      const txt = format(new Date(selectedDate), 'EEE', {locale: ko});
      await mSleep(100);
      switch (txt) {
        case '월':
          return monday;
        case '화':
          return tuesday;
        case '수':
          return wendsday;
        case '목':
          return thursday;
        case '금':
          return friday;
        default:
          break;
      }
    }
    return await fetchJson(
      `/dailyfoods?spotId=${spotId}&selectedDate=${selectedDate}`,
      'GET',
    );
  },
  dailyfoodList: async (spotId, startDate, endDate, userRole) => {
    if (userRole === 'ROLE_GUEST') {
      const txt = format(new Date(startDate), 'EEE', {locale: ko});
      await mSleep(100);
      switch (txt) {
        case '월':
          return monday;
        case '화':
          return tuesday;
        case '수':
          return wendsday;
        case '목':
          return thursday;
        case '금':
          return friday;
        default:
          break;
      }
    }
    return await fetchJson(
      `/dailyfoods/period?spotId=${spotId}&startDate=${startDate}&endDate=${endDate}`,
      'GET',
    );
  },
  dailyfoodDateList: async (spotId, startDate, endDate, userRole) => {
    if (userRole === 'ROLE_GUEST') {
      const txt = format(new Date(startDate), 'EEE', {locale: ko});
      await mSleep(100);
      switch (txt) {
        case '월':
          return monday;
        case '화':
          return tuesday;
        case '수':
          return wendsday;
        case '목':
          return thursday;
        case '금':
          return friday;
        default:
          break;
      }
    }
    return await fetchJson(
      `/dailyfoods/period/by/date?spotId=${spotId}&startDate=${startDate}&endDate=${endDate}`,
      'GET',
    );
  },
  dailyfoodDetail: foodDetail,
};
async function foodDetail(foodId, userRole) {
  // console.log(userRole, 'test');
  if (userRole === 'ROLE_GUEST') {
    await mSleep(100);
    return {
      id: 'b503f048-3900-4d2c-bf29-de1191760461',
      statusCode: 200,
      message: '상품 상세정보 조회 성공!',
      data: {
        makersName: '커런트 샌드위치',
        name: 'BLT 샌드위치',
        capacity: 15,
        price: 13000.0,
        discountedPrice: 10530.0,
        membershipDiscountedPrice: 0,
        membershipDiscountedRate: 0,
        makersDiscountedPrice: 1300,
        makersDiscountedRate: 10,
        periodDiscountedPrice: 1170,
        periodDiscountedRate: 10,
        image:
          'https://kurrant-v1-dev.s3.ap-northeast-2.amazonaws.com/food/0001677724188788/BLT%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98.jpg',
        spicy: '맵지 않음',
        description: null,
        origins: [],
      },
      error: null,
    };
  }
  const fetchRes = await fetchJson(`/dailyfoods/${foodId}`, 'GET');

  return fetchRes;
}
