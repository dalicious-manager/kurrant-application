/* eslint-disable react-native/no-inline-styles */

import { useNavigation } from '@react-navigation/native';
import React ,{useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Balloon from '../../../../../components/Balloon'
import ButtonSns from '../../../../../components/ButtonSns';
import snsLogin from '../../../../../utils/snsLogin';
import {PAGE_NAME as LoginPage} from '../../EmailLogin';
import {PAGE_NAME as SignUpPage} from '../../SignUp';
export const PAGE_NAME = 'P_LOGIN__MODAL__MAIN_LOGIN';


const Pages = () => {

  const navigation = useNavigation();
  const handleLoginPress = () => {
    navigation.navigate(LoginPage ?? '');
  };
  const handleEmailPress = () => {
    navigation.navigate(SignUpPage ?? '');
  };  
  const {naverLogin, kakaoLogin} = snsLogin();
  
  const balloon = Balloon();
  
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
        <ButtonSns type_sns="kakao" onPressEvent={kakaoLogin} />
        <ButtonSns type_sns="naver" onPressEvent={naverLogin} />
        <View style={styles.buttonContainer}>
          <View style={{...styles.buttonBox, marginRight:3.5}}>
            <ButtonSns type_sns="email" onPressEvent={handleEmailPress} />
          </View>
          <View style={{...styles.buttonBox, marginLeft:3.5}}>
            <ButtonSns type_sns="login" onPressEvent={handleLoginPress} />
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
