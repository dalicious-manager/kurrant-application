import {fetchJson} from '../utils/fetch';

export const shareSpotApis = {
  // 공유스팟 지도,목록 조회 데이터
  loadSpotList: async (limit, lat, long, pageParam, mealTouch, touchInfo) => {
    let url = `/users/me/groups/spots/share?lat=${lat}&long=${long}&page=${pageParam}&diningType=${mealTouch}`;

    if (touchInfo.includes(2)) {
      url += '&isRestriction=false';
    } else if (touchInfo.includes(3)) {
      url += '&isRestriction=true';
    }
    if (limit === 10) {
      url += `&limit=${limit}`;
    }
    const res = await fetchJson(url, 'GET');

    const {items, isLast} = res.data;
    return {items, currentPage: pageParam, isLast};
  },
  // 공유스팟 상세 조회
  loadSpotDetail: async id =>
    await fetchJson(`/users/me/groups/spots/share/${id}`, 'GET'),
  // 공유스팟 사용
  selectSpot: async body =>
    await fetchJson(`/users/me/groups/spots/share`, 'POST', {
      body: JSON.stringify(body),
    }),
  // 공유스팟/시간 신청
  applicationShareSpot: async data =>
    await fetchJson(
      `/application-forms/spots/share/types/${data.param}`,
      'POST',
      {
        body: JSON.stringify(data.body),
      },
    ),
  // 공유스팟 검색 데이터
  searchShareSpot: async () =>
    await fetchJson('/users/me/groups/spots/share/keyword'),
};
