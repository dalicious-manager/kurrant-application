import {fetchJson} from '../utils/fetch';

export const pointApis = {
  pointList: async (condition, pageParam) => {
    const res = await fetchJson(
      `/users/me/point?condition=${condition}&limit=20&page=${pageParam}`,
    );

    const {items, isLast} = res.data;
    return {items, currentPage: pageParam, isLast};
  },
};
