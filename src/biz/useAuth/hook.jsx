import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {useResetAtom} from 'jotai/utils';
import jwtDecode from 'jwt-decode';
import {Alert} from 'react-native';
import {useQueryClient} from 'react-query';

import * as Fetch from './Fetch';
import {
  isPhoneAuthLoadingAtom,
  isEmailAuthLoadingAtom,
  isConfirmPhoneLoadingAtom,
  isConfirmEmailLoadingAtom,
  isLoginLoadingAtom,
  isCheckedAuthLoadingAtom,
  isChangePasswordLoadingAtom,
  isFindEmailLoading,
  userRoleAtom,
  fcmTokenAtom,
} from './store';
import {PAGE_NAME as LoginPageName} from '../../pages/Main/Login/Login';
import {setStorage} from '../../utils/asyncStorage';
import {isUserInfoAtom, isUserSpotStatusAtom} from '../useUserInfo/store';

const useAuth = () => {
  const queryClient = useQueryClient();

  const [isEmailAuthLoading, setEmailAuthLoading] = useAtom(
    isEmailAuthLoadingAtom,
  );
  const [isPhoneAuthLoading, setPhoneAuthLoading] = useAtom(
    isPhoneAuthLoadingAtom,
  );
  const [isConfirmEmailLoading, setConfirmEmailLoading] = useAtom(
    isConfirmEmailLoadingAtom,
  );
  const [isConfirmPhoneLoading, setConfirmPhoneLoading] = useAtom(
    isConfirmPhoneLoadingAtom,
  );
  const [isCheckedAuthLoading, setCheckedAuthLoading] = useAtom(
    isCheckedAuthLoadingAtom,
  );
  const [isChangePasswordLoading, setChangePasswordLoading] = useAtom(
    isChangePasswordLoadingAtom,
  );
  const resetAtom = useResetAtom(isUserInfoAtom);
  const [isEmailLoading, setEmailLoading] = useAtom(isFindEmailLoading);
  const [fcmToken, setFcmToken] = useAtom(fcmTokenAtom);
  const [isLoginLoading, setLoginLoading] = useAtom(isLoginLoadingAtom);
  const [userRole, setUserRole] = useAtom(userRoleAtom);

  const navigation = useNavigation();

  const requestEmailAuth = async (body, type, option = {}) => {
    try {
      setEmailAuthLoading(true);

      const res = await Fetch.requestEmailAuth(body, type, option);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setEmailAuthLoading(false);
    }
  };
  const confirmEmailAuth = async (auth, type) => {
    try {
      setConfirmEmailLoading(true);

      const res = await Fetch.confirmEmailAuth(auth, type);
      queryClient.invalidateQueries('userInfo');
      return res;
    } catch (err) {
      throw err;
    } finally {
      setConfirmEmailLoading(false);
    }
  };
  const requestPhoneAuth = async (body, type, option = {}) => {
    try {
      setPhoneAuthLoading(true);
      const res = await Fetch.requestPhoneAuth(body, type, option);

      return res;
    } catch (err) {
      throw err;
    } finally {
      setPhoneAuthLoading(false);
    }
  };
  const confirmPhoneAuth = async (auth, type) => {
    try {
      setConfirmPhoneLoading(true);
      queryClient.invalidateQueries('userInfo');
      const res = await Fetch.confirmPhoneAuth(auth, type);

      return res;
    } catch (err) {
      throw err;
    } finally {
      setConfirmPhoneLoading(false);
    }
  };
  const findEmail = async (body, option = {}) => {
    try {
      setEmailLoading(true);

      const res = await Fetch.findEmail(
        {
          ...body,
        },
        option,
      );
      queryClient.invalidateQueries('userInfo');
      return res;
    } catch (err) {
      throw err;
    } finally {
      setEmailLoading(false);
    }
  };
  const checkedAuth = async (body, option = {}) => {
    try {
      setCheckedAuthLoading(true);
      const res = await Fetch.checkedAuth(
        {
          ...body,
        },
        option,
      );
      queryClient.invalidateQueries('userInfo');
      return res;
    } catch (err) {
      throw err;
    } finally {
      setCheckedAuthLoading(false);
    }
  };
  const changePassword = async (body, type, option = {}) => {
    try {
      setChangePasswordLoading(true);
      const res = await Fetch.changePassword(
        {
          ...body,
        },
        type,
        option,
      );

      return res;
    } catch (err) {
      throw err;
    } finally {
      setChangePasswordLoading(false);
    }
  };
  const login = async (body, isGuest = false, option = {}) => {
    try {
      setLoginLoading(true);
      if (isGuest) {
        const res = await Fetch.guestLogin();

        const {roles} = jwtDecode(res.data.accessToken);
        setUserRole(roles[0]);
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('isLogin', 'false');
        await setStorage('spotStatus', res?.data?.spotStatus.toString());

        return res;
      }
      const reqData = {
        email: body.email,
        password: body.password,
      };
      const res = await Fetch.login(
        {
          ...reqData,
        },
        option,
      );
      if (res?.data?.isActive) {
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('isLogin', body.autoLogin.toString());
        await setStorage('lastLogin', 'GENERAL');
        await setStorage('spotStatus', res?.data?.spotStatus.toString());
        setUserRole('NOMAL');
      } else {
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('isLogin', body.autoLogin.toString());
        await setStorage('lastLogin', 'GENERAL');
        await setStorage('spotStatus', res?.data?.spotStatus.toString());
        setUserRole('NOMAL');
        Alert.alert(
          '탈퇴한 계정 입니다.',
          `탈퇴한 계정입니다 계정을 복구 하시겠습니까?\n탈퇴까지 남은 기간${res?.data?.leftWithdrawDays}일 남음`,
          [
            {
              text: '취소',
              onPress: async () => {
                await AsyncStorage.clear();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: LoginPageName,
                    },
                  ],
                });
              },
            },
            {
              text: '계정복구',
              onPress: async () => {
                try {
                  const cancel = await cancelTerminateUser();
                  await setStorage('token', JSON.stringify(res.data));
                  await setStorage('isLogin', body.autoLogin.toString());
                  await setStorage(
                    'spotStatus',
                    res?.data?.spotStatus.toString(),
                  );
                  setUserRole('NOMAL');
                } catch (e) {
                  alert(e.toString()?.replace('error:', ''));
                }
              },
            },
          ],
        );
      }
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoginLoading(false);
    }
  };
  const autoLogin = async () => {
    try {
      setLoginLoading(true);

      const res = await Fetch.autoLogin();
      if (res?.data?.isActive) {
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('spotStatus', res?.data?.spotStatus.toString());
        setUserRole('NOMAL');
      } else {
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('spotStatus', res?.data?.spotStatus.toString());
        setUserRole('NOMAL');
        Alert.alert(
          '탈퇴한 계정 입니다.',
          '탈퇴한 계정입니다 계정을 복구 하시겠습니까?',
          [
            {
              text: '취소',
              onPress: async () => {
                await AsyncStorage.clear();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: LoginPageName,
                    },
                  ],
                });
              },
            },
            {
              text: '계정복구',
              onPress: async () => {
                try {
                  const cancel = await cancelTerminateUser();
                  await setStorage('token', JSON.stringify(res.data));
                  await setStorage(
                    'spotStatus',
                    res?.data?.spotStatus.toString(),
                  );
                  setUserRole('NOMAL');
                } catch (e) {
                  alert(e.toString()?.replace('error:', ''));
                }
              },
            },
          ],
        );
      }
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoginLoading(false);
    }
  };
  const snsLogin = async (body, type, option = {}) => {
    try {
      setLoginLoading(true);
      const reqData = {
        snsAccessToken: body.snsAccessToken,
      };
      const res = await Fetch.snsLogin(
        {
          ...reqData,
        },
        type,
        option,
      );

      if (res?.data?.isActive) {
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('isLogin', body.autoLogin.toString());
        await setStorage('lastLogin', type.toString());
        await setStorage('spotStatus', res?.data?.spotStatus.toString());
        setUserRole('NOMAL');
      } else {
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('isLogin', body.autoLogin.toString());
        await setStorage('lastLogin', type.toString());
        await setStorage('spotStatus', res?.data?.spotStatus.toString());
        setUserRole('NOMAL');
        Alert.alert(
          '탈퇴한 계정 입니다.',
          `탈퇴한 계정입니다 계정을 복구 하시겠습니까?\n탈퇴까지 남은 기간${res?.data?.leftWithdrawDays}일 남음`,
          [
            {
              text: '취소',
              onPress: async () => {
                await AsyncStorage.clear();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: LoginPageName,
                    },
                  ],
                });
              },
            },
            {
              text: '계정복구',
              onPress: async () => {
                try {
                  const cancel = await cancelTerminateUser();
                  await setStorage('token', JSON.stringify(res.data));
                  await setStorage('isLogin', body.autoLogin.toString());
                  await setStorage('lastLogin', type.toString());
                  await setStorage(
                    'spotStatus',
                    res?.data?.spotStatus.toString(),
                  );
                  setUserRole('NOMAL');
                } catch (e) {
                  alert(e.toString()?.replace('error:', ''));
                }
              },
            },
          ],
        );
      }
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoginLoading(false);
    }
  };
  const snsAppleLogin = async (body, type, option = {}) => {
    try {
      setLoginLoading(true);
      const res = await Fetch.snsAppleLogin(
        {
          ...body,
        },
        type,
        option,
      );
      if (res?.data?.isActive) {
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('isLogin', body.autoLogin.toString());
        await setStorage('lastLogin', type.toString());
        await setStorage('spotStatus', res?.data?.spotStatus.toString());
        setUserRole('NOMAL');
      } else {
        await setStorage('token', JSON.stringify(res.data));
        await setStorage('isLogin', body.autoLogin.toString());
        await setStorage('lastLogin', type.toString());
        await setStorage('spotStatus', res?.data?.spotStatus.toString());
        setUserRole('NOMAL');
        Alert.alert(
          '탈퇴한 계정 입니다.',
          `탈퇴한 계정입니다 계정을 복구 하시겠습니까?\n탈퇴까지 남은 기간${res?.data?.leftWithdrawDays}일 남음`,
          [
            {
              text: '취소',
              onPress: async () => {
                await AsyncStorage.clear();
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: LoginPageName,
                    },
                  ],
                });
              },
            },
            {
              text: '계정복구',
              onPress: async () => {
                try {
                  const cancel = await cancelTerminateUser();
                  await setStorage('token', JSON.stringify(res.data));
                  await setStorage('isLogin', body.autoLogin.toString());
                  await setStorage(
                    'spotStatus',
                    res?.data?.spotStatus.toString(),
                  );
                  setUserRole('NOMAL');
                } catch (e) {
                  alert(e.toString()?.replace('error:', ''));
                }
              },
            },
          ],
        );
      }
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoginLoading(false);
    }
  };
  const logout = async (body, option = {}) => {
    const res = await Fetch.logout(
      {
        ...body,
      },
      option,
    );
    queryClient.clear();
    resetAtom();
    return res;
  };
  const saveFcmToken = async (body, option = {}) => {
    console.log(body, 'saveFCM');
    const res = await Fetch.saveFcmToken(
      {
        ...body,
      },
      option,
    );

    return res;
  };
  const nameSetting = async (body, option = {}) => {
    const res = await Fetch.nameSetting(
      {
        ...body,
      },
      option,
    );
    queryClient.invalidateQueries('userInfo');
    return res;
  };
  const terminateUser = async (body, option = {}) => {
    const res = await Fetch.terminateUser(option);
    queryClient.invalidateQueries('userInfo');
    return res;
  };
  const cancelTerminateUser = async (body, option = {}) => {
    const res = await Fetch.cancelTerminateUser(option);
    queryClient.invalidateQueries('userInfo');
    return res;
  };
  return {
    requestEmailAuth,
    confirmEmailAuth,
    requestPhoneAuth,
    confirmPhoneAuth,
    nameSetting,
    checkedAuth,
    findEmail,
    changePassword,
    cancelTerminateUser,
    login,
    autoLogin,
    snsLogin,
    snsAppleLogin,
    terminateUser,
    logout,
    setFcmToken,
    saveFcmToken,
    readableAtom: {
      isPhoneAuthLoading,
      isEmailAuthLoading,
      userRole,
      fcmToken,
      isConfirmPhoneLoading,
      isConfirmEmailLoading,
      isCheckedAuthLoading,
      isChangePasswordLoading,
      isEmailLoading,
      isLoginLoading,
    },
  };
};

export default useAuth;
