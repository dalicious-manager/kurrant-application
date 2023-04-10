import mSleep from '../../helpers/mSleep';
import {fetchJson} from '../../utils/fetch';

export async function findReviewWaitList(data, option) {
  // const fetchRes = await fetchJson(`/banners`, 'GET', {
  //   ...option,
  // });

  await mSleep(1000);

  return [
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
}
