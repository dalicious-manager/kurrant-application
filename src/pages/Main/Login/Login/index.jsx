
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Dimensions,Platform,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { Settings ,LoginButton,AccessToken} from 'react-native-fbsdk-next';

import {LogoImage , LogoBackground, LogoImage2} from '../../../../assets';
import ButtonRoundSns from '../../../../components/ButtonRoundSns';
import HorizonLine from '../../../../components/HorizonLine';
import Image from '../../../../components/Image';
import Toast from '../../../../components/Toast';
import Wrapper from '../../../../components/Wrapper';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { SCREEN_NAME } from '../../../../screens/Main/Bnb';
import { getStorage } from '../../../../utils/asyncStorage';
import snsLogin from '../../../../utils/snsLogin';
import {
  PAGE_NAME as MembershipJoinPageName,
} from '../../../Membership/MembershipIntro';
import LoginMain from './LoginMain';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'

import LogoImageSvg from '../../../../assets/icons/Logo.svg'


export const PAGE_NAME = 'P_LOGIN__MAIN_LOGIN';

const rawNonce = uuid();
const state = uuid();


const screenHeight = Dimensions.get('screen').height;


const Pages = () => {  
 
  const navigation = useNavigation();
  const toast = Toast();
  const [isLoginLoading, setLoginLoading] = useState();
  const {googleLogin,appleLogin, facebookLogin} = snsLogin();
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      scopes:['https://www.googleapis.com/auth/user.phonenumbers.read'],
      webClientId: '872782655273-mhb2jokicsaqb99astkb4hlqr4dndf7o.apps.googleusercontent.com', 
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
    Settings.setAppID('978024843173047');
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
    if(Platform.OS === 'android'){      
      appleSignConfiguration();      
    }
    googleSigninConfigure();
    facebookConfiguration();
  },[]);
  useEffect(()=>{
    const isAutoLogin = async()=>{
      const isLogin = await getStorage('isLogin');
      if(isLogin !== 'false'){                
        const token = await getStorage('token');
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
  
  if(isLoginLoading){
    return<ActivityIndicator size="large" />
  }
  return (
    <WrapperBox>
      <BackgroundContainer>
        <ImageGradient
          colors={['rgba(255,255,255,0)','rgba(255,255,255,0)','white']}
          start={{ x: 0, y: -0.5 }}
          end={{ x: 0, y: 0.65 }}
        />
        <BackgroundImageBox source={LogoBackground} resizeMode="cover"/>
      </BackgroundContainer>
      <LoginBox>
        <LogoBox>
          {/* <Image imagePath={LogoImage} scale={1.0}/> */}
          
          
          <LogoImageSvg/>
          
        </LogoBox>
        <LoginMain />
        <TouchableOpacity onPress={()=>{
          // navigation.navigate(MembershipJoinPageName)
        }}>
          {/* <WindowShopping>로그인 하지 않고 둘러보기</WindowShopping> */}
        </TouchableOpacity>
        <EtcSNSContainer>

         <HorizonLine text={`그외 SNS로 로그인`}/>
         
          {/* <Text style={{flex:1 ,textAlign:'center'}} >───── 그외 SNS로 로그인 ─────</Text> */}
          <EtcSNSBox >
            <ButtonRoundSns type_sns='facebook' size={32} onPressEvent={facebookLogin}/>
            <ButtonRoundSns type_sns='google' size={32} onPressEvent={googleLogin}/>
            {/* <ButtonRoundSns type_sns='apple' size={32} onPressEvent={appleLogin}/> */}
          </EtcSNSBox>
        </EtcSNSContainer>
      </LoginBox>
      <toast.ToastWrap message={"뒤로버튼 한번 더 누르시면 종료됩니다."} />
    </WrapperBox>
  );
};

const WrapperBox = styled(Wrapper)`
  flex:1;
  background-color: '#fff';
`
const BackgroundContainer = styled.View`
  position: relative;
  height: ${screenHeight/2}px;
`
const LoginBox = styled.View`
  position:absolute;
  width:100%;
  top:${screenHeight/2-(317/2)}px;
  align-items: center;
  justify-content: flex-start;
`

const BackgroundImageBox = styled.Image` 
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    z-index: -1;
`;

const LogoBox = styled.View`
  margin-bottom: 40px;
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
  margin-top: 40px;
  /* grey 5 */
  color: #BDBAC1;

`
const ImageGradient = styled(LinearGradient)`
  position:absolute;
  top:0;
  left:0; 
  width:100%;
  z-index: 0;
  height: 500px;
`
const EtcSNSContainer = styled.View`
  margin: 65px 48px 0px 48px;
  flex:1;
`
const EtcSNSBox = styled.View`
  flex:1;
  justify-content: center;
  flex-direction: row;
`

export default Pages;
