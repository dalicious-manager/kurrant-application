import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, {css} from 'styled-components/native';
import {Settings} from 'react-native-fbsdk-next';

import {LogoBackground} from '../../../../assets';
import ButtonRoundSns from '../../../../components/ButtonRoundSns';
import HorizonLine from '../../../../components/HorizonLine';
import Toast from '../../../../components/Toast';
import Wrapper from '../../../../components/Wrapper';
import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import {SCREEN_NAME} from '../../../../screens/Main/Bnb';
import {getStorage} from '../../../../utils/asyncStorage';
import snsLogin from '../../../../utils/snsLogin';
import LoginMain from './LoginMain';
import CsIcon from '../../../../assets/icons/Home/cs.svg';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import LogoImageSvg from '../../../../assets/icons/Logo.svg';
import useAuth from '../../../../biz/useAuth';
import Config from 'react-native-config';
import useUserMe from '../../../../biz/useUserMe';
import {PAGE_NAME as FAQListPageName} from '../../MyPage/FAQ';
import VersionCheck from 'react-native-version-check';
import messaging from '@react-native-firebase/messaging';

export const PAGE_NAME = 'P_LOGIN__MAIN_LOGIN';

const rawNonce = uuid();
const state = uuid();

const screenHeight = Dimensions.get('screen').height;
const GOOGLE_PLAY_STORE_LINK = 'market://details?id=com.dalicious.kurrant';
// 구글 플레이 스토어가 설치되어 있지 않을 때 웹 링크
const GOOGLE_PLAY_STORE_WEB_LINK =
  'https://play.google.com/store/apps/details?id=com.dalicious.kurrant';
// 애플 앱 스토어 링크
const APPLE_APP_STORE_LINK = 'itms-apps://itunes.apple.com/us/app/id1663407738';
// 애플 앱 스토어가 설치되어 있지 않을 때 웹 링크
const APPLE_APP_STORE_WEB_LINK = 'https://apps.apple.com/us/app/id1663407738';

