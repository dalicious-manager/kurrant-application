import React, {useEffect} from 'react';

import Typography from '~components/Typography';

import styled from 'styled-components/native';
import { CompanyLogo } from '../../assets';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import {PAGE_NAME as LoginPageName} from '../Main/Login/Login';

export const PAGE_NAME = 'P__SPLASH';


export const YesYes = 'yes';

const Page = () => {
  const navigation = useNavigation()
  useEffect(()=>{
    setTimeout(()=>{
      // navigation.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: LoginPageName,
      //     },       
      //   ],
      // });
    },3000)
   
  },[])
  return (
    <Container>

    
      <LogoWrap>
        <FastImage 
          source={CompanyLogo}
          style={{width:'100%',height:24}}
          resizeMode='contain'
        />
      </LogoWrap>      
    </Container>
  );
};
export default Page;

const Container = styled.View`
  flex:1;
  background-color: #FDC800;
  display: flex;
  align-items: center;
`;

const LogoWrap = styled.View`
  flex: 4;
  width: 115px;
  justify-content: flex-end;
  margin-bottom: 80px;
`;

