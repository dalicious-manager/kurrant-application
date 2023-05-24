import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQueryClient} from 'react-query';
import styled from 'styled-components/native';
import {css, useTheme} from 'styled-components/native';

import TextButton from '../../../../../../../../components/TextButton';
import Typography from '../../../../../../../../components/Typography';
import {useConfirmOrderState} from '../../../../../../../../hook/useOrder';
import {
  formattedDateAndDay,
  formattedDateType,
} from '../../../../../../../../utils/dateFormatter';
import {formattedMealFoodStatus} from '../../../../../../../../utils/statusFormatter';
import withCommas from '../../../../../../../../utils/withCommas';

const {width} = Dimensions.get('screen');
const Component = ({orderItem, onCancel = () => {}}) => {
  const themeApp = useTheme();
  const queryClient = useQueryClient();
  const {mutateAsync: orderState} = useConfirmOrderState();

  const deliveryConfirmPress = async id => {
    try {
      await orderState({id: id});
    } catch (error) {
      Alert.alert('상태변경', error.toString()?.replace('error: '));
    }
  };
  const {
    serviceDate,
    makers,
    diningType,
    image,
    foodName,
    count,
    id,
    price,
    orderStatus,
    dailyFoodStatus,
  } = orderItem;
  const navigation = useNavigation();
  const statusColor = () => {
    switch (orderStatus) {
      case 7:
        return themeApp.colors.red[500];
      case 12:
        return themeApp.colors.red[500];
      case 13:
        return themeApp.colors.red[500];
      default:
        return themeApp.colors.grey[2];
    }
  };
  return (
    <OrderItemContainer>
      <DateOrderItemContentBox>
        <DateOrderItemImage>
          <FastImage
            style={{width: '100%', height: '100%', borderRadius: 7}}
            source={{
              uri: image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </DateOrderItemImage>
        <DateOrderItemContent>
          <TextBox>
            <ServiceDateBox>
              <ServiceDate
                text="SmallLabel"
                textColor={themeApp.colors.grey[4]}>
                식사일 : {formattedDateAndDay(serviceDate)}{' '}
                {formattedDateType(diningType)}
              </ServiceDate>
              {(dailyFoodStatus === 1 || dailyFoodStatus === 2) &&
                orderStatus === 5 && (
                  <TextButton
                    label="주문취소"
                    type="blue"
                    size="label13R"
                    onPressEvent={() => {
                      Alert.alert(
                        '메뉴 취소',
                        '메뉴를 취소하시겠어요?\n메뉴 부분 취소의 경우 환불까지 영업일 기준으로 2~3일이 소요될 수 있어요',
                        [
                          {
                            text: '아니요',
                            onPress: () => {},
                          },
                          {
                            text: '메뉴 취소',
                            onPress: () => {
                              try {
                                onCancel(id);
                                queryClient.invalidateQueries('orderMeal');
                              } catch (error) {
                                Alert.alert(
                                  '메뉴취소 불가',
                                  error.toString()?.replace('error: ', ''),
                                );
                              }
                            },
                            style: 'destructive',
                          },
                        ],
                      );
                    }}
                  />
                )}
              {orderStatus === 10 && (
                <TextButton
                  label="수령확인"
                  type="blue"
                  size="label13R"
                  onPressEvent={() => deliveryConfirmPress(id)}
                />
              )}
              {dailyFoodStatus === 6 &&
                (orderStatus === 6 || orderStatus === 9) && (
                  <TextButton label="취소불가" type="red" size="label13R" />
                )}
            </ServiceDateBox>
            <Body06R19 textColor={themeApp.colors.grey[2]}>
              [{makers}] {foodName}
            </Body06R19>
            <PriceBox>
              <Body06R19 textColor={themeApp.colors.grey[4]}>
                {count}개
              </Body06R19>
              <Typography text="Body06SB" textColor={themeApp.colors.grey[2]}>
                {withCommas(price)}원
              </Typography>
            </PriceBox>
            <FoodStatusBox>
              <Typography text="Body06SB" textColor={statusColor}>
                {formattedMealFoodStatus(orderStatus)}
              </Typography>
            </FoodStatusBox>
          </TextBox>
        </DateOrderItemContent>
      </DateOrderItemContentBox>
    </OrderItemContainer>
  );
};

export default Component;
const OrderItemContainer = styled.View`
  padding-top: 14px;
  padding-bottom: 10px;
`;
const DateOrderItemContentBox = styled.View`
  padding-top: 6px;
  flex-direction: row;
  width: 100%;
  padding: 0px 24px;
`;
const PriceBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateOrderItemImage = styled.View`
  width: ${width / 5.5}px;
  height: ${width / 5.5}px;
  box-sizing: border-box;
  border-radius: 7px;
`;

const DateOrderItemContent = styled.View`
  margin-left: 12px;
  flex: 1;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
const TextBox = styled.View``;
const Body06R19 = styled(Typography).attrs({text: 'Body06R'})`
  line-height: 19px;
  margin-right: 6px;
`;
const ServiceDate = styled(Typography)``;
const FoodStatusBox = styled.View`
  margin-top: 8px;
`;
const ServiceDateBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;
