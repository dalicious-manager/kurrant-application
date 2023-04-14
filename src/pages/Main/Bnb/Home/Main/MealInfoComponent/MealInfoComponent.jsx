import styled, {css} from 'styled-components';
import React, {useState} from 'react';
import Typography from '../../../../../../components/Typography';
import {StyleSheet, View} from 'react-native';
import {formattedMealFoodStatus} from '../../../../../../utils/statusFormatter';
import {PAGE_NAME as MealMainPageName} from '../../../Meal/Main';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useConfirmOrderState} from '../../../../../../hook/useOrder';
import {SCREEN_NAME as reviewPage} from '../../../../../../screens/Main/Review/CreateReview/Page1';

const MealInfoComponent = ({m, meal, mockStatus}) => {
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const navigation = useNavigation();
  const {mutateAsync: orderState} = useConfirmOrderState();

  const deliveryConfirmPress = async () => {
    await orderState({id: meal.id});
    setDeliveryConfirmed(true);
  };

  const goToReviewPage = (id, image, name) => {
    navigation.navigate(reviewPage, {
      orderItemId: id,
      imageLocation: image,
      foodName: name,
      test: 'test',
    });
  };

  return (
    <>
      <MealInfoWrapper>
        <MealInfoWrap
          // shadow 적용
          style={
            (meal.orderStatus === 10 || meal.orderStatus === 11) &&
            styles.shadow
          }
          onPress={() =>
            navigation.navigate(MealMainPageName, {
              isToday: true,
            })
          }>
          <MealInfo>
            <FastImage
              source={{
                uri: `${meal.image}`,
                priority: FastImage.priority.high,
              }}
              style={{
                width: 64,
                height: 64,
                borderTopLeftRadius: 14,
                borderBottomLeftRadius: 14,
              }}
            />

            <MealText>
              <View>
                <DiningType>{`오늘 ${m.diningType}`}</DiningType>
                <View>
                  <MealTxt>{meal.name}</MealTxt>
                </View>
              </View>
              <MealCount>
                <GreyTxt status={meal.orderStatus}>
                  {formattedMealFoodStatus(meal.orderStatus)}
                </GreyTxt>

                <GreyTxt>{meal.count}개</GreyTxt>
              </MealCount>
            </MealText>
          </MealInfo>
        </MealInfoWrap>

        {(meal.orderStatus === 10 || meal.orderStatus === 11) && (
          <OrderStatusWrap>
            <CommentText>
              {meal.orderStatus === 11
                ? '식사 맛있게 하셨나요?'
                : meal.orderStatus === 10 &&
                  '배송완료! 메뉴 확인후 수령하셨나요?'}
            </CommentText>

            <ConfirmPressable
              onPress={() => {
                if (meal.orderStatus === 10) {
                  // 주문상태변경 - 수령완료 api보내야함
                  console.log('000');
                  deliveryConfirmPress();
                } else {
                  // 리뷰로 가기
                  goToReviewPage(meal.id, meal.image, meal.name);
                }
              }}>
              <ConfirmText>
                {meal.orderStatus === 11
                  ? '맛 평가하기'
                  : meal.orderStatus === 10 && '네, 확인했어요'}
              </ConfirmText>
            </ConfirmPressable>
          </OrderStatusWrap>
        )}
      </MealInfoWrapper>
    </>
  );
};

export default MealInfoComponent;

const styles = StyleSheet.create({
  shadow: {
    zIndex: 999,
    // ios
    shadowColor: '#5A1EFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // android
    elevation: 10,
  },
});

const Display = css`
  flex-direction: row;
  align-items: center;
`;

const MealInfoWrapper = styled.View`
  margin-bottom: 16px;
`;

const MealInfo = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MealInfoWrap = styled.Pressable`
  ${Display};
  height: 64px;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.grey[0]};
  margin-bottom: 16px;
  padding: 16px;
  justify-content: space-between;
  padding-left: 0px;
`;

const OrderStatusWrap = styled.View`
  align-items: center;
`;
const CommentText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[1]};
  margin-bottom: 4px;
`;
const ConfirmPressable = styled.Pressable`
  background-color: ${({theme}) => theme.colors.purple[500]};
  border-radius: 999px;
  height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;
const ConfirmText = styled(Typography).attrs({text: 'Button09SB'})`
  color: white;
`;

const MealCount = styled.View`
  /* align-self: flex-end; */
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  right: 0px;
`;

const MealText = styled.View`
  padding-left: 16px;
  flex-direction: row;
  flex: 1;
  //justify-content: space-between;
  position: relative;
`;

const DiningType = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const MealTxt = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const GreyTxt = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, status}) =>
    status === 9 ? theme.colors.blue[500] : theme.colors.grey[5]};
`;
