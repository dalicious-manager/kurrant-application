import Clipboard from '@react-native-clipboard/clipboard';
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
