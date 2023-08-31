/* eslint-disable import/order */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useRef, useState, useEffect} from 'react';
import {View, Alert, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import Animateds from 'react-native-reanimated';
import styled, {css} from 'styled-components/native';

import QuestionCircleMonoIcon from '../../../../../assets/icons/QuestionCircleMonoIcon.svg';
import useAuth from '../../../../../biz/useAuth';
import {
  foodDetailDataAtom,
  weekAtom,
  weekServiceAtom,
} from '../../../../../biz/useBanner/store';
import Balloon from '../../../../../components/Balloon';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import BuyCalendar2 from '../../../../../components/BuyCalendar2';
import Typography from '../../../../../components/Typography';
import {
  useGetDailyfoodDateList,
  useGetDailyfoodDetail,
  useGetDailyfoodList,
} from '../../../../../hook/useDailyfood';
import {
  useAddShoppingBasket,
  useGetShoppingBasket,
} from '../../../../../hook/useShoppingBasket';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import {PAGE_NAME as MembershipIntro} from '../../../../Membership/MembershipIntro';
// import TossPayment from 'react-native-toss-payments';

import Modal from '../components/Modal';
import {useTheme} from 'styled-components';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useGetOrderMeal} from '../../../../../hook/useOrder';
import {diningTimeFoodAtom} from '../../../../../biz/useDailyFood/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {getTime} from '../util/time';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';
import withCommas from '../../../../../utils/withCommas';
import OuterPagerView from '../components/OuterPagerView';

export const PAGE_NAME = 'BUY_MEAL_PAGE';
const {width} = Dimensions.get('screen');

