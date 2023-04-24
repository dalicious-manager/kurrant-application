import {Dimensions, Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';
import Image from '~components/Image';
import Typography from '~components/Typography';

import {RegisterComplete} from '~assets/images/RegisterInfo/RegisterComplete.png';

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

  console.log(Dimensions.get('screen').height);

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <FlexFiller flex={98} bgColor={'#827070'} />

      <Wrap2>
        <VegiInfoImg
          source={require('../../../assets/images/RegisterInfo/RegisterComplete.png')}
          resizeMode="contain"
        />

        <Text1>정보입력이 완료됬어요!</Text1>
        <Text2>입력하신 정보를 바탕으로</Text2>
        <Text2>더 정확한 추천을 받아 볼 수 있어요</Text2>
        <Text3>(멤버십 가입 필요)</Text3>
      </Wrap2>

      <FlexFiller flex={331} bgColor={'#827070'} />

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
  padding: 0px 24px;
  align-items: center;

  background-color: #ffffff;
  /* background-color: #ba4444; */
  flex-direction: column;
`;

const FlexFiller = styled.View`
  flex: ${({flex}) => flex};
  /* background-color: ${({bgColor}) => bgColor}; */
  background-color: '#ffffff';
`;

const Wrap2 = styled.View`
  /* height: ${() => `${Dimensions.get('screen').height * (315 * 812)}px`}; */

  flex: 315;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonNext = styled(Button)`
  position: absolute;
  /* position: relative; */
  bottom: 35px;
`;

const VegiInfoImg = styled.Image`
  width: ${() => `${Dimensions.get('screen').width * (185 / 375)}px`};
  height: ${() =>
    `${Dimensions.get('screen').width * (185 / 375) * (204 / 185)}px`};
`;

const ImageWrap = styled.View`
  width: 120px;
  height: 120px;
  margin: auto;
`;

const Text1 = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 10px;
`;
const Text2 = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-bottom: 6px;
`;
const Text3 = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.purple[500]};
`;
