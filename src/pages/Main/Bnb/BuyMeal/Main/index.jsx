import {Slider} from '@miblanchard/react-native-slider';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAtom, useAtomValue} from 'jotai';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import Animateds, {useEvent, useHandler} from 'react-native-reanimated';

import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import styled, {css} from 'styled-components/native';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import {isUserInfoAtom} from '../../../../../biz/useUserInfo/store';
import Balloon from '../../../../../components/Balloon';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import CalendarButton from '../../../../../components/CalendarButton';
import Calendar from '../../../../../components/Calendar';
import Label from '../../../../../components/Label';
import Typography from '../../../../../components/Typography';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import useAuth from '../../../../../biz/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import TossPayment from 'react-native-toss-payments';
import LinearGradient from 'react-native-linear-gradient';
import MealImage from '../components/MealImage';
import Modal from '../components/Modal';

import QuestionCircleMonoIcon from '../../../../../assets/icons/QuestionCircleMonoIcon.svg';
import useSupportPrices from '../../../../../biz/useSupportPrice/hook';
import {weekAtom} from '../../../../../biz/useBanner/store';
import {supportPriceAtom} from '../../../../../biz/useSupportPrice/store';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const AnimatedPagerView = Animateds.createAnimatedComponent(PagerView);

const Pages = ({route}) => {
  const params = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const diningRef = useRef();
  const MorningRef = useRef();
  const LunchRef = useRef();
  const DinnerRef = useRef();
  const pager = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [startScroll, setStartScroll] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const [nowPage, setNowPage] = useState(1);
  const [selectFood, setSelectFood] = useState();
  const [show, setShow] = useState(false);
  const [scrollDir, setScrollDir] = useState(true);
  const [hideModal, setHideModal] = useState(true);
  const {
    readableAtom: {userRole},
  } = useAuth();

  const {
    isDiningTypes,
    isMorningFood,
    isLunchFood,
    isDinnerFood,
    dailyFood,
    isDailyFoodLoading,
    isFetchingDone,
  } = useFoodDaily();
  const {
    addMeal,
    isLoadMeal,
    isAddMeal,
    loadMeal,
    setLoadMeal,
    updateMeal,
    setQuantity,
  } = useShoppingBasket();
  const {balloonEvent, BalloonWrap} = Balloon();

  const userInfo = useAtomValue(isUserInfoAtom);
  const fadeAnim = useRef(new Animated.Value(32)).current;
  const handlePress = anim => {
    Animated.timing(fadeAnim, {
      toValue: !anim ? 0 : 32,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setScrollDir(prev => !prev);
  };
  const DININGTYPE = ['아침', '점심', '저녁'];

  const [date, setDate] = useState(
    params?.refundDate ? params?.refundDate : formattedWeekDate(new Date()),
  ); // 오늘

  const [weekly] = useAtom(weekAtom);

  // 식사일정 -> 식사 선택하기 올때 선택된 날짜 가져오기, date 에 초기값 등록시키기

  useEffect(() => {
    if (params) {
      if (params.date) {
        setDate(params.date);
      } else {
        setDate(formattedWeekDate(new Date()));
      }
    }
  }, [params]);
  // 첫 렌더링때만 dailyFood 불러오게 하기

  // isMount처리가 없을 떄: 오늘 날짜, 선택된 날짜꺼 까지 둘다 받아버림
  // isMount처리가 있을 떄: 선택된 날짜꺼만 받는다 그래서 더 효율적이다
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  // 일일 식사지원금
  const [supportPrices] = useAtom(supportPriceAtom);
  const [supportPrice, setSupportPrice] = useState(0);
  const [whenSupportPriceKor, setWhenSupportPriceKor] = useState(false);

  useEffect(() => {
    let price = null;

    switch (sliderValue) {
      case 0:
        price = supportPrices['morningSupportPrice'];
        break;
      case 1:
        price = supportPrices['lunchSupportPrice'];
        break;
      case 2:
        price = supportPrices['dinnerSupportPrice'];
        break;
    }

    setSupportPrice(price);
  }, [sliderValue]);
  const [showSupportPrice, setShowSupportPrice] = useState(false);

  useEffect(() => {
    if (!!parseInt(supportPrice)) {
      // 숫자이면

      if (parseInt(supportPrice) > 0) {
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

  const daily = true;

  // const todayMeal = mealInfo?.filter((m) => m.date === date);
  // const selectDate = mealInfo?.filter((m) => m.date === touchDate);
  const spotId = userRole === 'ROLE_GUEST' ? 1 : userInfo.spotId;
  // const spotId = 1;
  const [chk, setChk] = useState(0);

  const onPageScroll2 = e => {
    const {position} = e.nativeEvent;
    setChk(position);
  };
  const onPageScrollAndroid = e => {
    const {position, offset} = e.nativeEvent;
    if (offset !== 0) {
      if (position === 2) {
        setDate(
          formattedWeekDate(
            new Date(date).setDate(new Date(date).getDate() + 1),
          ),
        );
        const dateIndex = weekly.map(v => {
          return v.map(s => {
            return formattedWeekDate(s);
          });
        });
        const index = dateIndex.findIndex((v, i) => {
          return v.includes(
            formattedWeekDate(
              new Date(date).setDate(new Date(date).getDate() + 1),
            ),
          );
        });
        setChk(index);
        pager.current.setPage(index);
        return setNowPage(0);
      }
      if (position === -1) {
        const prevDate = new Date(date).getDate();
        const todayDate = new Date().getDate();
        console.log(todayDate, prevDate);
        if (todayDate < prevDate) {
          setDate(
            formattedWeekDate(
              new Date(date).setDate(new Date(date).getDate() - 1),
            ),
          );
          const dateIndex = weekly.map(v => {
            return v.map(s => {
              return formattedWeekDate(s);
            });
          });
          const index = dateIndex.findIndex((v, i) => {
            return v.includes(
              formattedWeekDate(
                new Date(date).setDate(new Date(date).getDate() - 1),
              ),
            );
          });
          setChk(index);
          pager.current.setPage(index);
          return setNowPage(2);
        }

        if (position === -1) {
          setNowPage(0);
        } else {
          setNowPage(position);
        }
      }
    }
  };
  const onPageScroll3 = e => {
    const {position, offset} = e.nativeEvent;

    if (offset === 0) {
      if (nowPage === position) {
        console.log(nowPage, position, 'tests');
        if (position === 2) {
          const currentDate = formattedWeekDate(new Date());
          const nextDate = new Date(date).setDate(new Date(date).getDate() + 1);
          const todayDate = new Date(currentDate).setDate(
            new Date(currentDate).getDate(),
          );

          const week = weekly.map(w => {
            const find = w.findIndex(v => {
              return (
                formattedWeekDate(v) === formattedWeekDate(new Date(nextDate))
              );
            });
            return find !== -1;
          });
          if (week.includes(true)) {
            setDate(
              formattedWeekDate(
                new Date(date).setDate(new Date(date).getDate() + 1),
              ),
            );
            const dateIndex = weekly.map(v => {
              return v.map(s => {
                return formattedWeekDate(s);
              });
            });
            const index = dateIndex.findIndex((v, i) => {
              return v.includes(
                formattedWeekDate(
                  new Date(date).setDate(new Date(date).getDate() + 1),
                ),
              );
            });
            setChk(index);
            pager.current.setPage(index);
            return setNowPage(0);
          }
        }
        if (position === 0) {
          const currentDate = formattedWeekDate(new Date());
          const nextDate = new Date(date).setDate(new Date(date).getDate() + 1);
          const todayDate = new Date(currentDate).setDate(
            new Date(currentDate).getDate(),
          );

          const week = weekly.map(w => {
            const find = w.findIndex(v => {
              return (
                formattedWeekDate(v) === formattedWeekDate(new Date(nextDate))
              );
            });
            return find !== -1;
          });

          if (week.includes(true)) {
            const prevDate = new Date(date).getDate();
            const todayDate = new Date().getDate();
            if (todayDate < prevDate) {
              setDate(
                formattedWeekDate(
                  new Date(date).setDate(new Date(date).getDate() - 1),
                ),
              );
              const dateIndex = weekly.map(v => {
                return v.map(s => {
                  return formattedWeekDate(s);
                });
              });
              const index = dateIndex.findIndex((v, i) => {
                return v.includes(
                  formattedWeekDate(
                    new Date(date).setDate(new Date(date).getDate() - 1),
                  ),
                );
              });
              setChk(index);
              pager.current.setPage(index);
              return setNowPage(2);
            }
          }
        }
      }
      setNowPage(position);
    }
  };
  const onPageScroll = e => {
    const {position} = e.nativeEvent;
    if (
      isDiningTypes[0] &&
      ((isMorningFood.length === 0 && position === 0) ||
        (isLunchFood.length === 0 && position === 1) ||
        (isDinnerFood.length === 0 && position === 2))
    ) {
      const page =
        position === 0
          ? isDiningTypes.includes(1)
            ? 0
            : isDiningTypes.includes(2)
            ? 1
            : isDiningTypes.includes(3)
            ? 2
            : 0
          : position === 1
          ? isDiningTypes.includes(2)
            ? 1
            : isDiningTypes.includes(3)
            ? 2
            : isDiningTypes.includes(1)
            ? 0
            : 1
          : position === 2 && isDiningTypes.includes(3)
          ? 2
          : isDiningTypes.includes(2)
          ? 1
          : isDiningTypes.includes(1)
          ? 0
          : 2;
      if (page !== position) {
        if (position === 2) {
          setDate(
            formattedWeekDate(
              new Date(date).setDate(new Date(date).getDate() + 1),
            ),
          );
          const dateIndex = weekly.map(v => {
            return v.map(s => {
              return formattedWeekDate(s);
            });
          });
          const index = dateIndex.findIndex((v, i) => {
            return v.includes(
              formattedWeekDate(
                new Date(date).setDate(new Date(date).getDate() + 1),
              ),
            );
          });
          setChk(index);
          pager.current.setPage(index);
        }
        if (position === 0) {
          const prevDate = new Date(date).getDate();
          const todayDate = new Date().getDate();
          if (todayDate < prevDate) {
            setDate(
              formattedWeekDate(
                new Date(date).setDate(new Date(date).getDate() - 1),
              ),
            );
            const dateIndex = weekly.map(v => {
              return v.map(s => {
                return formattedWeekDate(s);
              });
            });
            const index = dateIndex.findIndex((v, i) => {
              return v.includes(
                formattedWeekDate(
                  new Date(date).setDate(new Date(date).getDate() - 1),
                ),
              );
            });
            setChk(index);
            pager.current.setPage(index);
          }
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
      setDate(selectedDate);
      // dailyFood(spotId,selectedDate);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  // const isDiningType = (type)=>{
  //     return type === '아침' ? 1 : type === '점심' ? 2 : 3;
  // }
  const openModal = async diningType => {
    // console.log(modalVisible,
    //     modalVisible2,
    //     modalVisible3,)
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

  const closeModal = () => {
    setModalVisible(false);
    setModalVisible2(false);
    setModalVisible3(false);
  };

  // useFocusEffect(
  //     useCallback(()=>{
  //         loadMeal();
  //     },[])
  // )
  useEffect(() => {
    async function loadDailyFood() {
      try {
        const data = await dailyFood(spotId, date);
        if (data[0]) {
          diningRef.current.setPage(Number(data[0]) - 1);
          setSliderValue(Number(data[0]) - 1);
        }
        if (isFocused) {
          await updateMeal(req);
        }
      } catch (error) {
        if (error.toString().replace('Error.:', '').trim() === '403') {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: LoginPageName,
              },
            ],
          });
        }
      }
    }
    // if(isDiningTypes.length ===0) loadDailyFood();

    // console.log(generateOrderCode(1,42),"test432")

    if (isMount) {
      loadDailyFood();
    }
  }, [date, isMount]);

  const addCartPress = async (id, day, type, m) => {
    const diningType = type;
    const duplication = isLoadMeal
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

  const quantityArr = isLoadMeal?.map(el =>
    el.cartDailyFoodDtoList.map(v =>
      v.cartDailyFoods.map(c => {
        return {
          dailyFoodId: c.dailyFoodId,
          count: c.count,
          cartItemId: c.id,
        };
      }),
    ),
  );
  const quantity = quantityArr.reduce((acc, val) => [...acc, ...val], []);
  const modifyQty = quantity.reduce((acc, cur) => [...acc, ...cur], []);
  const req = {updateCartList: modifyQty};
  const addToCart = async (id, m) => {
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
    try {
      await addMeal([
        {
          dailyFoodId: id,
          count: 1,
          spotId: userInfo.spotId,
        },
      ]);
      setShow(true);
      balloonEvent();
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
    closeModal();
  };

  const BuyMeal = diningFood => {
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
        // console.log("1",modalVisible)
        return modalVisible;
      }
      if (type === isLunchFood) {
        // console.log("2",modalVisible2)
        return modalVisible2;
      }
      if (type === isDinnerFood) {
        // console.log("3",modalVisible3)
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
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const onScrollStart = e => {
      const {
        contentOffset: {x, y},
      } = e.nativeEvent;
      setStartScroll(y);
    };
    const onScrollEnd = e => {
      const {
        contentOffset: {x, y},
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
          !(diningFood.length === 0 && spotId !== null) || !spotId === null
        }>
        <FoodContainer isFood={diningFood.length === 0 && spotId !== null}>
          {diningFood.length === 0 && spotId !== null && (
            <NoServieceView
              status={hideModal}
              isMembership={userInfo?.isMembership}>
              <NoServiceText>서비스 운영일이 아니에요</NoServiceText>
            </NoServieceView>
          )}
          {spotId === null && (
            <NoSpotView
              status={hideModal}
              isMembership={userInfo?.isMembership}>
              <NoServiceText>메뉴는 스팟 선택 또는 </NoServiceText>
              <NoServiceText>
                스팟 개설 신청 승인후 확인할 수 있어요
              </NoServiceText>
            </NoSpotView>
          )}

          {diningFood.map(m => {
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
              <Contents
                key={m.id}
                spicy={m.spicy}
                disabled={
                  m.status === 2 ||
                  m.status === 6 ||
                  isAddMeal ||
                  m.status === 5
                }
                onPress={e => {
                  navigation.navigate(MealDetailPageName, {dailyFoodId: m.id});
                  e.stopPropagation();
                }}>
                <ContentsText>
                  <MakersName soldOut={m.status}>{m.makersName}</MakersName>
                  <MealName
                    soldOut={m.status}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {m.foodName}
                  </MealName>
                  <MealDsc
                    soldOut={m.status}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {m.description}
                  </MealDsc>
                  <PriceWrap>
                    {realToTalDiscountRate !== 0 && (
                      <PercentText soldOut={m.status}>
                        {Math.round(realToTalDiscountRate * 100) / 100}%
                      </PercentText>
                    )}
                    <Price soldOut={m.status}>
                      {withCommas(m.price - totalDiscount)}원
                    </Price>
                    {realToTalDiscountRate !== 0 && (
                      <OriginPrice>{withCommas(m.price)}원</OriginPrice>
                    )}
                  </PriceWrap>
                  {m.spicy !== null && (
                    <LabelWrap>
                      {m.status === 2 || m.status === 6 ? (
                        <Label label={`${m.spicy}`} type={'soldOut'} />
                      ) : (
                        <Label label={`${m.spicy}`} />
                      )}
                    </LabelWrap>
                  )}
                </ContentsText>
                <MealImage
                  status={m.status}
                  image={m.image}
                  onPressEvent={() => {
                    addCartPress(m.id, m.serviceDate, m.diningType, m);
                  }}
                  isAddMeal={isAddMeal}
                  rank={m.rank}
                />

                {m.status === 2 && (
                  <SoldOut soldOut={m.status} rank={m.rank}>
                    품절됐어요
                  </SoldOut>
                )}
                {m.status === 6 && (
                  <SoldOut soldOut={m.status} rank={m.rank}>
                    마감됐어요
                  </SoldOut>
                )}
              </Contents>
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
          <View style={{height: 120}}></View>
        </FoodContainer>
      </ScrollView>
    );
  };

  return (
    <SafeView>
      <Animated.View style={{height: fadeAnim, overflow: 'hidden'}}>
        <CalendarButton pager={pager} daily chk={chk} />
      </Animated.View>
      <CalendarWrap>
        <Calendar
          BooleanValue={false}
          type={'grey2'}
          color={'white'}
          size={'Body05R'}
          onPressEvent2={dayPress}
          daily={daily}
          // selectDate={date}
          selectDate={isFetchingDone ? date : undefined}
          margin={'0px 28px'}
          scrollDir
          pagerRef={pager}
          onPageScroll2={onPageScroll2}
        />
      </CalendarWrap>

      <PagerViewWrap isMembership={userInfo?.isMembership}>
        {!isDailyFoodLoading && (
          <ProgressWrap>
            <ProgressInner>
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
                containerStyle={{height: 12}}
              />

              <Progress>
                {DININGTYPE.map((btn, i) => {
                  const type = btn === '아침' ? 1 : btn === '점심' ? 2 : 3;
                  const typeBoolean = isDiningTypes.includes(type);

                  return (
                    <DiningPress
                      key={i}
                      disabled={!typeBoolean && true}
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
            </ProgressInner>

            {showSupportPrice && (
              <MiniWrap
                onPress={() => {
                  setModalVisible4(true);
                }}>
                <Typography2>일일 식사지원금</Typography2>
                <QuestionPressable>
                  <QuestionCircleMonoIcon />
                </QuestionPressable>

                {whenSupportPriceKor ? (
                  <Typography4>{supportPrice}</Typography4>
                ) : (
                  <Typography3> {supportPrice}원</Typography3>
                )}
              </MiniWrap>
            )}
          </ProgressWrap>
        )}
        {!userInfo?.isMembership && (
          <View>
            <Modal hideModal={hideModal} setHideModal={setHideModal} />
          </View>
        )}
        {isDailyFoodLoading ? (
          <LoadingPage>
            <ActivityIndicator size={'large'} />
          </LoadingPage>
        ) : (
          <Pager
            ref={diningRef}
            overdrag={true}
            initialPage={nowPage}
            overScrollMode={'always'}
            onPageScroll={
              Platform.OS === 'android' ? onPageScroll3 : onPageScrollAndroid
            }
            onPageSelected={e => {
              onPageScroll(e);
            }}>
            {BuyMeal(isMorningFood)}
            {BuyMeal(isLunchFood)}
            {BuyMeal(isDinnerFood)}
          </Pager>
        )}
      </PagerViewWrap>

      {show && (
        <BalloonWrap
          message={'장바구니에 담았어요'}
          horizontal={'right'}
          size={'B'}
          location={{top: '8px', right: '14px'}}
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
            navigation.navigate(MealCartPageName);
          }}
        />
      </ButtonWrap>
      <BottomModal
        modalVisible={modalVisible4}
        setModalVisible={setModalVisible4}
        title={'지원금이란?'}
        description={
          '고객님의 스팟에서 지원하는 지원금입니다. \n 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'
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
    width: 93,
    height: 2,
    borderRadius: 50,
  },
  thumbStyle: {
    width: 28,
    height: 1,
    borderRadius: 10,
    backgroundColor: '#343337',
  },
});

export default Pages;

const FoodContainer = styled.View`
  ${({isFood}) => {
    if (isFood)
      return css`
        height: ${screenHeight}px;
      `;
  }}
  padding-bottom:24px;
`;
const SafeView = styled.View`
  background-color: ${props => props.theme.colors.grey[0]};
  flex: 1;
`;

const CalendarWrap = styled.View`
  height: 85px;
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
const PagerViewWrap = styled.View`
  flex: 1;
  //padding-bottom: 120px;
  /* background-color: red; */
`;

const ProgressWrap = styled.View`
  /* flex-direction: row;
  padding: 12px 0px;
  margin-left: 24px; */

  flex-direction: row;
  align-items: center;
  padding: 0px 24px;
  justify-content: space-between;
  height: 56px;
  position: relative;

  justify-content: space-between;
`;

const ProgressInner = styled.View`
  justify-content: center;

  position: relative;
  top: -6.5px;
`;

const MiniWrap = styled.Pressable`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  width: 181px;
  height: 32px;

  border: 0.5px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 7px;
`;

const QuestionPressable = styled.Pressable`
  margin-right: 3px;
`;

const Typography2 = styled(Typography).attrs({text: 'SmallLabel'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Typography3 = styled(Typography).attrs({text: 'Body05SB'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[2]};

  font-weight: 600;
`;

const Progress = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 120px;
`;

const Pager = styled(AnimatedPagerView)`
  flex: 1;
`;

const Contents = styled.Pressable`
  padding: ${({spicy}) => (spicy ? '18px 0px 28px 0px' : '18px 0px 28px 0px')};
  margin: 0px 28px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  align-items: center;
  min-height: 160px;
`;

const BlurView = styled.View`
  position: absolute;
  width: 114px;
  height: 114px;
  border-radius: 7px;
  left: 0px;
  background-color: #ffffffcc;
  z-index: 999;
`;

const LabelWrap = styled.View`
  margin-top: 6px;
`;

const ContentsText = styled.View`
  width: 60%;
`;

const MealImageWrap = styled.View``;

const CartIconWrap = styled.Pressable`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 8px;
  right: 8px;
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
const ButtonWrap = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  padding: 0px 48px;
  padding-top: 20px;
  width: 100%;
  height: 100px;
  //background-color: white;
  justify-content: flex-start;
`;

const ReviewWrap = styled.View`
  flex-direction: row;
  align-items: center;
  text-align: center;
`;

export const MakersName = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[4]};
`;

export const MealName = styled(Typography).attrs({text: 'Body05SB'})`
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

const ProgressText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme, type, index}) =>
    type ? theme.colors.grey[2] : theme.colors.grey[7]};
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

const ReviewText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[2]};
`;

const ReviewCount = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme, soldOut}) =>
    soldOut === 2 || soldOut === 6
      ? theme.colors.grey[6]
      : theme.colors.grey[4]};
`;

const NoServiceText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
const Typography4 = styled(Typography).attrs({text: 'Body05SB'})`
  margin-right: 4px;
  color: ${({theme}) => theme.colors.grey[2]};
  font-size: 14px;
  font-weight: 600;
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

const DiningPress = styled.Pressable``;

const AItext = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${({theme}) => theme.colors.purple[500]};
  margin-left: 3px;
`;

const AIrecommend = styled.View`
  flex-direction: row;
  margin-left: 7px;
  margin-top: 2px;
`;
