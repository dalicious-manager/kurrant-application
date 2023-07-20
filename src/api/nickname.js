import {fetchJson} from '../utils/fetch';

export const nicknameApis = {
  settingNickname: async data =>
    await fetchJson('/users/me/setting/nickname', 'POST', {
      body: JSON.stringify(data),
    }),
};
