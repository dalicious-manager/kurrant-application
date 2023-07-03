/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {css} from 'styled-components/native';
import BottomModal from '~components/BottomModal';
import Typography from '~components/Typography';

import MealImage from './MealImage';
import {Label} from '../../../../../components/Button/component';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';
import Card from './Card';

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
            <NoServiceText>서비스 운영일이 아니에요</NoServiceText>
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
            (100 - m.membershipDiscountRate) *
              0.01 *
              ((100 - m.makersDiscountRate) * 0.01) *
              ((100 - m.periodDiscountRate) * 0.01) *
              100;
          const totalDiscount =
            m.membershipDiscountPrice +
            m.makersDiscountPrice +
            m.periodDiscountPrice;

          return (
            <Card
              key={m.id}
              m={m}
              isAddMeal={isAddMeal}
              realToTalDiscountRate={realToTalDiscountRate}
              withCommas={withCommas}
              totalDiscount={totalDiscount}
              orderDailyFoodId={orderDailyFoodId}
              cartDailyFoodId={cartDailyFoodId}
              time={time}
              addCartPress={addCartPress}
              navigation={navigation}
            />
            // <Contents
            //   key={m.id}
            //   spicy={m.spicy}
            //   vegan={m.vegan}
            //   disabled={
            //     m.status === 2 || m.status === 6 || isAddMeal || m.status === 5
            //   }
            //   onPress={e => {
            //     navigation.navigate(MealDetailPageName, {
            //       dailyFoodId: m.id,
            //       deliveryTime: time,
            //     });
            //     e.stopPropagation();
            //   }}>
            //   <ContentsText>
            //     <MakersName soldOut={m.status}>{m.makersName}</MakersName>
            //     <MealName
            //       soldOut={m.status}
            //       numberOfLines={1}
            //       ellipsizeMode="tail">
            //       {m.foodName}
            //     </MealName>
            //     <MealDsc
            //       soldOut={m.status}
            //       numberOfLines={2}
            //       ellipsizeMode="tail">
            //       {m.description}
            //     </MealDsc>
            //     <PriceWrap>
            //       {realToTalDiscountRate !== 0 && (
            //         <PercentText soldOut={m.status}>
            //           {Math.round(realToTalDiscountRate * 100) / 100}%
            //         </PercentText>
            //       )}
            //       <Price soldOut={m.status}>
            //         {withCommas(m.price - totalDiscount)}원
            //       </Price>
            //       {realToTalDiscountRate !== 0 && (
            //         <OriginPrice>{withCommas(m.price)}원</OriginPrice>
            //       )}
            //     </PriceWrap>
            //     {m.spicy !== null && (
            //       <LabelWrap>
            //         {m.status === 2 || m.status === 6 ? (
            //           <Label label={`${m.spicy}`} type={'soldOut'} />
            //         ) : (
            //           <Label label={`${m.spicy}`} />
            //         )}
            //       </LabelWrap>
            //     )}
            //     {m.vegan && m.vegan !== null && (
            //       <LabelWrap>
            //         {m.status === 2 || m.status === 6 ? (
            //           <Label label={`${m.vegan}`} type={'soldOut'} />
            //         ) : (
            //           <Label label={`${m.vegan}`} type={'vegan'} />
            //         )}
            //       </LabelWrap>
            //     )}
            //   </ContentsText>
            //   <MealImage
            //     status={m.status}
            //     image={m.image}
            //     dailyFoodId={m.id}
            //     orderFoodList={orderDailyFoodId}
            //     cartFoodList={cartDailyFoodId}
            //     onPressEvent={() => {
            //       addCartPress(m.id, m.serviceDate, m.diningType, m);
            //     }}
            //     isAddMeal={isAddMeal}
            //     rank={m.rank}
            //   />

            //   {m.status === 2 && (
            //     <SoldOut soldOut={m.status} rank={m.rank}>
            //       품절됐어요
            //     </SoldOut>
            //   )}
            //   {m.status === 6 && (
            //     <SoldOut soldOut={m.status} rank={m.rank}>
            //       마감됐어요
            //     </SoldOut>
            //   )}
            // </Contents>
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

const Contents = styled.Pressable`
  padding: ${({spicy, vegan}) =>
    spicy || vegan ? '18px 0px 28px 0px' : '18px 0px 28px 0px'};
  margin: 0px 28px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  align-items: center;
  min-height: 160px;
`;

const LabelWrap = styled.View`
  margin-top: 6px;
`;

const ContentsText = styled.View`
  width: 60%;
`;

const PriceWrap = styled.View`
  flex-direction: row;
  margin-top: 4px;
  margin-bottom: 6px;
`;

const SoldOut = styled(Typography).attrs({text: 'Title04SB'})`
  position: absolute;
  right: ${({rank}) => (rank === 1 ? '17px' : '15px')};
  top: ${({rank}) => (rank === 1 ? '60%' : '55%')};
  color: ${props => props.theme.colors.grey[4]};
  z-index: 1000;
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

const Price = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[2]};
`;

const MealDsc = styled(Typography).attrs({text: 'MealDes'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[4]};
  margin-top: 6px;
`;

const PercentText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6 ? theme.colors.grey[6] : '#DD5257'};
  margin-right: 4px;
`;

const OriginPrice = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[5]};
  text-decoration: line-through;
  text-decoration-color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[5]};
  margin-left: 6px;
`;

const NoServiceText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
const NoServieceView = styled.View`
  position: absolute;
  top: ${({status, isMembership}) => (status && !isMembership ? '10%' : '30%')};
  left: 29%;
`;

const NoSpotView = styled(NoServieceView)`
  justify-content: center;
  align-items: center;
  left: 18%;
`;
