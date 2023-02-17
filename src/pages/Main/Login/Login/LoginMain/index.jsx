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
        <View style={styles.buttonContainer}>
          <ButtonSns type_sns="login" onPressEvent={handleLoginPress} />
          <ButtonSns type_sns="email" onPressEvent={handleEmailPress} />
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  SNSContainer: {
    paddingLeft:20,
    paddingRight:20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  buttonBox: {
    flex:1,
    justifyContent: 'center',
  },
});

export default Pages;
