import Clipboard from '@react-native-clipboard/clipboard';
import { appleAuth,appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login ,getProfile } from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {  Alert, Platform } from 'react-native';

import useUserMe from '../../biz/useUserMe';

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
    const {snsConnect,snsDisconnect} =useUserMe();

    const snsConnectID = async (social) => {
      try {
        if(social ==='NAVER'){
          const {successResponse} = await NaverLogin.login(naverData());
          if(successResponse){
              console.log(successResponse)
              Clipboard.setString(successResponse.accessToken)
              const res = await snsConnect({
                  snsAccessToken:successResponse.accessToken,
              },'NAVER');       
              return res;   
          }
        }else if(social ==='KAKAO'){
          const token = await login();
          console.log(token.accessToken)
          const res = await snsConnect({
              snsAccessToken:token.accessToken,
          },'KAKAO');
          return res;  
        }
        else if(social ==='GOOGLE'){
          const { idToken } = await GoogleSignin.signIn();
    
          // Create a Google credential with the token
          
          const {accessToken} =await GoogleSignin.getTokens();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          await auth().signInWithCredential(googleCredential);
          const res = await snsConnect({
            snsAccessToken:accessToken,
            autoLogin:true,
          },'GOOGLE');
          return res;  
        }else if(social ==='APPLE'){
          try {
            // Start the sign-in request
            if(Platform.OS === "android"){
              const appleData = await appleAuthAndroid.signIn();
              console.log(appleData);
              await snsConnect({
                ...appleData,
              },'APPLE');
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAME,
                  },
                ],
              })
            }else{
                const appleAuthRequestResponse = await appleAuth.performRequest({
                  requestedOperation: appleAuth.Operation.LOGIN,
                  requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
                });
    
    
                // // Ensure Apple returned a user identityToken
                if (!appleAuthRequestResponse.identityToken) {
                  throw new Error('Apple Sign-In failed - no identify token returned');
                }
              
    
                // // Create a Firebase credential from the response
                const appleData = appleAuthRequestResponse;
    
                await snsConnect({
                    ...appleData,
                },'APPLE');
                avigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREEN_NAME,
                    },
                  ],
                })
              }
              } catch (error) {
                console.log("err",error.toString());
              }
        }
      } catch (error) {
        Alert.alert(
          'SNS 연결 실패',
          error.toString().replace('error: ',''),
          [
            {
              text:'확인',
              onPress:()=>{}
            }
          ]
        )
      }
      
    };

    
  const getKakaoProfile = async () => {
    const profile = await getProfile();

    return JSON.stringify(profile);
  };
    const snsDisconnectID = async (social) => {
      try {
        const res = await snsDisconnect(social)
        return res;
      } catch (error) {
        throw error
      }
     
    };
    
    
      
      
   


    return {snsConnectID,snsDisconnectID,getKakaoProfile};
};
