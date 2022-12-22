/* eslint-disable react-native/no-inline-styles */
import { login, logout, getProfile as getKakaoProfile, unlink } from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import { useNavigation } from '@react-navigation/native';
import React ,{useState} from 'react';
import { Alert } from 'react-native';
import {View, StyleSheet} from 'react-native';

import Balloon from '../../../../../components/Balloon'
import ButtonSns from '../../../../../components/ButtonSns';
import {PAGE_NAME as LoginPage} from '../../EmailLogin';
import {PAGE_NAME as SignUpPage} from '../../SignUp';
export const PAGE_NAME = 'P_LOGIN__MODAL__MAIN_LOGIN';

const consumerKey = 'P2W9Zz6uKFyGPmuUfChT';
const consumerSecret = 'ac256jv8OZ';
const appName = 'kurrant';
const serviceUrlScheme = 'kurrant-naver';

const Pages = () => {

  const navigation = useNavigation();
  const handleLoginPress = () => {
    navigation.navigate(LoginPage ?? '');
  };
  const handleEmailPress = () => {
    navigation.navigate(SignUpPage ?? '');
  };
  const [success, setSuccessResponse] = useState();
  const [failure, setFailureResponse] = useState();
  const [getProfileRes, setGetProfileRes] = useState();
  const [result, setResult] = useState('');
  const balloon = Balloon();
  const naverLogin = async () => {
    console.log('로그인')
    const {successResponse,failureResponse} = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
    });
    if(successResponse){
      console.log(successResponse);
      Alert.alert(
        "로그인 성공",
        successResponse.accessToken,
          [
              {
                  text: "확인",
                  onPress: () => { },
                  style: "cancel",
    
                },
          ],
      )
    }else if(failureResponse){
      Alert.alert(
        "로그인 실패",
        failureResponse.message,
          [
              {
                  text: "확인",
                  onPress: () => { },
                  style: "cancel",
    
                },
          ],
      )
    }
    setSuccessResponse(successResponse);
    setFailureResponse(failureResponse);
  };

  const getProfile = async () => {
    try {
      const profileResult = await NaverLogin.getProfile(success?.accessToken);
      console.log(profileResult)
      setGetProfileRes(profileResult);
    } catch (e) {
      setGetProfileRes(undefined);
    }
  };

  const signInWithKakao = async () => {
    const token = await login();
    
    setResult(JSON.stringify(token));
    console.log(JSON.stringify(token))
  };
  
  const signOutWithKakao = async () => {
    const message = await logout();
  
    setResult(message);
  };
  
  const getKakaoProfile = async () => {
    const profile = await getProfile();
  
    setResult(JSON.stringify(profile));
  };
  
  const unlinkKakao = async () => {
    const message = await unlink();
  
    setResult(message);
  };
  // useEffect(()=>{
  //   fetch('https://nid.naver.com/oauth2.0/authorize')
  // },[])
  return (
    <View style={styles.container}>
      
      {/* <FormProvider {...form}>
        <Login />
      </FormProvider> */}
      <View style={styles.SNSContainer}>
        <balloon.BalloonWrap /> 
        <ButtonSns type_sns="kakao" onPressEvent={signInWithKakao} />
        <ButtonSns type_sns="naver" onPressEvent={naverLogin} />
        <View style={styles.buttonContainer}>
          <View style={{...styles.buttonBox, marginRight:3.5}}>
            <ButtonSns type_sns="email" onPressEvent={handleEmailPress} />
          </View>
          <View style={{...styles.buttonBox, marginLeft:3.5}}>
            <ButtonSns type_sns="login" onPressEvent={handleLoginPress}/>
          </View>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  SNSContainer: {
    paddingLeft:48,
    paddingRight:48,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'center',
  },
  buttonBox: {
    flex:1,
    justifyContent: 'center',
  },
});

export default Pages;
