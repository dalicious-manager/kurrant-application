import {fetchJson} from '../utils/fetch';

export const pointApis = {
  pointList: async (condition, limit, page) =>
    await fetchJson(
      `users/me/point?condition=${condition}&limit=${limit}&page=${page}`,
    ),
};
