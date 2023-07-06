/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/order */
import {Slider} from '@miblanchard/react-native-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import Animateds from 'react-native-reanimated';
import styled, {css} from 'styled-components/native';

import QuestionCircleMonoIcon from '../../../../../assets/icons/QuestionCircleMonoIcon.svg';
import useAuth from '../../../../../biz/useAuth';
import {weekAtom, weekServiceAtom} from '../../../../../biz/useBanner/store';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import Balloon from '../../../../../components/Balloon';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import BuyCalendar2 from '../../../../../components/BuyCalendar2';
import Typography from '../../../../../components/Typography';
import {useGetDailyfood} from '../../../../../hook/useDailyfood';
import {
  useAddShoppingBasket,
  useGetShoppingBasket,
} from '../../../../../hook/useShoppingBasket';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
// import TossPayment from 'react-native-toss-payments';

import Modal from '../components/Modal';
import {useTheme} from 'styled-components';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useGetOrderMeal} from '../../../../../hook/useOrder';
import {diningTimeFoodAtom} from '../../../../../biz/useDailyFood/store';
import BuyMealPage from '../components/BuyMealPage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {getStorage, setStorage} from '../../../../../utils/asyncStorage';
import {goNextPage, goPrevPage} from '../util/movePage';
import {foodDeliveryTimeFilter, getTime} from '../util/time';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const AnimatedPagerView = Animateds.createAnimatedComponent(PagerView);

