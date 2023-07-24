/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react';
import React from 'react';
import {Dimensions, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {css} from 'styled-components/native';
import BottomModal from '~components/BottomModal';
import Typography from '~components/Typography';

import Card from './Card';
import MealImage from './MealImage';
import ExclamationPoint from '../../../../../assets/icons/BuyMeal/exclamationPoint.svg';
import {Label} from '../../../../../components/Button/component';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';

const screenHeight = Dimensions.get('window').height;

const BuyMealPage = props => {
  const {
    diningFood,
    mealData: {
      isMorningFood,
      setModalVisible,
      isLunchFood,
      setModalVisible2,
      isDinnerFood,
      setModalVisible3,
      modalVisible,
      modalVisible2,
      modalVisible3,
      MorningRef,
      LunchRef,
      DinnerRef,
      handlePress,
      spotId,
      hideModal,
      orderDailyFoodId,
      cartDailyFoodId,
      isAddMeal,
      navigation,
      addCartPress,
      closeModal,
      addToCart,
      selectFood,
      time,
    },
    detailFetching,
    setDailyfoodId,
  } = props;

  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  const [startScroll, setStartScroll] = useState(0);

  const setModal = type => {
    if (type === isMorningFood) {
      return setModalVisible;
    }
    if (type === isLunchFood) {
      return setModalVisible2;
    }
    if (type === isDinnerFood) {
      return setModalVisible3;
    }
  };
  const modal = type => {
    if (type === isMorningFood) {
      return modalVisible;
    }
    if (type === isLunchFood) {
      return modalVisible2;
    }
    if (type === isDinnerFood) {
      return modalVisible3;
    }
  };
  const refType = type => {
    if (type === isMorningFood) {
      return MorningRef;
    }
    if (type === isLunchFood) {
      return LunchRef;
    }
    if (type === isDinnerFood) {
      return DinnerRef;
    }
  };

  const onScrollStart = e => {
    const {
      contentOffset: {y},
    } = e.nativeEvent;
    setStartScroll(y);
  };
  const onScrollEnd = e => {
    const {
      contentOffset: {y},
    } = e.nativeEvent;
    if (y < 20) {
      handlePress(true);
    } else {
      handlePress(startScroll > y ? true : false);
    }
  };

  return (
    <ScrollView
      ref={refType(diningFood)}
      onScrollBeginDrag={onScrollStart}
      onScrollEndDrag={onScrollEnd}
      showsVerticalScrollIndicator={false}
      scrollEnabled={
        !(diningFood?.length === 0 && spotId !== null) || !spotId === null
      }>
      <FoodContainer isFood={diningFood?.length === 0 && spotId !== null}>
        {diningFood?.length === 0 && spotId !== null && (
          <NoServieceView
            status={hideModal}
            isMembership={isUserInfo?.isMembership}>
            <NoServiceText>새로운 식단을 준비 중이에요</NoServiceText>
            <NoHolidayServiceView>
              <ExclamationPoint />
              <NoHolidayServiceText>
                공휴일은 서비스를 하지 않아요
              </NoHolidayServiceText>
            </NoHolidayServiceView>
          </NoServieceView>
        )}
        {spotId === null && (
          <NoSpotView
            status={hideModal}
            isMembership={isUserInfo?.isMembership}>
            <NoServiceText>메뉴는 스팟 선택 또는 </NoServiceText>
            <NoServiceText>
              스팟 개설 신청 승인후 확인할 수 있어요
            </NoServiceText>
          </NoSpotView>
        )}

        {diningFood?.map(m => {
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
              withCommas={withCommas}
              totalDiscount={totalDiscount}
              orderDailyFoodId={orderDailyFoodId}
              cartDailyFoodId={cartDailyFoodId}
              time={time}
              addCartPress={addCartPress}
              navigation={navigation}
            />
          );
        })}
        <BottomModal
          modalVisible={modal(diningFood)}
          setModalVisible={setModal(diningFood)}
          title={`장바구니에 ${'\n'}동일 날짜/시간의 메뉴가 있어요.`}
          description={'그래도 추가하시겠어요?'}
          buttonTitle1={'아니요'}
          buttonType1="grey7"
          buttonTitle2={'추가'}
          buttonType2="yellow"
          onPressEvent1={closeModal}
          onPressEvent2={() => addToCart(selectFood.id)}
        />
        <View style={{height: 120}} />
      </FoodContainer>
    </ScrollView>
  );
};

export default BuyMealPage;
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
