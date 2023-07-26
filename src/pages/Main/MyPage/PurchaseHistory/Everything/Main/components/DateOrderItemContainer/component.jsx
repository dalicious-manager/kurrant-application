import {useNavigation} from '@react-navigation/native';
import id from 'date-fns/esm/locale/id/index.js';
import React, {useState} from 'react';
import {Alert, Dimensions, Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQueryClient} from 'react-query';
import styled from 'styled-components/native';
import {css, useTheme} from 'styled-components/native';
import ArrowDown from '~assets/icons/Group/arrowDown.svg';
import ArrowRight from '~assets/icons/Group/checkArrow.svg';
import ButtonMeal from '~components/ButtonMeal';
import ButtonMealCancel from '~components/ButtonMealCancel';
import Typography from '~components/Typography';

import useOrderMeal from '../../../../../../../../biz/useOrderMeal';
import usePurchaseHistory from '../../../../../../../../biz/usePurchaseHistory';
import TextButton from '../../../../../../../../components/TextButton';
import {useConfirmOrderState} from '../../../../../../../../hook/useOrder';
import {
  formattedDate,
  formattedDateAndDay,
  formattedDateType,
  formattedDateWeekBtn,
} from '../../../../../../../../utils/dateFormatter';
import {formattedMealFoodStatus} from '../../../../../../../../utils/statusFormatter';
import withCommas from '../../../../../../../../utils/withCommas';
import {PAGE_NAME as BuyMealPageName} from '../../../../../../Bnb/BuyMeal/Main';
import {PurchaseDetailPageName} from '../../../../Detail';