const Pages = ({route}) => {
  const params = route?.params;
  const navigation = useNavigation();
  const toast = Toast();
  const [isLoginLoading, setLoginLoading] = useState();
  const [versionChecked, setVersionChecked] = useState(false);
  const currentVersion = VersionCheck.getCurrentVersion();
  const handlePress = useCallback(async (url, alterUrl) => {
    // 만약 어플이 설치되어 있으면 true, 없으면 false
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // 설치되어 있으면
      await Linking.openURL(url);
    } else {
      // 앱이 없으면
      await Linking.openURL(alterUrl);
    }
  }, []);
  const {googleLogin, appleLogin, facebookLogin, kakaoLogin, naverLogin} =
    snsLogin();
  const {
    setSelectDefaultCard,
    readableAtom: {selectDefaultCard},
  } = useUserMe();

  const {
    login,
    autoLogin,
    setFcmToken,
    saveFcmToken,
    readableAtom: {fcmToken},
  } = useAuth();
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/user.phonenumbers.read'],
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
    });
  };
  const appleSignConfiguration = () => {
    appleAuthAndroid.configure({
      clientId: 'kurrant.dalicious.io',
      redirectUri: 'https://dalicious-v1.firebaseapp.com/__/auth/handler',
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      nonce: rawNonce,
      state,
    });
  };
  const facebookConfiguration = () => {
    Settings.setAppID(Config.FACEBOOK_APP_ID);
    Settings.initializeSDK();
  };

  useEffect(() => {
    let timeout;
    let exitApp = false;
    const handleBackButton = () => {
      if (navigation.isFocused()) {
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (exitApp === undefined || !exitApp) {
          exitApp = true;
          toast.toastEvent();
          timeout = setTimeout(
            () => {
              exitApp = false;
            },
            2000, // 2초
          );
        } else {
          clearTimeout(timeout);
          exitApp = false;
          BackHandler.exitApp(); // 앱 종료
        }
      } else {
        return false;
      }
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }, [navigation, toast]);
  useEffect(() => {
    if (params?.token === 'end') {
      Alert.alert('토큰만료', '토큰이 만료되었습니다 다시 로그인 해주세요.');
    }
    if (Platform.OS === 'android') {
      appleSignConfiguration();
    }
    googleSigninConfigure();
    facebookConfiguration();
  }, []);
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        await VersionCheck.getLatestVersion().then(latestVersion => {
          console.log(currentVersion, latestVersion);
          if (currentVersion !== latestVersion) {
            Alert.alert(
              '앱 업데이트',
              '최신버전으로 업데이트 되었습니다.\n새로운 버전으로 업데이트 해주세요',
              [
                {
                  text: '확인',
                  onPress: async () => {
                    if (Platform.OS === 'android') {
                      handlePress(
                        GOOGLE_PLAY_STORE_LINK,
                        GOOGLE_PLAY_STORE_WEB_LINK,
                      );
                    } else {
                      handlePress(
                        APPLE_APP_STORE_LINK,
                        APPLE_APP_STORE_WEB_LINK,
                      );
                    }
                  },
                  style: 'destructive',
                },
              ],
            );
          }
        });
      };
      // getData();
    }, []),
  );
  useEffect(() => {
    const isAutoLogin = async () => {
      const isLogin = await getStorage('isLogin');

      if (isLogin !== 'false') {
        const token = await getStorage('token');

        setLoginLoading(false);
        if (token) {
          const getToken = JSON.parse(token);
          if (getToken?.accessToken) {
            const res = await autoLogin();

            if (res?.statusCode === 200) {
               const token = await messaging().getToken();

               if (token) {
                 saveFcmToken({
                   token: token,
                 });
               }

              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAME,
                  },
                ],
              });
            }
          }
        }
      } else {
        setLoginLoading(false);
      }
    };

    setLoginLoading(true);
    isAutoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        if (Platform.OS === 'ios') {
          // ios의 경우 필수가 아니라고도 하고 필수라고도 하고.. 그냥 넣어버렸다.
          messaging().registerDeviceForRemoteMessages();
        }
      }
    }
    requestUserPermission();
  }, []);
  // if(isLoginLoading){
  //   return<ActivityIndicator size="large" />
  // }
  return (
    <SafeView>
      <WrapperBox>
        <BarWrap>
          <Icons>
            <CsIconPress
              onPress={() => {
                navigation.navigate(FAQListPageName);
              }}>
              <CsIcon />
            </CsIconPress>
          </Icons>
        </BarWrap>
        <LoginContainer>
          <LogoBox>
            {/* <Image imagePath={LogoImage} scale={1.0}/> */}

            <LogoImageSvg />
          </LogoBox>
          <BackgroundImageBox source={LogoBackground} resizeMode="cover" />
          <LoginMain />

          <EtcSNSContainer>
            <HorizonLine text={`그외 SNS로 로그인`} />

            {/* <Text style={{flex:1 ,textAlign:'center'}} >───── 그외 SNS로 로그인 ─────</Text> */}
            <EtcSNSBox>
              <ButtonRoundSns
                type_sns="kakao"
                size={32}
                onPressEvent={kakaoLogin}
              />
              <ButtonRoundSns
                type_sns="naver"
                size={32}
                onPressEvent={naverLogin}
              />
              <ButtonRoundSns
                type_sns="google"
                size={32}
                onPressEvent={googleLogin}
              />
              <ButtonRoundSns
                type_sns="facebook"
                size={32}
                onPressEvent={facebookLogin}
              />
              <ButtonRoundSns
                type_sns="apple"
                size={32}
                onPressEvent={appleLogin}
              />
            </EtcSNSBox>
          </EtcSNSContainer>
          <Pressable
            onPress={async () => {
              const res = await login('', true);
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAME,
                  },
                ],
              });
            }}>
            <WindowShopping>로그인 하지 않고 둘러보기</WindowShopping>
          </Pressable>
        </LoginContainer>
        <toast.ToastWrap message={'뒤로버튼 한번 더 누르시면 종료됩니다.'} />
      </WrapperBox>
    </SafeView>
  );
};
const SafeView = styled.View`
  flex: 1;
  background-color: white;
`;
const WrapperBox = styled(Wrapper)`
  flex: 1;
  background-color: '#fff';
`;

const BackgroundImageBox = styled.Image`
  margin-left: 78.5px;
  margin-right: 78.5px;
  margin-bottom: 11%;
`;
const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 59px;
  //padding-top: 20%;
`;
const LogoBox = styled.View`
  margin-bottom: 15px;
`;
const WindowShopping = styled.Text`
  /* 로그인 하지 않고 둘러보기 */
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  /* identical to box height, or 140% */
  text-align: right;
  text-decoration-line: underline;
  /* grey 5 */
  color: #bdbac1;
  margin-top: 24px;
`;

const EtcSNSContainer = styled.View`
  margin: 0px 24px 0px 24px;
  padding-top: 40px;
`;
const EtcSNSBox = styled.View`
  justify-content: center;
  flex-direction: row;
`;

export default Pages;
const BarDisplay = css`
  flex-direction: row;
  justify-content: flex-end;
`;
const BarWrap = styled.View`
  ${BarDisplay};
  display: flex;
  margin: 34px 0px;
  padding: 0px 24px;
  align-items: center;
`;
const Icons = styled.View`
  ${BarDisplay};
  //width: 68px;
  margin-top: 12px;
  margin-right: -6px;
`;
const CsIconPress = styled.Pressable`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;
