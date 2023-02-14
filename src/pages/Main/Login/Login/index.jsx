
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, BackHandler, Dimensions,Platform,Pressable,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { Settings} from 'react-native-fbsdk-next';

import {LogoBackground} from '../../../../assets';
import ButtonRoundSns from '../../../../components/ButtonRoundSns';
import HorizonLine from '../../../../components/HorizonLine';
import Toast from '../../../../components/Toast';
import Wrapper from '../../../../components/Wrapper';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { SCREEN_NAME } from '../../../../screens/Main/Bnb';
import { getStorage } from '../../../../utils/asyncStorage';
import snsLogin from '../../../../utils/snsLogin';
import LoginMain from './LoginMain';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'

import LogoImageSvg from '../../../../assets/icons/Logo.svg'
import useAuth from '../../../../biz/useAuth';
import Config from 'react-native-config';
import useUserMe from '../../../../biz/useUserMe';


export const PAGE_NAME = 'P_LOGIN__MAIN_LOGIN';

const rawNonce = uuid();
const state = uuid();


const screenHeight = Dimensions.get('screen').height;


const Pages = ({route}) => {  
  const params = route?.params;
  const navigation = useNavigation();
  const toast = Toast();
  const [isLoginLoading, setLoginLoading] = useState();
  const {googleLogin,appleLogin, facebookLogin,kakaoLogin,naverLogin} = snsLogin();
  const {setSelectDefaultCard,readableAtom:{selectDefaultCard}}= useUserMe();
  const {login} = useAuth();
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      scopes:['https://www.googleapis.com/auth/user.phonenumbers.read'],
      webClientId: Config.GOOGLE_WEB_CLIENT_ID, 
    });
  }
  const appleSignConfiguration = ()=>{
    appleAuthAndroid.configure({
      clientId: 'kurrant.dalicious.io',
      redirectUri: 'https://dalicious-v1.firebaseapp.com/__/auth/handler',
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      nonce: rawNonce,
      state,
    });
  }
  const facebookConfiguration = ()=>{
    Settings.setAppID(Config.FACEBOOK_APP_ID);
    Settings.initializeSDK();
    
  }
  

  
  useEffect(()=>{       
    let timeout;
    let exitApp = false;   
     const handleBackButton = () => {
        if(navigation.isFocused()){// 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
          if (exitApp === undefined || !exitApp) {
              exitApp= true;
              toast.toastEvent();
              timeout = setTimeout(
                  () => {
                    exitApp = false;
                  },
                  2000    // 2초
              );
          } else {
              clearTimeout(timeout);
              exitApp = false; 
              BackHandler.exitApp();  // 앱 종료
          }
        }else{
          return false;
        }
        return true;
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return ()=>BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  },[ navigation, toast])
  useEffect(()=>{
    if(params?.token === "end"){
      Alert.alert("토큰만료", "토큰이 만료되었습니다 다시 로그인 해주세요.")
    }
    if(Platform.OS === 'android'){      
      appleSignConfiguration();      
    }
    googleSigninConfigure();
    facebookConfiguration();
  },[]);
  useEffect(()=>{
    const isAutoLogin = async()=>{
      const isLogin = await getStorage('isLogin');
      const userCard = await getStorage('selectCard');
      
      if(isLogin !== 'false'){                
        const token = await getStorage('token');
        if(userCard){ 
          setSelectDefaultCard(userCard);
        }
        setLoginLoading(false);
        if(token){
          const getToken = JSON.parse(token);
          if(getToken?.accessToken){
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: SCREEN_NAME,
                },
              ],
            })
          } 
        }
      }else{
        setLoginLoading(false);
      }
    }
    setLoginLoading(true);
    isAutoLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  // if(isLoginLoading){
  //   return<ActivityIndicator size="large" />
  // }
  return (
    <WrapperBox>
        <LoginContainer>
        <LogoBox>
          {/* <Image imagePath={LogoImage} scale={1.0}/> */}
          
          
          <LogoImageSvg/>
          
        </LogoBox>
        <BackgroundImageBox source={LogoBackground} resizeMode="cover"/>
        <LoginMain />
        
        <EtcSNSContainer>

         <HorizonLine text={`그외 SNS로 로그인`}/>
         
          {/* <Text style={{flex:1 ,textAlign:'center'}} >───── 그외 SNS로 로그인 ─────</Text> */}
          <EtcSNSBox >
            <ButtonRoundSns type_sns='kakao' size={32} onPressEvent={kakaoLogin}/>
            <ButtonRoundSns type_sns='naver' size={32} onPressEvent={naverLogin}/>
            <ButtonRoundSns type_sns='google' size={32} onPressEvent={googleLogin}/>
            <ButtonRoundSns type_sns='apple' size={32} onPressEvent={appleLogin}/>
            <ButtonRoundSns type_sns='facebook' size={32} onPressEvent={facebookLogin}/>
          </EtcSNSBox>
        </EtcSNSContainer>
        <Pressable onPress={async()=>{
            const res = await login("",true)
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: SCREEN_NAME,
                },
              ],
            })
          }}>
          {/* <WindowShopping>로그인 하지 않고 둘러보기</WindowShopping> */}
          </Pressable>
          </LoginContainer>
      <toast.ToastWrap message={"뒤로버튼 한번 더 누르시면 종료됩니다."} />
    </WrapperBox>
  );
};

const WrapperBox = styled(Wrapper)`
  flex:1;
  background-color: '#fff';
  
`


const BackgroundImageBox = styled.Image` 
  width: 220px;
  height: 220px;
  margin-bottom: 57px;
`;
const LoginContainer = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
  padding-bottom: 59px;
  padding-top: 141px;
`
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
  color: #BDBAC1;
  margin-top: 24px;
`

const EtcSNSContainer = styled.View`
  margin: 0px 24px 0px 24px;
  padding-top: 40px;
`
const EtcSNSBox = styled.View`
  justify-content: center;
  flex-direction: row;
`

export default Pages;
