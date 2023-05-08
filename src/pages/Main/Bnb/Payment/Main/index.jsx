import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useCallback,
} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  View,
  Alert,
  Text,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  NativeModules,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import FastImage from 'react-native-fast-image';
import ArrowUpIcon from '../../../../../assets/icons/Payment/arrow.svg';
import ArrowDownIcon from '../../../../../assets/icons/Payment/arrowDown.svg';
import ArrowRightIcon from '../../../../../assets/icons/Arrow/arrowRight.svg';
import PayError from '../../../../../assets/icons/Payment/payError.svg';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import useUserInfo from '../../../../../biz/useUserInfo';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import Check from '../../../../../components/Check';
import Form from '../../../../../components/Form';
import Typography from '../../../../../components/Typography';
import {
  formattedDate,
  formattedMonthDay,
} from '../../../../../utils/dateFormatter';
import withCommas, {generateOrderCode} from '../../../../../utils/withCommas';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  ButtonWrap,
  ContentWrap,
  DiningName,
  MealImage,
  MealName,
  PaymentText,
  PaymentView,
  PointBoldText,
  PointInput,
  PointInputWrap,
  PointText,
  PointUnitText,
  PointWrap,
  PressableView,
  Price,
  QuestionIcon,
  SalePrice,
  SalePriceWrap,
  TotalPrice,
  TotalPriceTitle,
  XIcon,
} from '../../MealCart/Main';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import useUserMe from '../../../../../biz/useUserMe';
import {SCREEN_NAME as RegisterCardPageName} from '../../../../../screens/Main/RegisterCard';
import {PurchaseDetailPageName} from '../../../../../pages/Main/MyPage/PurchaseHistory/Detail';
import {PAGE_NAME as DefaultPaymentManagePageName} from '../DefaultPaymentManage';
import {PAGE_NAME as PayCheckPasswordPayPageName} from '../../../MyPage/PersonalInfo/pages/PayCheckPasswordPay';
import {PAGE_NAME as MealPaymentPageName} from '../MealPayment';
import {
  cardListData,
  formattedCardCode,
} from '../../../../../utils/statusFormatter';
import BottomSheet from '../../../../../components/BottomSheet';
import {getStorage, setStorage} from '../../../../../utils/asyncStorage';
import BottomSheetCard from '../../../../../components/BottomSheetCard';
import PaymentsList from './components/PaymentsList';
import useOrderMeal from '../../../../../biz/useOrderMeal';
import Point from './components/Point/Point';
import {useQueryClient} from 'react-query';

export const PAGE_NAME = 'PAYMENT_PAGE';

