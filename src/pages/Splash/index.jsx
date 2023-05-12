import React, {useEffect, useRef, useState} from 'react';


import styled from 'styled-components/native';
import { CompanyLogo ,SplashLogo,Kurrant} from '../../assets';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import {PAGE_NAME as LoginPageName} from '../Main/Login/Login';
import { Alert, Animated, View } from 'react-native';
import {PAGE_NAME as GroupCreateMainPageName} from '../Group/GroupCreate';

import {PAGE_NAME as GroupSelectPageName} from '../Group/GroupManage';
import { SCREEN_NAME as MainScreenName } from '../../screens/Main/Bnb';

import messaging from '@react-native-firebase/messaging';
import useAuth from '../../biz/useAuth/hook';
import { getStorage } from '../../utils/asyncStorage';
import useUserInfo from '../../biz/useUserInfo/hook';
import useGroupSpots from '../../biz/useGroupSpots/hook';
import useShoppingBasket from '../../biz/useShoppingBasket/hook';
import useFoodDaily from '../../biz/useDailyFood/hook';
import { useAtom, useAtomValue } from 'jotai';
import { isCancelSpotAtom } from '../../biz/useGroupSpots/store';
import { weekAtom } from '../../biz/useBanner/store';
import { formattedWeekDate } from '../../utils/dateFormatter';

export const PAGE_NAME = 'P__SPLASH';


export const YesYes = 'yes';

const Page = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const paddingAnim = useRef(new Animated.Value(0)).current;

  const weekly = useAtomValue(weekAtom);
  const [isCancelSpot] = useAtom(isCancelSpotAtom);
  const [isLoginLoading, setLoginLoading] = useState();
  const [fadeIn, setFadeIn] = useState(false);
  const [scale, setScale] = useState(81);
  const [height, setHeight] = useState(64);
  const [widthScale, setWidthScale] = useState(0);
  const [slide, setSlide] = useState(174);
  const {userInfo} = useUserInfo();

  const {
    userGroupSpotCheck,
  } = useGroupSpots();


  const {loadMeal} = useShoppingBasket();
  const {dailyFood} = useFoodDaily();
  const {
    autoLogin,
    saveFcmToken,
    readableAtom: {userRole}
  } = useAuth();
  const navigation = useNavigation()

  

  useEffect(()=>{
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
    
  },[])
  
  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await userInfo();
        if (userData?.email) {
          if (userData?.spotId) {
             await dailyFood(
              userData?.spotId,
              formattedWeekDate(new Date()),
            );           
          }
        }
        return true;
      } catch (error) {
        Alert.alert("에러",error.toString())
        return false;
      }
    }
    const handlePress = async() => {
      
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
      
      setTimeout(()=>{
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
        
      },300)
      try {
        await isAutoLogin();
      } catch (error) {
        setTimeout(()=>{
          navigation.reset({
            index: 0,
            routes: [
              {
                name: LoginPageName,
              },
            ],
          });
        },1000)
      }
      
      
    };
    const isTester = async () => {
      const user = loadUser();

      if (!(userRole === 'ROLE_GUEST')) {
        const status = async () => {
          const userStatus = await getStorage('spotStatus');
          // const result = await todayOrderMeal(start[0], end[0]);

          const getUserStatus = Number(userStatus);
          if (getUserStatus === 1) {
            navigation.navigate(GroupSelectPageName);
          }
          if (getUserStatus === 2 && !isCancelSpot) {
            navigation.navigate(GroupCreateMainPageName);
          }
          // return result;
        };
        try {
          if (!(userRole === 'ROLE_GUEST')) {
            if (user) {
              const data = await status();

              const group = await userGroupSpotCheck();
              if (group.statusCode === 200) {
                await loadMeal();
              }
            }
          }
        } catch (error) {
          if (error.toString().replace('Error:', '').trim() === '403') {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: LoginPageName,
                },
              ],
            });
          }
        }
      }
    };
    
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
              await isTester();
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
                    name: MainScreenName,
                  },
                ],
              });
              
            }
          }
        }else{
          setTimeout(()=>{
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: LoginPageName,
                },
              ],
            });
          },1000)
      }
      } else {        
        setLoginLoading(false);
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

    setLoginLoading(true);
      handlePress();
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL || 
        authStatus === messaging.AuthorizationStatus.NOT_DETERMINED;
      console.log(enabled)
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
  return (
    <Container>
      <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
      <Animated.View style={{flexDirection:'row',paddingLeft:slide, justifyContent:'center',alignItems:'center'}}>
      <Animated.View
         style={{
            opacity:1,
            height:scale,
            width:scale,
            alignItems:'center',      
            marginRight:10      
        }}
      >      
        <FastImage 
          source={SplashLogo}
          style={{width:'100%',height:'100%'}}
          resizeMode='contain'
        />
        
      </Animated.View>
      
      </Animated.View>
        <Animated.View
          style={{
              opacity:fadeAnim,
              height:height,
              width:widthScale,
              alignItems:'center',
          }}
        >
        <FastImage 
            source={Kurrant}
            style={{width:'100%',height:'100%'}}
            resizeMode='contain'
          />
        </Animated.View>
      </View>
      <LogoWrap >
        <FastImage 
          source={CompanyLogo}
          style={{width:'100%',height:24}}
          resizeMode='contain'
        />
      </LogoWrap>      
    </Container>
  );
};
export default Page;

const Container = styled.View`
  flex:1;
  background-color: #FDC800;
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

