import Clipboard from '@react-native-clipboard/clipboard';
import { login, logout, getProfile as getKakaoProfile, unlink } from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import { useNavigation } from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import { Alert, Platform } from 'react-native';

import useAuth from '../../biz/useAuth';
import { SCREEN_NAME } from '../../screens/Main/Bnb';

const naverData = ()=>{
    const data = {
        consumerKey : 'P2W9Zz6uKFyGPmuUfChT',
        consumerSecret : 'ac256jv8OZ',
        appName :'kurrant',
    }
    if(Platform.OS  === 'ios'){
      return{
        ...data,
        serviceUrlScheme : 'kurrant-naver',
      }
    }
    return data;
  }
export default () => {
    const {snsLogin} =useAuth();
    const navigation = useNavigation();
    const naverLogin = async () => {
        console.log('로그인')
        const {successResponse} = await NaverLogin.login(naverData());
        if(successResponse){
            Clipboard.setString(successResponse.accessToken)
            await snsLogin({
                snsAccessToken:successResponse.accessToken,
                autoLogin:true,
            },'NAVER');
            navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAME,
                  },
                ],
              })
        }
      };
    

    
      const kakaoLogin = async () => {
        const token = await login();
        // Clipboard.setString(token.accessToken);
        console.log(token.accessToken)
        await snsLogin({
            snsAccessToken:token.accessToken,
            autoLogin:true,
        },'KAKAO');
        navigation.reset({
            index: 0,
            routes: [
              {
                name: SCREEN_NAME,
              },
            ],
          })
      };
      
   


    return {naverLogin,kakaoLogin};
};
