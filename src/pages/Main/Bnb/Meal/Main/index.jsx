import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import styled from 'styled-components/native';

import Plus from '../../../../../assets/icons/Home/plus.svg';
import useOrderMeal from '../../../../../biz/useOrderMeal';
import LabelButton from '../../../../../components/ButtonMeal';
import BuyCalendar from '../../../../../components/BuyCalendar';
import Typography from '../../../../../components/Typography';
import Toast from '../../../../../components/Toast';
import {
  formattedDate,
  formattedMonthDay,
  formattedWeekDate,
} from '../../../../../utils/dateFormatter';

import {MakersName} from '../../BuyMeal/Main';
import NoMealButton from '~components/Button';

import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import FastImage from 'react-native-fast-image';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import useUserInfo from '../../../../../biz/useUserInfo';
import {useQueryClient} from 'react-query';
import { weekAtom } from '../../../../../biz/useBanner/store';
import { useAtom } from 'jotai';
import { useGetOrderMeal } from '../../../../../hook/useOrder';
import { useGetDailyfood } from '../../../../../hook/useDailyfood';
export const PAGE_NAME = 'P_MAIN__BNB__MEAL';

const Pages = ({route}) => {
  const date = formattedWeekDate(new Date());
  const data = route?.params?.data === undefined ? date : route.params.data;
  const isToday =
    route?.params?.isToday === undefined ? false : route.params.isToday;
  const navigation = useNavigation();
  const meal = true;
  // console.log(data);
  const {dailyFood, isServiceDays} = useFoodDaily();
  const {isUserInfo, userInfo} = useUserInfo();

  const queryClient = useQueryClient();
  const [touchDate, setTouchDate] = useState(data);
  const [show, setShow] = useState(false);
  const userSpotId = isUserInfo?.spotId;
  const { refundItem, setOrderMeal} = useOrderMeal();
  const pagerRef = useRef();
  const [weekly] = useAtom(weekAtom);
  const {data: isOrderMeal, refetch: orderMealRefetch} = useGetOrderMeal(formattedWeekDate(weekly[0][0]),
  formattedWeekDate(
    weekly[weekly?.length - 1][weekly[weekly?.length - 1].length - 1],
  ));
  const {data:dailyfoodData, refetch:dailyfoodRefetch ,isLoading : dailyLoading ,isFetching:dailyFetching} =useGetDailyfood(userSpotId,data ? data:date);
  // const todayMeal = isOrderMeal?.filter(m => m.serviceDate === date);
  const selectDate = isOrderMeal?.data?.filter(m => m.serviceDate === touchDate);
  const toast = Toast();
  const pressDay = day => {
    setTouchDate(day ?? data);
  };

  // console.log(isOrderMeal, '밀정보');
  const cancelMealPress = id => {
    // console.log(id, '밀 취소');
    const list = isOrderMeal?.data.map(el => {
      return {
        ...el,
        orderItemDtoList: [...el.orderItemDtoList.filter(v => v.id !== id)],
      };
    });

    const listArr = list.filter(el => {
      return el.orderItemDtoList.length !== 0;
    });

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
          onPress: async () => {
            try {
              await refundItem({
                id: id,
              });
              queryClient.invalidateQueries('orderMeal');
              setOrderMeal(listArr);
              setShow(true);
              toast.toastEvent();
              setTimeout(() => {
                setShow(false);
              }, 2000);
            } catch (err) {
              console.log(err);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const changeMealPress = (id, serviceDate) => {
    const list = isOrderMeal?.data.map(el => {
      return {
        ...el,
        orderItemDtoList: [...el.orderItemDtoList.filter(v => v.id !== id)],
      };
    });

    const listArr = list.filter(el => {
      return el.orderItemDtoList.length !== 0;
    });

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
          onPress: async () => {
            try {
              await refundItem({
                id: id,
              });
              setOrderMeal(listArr);
              queryClient.invalidateQueries('orderMeal');
              navigation.navigate(BuyMealPageName, {
                date: serviceDate ? serviceDate : formattedDate(new Date()),
              });
            } catch (err) {
              Alert.alert("메뉴취소 불가",err.toString().replace('error: ',""));
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  // useEffect(() => {
  //   async function loadUser() {
  //     try {
  //       const userData = await userInfo();
  //       // await orderMeal();
  //       await dailyFood(userData?.spotId, formattedWeekDate(new Date()));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   loadUser();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      if (isToday) {
        pressDay(formattedWeekDate(new Date()));
        pagerRef.current.setPage(0);
      }
      setTouchDate(data);
      console.log(dailyfoodData)
    }, [isToday, data]),
  );
  return (
    <SafeView>
      <ScrollView>
        <CalendarWrap>
          <BuyCalendar
            BooleanValue
            pagerRef={pagerRef}
            type={'grey2'}
            color={'white'}
            size={'Body05R'}
            onPressEvent2={pressDay}
            selectDate={touchDate}
            daliy={true}
            meal={meal}
            margin={'0px 28px'}
            sliderValue={isToday && 0}
            isServiceDays={dailyfoodData?.data?.serviceDays}
          />
        </CalendarWrap>

        <MealWrap>
          {touchDate ? (
            <>
              {selectDate?.map((s, index) => {
                console.log(s)
                return (
                  <View key={index}>
                    <DiningTimeWrap>
                      <DiningTime>
                        {formattedMonthDay(s.serviceDate)} {s.diningType}
                      </DiningTime>
                    </DiningTimeWrap>
                    {s.orderItemDtoList?.map((sm, idx) => {
                      return (
                        <MealContentWrap key={idx}>
                          <FastImage
                            source={{
                              uri: `${sm.image}`,
                              priority: FastImage.priority.high,
                            }}
                            style={{
                              width: 107,
                              height: 107,
                              borderRadius: 7,
                            }}
                          />
                          <Content
                            onPress={() =>
                              navigation.navigate(MealDetailPageName, {
                                dailyFoodId: sm.dailyFoodId,
                              })
                            }>
                            <MakersName>[{sm.makers}]</MakersName>
                            <MealName numberOfLines={1} ellipsizeMode="tail">
                              {sm.name}
                            </MealName>
                            <DeliveryAddress>
                              {sm.groupName}・{sm.spotName}
                            </DeliveryAddress>
                            <CountText>{sm.count}개</CountText>
                            {sm.orderStatus === 7 && (
                              <CancelText>취소완료</CancelText>
                            )}
                          </Content>
                          {sm.orderStatus === 5 && <CancelBtnWrap status={sm.orderStatus}>
                              <LabelButton
                                label={'취소'}
                                onPressEvent={() => cancelMealPress(sm.id)}
                                disabled={sm.orderStatus === 7}
                              />
                            </CancelBtnWrap>}
                            {sm.orderStatus === 5 && ( sm.orderStatus !== 7 && (
                              <MealChangeWrap>
                                <LabelButton
                                  label={'메뉴변경'}
                                  onPressEvent={() => changeMealPress(sm.id)}
                                />
                              </MealChangeWrap>
                            ))}
                        </MealContentWrap>
                      );
                    })}
                  </View>
                );
              })}
            </>
          ) : (
            <>
              {selectDate &&
                selectDate.map((m, i) => {
                  return (
                    <View key={i}>
                      <DiningTimeWrap>
                        <DiningTime>
                          {formattedMonthDay(m.serviceDate)} {m.diningType}
                          ・오늘
                        </DiningTime>
                      </DiningTimeWrap>
                      {m.orderItemDtoList?.map((el, idx) => {
                        return (
                          <MealContentWrap key={idx}>
                            <FastImage
                              source={{
                                uri: `${el.image}`,
                                priority: FastImage.priority.high,
                              }}
                              style={{
                                width: 107,
                                height: 107,
                                borderRadius: 7,
                              }}
                            />
                            <Content
                              onPress={() =>
                                navigation.navigate(MealDetailPageName, {
                                  dailyFoodId: el.dailyFoodId,
                                })
                              }>
                              <MakersName>[{el.makers}]</MakersName>
                              <MealName numberOfLines={1} ellipsizeMode="tail">
                                {el.name}
                              </MealName>
                              <DeliveryAddress>
                                {el.groupName}・{el.spotName}
                              </DeliveryAddress>
                              <CountText>{el.count}개</CountText>
                              {el.orderStatus === 7 && (
                                <CancelText>취소완료</CancelText>
                              )}
                            </Content>
                            {el.orderStatus === 5 && <CancelBtnWrap status={el.orderStatus}>
                              <LabelButton
                                label={'취소'}
                                onPressEvent={() => cancelMealPress(el.id)}
                                disabled={el.orderStatus === 7}
                              />
                            </CancelBtnWrap>}
                            {el.orderStatus === 5 && ( el.orderStatus !== 7 && (
                              <MealChangeWrap>
                                <LabelButton
                                  label={'메뉴변경'}
                                  onPressEvent={() => changeMealPress(el.id)}
                                />
                              </MealChangeWrap>
                            ))}
                          </MealContentWrap>
                        );
                      })}
                    </View>
                  );
                })}
            </>
          )}
        </MealWrap>
      </ScrollView>
      {selectDate?.length === 0 && (
        <NoMealWrap>
          <NoMealText>주문한 메뉴가 없어요</NoMealText>
          <NoMealButtonWrap>
            <NoMealButton
              size={'button38'}
              label={'식사 구매하기'}
              type={'white'}
              text={'Button09SB'}
              onPressEvent={() => {
                navigation.navigate(BuyMealPageName, {
                  date: touchDate ? touchDate : formattedDate(new Date()),
                });
              }}
            />
          </NoMealButtonWrap>
        </NoMealWrap>
      )}
      <ButtonWrap>
        <PlusButton
          onPress={() => {
            navigation.navigate(BuyMealPageName, {
              date: touchDate ? touchDate : formattedDate(new Date()),
            });
          }}>
          <PlusIcon />
        </PlusButton>
      </ButtonWrap>

      {show && (
        <toast.ToastWrap message={'메뉴가 취소됐어요'} icon={'checked'} />
      )}
    </SafeView>
  );
};

export default Pages;

const SafeView = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.grey[0]};
  flex: 1;
`;

const CalendarWrap = styled.View`
  height: 120px;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  width: 100%;
`;

const MealWrap = styled.View`
  margin: 0px 24px 24px 24px;
  //padding-bottom:24px;
  position: relative;
`;

const MealContentWrap = styled.View`
  flex-direction: row;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  padding: 24px 0px;
  min-height: 163px;
`;
const DiningTimeWrap = styled.View`
  padding-top: 22px;
`;

const DiningTime = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
`;
const MealName = styled(Typography).attrs({text: 'Body05SB'})`
  white-space :nowrap;
  text-overflow : ellipsis;
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[2]};
`;
const Content = styled.Pressable`
  margin-left: 16px;
  width: 50%;
  align-self: flex-start;
`;

const MealChangeWrap = styled.Pressable`
  position: absolute;
  right: 0;
  bottom: 24px;
`;

const CancelBtnWrap = styled(MealChangeWrap)`
  right: ${({status}) => (status === 7 ? '0px' : '83px')};
`;

const ButtonWrap = styled.View`
  margin: 0px 20px 0px 0px;
`;

const PlusButton = styled.Pressable`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  background-color: ${props => props.theme.colors.yellow[500]};
  position: absolute;
  bottom: 26px;
  right: 0;
`;
const ButtonBox = styled.Pressable`
  position: absolute;
  bottom: 26px;
  right: 0px;
  left: 20px;
`;
const PlusIcon = styled(Plus)`
  position: absolute;
  bottom: 20px;
  left: 18px;
`;
const PlusLongIcon = styled(Plus)``;
const Button = styled.Pressable`
  background-color: ${({theme}) => theme.colors.yellow[500]};
  border-radius: 100px;
  width: 100%;
  padding: 16px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CountText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[5]};
`;

const NoMealWrap = styled.View`
  align-items: center;
  justify-content: center;
  height: 80%;
`;

const NoMealText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[5]};
`;

const DeliveryAddress = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;

const CancelText = styled(Typography).attrs({test: 'Body06R'})`
  color: ${({theme}) => theme.colors.red[500]};
`;

const NoMealButtonWrap = styled.View`
  padding: 10px 120px;
`;

const ButtonText = styled(Typography).attrs({text: 'BottomButtonSB'})`
  color: ${props => props.theme.colors.grey[1]};
  margin-left: 8px;
`;
