/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/order */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import Animateds from 'react-native-reanimated';
import styled, {css} from 'styled-components/native';

import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import Typography from '../../../../../components/Typography';
// import TossPayment from 'react-native-toss-payments';

import BuyMealPage from '../components/BuyMealPage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const AnimatedPagerView = Animateds.createAnimatedComponent(PagerView);

const Pages = ({route}) => {
  const params = route.params;
  const {
    isDiningTypes,
    isMorningFood,
    isLunchFood,
    isDinnerFood,
    setMorning,
    setLunch,
    setDinner,
    setDiningTypes,
    isDailyFoodLoading,
  } = useFoodDaily();

  // const {mutateAsync: addMeal, isLoading: isAddMeal} = useAddShoppingBasket();
  const {data: isUserInfo, refetch: userRefetch} = useGetUserInfo();
  const [userinfo, setUserInfo] = useState();
  // console.log(userRole);
  // const {
  //   data: dailyfoodData,
  //   refetch: dailyfoodRefetch,
  //   isFetching: dailyFetching,
  // } = useGetDailyfood(spotId, params?.date ? params.date : date, userRole);
  useEffect(() => {
    if (isUserInfo) {
      setUserInfo(isUserInfo?.data);
    } else {
      if (!userinfo) userRefetch();
    }
  }, [isUserInfo]);
  const OuterViewPager = () => {
    return (
      <PagerView style={{flex: 1}}>
        <View>
          <Text>tetset11</Text>
        </View>
        <InnerViewPager />
        <View>
          <Text>tetset11</Text>
        </View>
      </PagerView>
    );
  };

  const InnerViewPager = () => {
    console.log('test');
    return (
      <Pager style={{flex: 1}}>
        <GestureHandlerRootView>
          <BuyMealPage
            diningFood={isMorningFood}
            mealData={{
              isMorningFood: isMorningFood,
              isLunchFood: isLunchFood,
              isDinnerFood: isDinnerFood,
              spotId: 93,
            }}
          />
        </GestureHandlerRootView>
        <GestureHandlerRootView>
          <BuyMealPage
            diningFood={isLunchFood}
            mealData={{
              isMorningFood: isMorningFood,
              isLunchFood: isLunchFood,
              isDinnerFood: isDinnerFood,
              spotId: 93,
            }}
          />
        </GestureHandlerRootView>
        <GestureHandlerRootView>
          <BuyMealPage
            diningFood={isDinnerFood}
            mealData={{
              isMorningFood: isMorningFood,
              isLunchFood: isLunchFood,
              isDinnerFood: isDinnerFood,
              spotId: 93,
            }}
          />
        </GestureHandlerRootView>
      </Pager>
    );
  };
  return (
    <SafeView>
      <OuterViewPager />
    </SafeView>
  );
};
const styles = StyleSheet.create({
  trackStyle: {
    backgroundColor: 'white',
    width: 92,
    height: 2,
  },
  thumbStyle: {
    width: 16,
    height: 1.5,
    borderRadius: 10,
    backgroundColor: '#343337',
  },
});

export default Pages;

const SafeView = styled.View`
  background-color: ${props => props.theme.colors.grey[0]};
  flex: 1;
`;

const CalendarWrap = styled.View`
  height: 72px;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  width: 100%;
`;
const LoadingPage = styled.View`
  background-color: white;
  opacity: 0.5;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  flex: 1;
  padding-bottom: 150px;
`;

const SupportPriceInfoWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const PagerViewWrap = styled.View`
  flex: 1;
`;
const StatusWrap = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: ${({showSupportPrice}) =>
    showSupportPrice ? '1px' : '6px'};
`;
const ProgressWrap = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 13px;
  height: 48px;
  width: 142px;
`;

const TimeWrap = styled.FlatList`
  flex-direction: row;
  overflow: hidden;
  flex: 1;
  padding: 13px 0px;
`;
const TimeBox = styled.Pressable`
  padding: 1px 8px;
  margin-right: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme, isSelect}) =>
    isSelect ? theme.colors.grey[2] : theme.colors.grey[8]};
`;
const TimeBoxlast = styled.Pressable`
  padding: 1px 8px;
  margin-right: 100px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme, isSelect}) =>
    isSelect ? theme.colors.grey[2] : theme.colors.grey[8]};
`;
const MiniWrap = styled.Pressable`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
  height: 48px;
  border: 0.5px solid ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: 6px;
  border-radius: 7px;
`;

const QuestionPressable = styled.Pressable`
  margin-right: 3px;
`;

const Typography22 = styled(Typography).attrs({text: 'Body06R'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[4]};
`;

const Typography3 = styled(Typography).attrs({text: 'Body05SB'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[2]};

  font-weight: 600;
`;

const Progress = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Pager = styled(AnimatedPagerView)`
  flex: 1;
`;

const ButtonWrap = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  padding: 0px 48px;
  padding-top: 20px;
  width: 100%;
  height: 100px;
  justify-content: flex-start;
`;
const HeaderWrap = styled(LinearGradient)`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 48px;
  width: 48px;
  z-index: 1;
`;
export const MakersName = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[4]};
`;

export const MealName = styled(Typography).attrs({text: 'Body05SB'})`
  white-space: nowrap;
  word-break: nowrap;
  text-overflow: ellipsis;
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[2]};
`;

const ProgressText = styled(Typography).attrs({text: 'Button09SB'})`
  color: ${({theme, type}) =>
    type ? theme.colors.grey[2] : theme.colors.grey[7]};
  margin-bottom: 11.5px;
`;

const Typography4 = styled(Typography).attrs({text: 'Body05SB'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[2]};
  font-size: 14px;
  font-weight: 600;
`;

const DiningPress = styled.Pressable`
  align-items: center;

  ${({index}) => {
    if (index === 1) {
      return css`
        margin-left: 12px;
        margin-right: 12px;
      `;
    }
  }}
`;
const SelectLine = styled.View`
  width: 16px;
  height: 1.5px;
  background-color: ${({theme}) => theme.colors.grey[2]};
`;
