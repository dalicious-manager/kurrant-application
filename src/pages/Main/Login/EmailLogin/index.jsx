import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { isLoginLoadingAtom } from '../../../../biz/useAuth/store';
import Login from '../../../../components/Login';
import Toast from '../../../../components/Toast';
import Wrapper from '../../../../components/Wrapper';

export const PAGE_NAME = 'P_LOGIN__MODAL__MAIN_EMAIL_LOGIN';


const Pages = ({route}) => {  
  const {params} = route;
  const [isPassword,setPassword] = useState(params?.isPassword || false);
  const ToastMessage = Toast();
  const [isLoginLoading,]= useAtom(isLoginLoadingAtom)
  const form = useForm({
    mode:'all'
  });
  useEffect(()=>{
    if(isPassword){
      ToastMessage.toastEvent();
      setPassword(false);
    }
  },[ToastMessage, isPassword,setPassword])
  if(isLoginLoading){
    console.log("로그인 테스트",isLoginLoading);
    return <ActivityIndicator size="large" />
  }
  return (
    <WrapperBox>      
      <FormProvider {...form}>
        <Login userId={params?.userId && params.userId}/>
      </FormProvider>
      <ToastMessage.ToastWrap message='비밀번호가 변경됐어요' icon='checked'/>
    </WrapperBox>
  );
};

const WrapperBox = styled(Wrapper)`
  flex:1;
  background-color: '#fff';
`


export default Pages;
