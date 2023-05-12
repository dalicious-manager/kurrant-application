import {useEffect, useRef, useState} from 'react';
import {Platform, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import styled, {css} from 'styled-components';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';

import CalendarButton from '~components/CalendarButton';
import BuyCalendar from '~components/BuyCalendar';
import {useAtomValue} from 'jotai';
import {isUserInfoAtom} from '../../../../../biz/useUserInfo/store';
import useAuth from '../../../../../biz/useAuth/hook';

import LinearGradient from 'react-native-linear-gradient';
import Button from '~components/Button';
import {useNavigation} from '@react-navigation/native';

import {PAGE_NAME as DietRepoHistoryPageName} from '~pages/Main/Bnb/DietRepo/History';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__MAIN';

const Pages = () => {
  const navigation = useNavigation();

  const {
    readableAtom: {userRole},
  } = useAuth();

  // 유저정보에서 현재 스팟 가져오기
  const userInfo = useAtomValue(isUserInfoAtom);
  const spotId = userRole === 'ROLE_GUEST' ? 1 : userInfo?.spotId;

  // 달력 관련

  // 아마 보내야할 값들 spotId, selectedDate
  // {{host}}/v1/dailyfoods?spotId=93&selectedDate=2023-05-08

  const pager = useRef();
  const fadeAnim = useRef(new Animated.Value(32)).current;
  const [chk, setChk] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);

  const [date, setDate] = useState(formattedWeekDate(new Date()));

  const onPageScroll2 = e => {
    const {position} = e.nativeEvent;
    setChk(position);
  };

  const dayPress = async selectedDate => {
    try {
      setDate(selectedDate);
      // dailyFood(spotId,selectedDate);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // 이거 서버에서 받아와야됨 useFoodDaily()에서 isServiceDays값 확인 할 수 잇음
  const isServiceDays = {
    dinnerServiceDays: null,
    lunchServiceDays: ['월', '화', '수', '목', '금'],
    morningServiceDays: ['월', '화', '수', '목', '금'],
  };

  const daily = true;

  useEffect(() => {
    console.log('date 값');
    console.log(date);
    console.log('spotId 값');
    console.log(spotId);
  }, [date]);

  const handlePress = () => {
    navigation.navigate(DietRepoHistoryPageName);
  };

  return (
    <Container>
      <Animated.View style={{height: fadeAnim, overflow: 'hidden'}}>
        <CalendarButton pager={pager} daily chk={chk} />
      </Animated.View>
      <CalendarWrap>
        <BuyCalendar
          BooleanValue={false}
          type={'grey2'}
          color={'white'}
          size={'Body05R'}
          onPressEvent2={dayPress}
          daily={daily}
          // selectDate={date}
          selectDate={date}
          margin={'0px 28px'}
          scrollDir
          pagerRef={pager}
          onPageScroll2={onPageScroll2}
          sliderValue={sliderValue}
          isServiceDays={isServiceDays}
        />
      </CalendarWrap>
      <ScrollViewContainer
        showsVerticalScrollIndicator={false}></ScrollViewContainer>
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
          label="식사 히스토리"
          text={'BottomButtonSB'}
          // disabled={!clickAvaliable}
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
  background-color: #ffffff;
`;

const CalendarWrap = styled.View`
  height: 85px;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  width: 100%;
`;

const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  /* height: 90%; */
  background-color: #ffffff;
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
        /* bottom: 1px; */
      `;
    }
  }}

  padding:0 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonNext = styled(Button)``;
