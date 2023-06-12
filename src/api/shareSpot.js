import {fetchJson} from '../utils/fetch';

export const shareSpotApis = {
  loadSpotList: async (lat, long, pageParam, mealTouch, touchInfo) => {
    const type = touchInfo.includes(2)
      ? `&isRestriction=${true}`
      : touchInfo.includes(3)
      ? `&isRestriction=${false}`
      : null;

    console.log(type, 'sksk');
    const res = await fetchJson(
      `/users/me/groups/spots/share?lat=${lat}&long=${long}&limit=5&page=${pageParam}&diningType=${2}`,
      'GET',
    );

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
      `/application-forms/spots/share/types/${data.groupId}`,
      'POST',
      {
        body: JSON.stringify(data),
      },
    ),
};
