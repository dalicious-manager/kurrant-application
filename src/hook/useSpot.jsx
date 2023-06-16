import {useMutation, useQueryClient} from 'react-query';

import {spotApis} from '../api/spot';

// 마이스팟 신청
export function useApplyMySpot() {
  return useMutation(data => spotApis.applyMySpot(data));
}

// 마이스팟 신청 내역 삭제
export function useDeleteApplyMySpot() {
  return useMutation(data => spotApis.deleteApplyMySpot(data));
}

// 마이스팟 신청 후 알림 설정
export function useSettingAlarmMySpot() {
  return useMutation(data => spotApis.alarmSettingMySpot(data));
}
