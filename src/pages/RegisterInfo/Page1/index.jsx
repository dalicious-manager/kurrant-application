import {Text} from 'react-native';
import styled, {css} from 'styled-components';

import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import ProgressBar from '~components/ProgressBar7';

import {PAGE_NAME as RegisterInfoPage2PageName} from '../Page2';

import {useAtom} from 'jotai';
import {finalRegisterAtom} from '../store';
import Typography from '~components/Typography';
import ButtonInput from '../components/button/Page1/ButtonInput';
import LinearGradient from 'react-native-linear-gradient';

export const PAGE_NAME = 'P__REGISTER_INFO_PAGE1';

const Pages = () => {
  const [clickAvaliable, setClickAvaliable] = useState(false);

  const [finalRegister, setFinalRegister] = useAtom(finalRegisterAtom);

  const navigation = useNavigation();

  const [page1Input, setPage1Input] = useState({});

  useEffect(() => {
    if (
      !Object.values(page1Input).includes(undefined) &&
      Object.values(page1Input).length >= 4
    ) {
      setClickAvaliable(true);
    } else {
      setClickAvaliable(false);
    }
  }, [page1Input]);

  const handlePress = () => {
    setFinalRegister({...finalRegister, ...page1Input});

    navigation.navigate(RegisterInfoPage2PageName);
  };

  const handleBreakfastCount = count => {
    setPage1Input({...page1Input, breakfastCount: count});
  };
  const handleMidnightSnackCount = count => {
    setPage1Input({...page1Input, midnightSnackCount: count});
  };
  const handleExerciseCount = count => {
    setPage1Input({...page1Input, exerciseCount: count});
  };
  const handleDrinkCount = count => {
    setPage1Input({...page1Input, drinkCount: count});
  };

  return (
    <Container
      paddingHorizontal={20}
      styles={{
        position: 'relative',
      }}>
      <ScrollViewContainer showsVerticalScrollIndicator={false}>
        <ProgressBar progress={1} />

        <TitleWrap>
          <Title>생활 정보</Title>
        </TitleWrap>

        <ButtonInput
          title={'아침식사 횟수'}
          dataList={[
            {id: 0, name: '주 0회'},
            {id: 1, name: '주 1~2회'},
            {id: 2, name: '주 3~5회'},
            {id: 3, name: '주 6~7회'},
          ]}
          callback={handleBreakfastCount}
        />
        <ButtonInput
          title={'야식 횟수'}
          dataList={[
            {id: 0, name: '주 0회'},
            {id: 1, name: '주 1~2회'},
            {id: 2, name: '주 3~5회'},
            {id: 3, name: '주 6~7회'},
          ]}
          callback={handleMidnightSnackCount}
        />
        <ButtonInput
          title={'운동 횟수(30분 이상)'}
          dataList={[
            {id: 0, name: '주 0회'},
            {id: 1, name: '주 1~2회'},
            {id: 2, name: '주 3~5회'},
            {id: 3, name: '주 6~7회'},
          ]}
          callback={handleExerciseCount}
        />
        <ButtonInput
          title={'음주 횟수'}
          dataList={[
            {id: 0, name: '주 0회'},
            {id: 1, name: '주 1~2회'},
            {id: 2, name: '주 3~5회'},
            {id: 3, name: '주 6~7회'},
          ]}
          callback={handleDrinkCount}
        />
        <Filler></Filler>
      </ScrollViewContainer>

      <ButtonWrapper
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.3)',
          'rgba(255, 255, 255, 0.7)',
          'rgba(255, 255, 255, 0.8048)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 0.95)',
        ]}>
        <ButtonNext
          size="full"
          label="다음"
          text={'BottomButtonSB'}
          disabled={!clickAvaliable}
          onPressEvent={() => {
            handlePress();
          }}
        />
      </ButtonWrapper>
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  padding: 15px 20px;
  padding-bottom: 0px;

  align-items: center;

  position: relative;

  background-color: #ffffff;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;

  background-color: #ffffff;
`;

const Filler = styled.View`
  width: 100%;
  height: 30px;
`;

const ButtonWrapper = styled(LinearGradient)`
  position: relative;
  ${() => {
    if (Platform.OS === 'ios') {
      return css`
        bottom: 35px;
      `;
    } else {
      return css`
        bottom: 24px;
      `;
    }
  }}

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonNext = styled(Button)``;

const TitleWrap = styled.View`
  width: 100%;
  margin-top: 29px;
  margin-bottom: 24px;
`;

const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
