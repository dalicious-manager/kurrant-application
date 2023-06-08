import {useEffect, useRef, useState} from 'react';
import {FlatList, Platform, Text, Pressable} from 'react-native';
import Animated from 'react-native-reanimated';
import styled, {css} from 'styled-components';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';

import Typography from '~components/Typography';

import CalendarButton from '~components/CalendarButton';
import BuyCalendar from '~components/BuyCalendar';
import {useAtomValue} from 'jotai';
import {isUserInfoAtom} from '../../../../../biz/useUserInfo/store';
import useAuth from '../../../../../biz/useAuth/hook';

import LinearGradient from 'react-native-linear-gradient';
import Button from '~components/Button';
import {useNavigation} from '@react-navigation/native';

import {PAGE_NAME as DietRepoHistoryPageName} from '~pages/Main/Bnb/DietRepo/History';
import {PAGE_NAME as DietRepoAddDietPageName} from '~pages/Main/Bnb/DietRepo/AddDiet';
import {View} from 'react-native';
import FlatListBanner from './Components/FlatListBanner';
import DietRepoCard from './Components/DietRepoCard';
import {ArrowRightBlue} from '../../../../../components/Icon';
import DietRepoCalendar from '../DietRepoCalendar/DietRepoCalendar';
import useGetDietRepo from '../useGetDietRepo';

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
  // const fadeAnim = useRef(new Animated.Value(32)).current;
  // const [chk, setChk] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);

  const [date, setDate] = useState(formattedWeekDate(new Date()));

  // const yo = useGetDietRepo('2023-06-08', undefined, undefined);
  const yo = useGetDietRepo(undefined, '2023-05-30', 2);

  // useEffect(() => {
  //   console.log('현재 클릭된 날짜');
  //   console.log(date);
  // }, [date]);

  // const onPageScroll2 = e => {
  //   const {position} = e.nativeEvent;
  //   setChk(position);
  // };

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

  // useEffect(() => {
  //   console.log('date 값');
  //   console.log(date);
  //   console.log('spotId 값');
  //   console.log(spotId);
  // }, [date]);

  const handlePress = () => {
    navigation.navigate(DietRepoHistoryPageName);
  };

  const FlatListSampleData = [
    {
      menuTime: '아침',

      menuList: [
        {
          dailyFoodId: '',
          foodId: '',
          image: '',
          makersName: '브라운 돈까스',
          menuName: '정식 돈까스',
          calTotal: 2200,
          carbo: 40,

          protein: 40,
          fat: 40,
        },
        {
          dailyFoodId: '',
          foodId: '',
          image: '',
          makersName: '브라운 돈까스2',
          menuName: '정식 돈까스',
          calTotal: 2200,
          carbo: 40,

          protein: 40,
          fat: 40,
        },
      ],
    },

    {
      menuTime: '점심',

      menuList: [],
    },

    {
      menuTime: '저녁',

      menuList: [
        {
          dailyFoodId: '',
          foodId: '',
          image: '',
          makersName: '김치1',
          menuName: '김치무침',
          calTotal: 2000,
          carbo: 40,

          protein: 40,
          fat: 40,
        },
        {
          dailyFoodId: '',
          foodId: '',
          image: '',
          makersName: '김치 치즈크림',
          menuName: '김치 초고바',
          calTotal: 2200,
          carbo: 60,
          protein: 30,
          fat: 40,
        },
      ],
    },
  ];

  return (
    <Container>
      {/* <Animated.View style={{height: fadeAnim, overflow: 'hidden'}}>
        <CalendarButton pager={pager} daily chk={chk} />
      </Animated.View> */}
      <CalendarWrap>
        {/* <BuyCalendar
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
          // onPageScroll2={onPageScroll2}
          sliderValue={sliderValue}
          isServiceDays={isServiceDays}
        /> */}
        <DietRepoCalendar
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
          // onPageScroll2={onPageScroll2}
          sliderValue={sliderValue}
          isServiceDays={isServiceDays}
        />
      </CalendarWrap>
      {/* <ScrollViewContainer
        showsVerticalScrollIndicator={false}></ScrollViewContainer> */}
      <FlatList
        ListHeaderComponent={
          <View style={{paddingLeft: 24, paddingRight: 24}}>
            <FlatListBanner
              todayTotalCal={2200}
              nutritionList={[
                {lable: '탄수화물', amount: 400},
                {lable: '단백질', amount: 100},
                {lable: '지방', amount: 130},
              ]}
            />
          </View>
        }
        contentContainerStyle={{paddingBottom: 190}}
        data={FlatListSampleData}
        scrollEnabled={true}
        renderItem={({item}) => {
          return (
            <FlatListView style={{paddingLeft: 24, paddingRight: 24}}>
              <FlatListView2>
                <MealTimeText>{item.menuTime}</MealTimeText>

                <AddMealPressable
                  onPress={() => {
                    navigation.navigate(DietRepoAddDietPageName);
                  }}>
                  <AddMealText>식사 추가</AddMealText>
                  <ArrowRightBlue />
                </AddMealPressable>
              </FlatListView2>

              {Array.isArray(item.menuList) && item.menuList.length > 0 ? (
                <View>
                  {item.menuList.map((v, i) => {
                    return <DietRepoCard key={i} type="main" item={v} />;
                  })}
                </View>
              ) : (
                <>
                  <GreyThinLine />
                </>
              )}
            </FlatListView>
          );
        }}
      />

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

const FlatListView = styled.View`
  /* margin-top: 25px; */
`;
const FlatListView2 = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

const MealTimeText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const AddMealText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.blue[500]};
  margin-right: 4px;
`;

const AddMealPressable = styled.Pressable`
  flex-direction: row;

  align-items: center;
`;

const GreyThinLine = styled.View`
  width: 100%;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  margin-bottom: 25px;
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
