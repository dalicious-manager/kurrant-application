import {Slider} from '@miblanchard/react-native-slider';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useAtomValue} from 'jotai';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import styled, {css} from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import useFoodDaily from '../../../../../biz/useDailyFood/hook';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import {isUserInfoAtom} from '../../../../../biz/useUserInfo/store';
import Balloon from '../../../../../components/Balloon';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';
import Label from '../../../../../components/Label';
import MembershipBar from '../../../../../components/MembershipBar';
import Typography from '../../../../../components/Typography';
import {formattedWeekDate} from '../../../../../utils/dateFormatter';
import withCommas, {generateOrderCode} from '../../../../../utils/withCommas';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import useAuth from '../../../../../biz/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import TossPayment from 'react-native-toss-payments';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Pages = ({route}) => {
  const params = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const diningRef = useRef();
  const MorningRef = useRef();
  const LunchRef = useRef();
  const DinnerRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [startScroll, setStartScroll] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const [selectFood, setSelectFood] = useState();
  const [show, setShow] = useState(false);
  const [scrollDir, setScrollDir] = useState(true);
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

  const DININGTYPE = ['아침', '점심', '저녁'];
  const daily = true;
  const [date, setDate] = useState(
    params?.refundDate ? params?.refundDate : formattedWeekDate(new Date()),
  ); // 오늘
  // const todayMeal = mealInfo?.filter((m) => m.date === date);
  // const selectDate = mealInfo?.filter((m) => m.date === touchDate);
  const spotId = userRole === 'ROLE_GUEST' ? 1 : userInfo.spotId;
  // const spotId = 1;

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
      } catch (error) {
        if (error.toString().replace('Error:', '').trim() === '403') {
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
    loadDailyFood();
  }, [date]);

  useEffect(() => {
    loadMeal();
    updateMeal(req);
  }, [isFocused]);
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
      console.log(err, '8');
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
        setScrollDir(true);
      } else {
        setScrollDir(startScroll > y ? true : false);
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
            <NoServieceView>
              <NoServiceText>서비스 운영일이 아니에요</NoServiceText>
            </NoServieceView>
          )}
          {spotId === null && (
            <NoSpotView>
              <NoServiceText>메뉴는 스팟 선택 또는 </NoServiceText>
              <NoServiceText>
                스팟 개설 신청 승인후 확인할 수 있어요{' '}
              </NoServiceText>
            </NoSpotView>
          )}

          {diningFood.map(m => {
            const totalRate =
              m.membershipDiscountRate +
              m.makersDiscountRate +
              m.periodDiscountRate;
            const totalDiscount =
              m.membershipDiscountPrice +
              m.makersDiscountPrice +
              m.periodDiscountPrice;
            return (
              <Contents
                key={m.id}
                spicy={m.spicy}
                disabled={m.status === 0 || m.status === 2 || isAddMeal}
                onPress={e => {
                  navigation.navigate(MealDetailPageName, {dailyFoodId: m.id});
                  e.stopPropagation();
                }}>
                <ContentsText>
                  <MakersName soldOut={m.status}>[{m.makersName}]</MakersName>
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
                    {totalRate !== 0 && (
                      <PercentText soldOut={m.status}>{totalRate}%</PercentText>
                    )}
                    <Price soldOut={m.status}>
                      {withCommas(m.price - totalDiscount)}원
                    </Price>
                    {totalRate !== 0 && (
                      <OriginPrice>{withCommas(m.price)}원</OriginPrice>
                    )}
                  </PriceWrap>
                  {m.spicy !== null && (
                    <LabelWrap>
                      {m.status === 0 ? (
                        <Label label={`${m.spicy}`} type={'soldOut'} />
                      ) : (
                        <Label label={`${m.spicy}`} />
                      )}
                    </LabelWrap>
                  )}
                </ContentsText>

                <MealImageWrap>
                  {(m.status === 0 || m.status === 2) && <BlurView />}

                  <FastImage
                    source={{
                      uri: `${m.image}`,
                      priority: FastImage.priority.high,
                    }}
                    style={{
                      width: 107,
                      height: 107,
                      borderRadius: 7,
                    }}
                  />

                  {m.status === 1 && (
                    <CartIconWrap
                      disabled={isAddMeal}
                      onPress={() => {
                        addCartPress(m.id, m.serviceDate, m.diningType, m);
                      }}>
                      <CartIcon />
                    </CartIconWrap>
                  )}
                </MealImageWrap>
                {m.status === 0 && (
                  <SoldOut soldOut={m.status}>품절됐어요</SoldOut>
                )}
                {m.status === 2 && (
                  <SoldOut soldOut={m.status}>마감됐어요</SoldOut>
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
        </FoodContainer>
      </ScrollView>
    );
  };

  return (
    <SafeView>
      {isDailyFoodLoading && (
        <LoadingPage>
          <ActivityIndicator size={'large'} />
        </LoadingPage>
      )}
      {userInfo?.isMembership && <MembershipBar />}

      {scrollDir && (
        <CalendarWrap>
          <Calendar
            BooleanValue
            type={'grey2'}
            color={'white'}
            size={'Body05R'}
            onPressEvent2={dayPress}
            daily={daily}
            margin={'0px 28px'}
          />
        </CalendarWrap>
      )}

      <PagerViewWrap isMembership={userInfo?.isMembership}>
        {scrollDir && (
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
          </ProgressWrap>
        )}

        <Pager
          ref={diningRef}
          initialPage={
            isMorningFood.length !== 0
              ? 0
              : isLunchFood.length !== 0
              ? 1
              : isDinnerFood.length !== 0
              ? 2
              : 1
          }
          onPageSelected={e => {
            onPageScroll(e);
          }}>
          {BuyMeal(isMorningFood)}
          {BuyMeal(isLunchFood)}
          {BuyMeal(isDinnerFood)}
        </Pager>
      </PagerViewWrap>

      {show && (
        <BalloonWrap
          message={'장바구니에 담았어요'}
          horizontal={'right'}
          size={'B'}
          location={{top: '8px', right: '14px'}}
        />
      )}
      <ButtonWrap membership={userInfo?.isMembership}>
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
    width: 20,
    height: 2,
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
`;
const SafeView = styled.View`
  background-color: ${props => props.theme.colors.grey[0]};
  flex: 1;
`;

export const CalendarWrap = styled.View`
  height: 120px;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  width: 100%;
`;
const LoadingPage = styled.View`
  position: absolute;
  background-color: white;
  opacity: 0.5;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
`;
const PagerViewWrap = styled.View`
  flex: 1;
  padding-bottom: 120px;
`;

const ProgressWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 12px;
`;

const ProgressInner = styled.View`
  justify-content: center;
`;

const Progress = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 93px;
`;

const Pager = styled(PagerView)`
  flex: 1;
`;

const Contents = styled.Pressable`
  padding: ${({spicy}) => (spicy ? '24px 0px 12px 0px' : '24px 0px 28px 0px')};
  margin: 0px 28px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  align-items: center;
`;

const BlurView = styled.View`
  position: absolute;
  width: 107px;
  height: 107px;
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

const MealImageWrap = styled.View`
  //height:107px;
  position: relative;
`;

const MealImage = styled.Image`
  width: 107px;
  height: 107px;
  border-radius: 7px;
`;

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
  top: 60%;
  right: 15px;
  color: ${props => props.theme.colors.grey[4]};
  z-index: 1000;
`;
const ButtonWrap = styled.View`
  position: absolute;
  ${({membership}) => {
    if (membership)
      return css`
        bottom: 35px;
      `;
    return css`
      bottom: 35px;
    `;
  }}

  margin: 0px 48px;
`;

const ReviewWrap = styled.View`
  flex-direction: row;
  align-items: center;
  text-align: center;
`;

export const MakersName = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : theme.colors.grey[2]};
`;

export const MealName = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const Price = styled(MakersName)`
  color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const MealDsc = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : theme.colors.grey[4]};
`;

const ProgressText = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${({theme, type, index}) =>
    type ? theme.colors.grey[2] : theme.colors.grey[5]};
`;

const PercentText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : '#DD5257'};
  margin-right: 4px;
`;

const OriginPrice = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : theme.colors.grey[5]};
  text-decoration: line-through;
  text-decoration-color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : theme.colors.grey[5]};
  margin-left: 6px;
`;

const ReviewText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const ReviewCount = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme, soldOut}) =>
    soldOut === 0 ? theme.colors.grey[6] : theme.colors.grey[4]};
`;

const NoServiceText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;

const NoServieceView = styled.View`
  position: absolute;
  top: 30%;
  left: 30%;
`;

const NoSpotView = styled(NoServieceView)`
  justify-content: center;
  align-items: center;
  left: 20%;
`;

const DiningPress = styled.Pressable``;