const Pages = ({route}) => {
  const {StatusBarManager} = NativeModules;
  const navigation = useNavigation();
  const [show, setShow] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [payments, setPayments] = useState('NOMAL');
  const [isPay, setIsPay] = useState(false);
  const viewRef = useRef();
  const queryClient = useQueryClient();
  const {isLoadMeal, loadMeal} = useShoppingBasket();
  const {order, orderNice, orderLoading} = useOrderMeal();
  const {isUserInfo} = useUserInfo();
  const {
    getCardList,
    readableAtom: {selectDefaultCard},
  } = useUserMe();
  const [card, setCard] = useState(selectDefaultCard);
  const [isInputFocus, setIsInputFocus] = useState(true);
  const inputRef = useRef(null);
  const form = useForm();
  const {
    formState: {errors},
    watch,
    handleSubmit,
    setValue,
    getValues,
  } = form;
  const points = watch('point');

  const {
    totalCount,
    totalMealPrice,
    membershipDiscountPrice,
    makersDiscountPrice,
    periodDiscountPrice,
    supportPrice,
    deliveryFee,
    totalDiscountPrice,
    discountPrice,
    totalPrice,
    selected,
    spotName,
    clientType,
    usedSupportPrice,
    medtronicTotalPrice,
    medtronicPrice,
    medtronicSupportArr,
  } = route.params;
  const selectCard = async (text, id) => {
    // await setStorage('selectCard', id.toString());
    console.log(text, id);
    // setSelectDefaultCard(id.toString());
  };

  const fundButton = () => {
    setModalVisible3(true);
  };

  const pointButton = () => {
    setModalVisible2(true);
  };
  const closeModal = () => {
    setModalVisible2(false);
    setModalVisible3(false);
  };

  // returnKeyTpye
  const pointHandlePress = () => {
    if (points === '') {
      return setValue('point', '0');
    }

    if (medtronicSupportArr.includes(62471004)) {
      if (points > medtronicTotalPrice) {
        return setValue('point', medtronicTotalPrice.toString());
      }
    } else {
      if (points > totalPrice) {
        return setValue('point', totalPrice.toString());
      }
    }

    if (points > isUserInfo.point) {
      return setValue('point', isUserInfo.point.toString());
    }
  };

  // pointDismiss
  const onBlurPress = e => {
    e.preventDefault();
    pointHandlePress();

    const getPoint = getValues('point');
    const checkPoint = Number.isInteger(Number(getPoint) / 100);

    if (!checkPoint) {
      Alert.alert('포인트', '포인트는 100원 단위로 사용가능합니다.', [
        {
          text: '확인',
          onPress: () => {
            setValue('point', '0');
          },
        },
      ]);
    }

    if (Platform.OS === 'android') {
      setIsInputFocus(true);
    }
  };

  const clearPoint = () => {
    setValue('point', '0');
  };

  const onFocusInput = () => {
    if (Platform.OS === 'android') {
      setIsInputFocus(false);
    }

    setValue('point', '');
  };
  const onBlurInput = () => {
    setIsInputFocus(false);
  };
  const keyboardStatus = useKeyboardEvent(inputRef);

  const handleEventPayments = () => {
    orderPress2(selected);
  };

  useEffect(() => {
    const getCard = async () => {
      // const nowCard = await getStorage('selectCard');
      // const easyPay = await getStorage('easyPay');
      // if (easyPay) {
      //   setPayments(easyPay);
      // }
      // if (nowCard) {
      //   setCard(Number(nowCard));
      // }
      await getCardList();
    };
    getCard();
    Platform.OS === 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  // useFocusEffect(
  //   useCallback(() => {
  //     const getCard = async () => {
  //       // const nowCard = await getStorage('selectCard');
  //       // const easyPay = await getStorage('easyPay');
  //       // if (easyPay) {
  //       //   setPayments(easyPay);
  //       // }
  //       // if (nowCard) {
  //       //   setCard(Number(nowCard));
  //       // }
  //       await getCardList();
  //     };
  //     getCard();
  //   }, []),
  // );

  const registerCard = () => {
    navigation.navigate(RegisterCardPageName, {defaultType: 1});
    setModalVisible(false);
  };
  const spotFilter = isLoadMeal.filter(el => el.spotId === selected);

  const arr = spotFilter.map(el => {
    return {
      cartDailyFoodDtoList: [
        ...el.cartDailyFoodDtoList.map(v => {
          return {
            ...v,
            cartDailyFoods: [
              ...v.cartDailyFoods.filter(food => {
                return food.status !== 6;
              }),
            ],
          };
        }),
      ],
    };
  });

  const arrs = arr.reduce((acc, cur) => {
    return acc.concat(cur);
  });
  // body 값 최종
  const lastArr = arrs.cartDailyFoodDtoList.filter(
    el => el.cartDailyFoods.length !== 0,
  );

  // 배송일자 계산
  const date = spotFilter
    ?.map(el => el.cartDailyFoodDtoList.map(v => v.serviceDate))
    .flat();

  const deliveryStart = date.reduce((prev, curr) => {
    return new Date(prev).getTime() <= new Date(curr).getTime() ? prev : curr;
  });

  const deliveryEnd = date.reduce((prev, curr) => {
    return new Date(prev).getTime() <= new Date(curr).getTime() ? curr : prev;
  });

  const orderPress = async spotId => {
    const data = {
      spotId: spotId,
      // "cardId": selectDefaultCard[0]?.id,
      cartDailyFoodDtoList: lastArr,
      totalPrice: medtronicSupportArr.includes(62471004)
        ? medtronicTotalPrice - Number(points)
        : totalPrice - Number(points),
      supportPrice: medtronicSupportArr.includes(62471004)
        ? medtronicPrice
        : usedSupportPrice,
      deliveryFee: deliveryFee,
      userPoint: points,
    };

    try {
      // const res = await orderMeal(spotId,data);
      // console.log(lastArr?.length > 0  ? lastArr[0].cartDailyFoods.length > 0 && lastArr[0].cartDailyFoods[0].name : "");
      const firstName =
        lastArr?.length > 0
          ? lastArr[0].cartDailyFoods.length > 0 &&
            lastArr[0].cartDailyFoods[0].name
          : '';
      const orderName =
        totalCount > 1 ? `${firstName} 외 ${totalCount}건` : firstName;
      // console.log(isUserInfo?.userId)
      const orderId = generateOrderCode(1, isUserInfo?.userId, spotId);
      loadMeal();
      if (totalPrice - Number(points) > 0) {
        // setLoadMeal([])
        // const resetAction = StackActions.popToTop();
        // navigation.dispatch(resetAction);
        return navigation.navigate(MealPaymentPageName, {
          amount: totalPrice - Number(points),
          orderName: orderName,
          orderId: orderId,
          email: isUserInfo?.email,
          name: isUserInfo?.name,
          orderItems: JSON.stringify(data),
          easyPay: payments,
          flowMode: 'DIRECT',
          cardCompany: card,
        });
      } else if (
        medtronicSupportArr.includes(62471004) &&
        medtronicTotalPrice - Number(points) > 0
      ) {
        console.log(medtronicTotalPrice - Number(points), '0000000');
        return navigation.navigate(MealPaymentPageName, {
          amount: medtronicTotalPrice - Number(points),
          orderName: orderName,
          orderId: orderId,
          email: isUserInfo?.email,
          name: isUserInfo?.name,
          orderItems: JSON.stringify(data),
          easyPay: payments,
          flowMode: 'DIRECT',
          cardCompany: card,
        });
      } else {
        if (!orderLoading) {
          const result = await order({
            amount: totalPrice,
            orderId: orderId,
            orderItems: data,
          });

          if (result?.data) {
            const resetAction = StackActions.popToTop();
            navigation.dispatch(resetAction);
            navigation.navigate(PurchaseDetailPageName, {
              id: result?.data,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPay(false);
    }
  };
  const orderPress2 = async spotId => {
    if (
      selectDefaultCard.length <= 0 &&
      (medtronicSupportArr.includes(62471004)
        ? medtronicTotalPrice > 0
        : totalPrice > 0)
    ) {
      Alert.alert(
        '카드선택',
        '카드를 선택해주세요.\n카드 선택은 아래 결제 카드 등록 을 통해 할 수 잇습니다.',
        [
          {
            onPress: () => {
              setValue('point', '0');
            },
            text: '확인',
          },
        ],
      );
      return;
    }
    const data = {
      spotId: spotId,
      // "cardId": selectDefaultCard[0]?.id,
      cartDailyFoodDtoList: lastArr,
      totalPrice: medtronicSupportArr.includes(62471004)
        ? medtronicTotalPrice - Number(points)
        : totalPrice - Number(points),
      supportPrice: medtronicSupportArr.includes(62471004)
        ? medtronicPrice
        : usedSupportPrice,
      deliveryFee: deliveryFee,
      userPoint: watch('point'),
    };
    setIsPay(true);
    try {
      // const res = await orderMeal(spotId,data);
      // console.log(lastArr?.length > 0  ? lastArr[0].cartDailyFoods.length > 0 && lastArr[0].cartDailyFoods[0].name : "");
      const firstName =
        lastArr?.length > 0
          ? lastArr[0].cartDailyFoods.length > 0 &&
            lastArr[0].cartDailyFoods[0].name
          : '';
      const orderName =
        totalCount > 1 ? `${firstName} 외 ${totalCount}건` : firstName;
      // console.log(isUserInfo?.userId)
      const orderId = generateOrderCode(1, isUserInfo?.userId, spotId);
      loadMeal();
      if (totalPrice - Number(points) > 0) {
        const orderData = {
          cardId: selectDefaultCard[0]?.id,
          orderName: orderName,
          amount: totalPrice - Number(points),
          orderId: orderId,
          orderItems: data,
        };
        navigation.navigate(PayCheckPasswordPayPageName, {
          orderData: JSON.stringify(orderData),
        });
      } else if (
        medtronicSupportArr.includes(62471004) &&
        medtronicTotalPrice - Number(points) > 0
      ) {
        const orderData = {
          cardId: selectDefaultCard[0]?.id,
          orderName: orderName,
          amount: medtronicTotalPrice - Number(points),
          orderId: orderId,
          orderItems: data,
        };
        navigation.navigate(PayCheckPasswordPayPageName, {
          orderData: JSON.stringify(orderData),
        });
      } else {
        const result = await order({
          amount: totalPrice - Number(points),
          orderId: orderId,
          orderItems: data,
        });

        if (result?.data) {
          const resetAction = StackActions.popToTop();
          navigation.dispatch(resetAction);
          navigation.navigate(PurchaseDetailPageName, {
            id: result?.data,
          });
        }
      }
      queryClient.invalidateQueries('orderMeal');
    } catch (err) {
      Alert.alert("결제",err.toString().replace('error: ',''));
    } finally {
      setIsPay(false);
    }
  };

  if (isPay) {
    return (
      <SafeArea>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        extraScrollHeight={120}
        ref={viewRef}
        enableOnAndroid={true}
        resetScrollToCoords={{x: 0, y: 10000}}>
        <TouchableWithoutFeedback>
          <ViewScroll onBlur={onBlurPress}>
            <BorderWrap>
              <Container>
                <DeliveryTextWrap>
                  <DeliveryTitle>배송지</DeliveryTitle>
                  <DeliveryText>{spotName[0]?.text}</DeliveryText>
                </DeliveryTextWrap>
                <DeliveryTextWrap>
                  <DeliveryTitle>배송 일시</DeliveryTitle>
                  <DeliveryText>
                    {formattedDate(deliveryStart, '년월일')} -{' '}
                    {formattedDate(deliveryEnd, '년월일')}
                  </DeliveryText>
                </DeliveryTextWrap>
                <View>
                  <DeliveryTitle>주문자 정보</DeliveryTitle>
                  <DeliveryText>
                    {isUserInfo?.name}
                    {isUserInfo?.phone === null ? '' : `(${isUserInfo?.phone})`}
                  </DeliveryText>
                </View>
              </Container>
            </BorderWrap>
            <BorderWrap>
              <Container>
                <MealInfo onPress={() => setShow(!show)}>
                  <Title>주문 상품 정보</Title>
                  {show ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </MealInfo>
              </Container>
              {show && (
                <ProductInfo>
                  {isLoadMeal?.map((el, idx) => {
                    const arrs =
                      el.cartDailyFoodDtoList[
                        el.cartDailyFoodDtoList.length - 1
                      ];
                    const lastArr =
                      arrs.cartDailyFoods[arrs.cartDailyFoods.length - 1];

                    return (
                      <React.Fragment key={idx}>
                        {selected === el.spotId &&
                          el.cartDailyFoodDtoList.map((m, i) => {
                            const arr = m.cartDailyFoods.filter(
                              v => v.status !== 6,
                            );

                            return (
                              <OrderWrap key={i}>
                                {arr.map((meal, index) => {
                                  const price = meal.price * meal.count;
                                  const mealDiscountPrice =
                                    meal.membershipDiscountPrice +
                                    meal.makersDiscountPrice +
                                    meal.periodDiscountPrice;
                                  return (
                                    <React.Fragment key={index}>
                                      <ContentHeader>
                                        <DiningName>
                                          {formattedMonthDay(m.serviceDate)}{' '}
                                          {m.diningType}
                                        </DiningName>
                                      </ContentHeader>
                                      <ContentsWrap>
                                        <FastImage
                                          source={{
                                            uri: `${meal.image}`,
                                            priority: FastImage.priority.high,
                                          }}
                                          style={{
                                            width: 45,
                                            height: 45,
                                            borderRadius: 7,
                                            marginRight: 12,
                                          }}
                                        />
                                        <MealNameView>
                                          <MealName
                                            numberOfLines={1}
                                            ellipsizeMode="tail">
                                            [{meal.makers}] {meal.name}{' '}
                                          </MealName>

                                          <PriceView>
                                            <Price>
                                              {withCommas(
                                                meal.price - mealDiscountPrice,
                                              )}
                                              원
                                            </Price>
                                            {mealDiscountPrice !== 0 && (
                                              <SalePrice>
                                                {withCommas(price)}원
                                              </SalePrice>
                                            )}
                                          </PriceView>
                                        </MealNameView>

                                        <CountWrap>
                                          <CountText>
                                            수량: {meal.count}개
                                          </CountText>
                                        </CountWrap>
                                      </ContentsWrap>
                                      {lastArr !== meal && <Border />}
                                    </React.Fragment>
                                  );
                                })}
                              </OrderWrap>
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                </ProductInfo>
              )}
            </BorderWrap>
            <BorderWrap>
              <PriceTitle>
                <Title>최종 결제금액</Title>
              </PriceTitle>
              <PaymentView>
                <PaymentText>총 상품금액</PaymentText>
                <PaymentText>{withCommas(totalMealPrice)}원</PaymentText>
              </PaymentView>
              {clientType[0]?.clientStatus === 1 && (
                <PaymentView>
                  <PressableView onPress={fundButton}>
                    <PaymentText>식사 지원금 사용 금액</PaymentText>
                    <QuestionIcon />
                  </PressableView>
                  <PaymentText>
                    {medtronicSupportArr.includes(62471004)
                      ? `-${withCommas(medtronicPrice)}`
                      : usedSupportPrice === 0
                      ? 0
                      : discountPrice < usedSupportPrice
                      ? `-${withCommas(discountPrice)}`
                      : `-${withCommas(usedSupportPrice)}`}
                    원
                  </PaymentText>
                </PaymentView>
              )}
              <PaymentView>
                <PaymentText>총 할인금액</PaymentText>
                <PaymentText>
                  {totalDiscountPrice === 0
                    ? 0
                    : `- ${withCommas(totalDiscountPrice)}`}{' '}
                  원
                </PaymentText>
              </PaymentView>
              <DiscountView>
                <Bar />
                <DiscountTextWrap>
                  <DiscountTextView>
                    <DiscountText>멤버십 할인금액</DiscountText>
                    <DiscountText>
                      {membershipDiscountPrice === 0
                        ? 0
                        : withCommas(membershipDiscountPrice)}{' '}
                      원
                    </DiscountText>
                  </DiscountTextView>
                  <DiscountTextView>
                    <DiscountText>판매자 할인금액</DiscountText>
                    <DiscountText>
                      {makersDiscountPrice === 0
                        ? 0
                        : withCommas(makersDiscountPrice)}{' '}
                      원
                    </DiscountText>
                  </DiscountTextView>
                  <DiscountTextView>
                    <DiscountText>기간 할인금액</DiscountText>
                    <DiscountText>
                      {periodDiscountPrice === 0
                        ? 0
                        : withCommas(periodDiscountPrice)}{' '}
                      원
                    </DiscountText>
                  </DiscountTextView>
                </DiscountTextWrap>
              </DiscountView>
              <PaymentView>
                <PaymentText>배송비</PaymentText>
                <PaymentText>
                  {deliveryFee === 0 ? 0 : withCommas(deliveryFee)}원
                </PaymentText>
              </PaymentView>

              <PaymentView style={{paddingBottom: 8}}>
                <PressableView onPress={pointButton}>
                  <PaymentText>포인트 사용금액</PaymentText>
                  <QuestionIcon />
                </PressableView>
                <FormProvider {...form}>
                  <Point
                    handlePress={pointHandlePress}
                    clearPoint={clearPoint}
                    inputRef={inputRef}
                    totalPrice={totalPrice}
                    onFocusInput={onFocusInput}
                    //onBlurInput={onBlurInput}
                    userPoint={isUserInfo.point}
                    medtronicTotalPrice={medtronicTotalPrice}
                    medtronicSupportArr={medtronicSupportArr}
                  />
                </FormProvider>
              </PaymentView>

              <UserPointView>
                <PointInfoText>
                  포인트는 100원 단위로 사용 가능합니다.
                </PointInfoText>
                <UserPointText>
                  잔여{' '}
                  {isUserInfo.point === 0 ? 0 : withCommas(isUserInfo.point)}P
                </UserPointText>
              </UserPointView>

              <PaymentView>
                <TotalPriceWrap>
                  <TotalPriceTitle>총 결제금액</TotalPriceTitle>
                  <TotalPrice>
                    {medtronicSupportArr.includes(62471004)
                      ? withCommas(
                          points > medtronicTotalPrice
                            ? 0
                            : points > isUserInfo.point
                            ? medtronicTotalPrice - isUserInfo.point
                            : medtronicTotalPrice - Number(points),
                        )
                      : withCommas(
                          points > totalPrice
                            ? 0
                            : points > isUserInfo.point
                            ? totalPrice - isUserInfo.point
                            : totalPrice - Number(points),
                        )}
                    원
                  </TotalPrice>
                </TotalPriceWrap>
              </PaymentView>
            </BorderWrap>
            <BorderWrap>
              <Container>
                <Title>결제 수단</Title>
                <DeliveryTitle>
                  선택한 결제 수단으로 결제가 진행됩니다.
                </DeliveryTitle>
                {/* <AgreeTextBox>
                  <PaymentsList
                    onSelectPress={setPayments}
                    select={payments}
                    name={'NOMAL'}
                  />
                  <PaymentsList
                    onSelectPress={setPayments}
                    select={payments}
                    name={'KAKAOPAY'}
                  />
                  <PaymentsList
                    onSelectPress={setPayments}
                    select={payments}
                    name={'NAVERPAY'}
                  />
                </AgreeTextBox> */}
                {/*<CardSelectContainer>
              {payments === 'NOMAL' && (
                <View>
                  {card ? (
                    <Card
                      key={card}
                      onPress={() => {
                        // navigation.navigate(DefaultPaymentManagePageName);
                        setModalVisible4(!modalVisible4);
                      }}>
                      {!card ? (
                        <CardText>결제 카드 등록</CardText>
                      ) : (
                        <CardText>{formattedCardCode(card)}</CardText>
                      )}
                       <PayInfoWrap>
                                <PayInfo>
                                <PayError />
                                <PayText>결제불가</PayText>
                                </PayInfo>
                                <ArrowRight />
                            </PayInfoWrap> 
                      <ArrowRight />
                    </Card>
                  ) : (
                    <Card
                      onPress={() =>
                        // navigation.navigate(DefaultPaymentManagePageName)
                        setModalVisible4(!modalVisible4)
                      }>
                      <CardText>결제 수단 선택</CardText>
                      <ArrowRight />
                    </Card>
                  )}
                </View>
              )}
            </CardSelectContainer>*/}
                <CardSelectContainer>
                  {payments === 'NOMAL' && (
                    <View>
                      {selectDefaultCard ? (
                        <Card
                          key={selectDefaultCard}
                          onPress={() => {
                            // console.log(selectDefaultCard);
                            navigation.navigate(DefaultPaymentManagePageName);
                            // setModalVisible4(!modalVisible4);
                          }}>
                          {!selectDefaultCard.length > 0 ? (
                            <CardText>결제 카드 등록</CardText>
                          ) : (
                            <CardText>
                              {selectDefaultCard[0].cardCompany +
                                '(' +
                                selectDefaultCard[0].cardNumber.substring(
                                  selectDefaultCard[0].cardNumber.length - 4,
                                  selectDefaultCard[0].cardNumber.length,
                                ) +
                                ')'}
                            </CardText>
                          )}
                          {/* <PayInfoWrap>
                                <PayInfo>
                                <PayError />
                                <PayText>결제불가</PayText>
                                </PayInfo>
                                <ArrowRight />
                            </PayInfoWrap> */}
                          <ArrowRight />
                        </Card>
                      ) : (
                        <Card
                          onPress={
                            () =>
                              navigation.navigate(DefaultPaymentManagePageName)
                            // setModalVisible4(!modalVisible4)
                          }>
                          <CardText>결제 수단 선택</CardText>
                          <ArrowRight />
                        </Card>
                      )}
                    </View>
                  )}
                </CardSelectContainer>
              </Container>
              <Label>
                위 주문 내용을 확인 하였으며, 회원 본인은 개인정보 이용 및 제공
                및 결제에 동의합니다.
              </Label>
            </BorderWrap>
          </ViewScroll>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      {/* ;handleEventPayments() */}

      {isInputFocus && !keyboardStatus.isKeyboardActivate && (
        <ButtonWrap>
          <Button
            label={`총 ${totalCount}개 결제하기`}
            disabled={
              payments !== 'NOMAL' ||
              (medtronicSupportArr.includes(62471004)
                ? medtronicTotalPrice < 0
                : totalPrice < 0) ||
              isPay
            }
            onPressEvent={() => {
              handleEventPayments();
            }}
          />
        </ButtonWrap>
      )}
      <BottomModal
        modalVisible={modalVisible3}
        setModalVisible={setModalVisible3}
        title={'지원금이란?'}
        description={
          '고객님의 스팟에서 지원하는 지원금입니다. \n 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'
        }
        buttonTitle1={'확인했어요'}
        buttonType1={'grey7'}
        onPressEvent1={closeModal}
      />
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="결제수단 등록이 필요해요"
        description="최초 1회 등록으로 편리하게 결제할 수 있어요"
        buttonTitle1="결제 카드 등록하기"
        buttonType1="yellow"
        onPressEvent1={registerCard}
      />
      <BottomModal
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        title={'포인트란?'}
        description={
          '고객님의 스팟에서 지원하는 식사 지원금 및 \n 구독 메뉴 취소시 적립되는 환불 포인트입니다.\n 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'
        }
        buttonTitle1={'확인했어요'}
        buttonType1={'grey7'}
        onPressEvent1={closeModal}
      />
      {/* <BottomSheet title='일반 카드 선택' modalVisible={modalVisible4} setModalVisible={setModalVisible4} setSelected={setCard} selected={card} data={cardListData} setValue={selectCard}/> */}
      {/* <BottomSheetCard
        modalVisible={modalVisible4}
        setModalVisible={setModalVisible4}
        title="일반 카드 선택"
        data={cardListData}
        selected={card}
        setSelected={setCard}
        onPressEvent={selectCard}
      /> */}
    </SafeArea>
  );
};

export default Pages;

const SafeArea = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.grey[0]};
  //padding-bottom: 60px;
`;

const ViewScroll = styled.ScrollView`
  flex: 1;
`;
const Label = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  padding: 24px;
  padding-bottom: 48px;
  margin-bottom: 60px;
`;
const BorderWrap = styled.View`
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 6px;
  padding: 24px 0px;
`;

const Container = styled.View`
  margin: 0px 24px;
`;

const AgreeTextBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 24px;
  padding-bottom: 10px;
`;

const DeliveryTextWrap = styled.View`
  margin-bottom: 12px;
`;

const Title = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const DeliveryTitle = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[4]};
`;

const DeliveryText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const PriceTitle = styled(PaymentView)`
  margin-bottom: 24px;
`;

const Card = styled.Pressable`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.grey[7]};
  border-radius: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 17px 24px;
`;

const CardText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const OrderWrap = styled.View`
  flex: 1;
  position: relative;
  margin: 0px 24px;
`;

const Border = styled.View`
  background-color: ${props => props.theme.colors.grey[8]};
  height: 1px;
  margin: 24px 0px;
`;

const CountText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[4]};
`;

const MealInfo = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProductInfo = styled.View`
  margin-top: 34px;
`;

const ArrowRight = styled(ArrowRightIcon)`
  color: ${props => props.theme.colors.grey[4]};
  margin-left: 8px;
`;

const MealNameView = styled.View`
  width: 80%;
`;

const Bar = styled.View`
  background-color: ${({theme}) => theme.colors.grey[7]};
  height: 62px;
  width: 3px;
`;

const DiscountText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[5]};
  white-space: nowrap;
`;

const DiscountView = styled.View`
  flex-direction: row;
  margin: 0px 24px 16px 32px;
`;

const DiscountTextWrap = styled.View`
  justify-content: space-between;
  padding-left: 12px;
  white-space: nowrap;
  width: 100%;
`;

const DiscountTextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  white-space: nowrap;
`;

const KeyContainer = styled.KeyboardAvoidingView`
  /* flex: 1; */
  position: relative;
`;
const CardSelectContainer = styled.View`
  height: 82px;
`;

const KeyboardInner = styled.View`
  width: 100%;
  padding: 8px 20px;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.grey[8]};
  justify-content: flex-end;
`;

const PointApply = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

const PriceView = styled.View`
  flex-direction: row;
`;

const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentsWrap = styled(ContentWrap)`
  padding-bottom: 24px;
`;

const CountWrap = styled.View`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

const UserPointView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 24px;
`;

const UserPointText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  //margin-top: 16px;
`;

const TotalPriceWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
`;

const ClearInputButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
`;

const PointInfoText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.red[500]};
`;
