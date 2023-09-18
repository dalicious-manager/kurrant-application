/* eslint-disable import/order */
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import Clipboard from '@react-native-clipboard/clipboard';
import auth, {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {login} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {useNavigation} from '@react-navigation/native';
import {el} from 'date-fns/locale';
import jwtDecode from 'jwt-decode';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';

import useAuth from '../../biz/useAuth';
import {SCREEN_NAME} from '../../screens/Main/Bnb';

import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import {PAGE_NAME as AppleLoginPageName} from '../../pages/Main/Login/AppleSignup';
import {PAGE_NAME as nicknameSettingPageName} from '../../pages/Main/MyPage/Nickname/index';
import Config from 'react-native-config';

const nonce = uuid();

const naverData = () => {
  const data = {
    consumerKey: Config.NAVER_COSTOMER_KEY,
    consumerSecret: Config.NAVER_SECRET_KEY,
    appName: 'kurrant',
  };
  if (Platform.OS === 'ios') {
    return {
      ...data,
      serviceUrlScheme: 'kurrant-naver',
    };
  }
  return data;
};
export default () => {
  const {snsLogin, snsAppleLogin, saveFcmToken} = useAuth();
  const getToken = async () => {
    messaging()
      .getToken()
      .then(token => {
        if (token) {
          saveFcmToken({
            token: token,
          });
        }
      })
      .catch(error => {
        console.log('error getting push token ' + error);
      });
  };
  const loginComplatePageMove = res => {
    try {
      if (res?.data?.accessToken) {
        getToken();
      }
      if (res.data.hasNickname) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: SCREEN_NAME,
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: nicknameSettingPageName,
              params: {
                from: 'sns',
              },
            },
          ],
        });
      }
    } catch (error) {
      Alert.alert('FCM 토큰 에러', error.toString().replace('error: ', ''));
    }
  };
  const navigation = useNavigation();
  const naverLogin = async () => {
    // console.log('로그인')
    try {
      const {successResponse, failureResponse} = await NaverLogin.login(
        naverData(),
      );

      if (successResponse) {
        // console.log(successResponse)
        // Clipboard.setString(successResponse.accessToken)
        // const data = await NaverLogin.getProfile(successResponse.accessToken);
        // console.log(data);
        const res = await snsLogin(
          {
            snsAccessToken: successResponse.accessToken,
            autoLogin: true,
          },
          'NAVER',
        );
        loginComplatePageMove(res);
      } else {
        // console.log(failureResponse);
      }
    } catch (error) {
      Alert.alert('네이버 로그인 에러', error.toString());
    }
  };

  const googleLogin = async () => {
    try {
      // Get the users ID token
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken, scopes} = await GoogleSignin.signIn();

      // Create a Google credential with the token

      const {accessToken} = await GoogleSignin.getTokens();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // console.log(scopes);
      // console.log(accessToken);
      // Clipboard.setString(accessToken)
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      const res = await snsLogin(
        {
          snsAccessToken: accessToken,
          autoLogin: true,
        },
        'GOOGLE',
      );

      loginComplatePageMove(res);
    } catch (error) {
      // console.log('err', error.toString());
    }
  };
  const appleLogin = async (name = '') => {
    try {
      // Start the sign-in request
      if (Platform.OS === 'android') {
        const test = await appleAuthAndroid.signIn();
        // Clipboard.setString(test.id_token);
        // console.log(test)
        const {email} = jwtDecode(test.id_token);
        if (!email)
          throw new Error(
            '이메일을 가져올수 없습니다.\n핸드폰을 재부팅 하시고 이후 문제가 해결되지않는다면 고객센터로 문의 주세요',
          );
        // const appleCredential = firebase.auth.AppleAuthProvider.credential(test.id_token, test.nonce);
        // const userCredential = await firebase.auth().signInWithCredential(appleCredential);
        const res = await snsAppleLogin(
          {
            ...test,
            autoLogin: true,
          },
          'APPLE',
        );
        loginComplatePageMove(res);
      } else {
        // await appleAuth.onCredentialRevoked(async () => {
        //   console.warn('If this function executes, User Credentials have been Revoked');
        // });
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // console.log(appleAuthRequestResponse)
        // // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }
        const {email} = jwtDecode(appleAuthRequestResponse.identityToken);
        if (!email)
          throw new Error(
            '이메일을 가져올수 없습니다.\n핸드폰을 재부팅 하시고 이후 문제가 해결되지않는다면 고객센터로 문의 주세요',
          );

        const appleCredential = firebase.auth.AppleAuthProvider.credential(
          appleAuthRequestResponse.identityToken,
          appleAuthRequestResponse.nonce,
        );
        const userCredential = await firebase
          .auth()
          .signInWithCredential(appleCredential);
        const appleData = appleAuthRequestResponse;

        // console.log(userCredential);
        const res = await snsAppleLogin(
          {
            ...appleData,
            autoLogin: true,
          },
          'APPLE',
        );
        if (!userCredential.additionalUserInfo.isNewUser) {
          loginComplatePageMove(res);
        } else {
          if (appleAuthRequestResponse.fullName.familyName) {
            loginComplatePageMove(res);
          } else {
            Alert.alert(
              '신규 유저',
              '이름을 가져올수 없습니다 이름을 등록하시겠습니까? \n이름을 등록 하지 않으면 이름없음으로 자동 등록 됩니다.',
              [
                {
                  text: '취소',
                  onPress: () => {
                    loginComplatePageMove(res);
                  },
                },
                {
                  text: '확인',
                  onPress: async () => {
                    navigation.navigate(AppleLoginPageName);
                  },
                  style: 'destructive',
                },
              ],
            );
          }
        }
      }
    } catch (error) {
      // console.log("err",error.toString());
      Alert.alert('로그인 에러', error.toString()?.replace('error: ', ''));
    }
    // const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    // // Sign the user in with the credential
    // return auth().signInWithCredential(appleCredential);
  };

  const kakaoLogin = async () => {
    const token = await login();
    // Clipboard.setString(token.accessToken);

    const res = await snsLogin(
      {
        snsAccessToken: token?.accessToken,
        autoLogin: true,
      },
      'KAKAO',
    );
    loginComplatePageMove(res);
  };
  const facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        nonce,
      );
      // console.log(result);

      if (Platform.OS === 'ios') {
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        // Clipboard.setString(result?.authenticationToken);

        const res = await snsLogin(
          {
            snsAccessToken: result?.authenticationToken,
            autoLogin: true,
          },
          'FACEBOOK',
        );
        loginComplatePageMove(res);
      } else {
        const result = await AccessToken.getCurrentAccessToken();
        // Clipboard.setString(result?.accessToken);
        const res = await snsLogin(
          {
            snsAccessToken: result?.accessToken,
            autoLogin: true,
          },
          'FACEBOOK',
        );
        loginComplatePageMove(res);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return {naverLogin, kakaoLogin, googleLogin, appleLogin, facebookLogin};
};
