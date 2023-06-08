import {fetchJson} from '../utils/fetch';

export const spotApis = {
  applyMySpot: async data =>
    await fetchJson('/application-forms/spots/my', 'POST', {
      body: JSON.stringify(data),
    }),
};