const Pages = ({route}) => {
  const params = route.params;
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const pager = useRef();
  const themeApp = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisibleMembership, setModalVisibleMembership] = useState(false);
  const [time, setTime] = useState();
  const [foodDetailData, setFoodDetailData] = useAtom(foodDetailDataAtom);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [diningDisabled, setDiningDisabled] = useState(false);
  const [nowPage, setNowPage] = useState(0);
  const [selectFood, setSelectFood] = useState();
  const [nowDiningType, setNowDiningType] = useState();
  const [show, setShow] = useState(false);
  const [scrollDir, setScrollDir] = useState(true);
  const [hideModal, setHideModal] = useState(true);
  const [cartDailyFoodId, setCartDailyFoodId] = useState();
  const [orderDailyFoodId, setOrderDailyFoodId] = useState();
  const [dailyfoodId, setDailyfoodId] = useState();
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

  const {data: isLoadMeal} = useGetShoppingBasket();
  const {mutateAsync: addMeal, isLoading: isAddMeal} = useAddShoppingBasket();
  const {balloonEvent, BalloonWrap} = Balloon();
  const {data: isUserInfo} = useGetUserInfo();
  const timeRef = useRef(null);

  const DININGTYPE = ['아침', '점심', '저녁'];

  const [date, setDate] = useState(
    params?.date ? params?.date : formattedWeekDate(new Date()),
  );

  const [supportPrice, setSupportPrice] = useState(0);
  const [whenSupportPriceKor, setWhenSupportPriceKor] = useState(false);

  const [showSupportPrice, setShowSupportPrice] = useState(false);

  const daily = true;

  const spotId = userRole === 'ROLE_GUEST' ? 1 : isUserInfo?.data?.spotId;

  // const {data: dailyfoodDataList} = useGetDailyfoodList(
  //   spotId,
  //   formattedWeekDate(new Date()),
  //   formattedWeekDate(weekly[weekly.length - 1][weekly[0].length - 1]),
  //   userRole,
  // );
  const {isFetching: detailFetching} = useGetDailyfoodDetail(
    dailyfoodId,
    userRole,
  );
  const {data: dailyfoodDataDateList} = useGetDailyfoodDateList(
    spotId,
    formattedWeekDate(new Date()),
    formattedWeekDate(weekly[weekly.length - 1][weekly[0].length - 1]),
    userRole,
  );

  const dayPress = async selectedDate => {
    try {
      setDiningDisabled(true);
      if (params?.date) {
        navigation.setParams({
          date: null,
        });
      }
      setDate(selectedDate);
      const index = dailyfoodDataDateList?.data?.dailyFoodGroupByDate.findIndex(
        dailyFood => dailyFood.serviceDate === selectedDate,
      );
      setNowPage(index);
    } catch (err) {
      Alert.alert('날짜 선택', err?.toString()?.replace('error: ', ''));
    } finally {
      setDiningDisabled(false);
    }
  };

  const openModal = async () => {
    if (nowDiningType === 1) {
      return setModalVisible(true);
    }
    if (nowDiningType === 2) {
      return setModalVisible2(true);
    }
    if (nowDiningType === 3) {
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
    const serviceDining = dailyfoodDataDateList?.data?.diningTypes
      .map(dining => dining.diningType)
      .filter(v => v);
    if (serviceDining) setNowDiningType(serviceDining[0]);
  }, [dailyfoodDataDateList?.data]);

  useEffect(() => {
    const selectDay = format(new Date(date), 'EEE', {locale: ko});
    const dateIndex = weeklyService.findIndex(s => {
      return formattedWeekDate(s) === formattedWeekDate(date);
    });
    if (dateIndex !== -1) {
      setNowPage(dateIndex);
    }
    const nowDining = dailyfoodDataDateList?.data?.diningTypes.find(
      v => v.diningType === nowDiningType,
    );
    if (nowDining) {
      const supportPrices = nowDining?.supportPriceByDays?.filter(
        v => v.day === selectDay,
      );
      if (supportPrices?.length > 0) {
        const dailyFoodDtos = dailyfoodDataDateList?.data?.dailyFoodGroupByDate[
          nowPage
        ].dailyFoodDtos.find(v => {
          return v.diningType === nowDiningType;
        });
        setSupportPrice(
          dailyFoodDtos.supportPrice || dailyFoodDtos.supportPrice === 0
            ? dailyFoodDtos.supportPrice
            : supportPrices[0].supportPrice,
        );
      }
    }
    const diningTimes = dailyfoodDataDateList?.data?.diningTypes.filter(
      v => v.diningType === nowDiningType,
    );
    const timeSetting = async () => {
      if (!dailyfoodDataDateList) return;
      const times = await getTime(
        isUserInfo?.data.spotId,
        dailyfoodDataDateList?.data?.diningTypes,
        nowDiningType,
      );
      setTime(times);
    };
    if (nowDiningType) {
      timeSetting();
    }
    if (diningTimes?.length > 0) {
      setDiningTime(
        diningTimes[0].times.map(t => {
          return {id: t, value: t};
        }),
      );
    }
  }, [
    dailyfoodDataDateList,
    date,
    isUserInfo?.data,
    nowDiningType,
    nowPage,
    setDiningTime,
    weeklyService,
  ]);
  useEffect(() => {
    console.log(supportPrice, 'supportPrice');
    if (
      parseInt(supportPrice, 10) ||
      supportPrice === '0' ||
      supportPrice === 0
    ) {
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
    } else {
      setWeeklyService(
        weekly
          .map(week => {
            const data = week.filter(day => {
              const dailyfood = dailyfoodDataDateList?.data?.diningTypes.map(
                v => {
                  if (
                    v.serviceDays?.length > 0 &&
                    v.serviceDays.includes(format(day, 'EEE', {locale: ko}))
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                },
              );
              return dailyfood?.length > 0 ? dailyfood[0] : false;
            });
            // console.log(data);
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
    }
  }, [dailyfoodDataDateList?.data, setWeeklyService, userRole, weekly]);
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
      await openModal();
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
      Alert.alert('장바구니 담기', err?.toString()?.replace('error: ', ''), [
        {
          text: '확인',
        },
      ]);
    }
    closeModal();
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
          nowPage={nowDiningType}
          isServiceDays={dailyfoodDataDateList?.data?.diningTypes}
        />
      </CalendarWrap>
      <PagerViewWrap isMembership={isUserInfo?.data?.isMembership}>
        <StatusWrap showSupportPrice={showSupportPrice}>
          <ProgressWrap>
            <Progress>
              {DININGTYPE.map((btn, i) => {
                const type = btn === '아침' ? 1 : btn === '점심' ? 2 : 3;
                const typeBoolean = dailyfoodDataDateList?.data?.diningTypes
                  .map(dining => dining.diningType)
                  ?.includes(type);
                return (
                  <DiningPress
                    key={i}
                    index={i}
                    disabled={diningDisabled || (!typeBoolean && true)}
                    onPress={() => {
                      setNowDiningType(type);
                      const diningIndex =
                        dailyfoodDataDateList?.data?.diningTypes.findIndex(
                          dining => dining.diningType === type,
                        );
                      scrollViewRef.current.scrollTo({
                        x: width * (diningIndex + 1),
                        animated: false,
                      });
                    }}>
                    <ProgressText type={typeBoolean}>{btn}</ProgressText>
                    {nowDiningType === type && <SelectLine />}
                  </DiningPress>
                );
              })}
            </Progress>
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
          {time && (
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
                          isUserInfo?.data.spotId,
                          dailyfoodDataDateList?.data?.diningTypes,
                          nowDiningType,
                          item.value,
                        );
                        // console.log(selectTime);
                        setTime(selectTime);
                        timeRef?.current?.scrollToIndex({
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
                        isUserInfo?.data.spotId,
                        dailyfoodDataDateList?.data?.diningTypes,
                        nowDiningType,
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
          )}
        </StatusWrap>
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
              <Typography3> {withCommas(supportPrice)}원</Typography3>
            )}
          </MiniWrap>
        )}
        {!isUserInfo?.data?.isMembership && (
          <View>
            <Modal
              hideModal={hideModal}
              setHideModal={setHideModal}
              setModalVisible2={setModalVisibleMembership}
            />
          </View>
        )}

        {dailyfoodDataDateList?.data?.diningTypes?.length > 0 && (
          <GestureHandlerRootView style={{flex: 1}}>
            <OuterPagerView
              scrollViewRef={scrollViewRef}
              userinfo={isUserInfo?.data}
              dailyFood={dailyfoodDataDateList?.data?.dailyFoodGroupByDate}
              selectedDate={date}
              nowPage={nowPage}
              setSelectedDate={setDate}
              setNowPage={setNowPage}
              pager={pager}
              weekly={weekly}
              setDailyfoodId={setDailyfoodId}
              isAddMeal={isAddMeal}
              nowDiningType={nowDiningType}
              setNowDiningType={setNowDiningType}
              isDiningTypes={dailyfoodDataDateList?.data?.diningTypes.map(
                dining => dining.diningType,
              )}
              time={time}
              orderDailyFoodId={orderDailyFoodId}
              cartDailyFoodId={cartDailyFoodId}
              detailFetching={detailFetching}
              addCartPress={addCartPress}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              modalVisible2={modalVisible2}
              setModalVisible2={setModalVisible2}
              modalVisible3={modalVisible3}
              setModalVisible3={setModalVisible3}
              closeModal={closeModal}
              addToCart={addToCart}
              selectFood={selectFood}
              navigation={navigation}
            />
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
        modalVisible={modalVisibleMembership}
        setModalVisible={setModalVisibleMembership}
        title={`기업멤버십에 가입되어 있어요.`}
        description={
          '이미 멤버십 혜택이 적용 중이에요.\n개인멤버십 가입을 추가로 진행 할까요?'
        }
        buttonTitle1={'취소'}
        buttonType1="grey7"
        buttonTitle2={'확인'}
        buttonType2="grey2"
        onPressEvent1={() => setModalVisibleMembership(false)}
        onPressEvent2={() => {
          navigation.navigate(MembershipIntro, {
            isFounders: isUserInfo?.data?.leftFoundersNumber > 0,
          });
        }}
      />
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
  justify-content: space-between;
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
  margin-bottom: 11.5px;
`;

const Typography4 = styled(Typography).attrs({text: 'Body05SB'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[2]};
  font-size: 14px;
  font-weight: 600;
`;

const DiningPress = styled.Pressable`
  align-items: center;

  ${({index}) => {
    if (index === 1) {
      return css`
        margin-left: 12px;
        margin-right: 12px;
      `;
    }
  }}
`;
const SelectLine = styled.View`
  width: 16px;
  height: 1.5px;
  background-color: ${({theme}) => theme.colors.grey[2]};
`;
