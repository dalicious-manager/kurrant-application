import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

import {isLoginLoadingAtom} from '../../../../biz/useAuth/store';
import Login from '../../../../components/Login';
import Wrapper from '../../../../components/Wrapper';

export const PAGE_NAME = 'P_LOGIN__MODAL__MAIN_EMAIL_LOGIN';

const Pages = ({route}) => {
  const {params} = route;
  const [isPassword, setPassword] = useState(params?.isPassword || false);

  const [isLoginLoading] = useAtom(isLoginLoadingAtom);
  const form = useForm({
    mode: 'all',
  });

  if (isLoginLoading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <WrapperBox>
      <FormProvider {...form}>
        <Login
          userId={params?.userId && params.userId}
          isPassword={isPassword && isPassword}
          setPassword={setPassword}
        />
      </FormProvider>
    </WrapperBox>
  );
};

const WrapperBox = styled(Wrapper)`
  flex: 1;
  background-color: '#fff';
`;

export default Pages;
