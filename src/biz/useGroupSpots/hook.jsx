import {useAtom} from 'jotai';
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';

import * as Fetch from './Fetch';
import {
  applicationListAtom,
  groupSpotDetailAtom,
  isCancelSpotAtom,
  userGroupSpotListAtom,
} from './store';

const useGroupSpots = () => {
  const [isApplicationList, setApplicationList] = useAtom(applicationListAtom); // 아파트 + 프라이빗 스팟
  const [isUserGroupSpotCheck, setUserGroupSpotCheck] = useAtom(
    userGroupSpotListAtom,
  ); // 유저가 속한 그룹 스팟 조회
  const [isDetailSpot, setDetailSpot] = useAtom(groupSpotDetailAtom); // 그룹별 스팟 상세 조회
  const [isCancelSpot, setIsCancelSpot] = useAtom(isCancelSpotAtom); // 그룹별 스팟 상세 조회
  const queryClient = useQueryClient();
  // 그룹/스팟 신청 목록 조회 (아파트 + 프라이빗 스팟)
  const applicationList = async () => {
    try {
      const res = await Fetch.applicationList();

      setApplicationList(res.data);
    } catch (err) {
      // Alert.alert(
      //   '그룹/스팟 신청 목록 조회',
      //   err.toString()?.replace('error: ', ''),
      //   [
      //     {
      //       text: '확인',
      //       onPress: () => {},
      //       style: 'cancel',
      //     },
      //   ],
      // );
    }
  };
  // 유저가 속한 그룹 스팟 조회
  const userGroupSpotCheck = async () => {
    try {
      const res = await Fetch.GroupSpotCheck();

      setUserGroupSpotCheck(res.data);
      return res;
    } catch (err) {
      // Alert.alert('그룹/스팟', err.toString()?.replace('error: ', ''), [
      //   {
      //     text: '확인',
      //     onPress: () => {},
      //     style: 'cancel',
      //   },
      // ]);
    }
  };

  // 유저 그룹 설정
  const userGroupAdd = async body => {
    try {
      const res = await Fetch.UserGroupAdd({
        ...body,
      });
      queryClient.invalidateQueries('userInfo');
      return res;
    } catch (err) {
      throw err;
    }
  };

  // 그룹별 스팟 상세 조회

  const groupSpotDetail = async id => {
    try {
      setDetailSpot();
      const res = await Fetch.GroupDetail(id);

      setDetailSpot(res.data);
    } catch (err) {
      throw err;
    }
  };

  // 유저 스팟 등록

  const userSpotRegister = async body => {
    try {
      const res = await Fetch.SpotRegister({
        ...body,
      });
      queryClient.invalidateQueries('dailyfood');
      queryClient.invalidateQueries('userInfo');
      return res;
    } catch (err) {
      throw err;
    }
  };

  // 그룹 탈퇴

  const userWithdrawGroup = async body => {
    try {
      const res = await Fetch.WithdrawGroup({
        ...body,
      });
      queryClient.invalidateQueries('userInfo');
      queryClient.invalidateQueries('groupSpotList');
      queryClient.invalidateQueries('groupSpotDetail');
      queryClient.invalidateQueries('groupSpotManageLists');
      return res;
    } catch (err) {
      Alert.alert('그룹 탈퇴', err.toString()?.replace('error: ', ''), [
        {
          text: '확인',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    }
  };

  return {
    applicationList,
    userGroupSpotCheck,
    userGroupAdd,
    groupSpotDetail,
    userSpotRegister,
    userWithdrawGroup,
    isApplicationList,
    isUserGroupSpotCheck,
    isDetailSpot,
    setDetailSpot,
  };
};

export default useGroupSpots;
