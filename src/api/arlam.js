import {fetchJson} from '../utils/fetch';

export const alramApis = {
  getAlram: async () => await fetchJson(`/users/me/setting`, 'GET'),
  setAlram: async data =>
    await fetchJson(`/users/me/setting`, 'POST', {
      body: JSON.stringify(data),
    }),
  setAlramAll: async data =>
    await fetchJson(`/users/me/setting`, 'POST', {
      body: JSON.stringify(data),
    }),
};