const {width} = Dimensions.get('screen');
const Component = ({purchaseId, date, itemIndex, data}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const {refundItem} = useOrderMeal();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {setAllPurchase} = usePurchaseHistory();

  const {mutateAsync: orderState, isLoading: isStatusLoading} =
    useConfirmOrderState();

  const deliveryConfirmPress = async id => {
    try {
      await orderState({id: id});
    } catch (error) {
      Alert.alert('상태변경', error.toString()?.replace('error: '));
    }
  };
  const purchase = data.filter(v => v.id === purchaseId)[0];
  const cancelItem = async id => {
    try {
      const req = {
        orderId: purchase.id,
        id: id,
      };
      await refundItem(req);
      const refund = data.map(o => {
        return {
          ...o,
          orderItems: [
            ...o.orderItems.map(v => {
              if (v.id === id) {
                return {...v, orderStatus: 7};
              } else {
                return v;
              }
            }),
          ],
        };
      });
      setAllPurchase(refund);
    } catch (error) {
      Alert.alert('취소불가', error.toString()?.replace('error:', ''));
    }
  };
  const changeItem = async (id, serviceDate) => {
    try {
      const req = {
        orderId: purchase.id,
        id: id,
      };
      await refundItem(req);
      const refund = data.map(o => {
        return {
          ...o,
          orderItems: [
            ...o.orderItems.map(v => {
              if (v.id === id) {
                return {...v, orderStatus: 7};
              } else {
                return v;
              }
            }),
          ],
        };
      });
      setAllPurchase(refund);

      navigation.navigate(BuyMealPageName, {
        date: serviceDate ? serviceDate : formattedDate(new Date()),
      });
    } catch (error) {
      Alert.alert('취소불가', error.toString()?.replace('error:', ''));
    }
  };
  return (
    <DateOrderItemListContainer isFirst={itemIndex === 0}>
      <DateDetailBox>
        <Typography text={'CaptionR'} textColor={themeApp.colors.grey[4]}>
          {date} 결제
        </Typography>
        <DateDetailEndView>
          {open && (
            <DetailWrap>
              <TextButton
                size="label13R"
                label="주문상세"
                type="blue"
                onPressEvent={() => {
                  navigation.navigate(PurchaseDetailPageName, {
                    id: purchase.id,
                  });
                }}
              />
              {/* <ArrowRightIcon/> */}
            </DetailWrap>
          )}
          <OpenItems onPress={() => setOpen(!open)}>
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </OpenItems>
        </DateDetailEndView>
      </DateDetailBox>

      {open && (
        <DateOrderItemListBox>
          <DateBar />
          <DateOrderItemList>
            {purchase?.orderItems.map((order, i) => {
              const statusColor = () => {
                switch (order.orderStatus) {
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
                <DateOrderItemBox key={order.id} isFirst={i === 0}>
                  <StatusBox>
                    <StatusText>
                      <Typography text="Title04SB" textColor={statusColor()}>
                        {formattedMealFoodStatus(order.orderStatus)}
                      </Typography>
                      {order.orderStatus === 5 && (
                        <Typography text="SmallLabel" textColor={'#BDBAC1'}>
                          {' '}
                          {order.lastOrderTime} 주문 마감
                        </Typography>
                      )}
                      {order.orderStatus !== 5 &&
                        !(
                          order.dailyFoodStatus === 1 ||
                          order.dailyFoodStatus === 2
                        ) && (
                          <Typography
                            style={{marginLeft: 5, alignSelf: 'center'}}
                            text="CaptionR"
                            textColor={themeApp.colors.grey[5]}>
                            주문 마감 • 취소 불가
                          </Typography>
                        )}
                    </StatusText>
                    {order?.cancelDate && (
                      <Typography
                        text="Samlllabel"
                        textColor={themeApp.colors.grey[5]}>
                        {formattedDateWeekBtn(order?.cancelDate)} 취소
                      </Typography>
                    )}
                  </StatusBox>
                  <DateOrderItemContentBox>
                    <DateOrderItemImage>
                      <FastImage
                        style={{width: '100%', height: '100%', borderRadius: 7}}
                        source={{
                          uri: order.image,
                          priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </DateOrderItemImage>
                    <DateOrderItemContent>
                      <TextBox>
                        <ServiceDate
                          text="SmallLabel"
                          textColor={themeApp.colors.grey[4]}>
                          식사일 : {formattedDateAndDay(order.serviceDate)}{' '}
                          {formattedDateType(order.diningType)}
                        </ServiceDate>
                        <Body06R19
                          textColor={themeApp.colors.grey[2]}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          [{order.makersName}]{order.name}
                        </Body06R19>
                        <PriceBox>
                          <Body06R19Count textColor={themeApp.colors.grey[4]}>
                            {order.count}개
                          </Body06R19Count>
                          <Typography
                            text="Body06SB"
                            textColor={themeApp.colors.grey[2]}>
                            {withCommas(order.price)}원
                          </Typography>
                        </PriceBox>
                      </TextBox>
                      {(order.dailyFoodStatus === 1 ||
                        order.dailyFoodStatus === 2) &&
                        order.orderStatus === 5 && (
                          <ButtonContainer>
                            <ButtonMeal
                              label={'취소'}
                              onPressEvent={() =>
                                Alert.alert(
                                  '메뉴 취소',
                                  '메뉴를 취소하시겠어요?',
                                  [
                                    {
                                      text: '아니요',
                                      onPress: () => {},
                                    },
                                    {
                                      text: '메뉴 취소',
                                      onPress: () => {
                                        try {
                                          cancelItem(order.id);
                                          queryClient.invalidateQueries(
                                            'orderMeal',
                                          );
                                        } catch (error) {
                                          Alert.alert(
                                            '메뉴취소 불가',
                                            error
                                              .toString()
                                              ?.replace('error: ', ''),
                                          );
                                        }
                                      },
                                      style: 'destructive',
                                    },
                                  ],
                                )
                              }
                            />
                            <ButtonMeal
                              label={'메뉴변경'}
                              onPressEvent={() =>
                                Alert.alert(
                                  '메뉴 변경',
                                  '현재 메뉴 취소 후 진행됩니다.\n메뉴를 취소하시겠어요?\n메뉴 부분 취소의 경우 환불까지 영업일 기준으로 2~3일이 소요될 수 있어요',
                                  [
                                    {
                                      text: '아니요',
                                      onPress: () => {},
                                    },
                                    {
                                      text: '메뉴 취소',
                                      onPress: () => {
                                        try {
                                          changeItem(
                                            order.id,
                                            order.serviceDate,
                                          );
                                          queryClient.invalidateQueries(
                                            'orderMeal',
                                          );
                                        } catch (error) {
                                          Alert.alert(
                                            '메뉴취소 불가',
                                            error
                                              .toString()
                                              ?.replace('error: ', ''),
                                          );
                                        }
                                      },
                                      style: 'destructive',
                                    },
                                  ],
                                )
                              }
                            />
                          </ButtonContainer>
                        )}
                      {order.orderStatus === 10 && (
                        <ButtonContainer>
                          <ButtonMeal
                            label={'수령확인'}
                            disabled={isStatusLoading}
                            onPressEvent={() => deliveryConfirmPress(order.id)}
                          />
                        </ButtonContainer>
                      )}
                      {/* {order.dailyFoodStatus === 6 && (
                        <ButtonContainer>
                          <ButtonMealCancel label={'취소불가'} />
                        </ButtonContainer>
                      )} */}
                    </DateOrderItemContent>
                  </DateOrderItemContentBox>
                </DateOrderItemBox>
              );
            })}
          </DateOrderItemList>
        </DateOrderItemListBox>
      )}
    </DateOrderItemListContainer>
  );
};

export default Component;
const DateOrderItemListContainer = styled.View`
  ${({isFirst}) =>
    isFirst
      ? css`
          margin-top: 16px;
        `
      : css`
          margin-top: 56px;
        `}
  padding-left: 24px;
  padding-right: 24px;
`;

const DateOrderItemListBox = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const DateBar = styled.View`
  width: 3px;
  height: 100%;
  background-color: ${({theme}) => theme.colors.grey[7]};
`;

const DateOrderItemList = styled.View`
  width: 100%;
  padding-left: 12px;
`;
const DateOrderItemBox = styled.View`
  ${({isFirst}) =>
    !isFirst &&
    css`
      padding-top: 16px;
    `}
  width: 100%;
`;
const DateOrderItemContentBox = styled.View`
  padding-top: 6px;
  flex-direction: row;
  width: 100%;
`;
const PriceBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateOrderItemImage = styled.View`
  width: ${width / 3.5}px;
  height: ${width / 3.5}px;
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
`;
const Body06R19Count = styled(Typography).attrs({text: 'Body06R'})`
  line-height: 19px;
  margin-right: 6px;
`;
const ServiceDate = styled(Typography)`
  margin-bottom: 4px;
`;

const StatusBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const StatusText = styled.View`
  flex-direction: row;
  margin-right: 5px;
  align-items: center;
`;

const DateDetailBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  padding-bottom: 8px;
`;
const DateDetailEndView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DetailWrap = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-right: 9px;
`;
const OpenItems = styled.Pressable`
  padding: 5px;
`;
const ArrowRightIcon = styled(ArrowRight)`
  margin-left: 4px;
`;

const ArrowUpIcon = styled(ArrowDown)`
  margin-left: 4px;
  transform: rotateX(180deg);
`;

const ArrowDownIcon = styled(ArrowDown)`
  margin-left: 4px;
`;
