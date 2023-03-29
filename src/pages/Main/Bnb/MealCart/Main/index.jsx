import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import styled from 'styled-components';

import FastImage from 'react-native-fast-image';
import SoldOut from '../../../../../assets/icons/MealCart/soldOut.svg';
import Arrow from '../../../../../assets/icons/MealCart/arrow.svg';
import DeleteIcon from '../../../../../assets/icons/MealCart/delete.svg';
import Question from '../../../../../assets/icons/MealCart/question.svg';
import X from '../../../../../assets/icons/MealCart/x.svg';
import WarningIcon from '../../../../../assets/icons/MealCart/warning.svg';
import Minus from '../../../../../assets/icons/MealDetail/minus.svg';
import PlusIcon from '../../../../../assets/icons/MealDetail/plus.svg';
import {loadMealCart} from '../../../../../biz/useShoppingBasket/Fetch';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import {isQuantityAtom} from '../../../../../biz/useShoppingBasket/store';
import useUserInfo from '../../../../../biz/useUserInfo';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/Button';
import NoMealButton from '../../../../../components/Button';
import Count from '../../../../../components/Count';
import KeyboardAvoiding from '../../../../../components/KeyboardAvoiding';
import Typography from '../../../../../components/Typography';
import {formattedMonthDay} from '../../../../../utils/dateFormatter';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as BuyMealPageName} from '../../BuyMeal/Main';
import {PAGE_NAME as PaymentPageName} from '../../Payment/Main';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import BottomSheet from '../../../../../components/BottomSheet';
import BottomMenu from '../../../../../components/BottomSheetMenu';
import Toast from '../../../../../components/Toast';
import useUserMe from '../../../../../biz/useUserMe';
import {surpportPrice} from '../../../../Group/GroupCorporations/CorporationsApplication/ThirdPage/Pages/function';

