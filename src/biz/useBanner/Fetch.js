import mSleep from '../../helpers/mSleep';
import {fetchJson} from '../../utils/fetch';

export async function findBanners(data, option) {
  // const fetchRes = await fetchJson(`/banners`, 'GET', {
  //   ...option,
  // });

  await mSleep(1000);

  return {
    total: 8,
    limit: 10,
    count: 8,
    offset: 0,
    items: [
      {
        id: '1',
        type: 'HERO',
        imageLocation: `${process.env.API_CDN_LOCATION}480/100`,
        moveTo: '이동 스크린',
      },
      {
        id: '2',
        type: 'HERO',
        imageLocation: `${process.env.API_CDN_LOCATION}480/100`,
        moveTo: '이동 스크린',
      },
      {
        id: '3',
        type: 'TIE',
        imageLocation: `${process.env.API_CDN_LOCATION}480/100`,
        moveTo: '이동 스크린',
      },
      {
        id: '4',
        type: 'TIE',
        imageLocation: `${process.env.API_CDN_LOCATION}480/100`,
        moveTo: '이동 스크린',
      },
      {
        id: '5',
        type: 'BUY_HERO',
        imageLocation: `${process.env.API_CDN_LOCATION}480/100`,
        moveTo: '이동 스크린',
      },
      {
        id: '6',
        type: 'BUY_HERO',
        imageLocation: `${process.env.API_CDN_LOCATION}480/100`,
        moveTo: '이동 스크린',
      },
    ],
  };
}
