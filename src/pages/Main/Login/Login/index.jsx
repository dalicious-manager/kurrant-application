/* eslint-disable import/order */
import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Platform,
  Pressable,
  Linking,
} from 'react-native';
import Config from 'react-native-config';
import {Settings} from 'react-native-fbsdk-next';
import VersionCheck from 'react-native-version-check';
import styled, {css} from 'styled-components/native';
import {v4 as uuid} from 'uuid';

import LoginMain from './LoginMain';
import {LogoBackground} from '../../../../assets';
import CsIcon from '../../../../assets/icons/Home/cs.svg';
import ButtonRoundSns from '../../../../components/ButtonRoundSns';
import HorizonLine from '../../../../components/HorizonLine';
import Toast from '../../../../components/Toast';
import Wrapper from '../../../../components/Wrapper';
import {SCREEN_NAME} from '../../../../screens/Main/Bnb';
import {getStorage} from '../../../../utils/asyncStorage';
import snsLogin from '../../../../utils/snsLogin';

import 'react-native-get-random-values';

import LogoImageSvg from '../../../../assets/icons/Logo.svg';
import useAuth from '../../../../biz/useAuth';
import {PAGE_NAME as FAQListPageName} from '../../MyPage/FAQ';

export const PAGE_NAME = 'P_LOGIN__MAIN_LOGIN';

const rawNonce = uuid();
const state = uuid();

const screenHeight = Dimensions.get('screen').height;

const Pages = ({route}) => {
  const params = route?.params;
  const navigation = useNavigation();
  const toast = Toast();

  const [lastLogin, setLastLogin] = useState();

  const {googleLogin, appleLogin, facebookLogin, kakaoLogin, naverLogin} =
    snsLogin();

  const {login} = useAuth();
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
    const getLogin = async () => {
      const last = await getStorage('lastLogin');
      if (last) setLastLogin(last);
    };
    if (!lastLogin) getLogin();
  }, [lastLogin]);
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
          <LoginMain isLast={lastLogin} />
          <EtcSNSContainer>
            <HorizonLine text={`그외 SNS로 로그인`} />

            {/* <Text style={{flex:1 ,textAlign:'center'}} >───── 그외 SNS로 로그인 ─────</Text> */}
            <EtcSNSBox>
              <ButtonRoundSns
                type_sns="kakao"
                size={32}
                isLast={lastLogin === 'KAKAO'}
                onPressEvent={kakaoLogin}
              />
              <ButtonRoundSns
                type_sns="naver"
                size={32}
                isLast={lastLogin === 'NAVER'}
                onPressEvent={naverLogin}
              />
              <ButtonRoundSns
                type_sns="google"
                size={32}
                isLast={lastLogin === 'GOOGLE'}
                onPressEvent={googleLogin}
              />
              <ButtonRoundSns
                type_sns="facebook"
                size={32}
                isLast={lastLogin === 'FACEBOOK'}
                onPressEvent={facebookLogin}
              />
              <ButtonRoundSns
                type_sns="apple"
                size={32}
                isLast={lastLogin === 'APPLE'}
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
