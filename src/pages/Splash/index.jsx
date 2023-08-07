/* eslint-disable react-hooks/exhaustive-deps */
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {requestNotifications, RESULTS} from 'react-native-permissions';
import styled from 'styled-components/native';

import {CompanyLogo, SplashLogo, Kurrant} from '../../assets';
import useAuth from '../../biz/useAuth/hook';
import {SCREEN_NAME as MainScreenName} from '../../screens/Main/Bnb';
import {getStorage} from '../../utils/asyncStorage';
import {PAGE_NAME as LoginPageName} from '../Main/Login/Login';
import {PAGE_NAME as nicknameSettingPageName} from '../Main/MyPage/Nickname/index';
export const PAGE_NAME = 'P__SPLASH';

export const YesYes = 'yes';

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
  const checkPermission = async () => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          getToken();
        } else {
          requestPermission();
        }
      })
      .catch(error => {
        console.log('error checking permisions ' + error);
      });
  };

  //2
  const requestPermission = () => {
    messaging()
      .requestPermission()
      .then(() => {
        getToken();
      })
      .catch(error => {
        console.log('permission rejected ' + error);
      });
  };

  //3
  const getToken = () => {
    messaging()
      .getToken()

      .then(token => {
        // if (token) {
        //   saveFcmToken({
        //     token: token,
        //   });
        // }
      })
      .catch(() => {
        // console.log('error getting push token ' + error);
      });
  };

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

        await checkPermission();
        await isAutoLogin();
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
          const getToken = JSON.parse(token);
          if (getToken?.accessToken) {
            const res = await autoLogin();

            if (res?.statusCode === 200) {
              // await isTester();
              console.log(res.data.hasNickname, 'dd');
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

    async function requestUserPermission() {
      await messaging().deleteToken();
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      console.log(enabled);
      if (enabled) {
        console.log('Authorization status:', authStatus);
        if (Platform.OS === 'ios') {
          // ios의 경우 필수가 아니라고도 하고 필수라고도 하고.. 그냥 넣어버렸다.
          messaging().registerDeviceForRemoteMessages();
        }
      }
    }
    requestUserPermission();
    const requestNotificationPermission = async () => {
      await requestNotifications([
        'alert',
        'badge',
        'sound',
        'providesAppSettings',
      ]).then(({status, settings}) => {
        if (status === RESULTS.BLOCKED) {
          console.log(settings, 'notificationCenter');
          // openSettings().catch(() => console.warn('cannot open settings'));
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
    requestNotificationPermission();
    handlePress();
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
