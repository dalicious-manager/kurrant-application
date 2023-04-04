import styled, {css} from 'styled-components';
import React, {useState} from 'react';
import Typography from '../../../../../../components/Typography';
import {StyleSheet, View} from 'react-native';
import {formattedMealFoodStatus} from '../../../../../../utils/statusFormatter';
import {PAGE_NAME as MealMainPageName} from '../../../Meal/Main';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const MealInfoComponent = ({m, meal, mockStatus}) => {
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const navigation = useNavigation();

  console.log('값 확인');
  console.log(m);
  console.log(meal);

  // status 11일떄 메뉴확인 수령클릭
  // {}

  return (
    <>
      <MealInfoWrapper>
        <MealInfoWrap
          // shadow 적용
          style={meal.orderStatus === 10 && styles.shadow}
          onPress={() => navigation.navigate(MealMainPageName)}>
          <MealInfo>
            {/* <View
              style={{
                width: 64,
                height: 64,
                backgroundColor: 'grey',
                borderTopLeftRadius: 14,
                borderBottomLeftRadius: 14,
              }}
            /> */}

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

        {meal.orderStatus === 10 && (
          <OrderStatusWrap>
            <CommentText>
              {deliveryConfirmed
                ? '식사 맛있게 하셨나요?'
                : '배송완료! 메뉴 확인후 수령하셨나요?'}
            </CommentText>

            <ConfirmPressable
              onPress={() => {
                if (meal.orderStatus === 10 && deliveryConfirmed) {
                  // 주문상태변경 - 수령완료 api보내야함

                  setDeliveryConfirmed(true);
                } else {
                  // 리뷰로 가기
                }
              }}>
              <ConfirmText>
                {deliveryConfirmed ? '맛 평가하기' : '네 확인했어요'}
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
  align-self: flex-end;
  justify-content: flex-end;
  align-items: flex-end;
`;

const MealText = styled.View`
  margin-left: 16px;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
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
