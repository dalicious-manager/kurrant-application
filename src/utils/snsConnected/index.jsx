import Clipboard from '@react-native-clipboard/clipboard';
import { login } from '@react-native-seoul/kakao-login';
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
              await snsConnect({
                  snsAccessToken:successResponse.accessToken,
              },'NAVER');          
          }
        }else if(social ==='KAKAO'){
          const token = await login();
          console.log(token.accessToken)
          await snsConnect({
              snsAccessToken:token.accessToken,
          },'KAKAO');
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
    const snsDisconnectID = async (social) => {
      try {
        await snsDisconnect(social)
      } catch (error) {
        Alert.alert(
          'SNS 연결해제 실패',
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
    
    
      
      
   


    return {snsConnectID,snsDisconnectID};
};
