import {fetchJson} from '../utils/fetch';

export const shareSpotApis = {
  loadSpotList: async (lat, long, pageParam) => {
    const res = await fetchJson(
      `/users/me/groups/spots/share?lat=${lat}&long=${long}&limit=5&page=${pageParam}`,
      'GET',
    );

    const {items, isLast} = res.data;
    return {items, currentPage: pageParam, isLast};
  },
};
