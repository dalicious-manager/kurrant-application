import {fetchJson} from '../utils/fetch';

export const privateSpotApis = {
  getPrivateSpot: async () => await fetchJson('/users/me/groups/corporation'),
};
