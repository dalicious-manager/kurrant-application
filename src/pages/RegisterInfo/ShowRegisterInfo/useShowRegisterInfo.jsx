import {useEffect, useState} from 'react';
import useGetRegisterDoneCheck from '../../../biz/useRegisterInfo/getRegisterDoneCheck/hook';
import {getStorage, removeItemFromStorage} from '../../../utils/asyncStorage';
import {isTimeNumberDifferenceLarger} from '../../../utils/dateFormatter';
import {useNavigation} from '@react-navigation/native';
import {PAGE_NAME as RegisterInfoStartPageName} from '~pages/RegisterInfo/Start';
import {PAGE_NAME as RegisterInfoPage6PageName} from '~pages/RegisterInfo/Page6';

const useShowRegisterInfo = () => {
  // 회원 정보 입력 홈 화면

  const navigation = useNavigation();
  const [shouldOpenRegister, setShouldOpenRegister] = useState(false);

  // 1.  회원 정보 이미 썻는가 안썻는가 파악하기

  const {isRegisterDone, getRegisterDoneCheck, isRegisterInfoLoading} =
    useGetRegisterDoneCheck();

  useEffect(() => {
    getRegisterDoneCheck();
  }, []);

  // 2. 하루지났는가 안 지났는가

  useEffect(() => {
    // 회원정보입력 보여줄지 안보여줄지 판단하기

    // 로딩 처리
    if (!!isRegisterInfoLoading || isRegisterInfoLoading === undefined) {
      // console.log('회원정보입력 입력 여부 받아오는 중');

      return;
    } else if (isRegisterInfoLoading === false) {
      // console.log('회원정보입력 입력 여부받기 완료');
    }
    // 회원정보입력 작성여부 파악
    if (isRegisterDone) {
      // if (false) {
      console.log('회원정보입력 이미 작성하셨습니다');
    } else {
      console.log('회원정보입력을 아직 작성하지 않으셨습니다');
      isRegisterInfoPassTime();
    }
  }, [isRegisterDone, isRegisterInfoLoading]);

  useEffect(() => {
    if (shouldOpenRegister) {
      navigation.navigate(RegisterInfoStartPageName);
      // navigation.navigate(RegisterInfoPage6PageName);
    }
  }, [shouldOpenRegister]);

  const isRegisterInfoPassTime = async () => {
    const clickedDate = await getStorage('registerInfoClicked');

    // console.log('registerInfoClickedDate ' + clickedDate);

    if (clickedDate) {
      if (isTimeNumberDifferenceLarger(clickedDate, Date.now(), 1)) {
        // console.log('registerInfo 하루가 지났음 ');
        setShouldOpenRegister(true);
      } else {
        // console.log('registerInfo 하루가 아직 안지남');
        setShouldOpenRegister(false);
      }
    } else {
      //   console.log('registerInfo 첫 회원 등록임 ');
      setShouldOpenRegister(true);
    }
  };

  // useEffect(() => {
  //   removeItemFromStorage('registerInfoClicked');
  // }, []);
};

export default useShowRegisterInfo;