const Pages = ({route}) => {
  const params = route.params;
  const navigation = useNavigation();
  const diningRef = useRef();
  const MorningRef = useRef();
  const LunchRef = useRef();
  const DinnerRef = useRef();
  const pager = useRef();
  const themeApp = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [time, setTime] = useState('25:00');
  const [modalVisible4, setModalVisible4] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);
  const [nowPage, setNowPage] = useState(1);
  const [selectFood, setSelectFood] = useState();
  const [show, setShow] = useState(false);
  const [scrollDir, setScrollDir] = useState(true);
  const [hideModal, setHideModal] = useState(true);
  const [cartDailyFoodId, setCartDailyFoodId] = useState();
  const [orderDailyFoodId, setOrderDailyFoodId] = useState();

  const fadeAnim = useRef(new Animated.Value(32)).current;
  const [weekly] = useAtom(weekAtom);
  const [weeklyService, setWeeklyService] = useAtom(weekServiceAtom);
  const [diningTime, setDiningTime] = useAtom(diningTimeFoodAtom);
  const {data: isOrderMeal} = useGetOrderMeal(
    formattedWeekDate(weekly[0][0]),
    formattedWeekDate(
      weekly[weekly.length - 1][weekly[weekly.length - 1].length - 1],
    ),
  );
  const {
    readableAtom: {userRole},
  } = useAuth();

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

  const {data: isLoadMeal} = useGetShoppingBasket();
  const {mutateAsync: addMeal, isLoading: isAddMeal} = useAddShoppingBasket();
  const {balloonEvent, BalloonWrap} = Balloon();
  const {data: isUserInfo} = useGetUserInfo();
  const timeRef = useRef(null);

  const DININGTYPE = ['아침', '점심', '저녁'];

  const [date, setDate] = useState(
    params?.refundDate ? params?.refundDate : formattedWeekDate(new Date()),
  );
  useEffect(() => {
    if (params?.date) {
      setDate(params.date);
      dailyfoodRefetch();
    }
  }, [dailyfoodRefetch, params, userRole]);
  useEffect(() => {
    if (userRole === 'ROLE_GUEST') {
      return setWeeklyService(
        weekly
          .map(week => {
            const data = week.filter(day => {
              return ['월', '화', '수', '목', '금'].includes(
                format(day, 'EEE', {locale: ko}),
              );
            });
            return data;
          })
          .reduce(function (acc, cur) {
            return acc.concat(cur);
          })
          .filter(v => {
            return (
              formattedWeekDate(new Date()) <= formattedWeekDate(new Date(v))
            );
          }),
      );
    } else
      setWeeklyService(
        weekly
          .map(week => {
            const data = week.filter(day => {
              return (
                dailyfoodData?.data?.serviceDays?.lunchServiceDays?.includes(
                  format(day, 'EEE', {locale: ko}),
                ) ||
                dailyfoodData?.data?.serviceDays?.morningServiceDays?.includes(
                  format(day, 'EEE', {locale: ko}),
                ) ||
                dailyfoodData?.data?.serviceDays?.dinnerServiceDays?.includes(
                  format(day, 'EEE', {locale: ko}),
                )
              );
            });
            return data;
          })
          .reduce(function (acc, cur) {
            return acc.concat(cur);
          })
          .filter(v => {
            return (
              formattedWeekDate(new Date()) <= formattedWeekDate(new Date(v))
            );
          }),
      );
  }, [
    dailyfoodData?.data?.serviceDays?.dinnerServiceDays,
    dailyfoodData?.data?.serviceDays?.lunchServiceDays,
    dailyfoodData?.data?.serviceDays?.morningServiceDays,
    setWeeklyService,
    userRole,
    weekly,
  ]);

  const [supportPrice, setSupportPrice] = useState(0);
  const [whenSupportPriceKor, setWhenSupportPriceKor] = useState(false);

  const [showSupportPrice, setShowSupportPrice] = useState(false);

  useEffect(() => {
    if (parseInt(supportPrice, 10) || supportPrice === '0') {
      // 숫자이면
      if (parseInt(supportPrice, 10) >= 0) {
        setShowSupportPrice(true);
        setWhenSupportPriceKor(false);
      } else {
        setShowSupportPrice(false);
      }
    } else {
      // 널 이냐 한국어이냐
      if (typeof supportPrice === 'string') {
        // 한국어 일때
        setWhenSupportPriceKor(true);
        setShowSupportPrice(true);
      } else {
        // null일떄
        setShowSupportPrice(false);
      }
    }
  }, [supportPrice]);
  useEffect(() => {
    const cart = isLoadMeal?.data?.spotCarts
      .map(data => {
        return data.cartDailyFoodDtoList
          .map(el => el.cartDailyFoods.map(c => c.dailyFoodId).flat())
          .flat();
      })
      .flat();

    setCartDailyFoodId(cart);
  }, [isLoadMeal?.data?.spotCarts]);
  useEffect(() => {
    const orderMealData = isOrderMeal?.data
      .map(meal => {
        return meal.orderItemDtoList
          .map(data => {
            return data.dailyFoodId;
          })
          .flat();
      })
      .flat();
    setOrderDailyFoodId(orderMealData);
  }, [isOrderMeal?.data]);
  const daily = true;

  const spotId = userRole === 'ROLE_GUEST' ? 1 : isUserInfo?.data?.spotId;
  // console.log(userRole);
  const {
    data: dailyfoodData,
    refetch: dailyfoodRefetch,
    isFetching: dailyFetching,
  } = useGetDailyfood(spotId, params?.date ? params.date : date, userRole);

  const handlePress = anim => {
    Animated.timing(fadeAnim, {
      toValue: !anim ? 0 : 32,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setScrollDir(prev => !prev);
  };

  const onPageScroll2 = e => {
    const {position, offset} = e.nativeEvent;
    navigation.setParams({
      date: null,
    });
    if (Platform.OS === 'android') {
      if (offset === 0) {
        if (nowPage === position) {
          if (position === 2) {
            goNextPage(
              weekly,
              weeklyService,
              date,
              setDate,
              pager,
              setNowPage,
              isDiningTypes,
            );
          }
          if (position === 0) {
            goPrevPage(
              weekly,
              weeklyService,
              date,
              position,
              setDate,
              pager,
              setNowPage,
              isDiningTypes,
            );
          }
        }
        setNowPage(position);
      }
    } else {
      if (offset !== 0) {
        if (position === 2) {
          goNextPage(
            weekly,
            weeklyService,
            date,
            setDate,
            pager,
            setNowPage,
            isDiningTypes,
          );
        }
        if (position === -1) {
          goPrevPage(
            weekly,
            weeklyService,
            date,
            position,
            setDate,
            pager,
            setNowPage,
            isDiningTypes,
          );
        }
      }
    }
  };

  const onPageScroll = e => {
    navigation.setParams({
      date: null,
    });
    const {position} = e.nativeEvent;
    if (
      isDiningTypes?.length > 0 &&
      isDiningTypes[0] &&
      ((isMorningFood.length === 0 && position === 0) ||
        (isLunchFood.length === 0 && position === 1) ||
        (isDinnerFood.length === 0 && position === 2))
    ) {
      const page =
        position === 0
          ? isDiningTypes?.includes(1)
            ? 0
            : isDiningTypes?.includes(2)
            ? 1
            : isDiningTypes?.includes(3)
            ? 2
            : 0
          : position === 1
          ? isDiningTypes?.includes(2)
            ? 1
            : isDiningTypes?.includes(3)
            ? 2
            : isDiningTypes?.includes(1)
            ? 0
            : 1
          : position === 2 && isDiningTypes?.includes(3)
          ? 2
          : isDiningTypes?.includes(2)
          ? 1
          : isDiningTypes?.includes(1)
          ? 0
          : 2;
      if (page !== position) {
        if (position === 2) {
          goNextPage(
            weekly,
            weeklyService,
            date,
            setDate,
            pager,
            setNowPage,
            isDiningTypes,
          );
        }
        if (position === 0) {
          goPrevPage(
            weekly,
            weeklyService,
            date,
            position,
            setDate,
            pager,
            setNowPage,
            isDiningTypes,
          );
        }
        diningRef.current.setPage(page);
        setSliderValue(page);
      } else {
        setSliderValue(page);
      }
    } else {
      setSliderValue(position);
    }
    MorningRef?.current?.scrollTo({x: 0, y: 0, animated: false});
    LunchRef?.current?.scrollTo({x: 0, y: 0, animated: false});
    DinnerRef?.current?.scrollTo({x: 0, y: 0, animated: false});
    setScrollDir(true);
    handlePress(true);
  };

  const dayPress = async selectedDate => {
    try {
      if (params?.date) {
        navigation.setParams({
          date: null,
        });
      }
      setDate(selectedDate);
    } catch (err) {
      Alert.alert('날짜 선택', err?.toString()?.replace('error: ', ''));
    }
  };

  const openModal = async diningType => {
    if (diningType === 1) {
      return setModalVisible(true);
    }
    if (diningType === 2) {
      return setModalVisible2(true);
    }
    if (diningType === 3) {
      return setModalVisible3(true);
    }
  };
  const isGuest = () => {
    if (userRole === 'ROLE_GUEST') {
      return Alert.alert(
        '로그인이 필요합니다',
        '해당 기능은 로그인 이후 사용할수 있습니다.',
        [
          {
            text: '취소',
            onPress: () => {},
          },
          {
            text: '확인',
            onPress: async () => {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: LoginPageName,
                  },
                ],
              });
            },
            style: 'destructive',
          },
        ],
      );
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalVisible2(false);
    setModalVisible3(false);
  };

  useEffect(() => {
    if (date && isUserInfo?.data) dailyfoodRefetch();
  }, [dailyfoodRefetch, date, isUserInfo?.data]);

  useEffect(() => {
    let price = null;
    if (dailyfoodData?.data.supportPrice) {
      switch (sliderValue) {
        case 0:
          price = dailyfoodData?.data.supportPrice.morningSupportPrice;
          break;
        case 1:
          price = dailyfoodData?.data.supportPrice.lunchSupportPrice;
          break;
        case 2:
          price = dailyfoodData?.data.supportPrice.dinnerSupportPrice;
          break;
      }

      setSupportPrice(price);
    }
    const diningTimes = dailyfoodData?.data.diningTypes.filter(
      v => v.diningType === sliderValue + 1,
    );
    const timeSetting = async () => {
      if (!dailyfoodData?.data) return;
      const times = await getTime(
        isUserInfo?.data,
        dailyfoodData?.data.diningTypes,
        sliderValue,
      );
      setTime(times);
    };
    if (isLunchFood || isMorningFood || isDinnerFood) timeSetting();
    if (diningTimes?.length > 0) {
      setDiningTime(
        diningTimes[0].times.map(t => {
          return {id: t, value: t};
        }),
      );
    }
  }, [
    dailyfoodData?.data.diningTypes,
    dailyfoodData?.data.supportPrice,
    isUserInfo?.data,
    setDiningTime,
    sliderValue,
    time.diningType,
  ]);
  useEffect(() => {
    if (
      diningTime.length > 0 &&
      time !== '25:00' &&
      timeRef?.current &&
      diningRef?.current
    ) {
      const getTimeIndex = diningTime.findIndex(v => {
        return v.value === time;
      });
      if (getTimeIndex !== -1)
        timeRef.current.scrollToIndex({
          animated: true,
          index: getTimeIndex,
        });
    }

    const lunchData = dailyfoodData?.data.dailyFoodDtos.filter(
      x => x.diningType === 2,
    );
    const morningData = dailyfoodData?.data.dailyFoodDtos.filter(
      x => x.diningType === 1,
    );
    const dinnerData = dailyfoodData?.data.dailyFoodDtos.filter(
      x => x.diningType === 3,
    );
    foodDeliveryTimeFilter(lunchData, time, setLunch);
    foodDeliveryTimeFilter(morningData, time, setMorning);
    foodDeliveryTimeFilter(dinnerData, time, setDinner);
  }, [
    diningTime,
    time,
    dailyfoodData?.data.dailyFoodDtos,
    setLunch,
    setMorning,
    setDinner,
  ]);
  useEffect(() => {
    setMorning(
      dailyfoodData?.data.dailyFoodDtos.filter(x => x.diningType === 1),
    );
    setLunch(dailyfoodData?.data.dailyFoodDtos.filter(x => x.diningType === 2));
    setDinner(
      dailyfoodData?.data.dailyFoodDtos.filter(x => x.diningType === 3),
    );
    setDiningTypes(
      dailyfoodData?.data.diningTypes.map(dining => dining.diningType),
    );
  }, [dailyfoodData?.data, setDiningTypes, setDinner, setLunch, setMorning]);

  const addCartPress = async (id, day, type, m) => {
    const diningType = type;
    const duplication = isLoadMeal?.data?.spotCarts
      ?.map(v =>
        v.cartDailyFoodDtoList.map(el =>
          el.cartDailyFoods.some(c => c.dailyFoodId === id),
        ),
      )
      .flat();

    if (duplication?.includes(true)) {
      await openModal(diningType);
      setSelectFood({
        id: id,
      });
    } else {
      await addToCart(id, m);
    }
  };
  const addToCart = async id => {
    isGuest();
    try {
      await addMeal([
        {
          dailyFoodId: id,
          count: 1,
          spotId: isUserInfo?.data?.spotId,
          deliveryTime: time,
        },
      ]);
      setShow(true);
      balloonEvent();
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      Alert.alert('장바구니 담기', err?.toString()?.replace('error: ', ''));
    }
    closeModal();
  };
  const mealData = {
    isMorningFood: isMorningFood,
    setModalVisible: setModalVisible,
    isLunchFood: isLunchFood,
    setModalVisible2: setModalVisible2,
    isDinnerFood: isDinnerFood,
    setModalVisible3: setModalVisible3,
    modalVisible: modalVisible,
    modalVisible2: modalVisible2,
    modalVisible3: modalVisible3,
    MorningRef: MorningRef,
    LunchRef: LunchRef,
    DinnerRef: DinnerRef,
    setScrollDir: setScrollDir,
    spotId: spotId,
    hideModal: hideModal,
    orderDailyFoodId: orderDailyFoodId,
    cartDailyFoodId: cartDailyFoodId,
    isAddMeal: isAddMeal,
    navigation: navigation,
    addCartPress: addCartPress,
    closeModal: closeModal,
    addToCart: addToCart,
    selectFood: selectFood,
    handlePress: handlePress,
    time: time,
  };

  return (
    <SafeView>
      <CalendarWrap>
        <BuyCalendar2
          BooleanValue={false}
          type={'grey2'}
          color={'white'}
          size={'Body05R'}
          onPressEvent2={dayPress}
          daily={daily}
          selectDate={date}
          margin={'0px 28px'}
          scrollDir={scrollDir}
          pagerRef={pager}
          sliderValue={sliderValue}
          isServiceDays={dailyfoodData?.data.serviceDays}
        />
      </CalendarWrap>
      <PagerViewWrap isMembership={isUserInfo?.data?.isMembership}>
        {!isDailyFoodLoading && (
          <StatusWrap showSupportPrice={showSupportPrice}>
            <ProgressWrap>
              <Progress>
                {DININGTYPE.map((btn, i) => {
                  const type = btn === '아침' ? 1 : btn === '점심' ? 2 : 3;
                  const typeBoolean = isDiningTypes?.includes(type);
                  return (
                    <DiningPress
                      key={i}
                      disabled={!isDailyFoodLoading && !typeBoolean && true}
                      onPress={() => {
                        diningRef.current.setPage(i);
                        setSliderValue(i);
                      }}>
                      <ProgressText type={typeBoolean} index={i}>
                        {btn}
                      </ProgressText>
                    </DiningPress>
                  );
                })}
              </Progress>
              <View style={{position: 'relative', top: -10}}>
                <Slider
                  value={sliderValue}
                  onValueChange={e => setSliderValue(...e)}
                  minimumValue={0}
                  maximumValue={2}
                  maximumTrackTintColor="#fff"
                  minimumTrackTintColor="#fff"
                  onSlidingComplete={e => {
                    diningRef.current.setPage(...e);
                  }}
                  step={1}
                  trackStyle={styles.trackStyle}
                  thumbStyle={styles.thumbStyle}
                />
              </View>
            </ProgressWrap>
            <HeaderWrap
              colors={[
                'rgba(255, 255, 255, 0.0)',
                'rgba(255, 255, 255, 0.2)',
                'rgba(255, 255, 255, 0.5)',
                'rgba(255, 255, 255, 0.7)',
                'rgba(255, 255, 255, 0.8)',
                'rgba(255, 255, 255, 0.9)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
              ]}
              useAngle={true}
              angle={90}
            />
            <TimeWrap
              ref={timeRef}
              showsHorizontalScrollIndicator={false}
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  timeRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
              horizontal={true}
              data={diningTime}
              renderItem={({item, index}) => {
                if (diningTime?.length - 1 === index) {
                  return (
                    <TimeBoxlast
                      isSelect={time === item.value}
                      onPress={async () => {
                        const selectTime = await getTime(
                          isUserInfo?.data,
                          dailyfoodData?.data.diningTypes,
                          sliderValue,
                          item.value,
                        );
                        console.log(selectTime);
                        setTime(selectTime);
                        timeRef.current.scrollToIndex({
                          animated: true,
                          index: index,
                        });
                      }}>
                      <Typography
                        text={time === item.value ? 'Body06SB' : 'Body06R'}
                        textColor={
                          time === item.value
                            ? themeApp.colors.grey[0]
                            : themeApp.colors.grey[4]
                        }>
                        {item.value}
                      </Typography>
                    </TimeBoxlast>
                  );
                }
                return (
                  <TimeBox
                    isSelect={time === item.value}
                    onPress={async () => {
                      const selectTime = await getTime(
                        isUserInfo?.data,
                        dailyfoodData?.data.diningTypes,
                        sliderValue,
                        item.value,
                      );
                      setTime(selectTime);
                      timeRef.current.scrollToIndex({
                        animated: true,
                        index: index,
                      });
                    }}>
                    <Typography
                      text={time === item.value ? 'Body06SB' : 'Body06R'}
                      textColor={
                        time === item.value
                          ? themeApp.colors.grey[0]
                          : themeApp.colors.grey[4]
                      }>
                      {item.value}
                    </Typography>
                  </TimeBox>
                );
              }}
              keyExtractor={item => item.id}
            />
          </StatusWrap>
        )}
        {showSupportPrice && (
          <MiniWrap
            onPress={() => {
              setModalVisible4(true);
            }}>
            <SupportPriceInfoWrap>
              <Typography22>일일 식사지원금</Typography22>
              <QuestionPressable>
                <QuestionCircleMonoIcon />
              </QuestionPressable>
            </SupportPriceInfoWrap>
            {whenSupportPriceKor ? (
              <Typography4>{supportPrice}</Typography4>
            ) : (
              <Typography3> {supportPrice}원</Typography3>
            )}
          </MiniWrap>
        )}
        {!isUserInfo?.data?.isMembership && (
          <View>
            <Modal hideModal={hideModal} setHideModal={setHideModal} />
          </View>
        )}
        {!isUserInfo?.data || dailyFetching ? (
          <LoadingPage>
            <ActivityIndicator size={'large'} />
          </LoadingPage>
        ) : (
          <GestureHandlerRootView style={{flex: 1}}>
            <Pager
              ref={diningRef}
              overdrag={true}
              initialPage={nowPage}
              overScrollMode={'always'}
              onPageScroll={onPageScroll2}
              onPageSelected={e => {
                onPageScroll(e);
              }}>
              <BuyMealPage diningFood={isMorningFood} mealData={mealData} />
              <BuyMealPage diningFood={isLunchFood} mealData={mealData} />
              <BuyMealPage diningFood={isDinnerFood} mealData={mealData} />
            </Pager>
          </GestureHandlerRootView>
        )}
      </PagerViewWrap>

      {show && (
        <BalloonWrap
          message={'장바구니에 담았어요'}
          horizontal={'right'}
          size={'B'}
          location={{top: '8px', right: '16px'}}
        />
      )}
      <ButtonWrap
        colors={[
          'rgba(255, 255, 255, 0.0)',
          'rgba(255, 255, 255, 0.0)',
          'rgba(255, 255, 255, 0.0)',
          'rgba(255, 255, 255, 0.5)',
          'rgba(255, 255, 255, 0.7)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
        ]}
        useAngle={true}
        angle={180}>
        <Button
          label={'장바구니 보기'}
          type={'yellow'}
          onPressEvent={() => {
            isGuest();
            navigation.navigate(MealCartPageName);
          }}
        />
      </ButtonWrap>
      <BottomModal
        modalVisible={modalVisible4}
        setModalVisible={setModalVisible4}
        title={'지원금이란?'}
        description={
          '고객님의 스팟에서 지원하는 지원금입니다. \n결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'
        }
        buttonTitle1={'확인했어요'}
        buttonType1="grey7"
        onPressEvent1={() => {
          setModalVisible4(false);
        }}
      />
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
  ${({index}) => {
    if (index === 1) {
      return css`
        margin-left: 12px;
        margin-right: 12px;
      `;
    }
  }}
`;

const Typography4 = styled(Typography).attrs({text: 'Body05SB'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[2]};
  font-size: 14px;
  font-weight: 600;
`;

const DiningPress = styled.Pressable``;
