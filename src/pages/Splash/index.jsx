/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Animated, AppState, Linking, Platform, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {requestNotifications, RESULTS} from 'react-native-permissions';
import VersionCheck from 'react-native-version-check';
import styled from 'styled-components/native';

import {CompanyLogo, SplashLogo, Kurrant} from '../../assets';
import useAuth from '../../biz/useAuth/hook';
import {SCREEN_NAME as MainScreenName} from '../../screens/Main/Bnb';
import {getStorage} from '../../utils/asyncStorage';
import {PAGE_NAME as LoginPageName} from '../Main/Login/Login';
import {PAGE_NAME as nicknameSettingPageName} from '../Main/MyPage/Nickname/index';
export const PAGE_NAME = 'P__SPLASH';

export const YesYes = 'yes';
const GOOGLE_PLAY_STORE_LINK = 'market://details?id=com.dalicious.kurrant';
// 구글 플레이 스토어가 설치되어 있지 않을 때 웹 링크
const GOOGLE_PLAY_STORE_WEB_LINK =
  'https://play.google.com/store/apps/details?id=com.dalicious.kurrant';
// 애플 앱 스토어 링크
const APPLE_APP_STORE_LINK = 'itms-apps://itunes.apple.com/us/app/id1663407738';
// 애플 앱 스토어가 설치되어 있지 않을 때 웹 링크
const APPLE_APP_STORE_WEB_LINK = 'https://apps.apple.com/us/app/id1663407738';
const Page = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const paddingAnim = useRef(new Animated.Value(0)).current;

  const [fadeIn, setFadeIn] = useState(false);
  const [scale, setScale] = useState(81);
  const [height, setHeight] = useState(64);
  const [widthScale, setWidthScale] = useState(0);
  const [slide, setSlide] = useState(174);
  const {autoLogin} = useAuth();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const currentVersion = VersionCheck.getCurrentVersion();
  const [appState, setAppState] = useState();
  const {
    saveFcmToken,
    readableAtom: {userRole},
  } = useAuth();
  const handleStatus = e => {
    setAppState(e);
  };
  useEffect(() => {
    const listener = AppState.addEventListener('change', handleStatus);

    return () => {
      listener.remove();
    };
  }, []);
  useEffect(() => {
    setScale(
      scaleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [81, 34],
      }),
    );
    setHeight(
      scaleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [64, 24],
      }),
    );
    setWidthScale(
      widthAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [174, 174],
      }),
    );
    setSlide(
      paddingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [174, 0],
      }),
    );
  }, []);

  //3
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
  const handlePressStore = useCallback(async (url, alterUrl) => {
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

  useEffect(() => {
    const handlePress = async () => {
      try {
        Animated.timing(scaleAnim, {
          toValue: fadeIn ? 0 : 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(heightAnim, {
          toValue: fadeIn ? 0 : 1,
          duration: 300,
          useNativeDriver: false,
        }).start();

        setTimeout(() => {
          Animated.timing(widthAnim, {
            toValue: fadeIn ? 0 : 1,
            duration: 500,
            useNativeDriver: false,
          }).start();
          Animated.timing(paddingAnim, {
            toValue: fadeIn ? 0 : 1,
            duration: 500,
            useNativeDriver: false,
          }).start();
          Animated.timing(fadeAnim, {
            toValue: fadeIn ? 0 : 1,
            duration: 500,
            useNativeDriver: false,
          }).start();
        }, 300);
        setTimeout(async () => {
          await getData();
        }, 500);
        // await checkPermission();
      } catch (error) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: LoginPageName,
              },
            ],
          });
        }, 1000);
      }
    };

    const isAutoLogin = async () => {
      const isLogin = await getStorage('isLogin');

      if (isLogin !== 'false') {
        const token = await getStorage('token');

        if (token) {
          const getAccessToken = JSON.parse(token);
          if (getAccessToken?.accessToken) {
            const res = await autoLogin();
            await getToken();
            if (res?.statusCode === 200) {
              // await isTester();

              if (res.data.hasNickname) {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: MainScreenName,
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
                        from: 'auto',
                      },
                    },
                  ],
                });
              }
            }
          }
        } else {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: LoginPageName,
                },
              ],
            });
          }, 1000);
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: LoginPageName,
            },
          ],
        });
      }
    };
    const getData = async () => {
      await VersionCheck.getLatestVersion().then(async latestVersion => {
        const regex = /[^0-9]/g;
        const result = currentVersion?.replace(regex, '');
        const result2 = latestVersion?.replace(regex, '');
        console.log(Number(result), Number(result2), '버전체크');

        if (Number(result) < Number(result2)) {
          return Alert.alert(
            '앱 업데이트',
            '최신버전으로 업데이트 되었습니다.\n새로운 버전으로 업데이트 해주세요',
            [
              {
                text: '확인',
                onPress: async () => {
                  if (Platform.OS === 'android') {
                    handlePressStore(
                      GOOGLE_PLAY_STORE_LINK,
                      GOOGLE_PLAY_STORE_WEB_LINK,
                    );
                  } else {
                    handlePressStore(
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
        if (Number(result) >= Number(result2)) return await isAutoLogin();
      });
    };
    const onTokenRefreshHandler = async () => {
      try {
        const authStatus = await messaging().hasPermission();
        console.log(authStatus, 'authStatus');
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        const newToken = await messaging().getToken();
        console.log('Refreshed FCM Token:', newToken);
      } catch (error) {
        console.error('Error refreshing FCM Token:', error);
      }
    };
    async function requestUserPermission() {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, 'fcmToken');
      if (fcmToken) {
        await messaging().deleteToken();
      }
      const authStatus = await messaging().hasPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);

        if (Platform.OS === 'ios') {
          // ios의 경우 필수가 아니라고도 하고 필수라고도 하고.. 그냥 넣어버렸다.
          await messaging().registerDeviceForRemoteMessages();
        }

        console.log('test');
        messaging().onTokenRefresh(onTokenRefreshHandler);
      }
    }

    const requestNotificationPermission = async () => {
      await requestNotifications([
        'alert',
        'badge',
        'sound',
        'providesAppSettings',
      ]).then(({status, settings}) => {
        if (settings) {
          handlePress();
        }
      });
      // if (Platform.OS === 'android') {
      //   const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      //   if (status !== RESULTS.GRANTED) {
      //     const permissionStatus = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      //     console.log(permissionStatus,"status")
      //     if (permissionStatus === RESULTS.BLOCKED) {
      //       // 사용자가 알림 권한을 거부한 경우 처리할 코드 작성
      //     }
      //   }
      // }
      // if(Platform.OS === 'ios'){

      // }
    };

    // 알림 권한 요청 함수 호출
    requestUserPermission();
    requestNotificationPermission();
  }, []);
  return (
    <Container>
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <Animated.View
          style={{
            flexDirection: 'row',
            paddingLeft: slide,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              opacity: 1,
              height: scale,
              width: scale,
              alignItems: 'center',
              marginRight: 10,
            }}>
            <FastImage
              source={SplashLogo}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            opacity: fadeAnim,
            height: height,
            width: widthScale,
            alignItems: 'center',
          }}>
          <FastImage
            source={Kurrant}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      <LogoWrap>
        <FastImage
          source={CompanyLogo}
          style={{width: '100%', height: 24}}
          resizeMode="contain"
        />
      </LogoWrap>
    </Container>
  );
};
export default Page;

const Container = styled.View`
  flex: 1;
  background-color: #fdc800;
  display: flex;
  align-items: center;
`;

const LogoWrap = styled.Pressable`
  /* cursor: pointer; */
  position: absolute;
  bottom: 80px;
  width: 115px;
  justify-content: flex-end;
  /* margin-bottom: 80px; */
`;
