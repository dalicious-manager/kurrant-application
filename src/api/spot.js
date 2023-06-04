import {fetchJson} from '../utils/fetch';

export const spotApis = {
  applyMySpot: async data =>
    await fetchJson('/application-form/my/spot', 'POST', {
      body: JSON.stringify(data),
    }),
};
