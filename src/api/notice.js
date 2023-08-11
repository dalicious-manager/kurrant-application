import {fetchJson} from '../utils/fetch';

export const noticeApis = {
  noticeList: async pageParam => {
    const res = await fetchJson(`/boards/notices?limit=15&page=${pageParam}`);

    const {items, isLast} = res.data;
    return {items, currentPage: pageParam, isLast};
  },
  spotNoticeList: async pageParam => {
    const res = await fetchJson(
      `/boards/notices?type=1&limit=15&page=${pageParam}`,
    );

    const {items, isLast} = res.data;
    return {items, currentPage: pageParam, isLast};
  },
  noticeDetail: async id => await fetchJson(`/boards/notices/${id}`),
};
