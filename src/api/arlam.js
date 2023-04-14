import {fetchJson} from '../utils/fetch';

export const alramApis = {
  getAlram: async () => await fetchJson(`/users/me/setting`, 'GET'),
};
