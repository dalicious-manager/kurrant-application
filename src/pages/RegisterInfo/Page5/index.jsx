import {Text} from 'react-native';
import styled from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage6PageName} from '../Page6';
import Typography from '~components/Typography';
import YesOrNoButton from '../components/button/YesOrNoButton/YesOrNoButton';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE5';

const Pages = () => {
  //   const [clickAvaliable, setClickAvaliable] = useState(false);

  const navigation = useNavigation();

  // yes: 1 no: 2
  const [yesOrNo, setYesOrNo] = useState(0);

  const handlePress = () => {
    console.log('ㅗㅑ');
    navigation.navigate(RegisterInfoPage6PageName);
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <ProgressBar progress={5} />

        <TitleWrap>
          <Title>채식 정보</Title>
          <SemiTitle>평소에 채식을 하시나요?</SemiTitle>
        </TitleWrap>

        <ButtonContainer>
          {[
            {id: 1, name: '예'},
            {id: 2, name: '아니요'},
          ].map((v, i) => {
            return (
              <YesOrNoButton
                key={i}
                data={v}
                selectedId={yesOrNo}
                setSelectedId={setYesOrNo}
              />
            );
          })}
        </ButtonContainer>
      </ScrollViewContainer>
      <ButtonNext
        size="full"
        label="다음"
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

  background-color: #ffffff;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  /* height: 90%; */
  background-color: #ffffff;
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

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonNext = styled(Button)`
  position: relative;
  bottom: 20px;
`;
