import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage3PageName} from '../Page3';
import {finalRegisterAtom} from '../store';
import {useAtom} from 'jotai';
import Typography from '~components/Typography';
import ButtonContainer from '../components/button/Page2_3/ButtonContainer';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE2';

const Pages = () => {
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);

  const navigation = useNavigation();

  const [page2Input, setPage2Input] = useState([]);

  useEffect(() => {
    if (page2Input.length === 4) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [page2Input]);

  const handlePress = () => {
    console.log({
      ...finalRegister,
      favoriteCountryFood: page2Input.join(','),
    });
    setFinalRegister({
      ...finalRegister,
      favoriteCountryFood: page2Input.join(','),
    });

    navigation.navigate(RegisterInfoPage3PageName);
  };

  const handleButtonClicked = list => {
    setPage2Input([...list]);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <ProgressBar progress={2} />

        <TitleWrap>
          <Title>좋아하는 나라 음식</Title>
          <SemiTitle>최대 4개까지 선택이 가능해요</SemiTitle>
        </TitleWrap>

        <ButtonContainer
          dataList={[
            {id: 1, name: '한국'},
            {id: 2, name: '중국'},
            {id: 3, name: '인도네시아'},
            {id: 4, name: '한국'},
            {id: 5, name: '중국s'},
            {id: 6, name: '인도네아'},
            {id: 7, name: '인도sss네시아'},
            {id: 8, name: '한'},
            {id: 9, name: '중s국s'},
            {id: 10, name: '인도네아'},
          ]}
          callback={handleButtonClicked}
          selectLimit={4}
        />
      </ScrollViewContainer>

      <ButtonNext
        size="full"
        label="다음"
        text={'BottomButtonSB'}
        disabled={!clickAvaliable}
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
  background-color: #ffffff;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  /* height: 90%; */
  background-color: #ffffff;
`;

const ButtonNext = styled(Button)`
  position: relative;
  bottom: 20px;
`;

const TitleWrap = styled.View`
  width: 100%;
  margin-top: 29px;
  margin-bottom: 24px;
`;

const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;
const SemiTitle = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;
