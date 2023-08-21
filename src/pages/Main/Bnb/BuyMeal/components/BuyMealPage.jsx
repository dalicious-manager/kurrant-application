/* eslint-disable react-native/no-inline-styles */
import {useAtom} from 'jotai';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {css} from 'styled-components/native';
import Typography from '~components/Typography';

import Card from './Card';
import ExclamationPoint from '../../../../../assets/icons/BuyMeal/exclamationPoint.svg';
import {isUserInfoAtom} from '../../../../../biz/useUserInfo/store';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';

const screenHeight = Dimensions.get('window').height;

const BuyMealPage = props => {
  const {
    item,
    setDailyfoodId,
    isAddMeal,
    detailFetching,
    time,
    orderDailyFoodId,
    cartDailyFoodId,
    userinfo,
    addCartPress,
    navigation,
  } = props;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      scrollEnabled={
        !(item?.dailyFoodDtos?.length === 0 && userinfo?.spotId !== null) ||
        !userinfo?.spotId === null
      }>
      <FoodContainer
        isFood={item?.dailyFoodDtos?.length === 0 && userinfo?.spotId !== null}>
        {item?.dailyFoodDtos?.length === 0 && userinfo?.spotId !== null && (
          <NoServieceView status={false} isMembership={userinfo?.isMembership}>
            <NoServiceText>새로운 식단을 준비 중이에요</NoServiceText>
            <NoHolidayServiceView>
              <ExclamationPoint />
              <NoHolidayServiceText>
                공휴일은 서비스를 하지 않아요
              </NoHolidayServiceText>
            </NoHolidayServiceView>
          </NoServieceView>
        )}
        {userinfo?.spotId === null && (
          <NoSpotView status={false} isMembership={userinfo?.isMembership}>
            <NoServiceText>메뉴는 스팟 선택 또는 </NoServiceText>
            <NoServiceText>
              스팟 개설 신청 승인후 확인할 수 있어요
            </NoServiceText>
          </NoSpotView>
        )}

        {item?.dailyFoodDtos?.map(m => {
          const realToTalDiscountRate =
            100 -
            (100 - m?.membershipDiscountRate) *
              0.01 *
              ((100 - m?.makersDiscountRate) * 0.01) *
              ((100 - m?.periodDiscountRate) * 0.01) *
              100;
          const totalDiscount =
            m?.membershipDiscountPrice +
            m?.makersDiscountPrice +
            m?.periodDiscountPrice;

          return (
            <Card
              key={m.id}
              m={m}
              isAddMeal={isAddMeal}
              setDailyfoodId={setDailyfoodId}
              detailFetching={detailFetching}
              realToTalDiscountRate={realToTalDiscountRate}
              totalDiscount={totalDiscount}
              orderDailyFoodId={orderDailyFoodId}
              cartDailyFoodId={cartDailyFoodId}
              time={time}
              addCartPress={addCartPress}
              navigation={navigation}
            />
          );
        })}

        <View style={{height: 120}} />
      </FoodContainer>
    </ScrollView>
  );
};

export default React.memo(BuyMealPage);
const FoodContainer = styled.View`
  ${({isFood}) => {
    if (isFood)
      return css`
        height: ${screenHeight}px;
      `;
  }}
  padding-bottom:24px;
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

const NoServiceText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
const NoServieceView = styled.View`
  position: absolute;
  top: ${({status, isMembership}) => (status && !isMembership ? '10%' : '20%')};
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const NoSpotView = styled(NoServieceView)`
  justify-content: center;
  align-items: center;
  left: 18%;
`;

const NoHolidayServiceText = styled(Typography).attrs({text: 'CationR'})`
  color: ${({theme}) => theme.colors.grey[6]};
  padding-left: 4px;
`;

const NoHolidayServiceView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;
