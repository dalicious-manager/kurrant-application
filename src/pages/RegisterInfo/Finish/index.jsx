import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';

export const PAGE_NAME = 'P__REGISTER_INFO_FINISH';

const Pages = () => {
  const navigation = useNavigation();

  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);

  useEffect(() => {
    console.log(finalRegister);
  }, [finalRegister]);

  const handlePress = () => {
    console.log('마무리');
    // navigation.navigate(RegisterInfoPage2PageName);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <Text>정보입력이 완료됬어요!</Text>

      <ButtonNext
        size="full"
        label="확인"
        text={'BottomButtonSB'}
        // disabled={!clickAvaliable}
        onPressEvent={() => {
          handlePress();
        }}
      />
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  padding: 35px 20px;
  align-items: center;
  justify-content: space-between;
`;

const ButtonNext = styled(Button)`
  /* position: absolute; */
  /* bottom: 35px; */
`;
