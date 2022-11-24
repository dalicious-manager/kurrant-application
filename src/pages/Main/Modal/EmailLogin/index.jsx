import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components/native';

import Login from '../../../../components/Login';
import Wrapper from '../../../../components/Wrapper';

export const PAGE_NAME = 'P_LOGIN__MODAL__MAIN_EMAIL_LOGIN';


const Pages = ({navigation}) => {  
  const form = useForm();
  return (
    <WrapperBox>      
      <FormProvider {...form}>
        <Login />
      </FormProvider>
    </WrapperBox>
  );
};

const WrapperBox = styled(Wrapper)`
  flex:1;
  background-color: '#fff';
`


export default Pages;
