import {fetchJson} from '../utils/fetch';

export const userInfoApi = {
  getUserInfo: async () => await fetchJson(`/users/me/userInfo`, 'GET'),
};
