import { appleAuth } from '@invertase/react-native-apple-authentication';
import Clipboard from '@react-native-clipboard/clipboard';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
            // console.log(successResponse)
            // Clipboard.setString(successResponse.accessToken)
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
    
      const googleLogin = async ()=>{
        try {
          // Check if your device supports Google Play
          // Get the users ID token
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // Get the users ID token
          const { idToken,user ,serverAuthCode} = await GoogleSignin.signIn();
        
          // Create a Google credential with the token
          const test = await GoogleSignin.getCurrentUser()
          
          const {accessToken} =await GoogleSignin.getTokens();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          console.log(idToken);
          console.log(accessToken);
          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
        } catch (error) {
          console.log("err",error.toString());
        }
        
      }
      const appleLogin  = async() =>{
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
      
        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }
      
        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        console.log(appleCredential)
        // Sign the user in with the credential
        return auth().signInWithCredential(appleCredential);
      }
    
      const kakaoLogin = async () => {
        const token = await login();
        Clipboard.setString(token.accessToken);
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
      
      


    return {naverLogin,kakaoLogin,googleLogin,appleLogin};
};