export const PAGE_NAME = 'MEAL_CART_PAGE';
const Pages = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const bodyRef = useRef();
  const scrollRef = useRef();
  const boxRef = useRef();
  const [focus, setFocus] = useState(false);
  const [id, setId] = useState(null);
  const {
    isLoadMeal,
    isQuantity,
    loadMeal,
    deleteMeal,
    setLoadMeal,
    updateMeal,
    allDeleteMeal,
    userPoint,
    mealCartSpot,
    loadSoldOutMeal,
    soldOutMeal,
    clientStatus,
  } = useShoppingBasket();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [show, setShow] = useState(false);
  const {isUserInfo} = useUserInfo();
  const {getCardList} = useUserMe();
  const [selected, setSelected] = useState(isUserInfo.spotId);
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [type, setType] = useState();
  const toast = Toast();

  const PressSpotButton = () => {
    setModalVisible2(true);
  };

  const keyboardStatus = useKeyboardEvent();

  useFocusEffect(
    useCallback(() => {
      async function loadCart() {
        try {
          const res = await loadMeal();
          if (res) {
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
      const getData = async () => {
        const card = await getCardList();
        if (card.statusCode === 200) {
          const update = await updateMeal(req);
          if (update.statusCode === 200) {
            await loadCart();
          }
        }
      };
      getData();
    }, []),
  );
  useEffect(() => {}, [isFocused]);
  useEffect(() => {}, []);

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

  const fundButton = () => {
    setModalVisible(true);
  };

  const addHandle = productId => {
    const addQty = isLoadMeal?.map(el => {
      return {
        ...el,
        cartDailyFoodDtoList: [
          ...el.cartDailyFoodDtoList.map(v => {
            return {
              ...v,
              cartDailyFoods: [
                ...v.cartDailyFoods.map(food => {
                  if (food.dailyFoodId === productId) {
                    return {...food, count: food.count + 1};
                  } else {
                    return {...food};
                  }
                }),
              ],
            };
          }),
        ],
      };
    });
    setLoadMeal(addQty);
  };

  const substractHandle = productId => {
    const substracQty = isLoadMeal?.map(el => {
      return {
        ...el,
        cartDailyFoodDtoList: [
          ...el.cartDailyFoodDtoList.map(v => {
            return {
              ...v,
              cartDailyFoods: [
                ...v.cartDailyFoods.map(food => {
                  if (food.dailyFoodId === productId) {
                    return {
                      ...food,
                      count: food.count <= 1 ? 1 : food.count - 1,
                    };
                  } else {
                    return {...food};
                  }
                }),
              ],
            };
          }),
        ],
      };
    });
    setLoadMeal(substracQty);
  };

  // 할인 우선순위 : 1.멤버십 2. 판매자할인 3.기간할인

  // 주문 마감 제외 배열
  const arrs = isLoadMeal
    ?.filter(p => p.spotId === selected)
    ?.map(el =>
      el.cartDailyFoodDtoList?.map(v =>
        v.cartDailyFoods.filter(c => c.status !== 2),
      ),
    )
    .flat();
  const arr = arrs.reduce((acc, val) => [...acc, ...val], []);

  // 장바구니 배열(마감,품절 포함)
  const cartArrs = isLoadMeal
    ?.filter(p => p.spotId === selected)
    ?.map(el => el.cartDailyFoodDtoList.map(v => v.cartDailyFoods))
    .flat();
  const cartArr = cartArrs.reduce((acc, val) => [...acc, ...val], []);

  // 주문 마감 수량
  const deadlineArrs = isLoadMeal
    ?.filter(p => p.spotId === selected)
    ?.map(el =>
      el.cartDailyFoodDtoList?.map(v =>
        v.cartDailyFoods.filter(c => c.status === 2),
      ),
    )
    .flat();
  const deadlineArr = deadlineArrs.reduce((acc, val) => [...acc, ...val], []);
  const deadline = deadlineArr
    .map(p => p.count)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  // 주문 마감 제외 시킨 배열
  const spotFilter = isLoadMeal.filter(el => el.spotId === selected);

  const newArr = spotFilter.map(el => {
    return {
      cartDailyFoodDtoList: [
        ...el.cartDailyFoodDtoList.map(v => {
          return {
            ...v,
            cartDailyFoods: [
              ...v.cartDailyFoods.filter(food => {
                return food.status !== 2;
              }),
            ],
          };
        }),
      ],
    };
  });

  const newArrs = newArr.reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);

  const lastArr = newArrs[0]?.cartDailyFoodDtoList?.filter(
    el => el.cartDailyFoods.length !== 0,
  );

  // 총 개수 (주문 마감 미포함)
  const totalCount = arr
    ?.map(p => p.count)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  // (할인전)총 금액
  const totalMealPrice = arr
    ?.map(p => p.count * p.price)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  // 멤버십 할인 금액
  const membershipDiscountPrice = arr
    ?.map(p => p.membershipDiscountPrice * p.count)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  // 판매자 할인 금액
  const makersDiscountPrice = arr
    ?.map(p => p.makersDiscountPrice * p.count)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  // 기간 할인 금액
  const periodDiscountPrice = arr
    ?.map(p => p.periodDiscountPrice * p.count)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  // 배송비
  const deliveryFee = lastArr
    ?.map(el => el.deliveryFee)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  // 할인가 계산
  const discountPrice = arr
    ?.map(p => p.discountedPrice * p.count)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  // 메드트로닉 지원금 유
  const medtronicSupportPrice = lastArr?.map(el => el.supportPrice);
  const set = new Set(medtronicSupportPrice);
  const medtronicSupportArr = [...set];

  // 메드트로닉 식사가격
  const medtronicPrice =
    medtronicSupportArr.includes(62471004) &&
    Math.round(discountPrice / 20) * 10;

  // 총 할인금액
  const totalDiscountPrice =
    membershipDiscountPrice + makersDiscountPrice + periodDiscountPrice;
  const totals = lastArr?.map(v => {
    const totalDateMealPrice = v.cartDailyFoods
      ?.map(p => p.count * p.price)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
    const membershipDateDiscountPrice = v.cartDailyFoods
      ?.map(p => p.membershipDiscountPrice * p.count)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    // 판매자 할인 금액
    const makersDateDiscountPrice = v.cartDailyFoods
      ?.map(p => p.makersDiscountPrice * p.count)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    // 기간 할인 금액
    const periodDateDiscountPrice = v.cartDailyFoods
      ?.map(p => p.periodDiscountPrice * p.count)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
    const dailyDiscountPrice =
      membershipDateDiscountPrice +
      makersDateDiscountPrice +
      periodDateDiscountPrice;
    const totalDatePrice =
      totalDateMealPrice - dailyDiscountPrice - v.supportPrice + v.deliveryFee;
    return totalDatePrice > 0 ? totalDatePrice : 0;
  });
  const useDateSupportPrice = lastArr?.map(v => {
    const totalDateMealPrice = v.cartDailyFoods
      ?.map(p => p.count * p.price)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
    const membershipDateDiscountPrice = v.cartDailyFoods
      ?.map(p => p.membershipDiscountPrice * p.count)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    // 판매자 할인 금액
    const makersDateDiscountPrice = v.cartDailyFoods
      ?.map(p => p.makersDiscountPrice * p.count)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    // 기간 할인 금액
    const periodDateDiscountPrice = v.cartDailyFoods
      ?.map(p => p.periodDiscountPrice * p.count)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
    const dailyDiscountPrice =
      membershipDateDiscountPrice +
      makersDateDiscountPrice +
      periodDateDiscountPrice;
    const totalDatePrice =
      totalDateMealPrice - dailyDiscountPrice - v.supportPrice + v.deliveryFee;
    return totalDatePrice > 0
      ? v.supportPrice
      : v.supportPrice + totalDatePrice;
  });

  const totalPrice = totals?.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  // 사용한 식사 지원금
  //  const usedSupportPrice =
  //  discountPrice < supportPrice ? discountPrice : supportPrice;
  const usedSupportPrice = useDateSupportPrice?.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  // 총 결제금액
  // const totalPrice =
  //   totalMealPrice - usedSupportPrice - totalDiscountPrice + deliveryFee;

  // 메드트로닉 총 결제금액
  const medtronicTotalPrice =
    totalMealPrice - medtronicPrice - totalDiscountPrice + deliveryFee;

  // 품절
  const soldout = arr.filter(el => el.status === 0);

  // 클라 타입
  const clientType = clientStatus.filter(p => p.spotId === selected);

  // 스팟 이름

  const spotName = mealCartSpot.filter(p => p.id === selected);

  // 재고 부족
  const isLack = cartArr.map(el => {
    return el.status === 1 && el.capacity < el.count;
  });

  const focusPress = () => {
    setFocus(true);
  };
  const blurPress = () => {
    setFocus(false);
  };

  const changeText = (number, pi) => {
    const changeQty = isLoadMeal?.map(el => {
      return {
        ...el,
        cartDailyFoodDtoList: [
          ...el.cartDailyFoodDtoList.map(v => {
            return {
              ...v,
              cartDailyFoods: [
                ...v.cartDailyFoods.map(food => {
                  if (food.dailyFoodId === pi) {
                    return {...food, count: Number(number)};
                  } else {
                    return {...food};
                  }
                }),
              ],
            };
          }),
        ],
      };
    });

    setLoadMeal(changeQty);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteButton = async foodId => {
    const arr = isLoadMeal?.map(el => {
      return {
        ...el,
        cartDailyFoodDtoList: [
          ...el.cartDailyFoodDtoList.map(v => {
            return {
              ...v,
              cartDailyFoods: [
                ...v.cartDailyFoods.filter(food => food.id !== foodId),
              ],
            };
          }),
        ],
      };
    });

    const deleteArr = arr.map(el => {
      return {
        ...el,
        cartDailyFoodDtoList: [
          ...el.cartDailyFoodDtoList.filter(v => v.cartDailyFoods.length !== 0),
        ],
      };
    });
    const deleteArrs = deleteArr.filter(el => {
      return el.cartDailyFoodDtoList.length !== 0;
    });

    try {
      await deleteMeal(foodId);
      setLoadMeal(deleteArrs);
    } catch (err) {
      console.log(err);
    }
  };

  const propsId = mealId => {
    setId(mealId);
  };

  const modifyPress = async () => {
    // try {
    //     await updateMeal({"updateCartList":quantity});
    // } catch(err){
    //     throw new Error ('에러남')
    // }
  };

  const allDelete = spotId => {
    const data = isLoadMeal?.filter(el => el.spotId !== selected);
    Alert.alert('전체 삭제', '메뉴를 모두 삭제하시겠어요?', [
      {
        text: '아니요',
        onPress: () => console.log('cancel pressed'),
        style: 'destructive',
      },
      {
        text: '삭제',
        onPress: () => {
          try {
            allDeleteMeal(spotId);
            setLoadMeal(data);
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  };

  const changeMealPress = (count, id) => {
    // console.log(date,id,type)
    Alert.alert(
      '메뉴 변경',
      `현재 메뉴 취소 후 진행됩니다.\n 메뉴를 취소하시겠어요?(수량:${count})`,

      [
        {
          text: '아니요',
          onPress: () => {},
        },
        {
          text: '메뉴 취소',
          onPress: async () => {
            try {
              await deleteButton(id);
              setModalVisible3(true);
            } catch (err) {
              console.log(err);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const isSoldOut = () => {
    if (soldout.length !== 0) {
      Alert.alert('품절된 상품이 있어요', '메뉴를 변경하시겠어요?', [
        {
          text: '메뉴변경',
          onPress: () => {},
        },
      ]);
    } else {
      return;
    }
  };

  const isShortage = () => {
    Alert.alert('재고가 부족한 상품이 있어요', '수량을 조절하시겠어요?', [
      {
        text: '수량조절',
        onPress: () => {},
      },
    ]);
  };

  const isDeadline = () => {
    const data = isLoadMeal?.filter(el => el.spotId !== selected);
    if (totalCount === 0) {
      Alert.alert(
        '주문할 수 있는 상품이 없어요',
        '모든 상품의 주문 마감시간이 종료되었습니다.',

        [
          {
            text: '삭제하기',
            onPress: () => {
              allDeleteMeal(selected);
              setLoadMeal(data);
            },
            style: 'destructive',
          },
        ],
      );
    } else {
      return;
    }
  };

  const changMealList = async (date, id, type) => {
    try {
      await loadSoldOutMeal(date, id, type);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(spotName[0]?.text, '00');
  return (
    <SafeView>
      <SpotView>
        <SpotPress onPress={PressSpotButton}>
          <SpotName>
            {spotName[0]?.text === undefined
              ? '스팟 없음'
              : isUserInfo.group + '\u00a0' + isUserInfo.spot}
          </SpotName>
          <ArrowIcon />
        </SpotPress>
        <Pressable
          onPress={() => {
            allDelete(selected);
          }}>
          <Text>전체삭제</Text>
        </Pressable>
      </SpotView>
      {cartArr.length === 0 && (
        <EmptyView>
          <NoMealText>아직 담은 식사가 없어요!</NoMealText>
          <NoMealButtonWrap>
            <NoMealButton
              size={'button38'}
              label={'식사 담으러가기'}
              type={'white'}
              text={'Button09SB'}
              onPressEvent={() => {
                navigation.navigate(BuyMealPageName);
              }}
            />
          </NoMealButtonWrap>
        </EmptyView>
      )}
      <ScrollViewWrap ref={scrollRef}>
        {isLoadMeal?.map((el, idx) => {
          return (
            <React.Fragment key={idx}>
              {selected === el.spotId &&
                el.cartDailyFoodDtoList.map((v, idx) => {
                  const diningType =
                    v.diningType === '아침'
                      ? 1
                      : v.diningType === '점심'
                      ? 2
                      : 3;
                  return (
                    <React.Fragment key={idx}>
                      {v.cartDailyFoods.map((food, i) => {
                        const rate =
                          food.membershipDiscountRate +
                          food.makersDiscountRate +
                          food.periodDiscountRate;
                        const membership =
                          food.membershipDiscountPrice === null
                            ? 0
                            : food.membershipDiscountPrice;
                        const markers =
                          food.makersDiscountPrice === null
                            ? 0
                            : food.makersDiscountPrice;
                        const period =
                          food.periodDiscountPrice === null
                            ? 0
                            : food.periodDiscountPrice;
                        const discountPrice = membership + markers + period;
                        return (
                          <Wrap
                            key={i}
                            status={food.status}
                            count={food.count}
                            capacity={food.capacity}>
                            <ContentHeader>
                              <DiningName>
                                {formattedMonthDay(v.serviceDate)}{' '}
                                {v.diningType}
                              </DiningName>
                            </ContentHeader>
                            <DeleteIcons
                              onPress={() => {
                                deleteButton(food.id);
                              }}>
                              <DeleteIcon />
                            </DeleteIcons>
                            <ContentWrap>
                              <FastImage
                                source={{
                                  uri: `${food.image}`,
                                  priority: FastImage.priority.high,
                                }}
                                style={{
                                  width: 45,
                                  height: 45,
                                  borderRadius: 7,
                                  marginRight: 12,
                                }}>
                                {food.status === 2 && <BlurView />}
                              </FastImage>
                              <MealNameView>
                                <MealName
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                  status={food.status}>
                                  [{food.makers}] {food.name}
                                </MealName>
                                <SalePriceWrap>
                                  <Price status={food.status}>
                                    {withCommas(
                                      (food.price - discountPrice) * food.count,
                                    )}
                                    원
                                  </Price>
                                  {rate !== 0 && (
                                    <SalePrice status={food.status}>
                                      {withCommas(food.price * food.count)}원
                                    </SalePrice>
                                  )}
                                </SalePriceWrap>
                                {food.status === 0 && (
                                  <SoldOutView>
                                    <SoldOutIcon status={food.status} />
                                    <SoldOutText status={food.status}>
                                      품절
                                    </SoldOutText>
                                  </SoldOutView>
                                )}
                                {food.status === 2 && (
                                  <SoldOutView>
                                    <SoldOutIcon status={food.status} />
                                    <SoldOutText status={food.status}>
                                      주문마감
                                    </SoldOutText>
                                  </SoldOutView>
                                )}
                                {food.status === 1 &&
                                  food.capacity < food.count && (
                                    <SoldOutView>
                                      <WarningIcon />
                                      <ShortageText>
                                        재고부족(재고 수량:{food.capacity})
                                      </ShortageText>
                                    </SoldOutView>
                                  )}
                              </MealNameView>
                            </ContentWrap>
                            {food.status === 0 && (
                              <MenuChangeView
                                onPress={() => {
                                  changeMealPress(food.count, food.id);
                                  changMealList(
                                    el.spotId,
                                    v.serviceDate,
                                    diningType,
                                  );
                                  setDate(v.serviceDate);
                                  setType(v.diningType);
                                }}>
                                <MenuChangeText>메뉴 변경</MenuChangeText>
                              </MenuChangeView>
                            )}
                            <BottomMenu
                              modalVisible={modalVisible3}
                              setModalVisible={setModalVisible3}
                              title={formattedMonthDay(date) + '\u00a0' + type}
                              btn="변경완료"
                              data={soldOutMeal}
                              toast={toast}
                              setShow={setShow}
                            />
                            <CountWrap>
                              {food.status !== 2 && (
                                <Count
                                  onPressEvent={() => {
                                    bodyRef.current.focus();
                                    focusPress();
                                    propsId(food.dailyFoodId);
                                  }}
                                  increasePress={addHandle}
                                  decreasePress={substractHandle}
                                  count={food.count}
                                  id={food.dailyFoodId}
                                  status={food.status}
                                  capacity={food.capacity}
                                />
                              )}
                            </CountWrap>
                          </Wrap>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
          );
        })}

        {totalCount !== 0 && (
          <View>
            <PaymentWrap>
              <PaymentView>
                <PaymentText>총 상품금액</PaymentText>
                <PaymentText>{withCommas(totalMealPrice)} 원</PaymentText>
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
                      : `-${withCommas(usedSupportPrice)}`}{' '}
                    원
                  </PaymentText>
                </PaymentView>
              )}
              <PaymentView>
                <PaymentText>총 할인금액</PaymentText>
                <PaymentText>
                  {totalDiscountPrice === 0
                    ? 0
                    : `-${withCommas(totalDiscountPrice)}`}{' '}
                  원
                </PaymentText>
              </PaymentView>
              <PaymentView>
                <PaymentText>배송비</PaymentText>
                <PaymentText>
                  {deliveryFee === 0 ? 0 : withCommas(deliveryFee)} 원
                </PaymentText>
              </PaymentView>
              <PaymentView>
                <TotalPriceTitle>총 결제금액</TotalPriceTitle>
                <TotalPrice>
                  {medtronicSupportArr.includes(62471004)
                    ? withCommas(medtronicTotalPrice)
                    : withCommas(totalPrice)}
                  원
                </TotalPrice>
              </PaymentView>
              <Border />
              {/* <UserPointView>
                        <UserPointText>보유포인트 <UserHavePoint>{isUserInfo.point === 0 ? 0 : withCommas(isUserInfo.point)}P</UserHavePoint>(결제시 적용가능)</UserPointText>
                    </UserPointView> */}
            </PaymentWrap>
          </View>
        )}
        {!keyboardStatus.isKeyboardActivate && <View style={{height: 150}} />}
      </ScrollViewWrap>

      <KeyboardAvoiding
        mealCart
        blurPress={blurPress}
        focus={focus}
        addHandle={addHandle}
        substractHandle={substractHandle}
        bodyRef={bodyRef}
        changeText={changeText}
        id={id}
      />

      {/*  */}
      {cartArr.length !== 0 && !keyboardStatus.isKeyboardActivate && (
        <ButtonWrap focus={focus}>
          {deadlineArr.length !== 0 && (
            <EndView>
              <EndText>
                주문 마감된 상품이 있어요
                <EndPointText>({deadline}개)</EndPointText>
              </EndText>
              <EndQuestionText>
                해당 상품을 제외하고 결제하시겠어요?
              </EndQuestionText>
            </EndView>
          )}
          <Button
            label={`총 ${totalCount}개 결제하기`}
            type={'yellow'}
            onPressEvent={() => {
              deadline !== 0 && isDeadline();
              soldout.length !== 0 && isSoldOut();
              updateMeal(req);
              isLack.includes(true) && isShortage();
              soldout.length === 0 &&
                totalCount !== 0 &&
                !isLack.includes(true) &&
                navigation.navigate(PaymentPageName, {
                  totalCount,
                  totalMealPrice,
                  membershipDiscountPrice,
                  makersDiscountPrice,
                  periodDiscountPrice,
                  totalDiscountPrice,
                  totalPrice,
                  deliveryFee,
                  selected,
                  name,
                  discountPrice,
                  spotName,
                  clientType,
                  arr,
                  usedSupportPrice,
                  medtronicSupportArr,
                  medtronicTotalPrice,
                  medtronicPrice,
                });
            }}
          />
        </ButtonWrap>
      )}

      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'지원금이란?'}
        description={
          '고객님의 회사에서 지원하는 지원금입니다. \n 결제시 사용 가능한 최대 금액으로 자동 적용됩니다.'
        }
        buttonTitle1={'확인했어요'}
        buttonType1={'grey7'}
        onPressEvent1={closeModal}
      />
      <BottomSheet
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        title="스팟 선택"
        data={mealCartSpot}
        selected={selected}
        setSelected={setSelected}
        setName={setName}
      />
      {show && (
        <toast.ToastWrap message={'메뉴가 변경됐어요'} icon={'checked'} />
      )}
    </SafeView>
  );
};

export default Pages;

const SafeView = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.grey[0]};
  flex: 1;
`;
const ScrollViewWrap = styled.ScrollView`
  flex: 1;
`;

const BottomView = styled.View``;

export const PressableView = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

export const QuestionIcon = styled(Question)`
  margin-left: 4px;
`;

const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Wrap = styled.View`
  flex: 1;
  padding: 16px 24px;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
  position: relative;
  background-color: ${({theme, status, count, capacity}) =>
    status === 0 || (status === 1 && capacity < count)
      ? theme.colors.grey[8]
      : theme.colors.grey[0]};
  min-height: 180px;
`;

export const MealImage = styled(FastImage)`
  width: 45px;
  height: 45px;
  border-radius: 7px;
  margin-right: 12px;
`;

export const PointBoldText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.red[500]};
  padding-right: 4px;
`;

export const ContentWrap = styled.View`
  flex-direction: row;
  padding-top: 12px;
  position: relative;
`;

export const Price = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme, status}) =>
    status === 2 ? theme.colors.grey[6] : theme.colors.grey[4]};
`;

export const SalePrice = styled(Typography).attrs({text: 'Body06R'})`
  text-decoration: line-through;
  text-decoration-color: ${({theme, status}) =>
    status === 2 ? theme.colors.grey[6] : theme.colors.grey[5]};
  color: ${({theme, status}) =>
    status === 2 ? theme.colors.grey[6] : theme.colors.grey[5]};
  margin-left: 4px;
`;

export const SalePriceWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CountWrap = styled.View`
  position: absolute;
  right: 24px;
  bottom: 14px;
`;

export const ButtonWrap = styled.View`
  position: absolute;
  bottom: 0px;
  padding: 0px 24px;
  padding-bottom: 35px;
  opacity: ${({focus}) => (focus ? 0 : 1)};
  background-color: #fff;
`;

const PaymentWrap = styled.View`
  border-top-color: ${props => props.theme.colors.grey[8]};
  border-top-width: 6px;
  padding-top: 24px;
  padding-bottom: 50px;
`;
export const PaymentView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  white-space: nowrap;
  margin: 0px 24px;
  padding-bottom: 16px;
`;

const NoMealButtonWrap = styled.View`
  padding: 0px 120px;
`;

const EmptyView = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

export const DiningName = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[2]};
`;
export const MealName = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme, status}) =>
    status === 2 ? theme.colors.grey[6] : theme.colors.grey[2]};
  margin-bottom: 2px;
`;

export const PaymentText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[4]};
  white-space: nowrap;
  //padding-bottom:16px;
`;

export const PointText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.green[500]};
  white-space: nowrap;
`;

export const TotalPriceTitle = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[4]};
`;
export const TotalPrice = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const NoMealText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[5]};
  margin-bottom: 16px;
  white-space: nowrap;
`;

const InnerView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 98px;
  height: 38px;
  background-color: ${props => props.theme.colors.grey[0]};
  border: 1px solid ${props => props.theme.colors.grey[6]};
  border-radius: 7px;
`;

const IconWrap = styled.Pressable`
  padding: 5px;
  height: 100%;
  justify-content: center;
`;

const MinusIcon = styled(Minus)`
  color: ${({disabled, theme}) =>
    disabled === 1 ? theme.colors.grey[6] : theme.colors.grey[2]};
`;

export const PointWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PointInputWrap = styled.View`
  width: 115px;
  height: 38px;
  border-radius: 7px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  background-color: ${({theme}) => theme.colors.grey[0]};
  padding: 0px 28px 0px 12px;
  flex-direction: row;
  text-align: center;
  align-items: center;
  position: relative;
`;

export const PointInput = styled.TextInput`
  flex-direction: row;
  width: 100%;
`;
export const XIcon = styled(X)`
  position: absolute;
  right: 6px;
`;

export const PointUnitText = styled(Typography).attrs({text: 'Title04R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  white-space: nowrap;
  margin-left: 8px;
`;

const MealNameView = styled.View`
  width: 80%;
  margin-bottom: 32px;
`;

const UserPointView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin: 0px 24px;
`;

const UserPointText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-top: 16px;
`;
const UserHavePoint = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

const Border = styled.View`
  background-color: ${({theme}) => theme.colors.grey[8]};
  /* width:100%; */
  height: 1px;
  margin: 0px 24px;
`;

const DeleteIcons = styled.Pressable`
  position: absolute;
  top: 16px;
  right: 24px;
  padding: 4px;
`;

const SpotName = styled(Typography).attrs({text: 'Button10SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const SpotPress = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
`;

const ArrowIcon = styled(Arrow)`
  margin-left: 10px;
`;

const SpotView = styled.View`
  border-top-color: ${({theme}) => theme.colors.grey[8]};
  border-top-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
`;

const MenuChangeText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const MenuChangeView = styled.Pressable`
  border: 1px solid ${({theme}) => theme.colors.grey[6]};
  background-color: #fff;
  position: absolute;
  right: 128px;
  bottom: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 98px;
  height: 38px;
  border-radius: 7px;
`;

const SoldOutIcon = styled(SoldOut)`
  color: ${({theme, status}) =>
    status === 0 ? theme.colors.red[500] : theme.colors.grey[4]};
  margin-right: 4px;
`;

const SoldOutText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme, status}) =>
    status === 0 ? theme.colors.red[500] : theme.colors.grey[4]};
`;

const SoldOutView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;

const EndText = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const EndPointText = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${({theme}) => theme.colors.red[500]};
`;

const EndQuestionText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[3]};
`;

const EndView = styled.View`
  background-color: #fff;
  align-items: center;
  padding: 12px 0px;
`;

const BlurView = styled.View`
  position: absolute;
  width: 45px;
  height: 45px;
  border-radius: 7px;
  left: 0px;
  background-color: #ffffffcc;
  z-index: 999;
`;

const ShortageText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.red[500]};
  margin-left: 4px;
`;
