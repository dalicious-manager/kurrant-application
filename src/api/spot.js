import {fetchJson} from '../utils/fetch';

export const spotApis = {
  // 마이스팟 신청
  applyMySpot: async data =>
    await fetchJson('/application-forms/spots/my', 'POST', {
      body: JSON.stringify(data),
    }),
  // 마이스팟 신청내역 삭제
  deleteApplyMySpot: async () =>
    await fetchJson('/application-forms/spots', 'DELETE'),
  // 마이스팟 신청 후 알림 신청
  alarmSettingMySpot: async data =>
    await fetchJson('/application-forms/spots/setting/alarm', 'PATCH', {
      body: JSON.stringify(data),
    }),
};
