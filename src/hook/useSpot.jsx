import {Alert} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {spotApis} from '../api/spot';

// 마이스팟 신청
export function useApplyMySpot() {
  return useMutation(data => spotApis.applyMySpot(data), {
    onError: err => {
      Alert.alert('', err?.toString()?.replace('error: ', ''), [
        {
          text: '확인',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
      console.log(err, 'err');
    },
  });
}

// 마이스팟 신청 내역 삭제
export function useDeleteApplyMySpot() {
  return useMutation(data => spotApis.deleteApplyMySpot(data));
}

// 마이스팟 신청 후 알림 설정
export function useSettingAlarmMySpot() {
  return useMutation(data => spotApis.alarmSettingMySpot(data));
}

export function useGetPrivateSpots() {
  return useQuery('groupSpotLists', () => {
    return spotApis.groupSpotList();
  });
}
export function useGetSpotsManageList() {
  return useQuery('groupSpotManageLists', () => {
    return spotApis.groupSpotManageList();
  });
}

export function useGroupSpotList() {
  return useQuery('groupSpotList', () => {
    return spotApis.groupSpotList();
  });
}
export function useGroupSpotDetail(id) {
  return useQuery(
    'groupSpotDetail',
    () => {
      return spotApis.groupSpotDetail(id);
    },
    {
      enabled: false,
    },
  );
}
export function useGroupSpotManageDetail(id) {
  return useQuery(
    'groupSpotManageDetail',
    () => {
      return spotApis.groupSpotManageDetail(id);
    },
    {
      enabled: false,
    },
  );
}
