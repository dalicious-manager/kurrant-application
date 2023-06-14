import {fetchJson} from '../utils/fetch';

export const shareSpotApis = {
  loadSpotList: async (lat, long, pageParam, mealTouch, touchInfo) => {
    let url = `/users/me/groups/spots/share?lat=${lat}&long=${long}&limit=10&page=${pageParam}&diningType=${mealTouch}`;

    if (touchInfo.includes(2)) {
      url += '&isRestriction=false';
    } else if (touchInfo.includes(3)) {
      url += '&isRestriction=true';
    }

    const res = await fetchJson(url, 'GET');

    const {items, isLast} = res.data;
    return {items, currentPage: pageParam, isLast};
  },
  loadSpotDetail: async id =>
    await fetchJson(`/users/me/groups/spots/share/${id}`, 'GET'),
  selectSpot: async body =>
    await fetchJson(`/users/me/groups/spots/share`, 'POST', {
      body: JSON.stringify(body),
    }),
  applicationShareSpot: async data =>
    await fetchJson(
      `/application-forms/spots/share/types/${data.param}`,
      'POST',
      {
        body: JSON.stringify(data.body),
      },
    ),
};
