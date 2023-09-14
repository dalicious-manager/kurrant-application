import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQueryClient} from 'react-query';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';
import NoMealButton from '~components/Button';

import Plus from '../../../../../assets/icons/Home/plus.svg';
import QrIcon from '../../../../../assets/icons/Meal/qr.svg';
import useAuth from '../../../../../biz/useAuth/hook';
import {weekAtom} from '../../../../../biz/useBanner/store';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import useOrderMeal from '../../../../../biz/useOrderMeal';
import LabelButton from '../../../../../components/ButtonMeal';
import BuyCalendar from '../../../../../components/BuyCalendar';
import QRCodeComponent from '../../../../../components/QRCode/QRCode';
import Toast from '../../../../../components/Toast';
import Typography from '../../../../../components/Typography';
import {
  useGetDailyfoodDateList,
  useGetDailyfoodList,
} from '../../../../../hook/useDailyfood';
import {useGetOrderMeal} from '../../../../../hook/useOrder';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';
import {
  formattedDate,
  formattedMonthDay,
  formattedWeekDate,
} from '../../../../../utils/dateFormatter';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import {MakersName} from '../../BuyMeal/Main';
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';
export const PAGE_NAME = 'P_MAIN__BNB__MEAL';

const Pages = ({route}) => {
  const date = formattedWeekDate(new Date());
  const data = route?.params?.data === undefined ? date : route.params.data;
  const isToday =
    route?.params?.isToday === undefined ? false : route.params.isToday;
  const navigation = useNavigation();
  const meal = true;
  // console.log(data)
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();

  const themeApp = useTheme();
  const queryClient = useQueryClient();
  const [touchDate, setTouchDate] = useState(data);
  const [show, setShow] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const userSpotId = isUserInfo?.spotId;
  const {refundItem, setOrderMeal} = useOrderMeal();
  const pagerRef = useRef();
  const [weekly] = useAtom(weekAtom);
  const {setMorning, setLunch, setDinner} = useFoodDaily();
  const {
    readableAtom: {userRole},
  } = useAuth();
  const {data: isOrderMeal} = useGetOrderMeal(
    formattedWeekDate(weekly[0][0]),
    formattedWeekDate(
      weekly[weekly?.length - 1][weekly[weekly?.length - 1].length - 1],
    ),
  );
  const [dailyfoodData, setDailyfoodData] = useState();
  // const {data: dailyfoodDataList, refetch: dailyfoodListRefetch} =
  //   useGetDailyfoodList(
  //     userSpotId,
  //     formattedWeekDate(weekly[0][0]),
  //     formattedWeekDate(weekly[weekly.length - 1][weekly[0].length - 1]),
  //     userRole,
  //   );
  const {
    data: dailyfoodDataList,
    refetch: dailyfoodListRefetch,
    isFetching: dailyfoodListIsFetching,
  } = useGetDailyfoodDateList(
    userSpotId,
    formattedWeekDate(weekly[0][0]),
    formattedWeekDate(weekly[weekly.length - 1][weekly[0].length - 1]),
    userRole,
  );

  const now = formattedDate(touchDate) === formattedDate(new Date());

  useEffect(() => {
    if (dailyfoodDataList?.data?.dailyFoodsByDate) {
      setMorning([]);
      setLunch([]);
      setDinner([]);
      const getDailyfoodData = dailyfoodDataList?.data?.dailyFoodsByDate.filter(
        v => v.serviceDate === formattedWeekDate(date),
      );
      console.log(getDailyfoodData);
      setDailyfoodData(
        getDailyfoodData?.length > 0 ? getDailyfoodData[0] : null,
      );
    }
  }, [dailyfoodDataList?.data?.dailyFoodsByDate, date]);

  const selectDate = isOrderMeal?.data?.filter(
    m => m.serviceDate === touchDate,
  );
  const toast = Toast();
  const pressDay = day => {
    setTouchDate(day ?? data);
  };

  const cancelMealPress = id => {
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
              Alert.alert('메뉴 취소', err?.toString()?.replace('error: ', ''));
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
              Alert.alert(
                '메뉴취소 불가',
                err.toString()?.replace('error: ', ''),
              );
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

  useEffect(() => {
    dailyfoodListRefetch();
  }, [dailyfoodListRefetch, isUserInfo]);
  useFocusEffect(
    useCallback(() => {
      if (isToday) {
        pressDay(formattedWeekDate(new Date()));
        pagerRef.current?.setPage(0);
      }
      setTouchDate(data);
    }, [isToday, data]),
  );
  return (
    <SafeView>
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
          isServiceDays={dailyfoodDataList?.data?.diningTypes}
        />
      </CalendarWrap>
      <ScrollView>
        <MealWrap>
          {/* qrCode */}
          {/* {now && (
            <>
              <QRButton
                onPress={() => {
                  setQrOpen(true);
                }}>
                <QrIcon />
              </QRButton>
              <QRCodeComponent modal={qrOpen} setModal={setQrOpen} />
            </>
          )} */}
          {touchDate ? (
            <>
              {selectDate?.map(s => {
                return s.orderItemDtoList?.map(sm => {
                  return (
                    <View key={sm.dailyFoodId}>
                      <DiningTimeWrap>
                        <DiningTime>
                          {formattedMonthDay(s.serviceDate)} {s.diningType}{' '}
                          {sm.deliveryTime}
                        </DiningTime>
                      </DiningTimeWrap>
                      <MealContentWrap>
                        {sm.dailyFoodStatus === 6 && <BlurView />}
                        {sm.dailyFoodStatus === 6 && (
                          <SoldOut soldOut={sm.dailyFoodStatus}>
                            마감됐어요
                          </SoldOut>
                        )}
                        <View>
                          {sm.dailyFoodStatus !== 6 && (
                            <DeadlineGuide>
                              <Typography
                                textColor={themeApp.colors.grey[0]}
                                text="SmallLabel">
                                {sm.lastOrderTime} 마감
                              </Typography>
                            </DeadlineGuide>
                          )}

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
                        </View>

                        <Content
                          onPress={() =>
                            navigation.navigate(MealDetailPageName, {
                              dailyFoodId: sm.dailyFoodId,
                              isMeal: true,
                            })
                          }>
                          <MakersName>{sm.makers}</MakersName>
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
                        {(sm.dailyFoodStatus === 1 ||
                          sm.dailyFoodStatus === 2) &&
                          sm.orderStatus === 5 && (
                            <CancelBtnWrap status={sm.orderStatus}>
                              <LabelButton
                                label={'취소'}
                                onPressEvent={() =>
                                  cancelMealPress(sm.id, s.serviceDate)
                                }
                                disabled={sm.orderStatus === 7}
                              />
                            </CancelBtnWrap>
                          )}
                        {(sm.dailyFoodStatus === 1 ||
                          sm.dailyFoodStatus === 2) &&
                          sm.orderStatus === 5 &&
                          sm.orderStatus !== 7 && (
                            <MealChangeWrap>
                              <LabelButton
                                label={'메뉴변경'}
                                onPressEvent={() =>
                                  changeMealPress(sm.id, s.serviceDate)
                                }
                              />
                            </MealChangeWrap>
                          )}
                      </MealContentWrap>
                    </View>
                  );
                });
              })}
            </>
          ) : (
            <>
              {selectDate &&
                selectDate.map((m, i) => {
                  return m.orderItemDtoList?.map((el, idx) => {
                    return (
                      <View key={i}>
                        <DiningTimeWrap>
                          <DiningTime>
                            {formattedMonthDay(m.serviceDate)} {m.diningType}
                            ・오늘
                          </DiningTime>
                        </DiningTimeWrap>
                        <MealContentWrap key={idx}>
                          {el.dailyFoodStatus === 6 && <BlurView />}
                          <View>
                            {el.dailyFoodStatus !== 6 && (
                              <DeadlineGuide>
                                <Typography
                                  textColor={themeApp.colors.grey[0]}
                                  text="SmallLabel">
                                  {el.lastOrderTime} 마감
                                </Typography>
                              </DeadlineGuide>
                            )}
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
                          </View>
                          <Content
                            onPress={() =>
                              navigation.navigate(MealDetailPageName, {
                                dailyFoodId: el.dailyFoodId,
                              })
                            }>
                            <MakersName>{el.makers}</MakersName>
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
                          {(el.dailyFoodStatus === 1 ||
                            el.dailyFoodStatus === 2) &&
                            el.orderStatus === 5 && (
                              <CancelBtnWrap status={el.orderStatus}>
                                <LabelButton
                                  label={'취소'}
                                  onPressEvent={() => cancelMealPress(el.id)}
                                  disabled={el.orderStatus === 7}
                                />
                              </CancelBtnWrap>
                            )}
                          {(el.dailyFoodStatus === 1 ||
                            el.dailyFoodStatus === 2) &&
                            el.orderStatus === 5 &&
                            el.orderStatus !== 7 && (
                              <MealChangeWrap>
                                <LabelButton
                                  label={'메뉴변경'}
                                  onPressEvent={() => changeMealPress(el.id)}
                                />
                              </MealChangeWrap>
                            )}
                        </MealContentWrap>
                      </View>
                    );
                  });
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
            console.log(touchDate, 'touchDate');
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
const SoldOut = styled(Typography).attrs({text: 'Title04SB'})`
  position: absolute;
  left: ${({rank}) => (rank === 1 ? '17px' : '15px')};
  top: ${({rank}) => (rank === 1 ? '60%' : '55%')};
  color: ${props => props.theme.colors.grey[4]};
  z-index: 1000;
`;
const SafeView = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.grey[0]};
  flex: 1;
`;
const BlurView = styled.View`
  position: absolute;
  width: 107px;
  height: 107px;
  border-radius: 7px;
  left: 0px;
  top: 24px;
  background-color: #ffffffcc;
  z-index: 999;
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
  white-space: nowrap;
  text-overflow: ellipsis;
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
const PlusIcon = styled(Plus)`
  position: absolute;
  bottom: 20px;
  left: 18px;
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
const DeadlineGuide = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 107px;
  height: 24px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  left: 0px;
  background: #1d1c2180;
  z-index: 999;
`;

const QRButton = styled.Pressable`
  position: absolute;
  background-color: ${({theme}) => theme.colors.grey[8]};
  border-radius: 8px;
  padding: 4px 8px;
  right: 0px;
  top: 24px;
  z-index: 999;
`;
