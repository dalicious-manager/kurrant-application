import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Alert,
  Text,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useQueryClient} from 'react-query';
import styled from 'styled-components';

import MealDetailReview from './Review/MealDetailReview';
import {isCloseToBottomOfScrollView} from './Review/MealDetailReview/logic';
// import {
//   fetchNextPageReviewDetailAtom,
//   hasNextPageReviewDetailAtom,
// } from './Review/MealDetailReview/store';
import {LoadingIcon} from '../../../../../assets';
import BackArrow from '../../../../../assets/icons/MealDetail/backArrow.svg';
import useAuth from '../../../../../biz/useAuth';
import {foodDetailDataAtom} from '../../../../../biz/useBanner/store';
import useFoodDetail from '../../../../../biz/useFoodDetail/hook';
import {
  fetchNextPageReviewDetailAtom,
  hasNextPageReviewDetailAtom,
} from '../../../../../biz/useReview/useMealDetailReview/store';
import {useMainInfiniteScrollQuery} from '../../../../../biz/useReview/useMealDetailReview/useGetMealDetailReview';
import useShoppingBasket from '../../../../../biz/useShoppingBasket/hook';
import Badge from '../../../../../components/Badge';
import Balloon from '../../../../../components/Balloon';
import ShoppingCart from '../../../../../components/BasketButton';
import BottomModal from '../../../../../components/BottomModal';
import Button from '../../../../../components/ButtonExtendable';
import GifImage from '../../../../../components/GifImage';
import {YellowStar} from '../../../../../components/Icon';
import KeyboardAvoiding from '../../../../../components/KeyboardAvoiding';
import Label from '../../../../../components/Label';
import Modal from '../../../../../components/Modal';
import Typography from '../../../../../components/Typography';
import {useGetDailyfoodDetailNow} from '../../../../../hook/useDailyfood';
import {useAddShoppingBasket} from '../../../../../hook/useShoppingBasket';
import {useGetUserInfo} from '../../../../../hook/useUserInfo';
import {addCommasInEveryThirdDigit} from '../../../../../utils/splitNumberAndUnit';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as LoginPageName} from '../../../Login/Login';
import {PAGE_NAME as MealInformationPageName} from '../../MealDetail/Page';
import CarouselImage from '../components/CarouselImage';
import MembershipDiscountBox from '../components/MembershipDiscountBox';
import Skeleton from '../Skeleton';

export const PAGE_NAME = 'MEAL_DETAIL_PAGE';
const {width} = Dimensions.get('screen');
const Pages = ({route}) => {
  const queryClient = useQueryClient();
  const bodyRef = useRef();
  const navigation = useNavigation();
  const {balloonEvent, BalloonWrap} = Balloon();
  const [modalVisible, setModalVisible] = useState(false);
  const [focus, setFocus] = useState(false);
  const [allReviewList, setAllReviewList] = useState();
  const [scroll, setScroll] = useState(0);
  const [imgScroll, setImgScroll] = useState(true);
  const [foodDetailData, setFoodDetailData] = useAtom(foodDetailDataAtom);

  const {foodDetailDiscount, isfoodDetailDiscount} = useFoodDetail(); // 할인정보
  const {isFoodDetails, isFoodDetailLoading, foodDetail} = useFoodDetail();
  const {
    data: isFoodDetail,
    isLoading: detailLoading,
    isFetching: detailFetching,
    isSuccess: detailSuccess,
    refetch: detailRefetch,
  } = useGetDailyfoodDetailNow(route.params.dailyFoodId, userRole); // 상세정보
  const {
    readableAtom: {userRole},
  } = useAuth();
  const {loadMeal, updateMeal, isLoadMeal} = useShoppingBasket();
  const {mutateAsync: addMeal, isLoading: isAddMeal} = useAddShoppingBasket();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  const headerTitle = foodDetailData?.name;
  const dailyFoodId = route.params.dailyFoodId;
  const time = route.params.deliveryTime;
  // console.log(isFoodDetailLoading, 'oo');

  const [count, setCount] = useState(1);

  const [hasNextPageReviewDetail] = useAtom(hasNextPageReviewDetailAtom);
  const [fetchNextPageReviewDetail] = useAtom(fetchNextPageReviewDetailAtom);
  const isFocused = useIsFocused();

  // console.log(dailyFoodId);

  const closeModal = () => {
    setModalVisible(false);
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
  const cartCount = isLoadMeal
    ?.map(el =>
      el.cartDailyFoodDtoList.map(v =>
        v.cartDailyFoods.map(c => {
          if (c.dailyFoodId === dailyFoodId) return c.count;
        }),
      ),
    )
    .flat();
  const quantity = quantityArr.reduce((acc, val) => [...acc, ...val], []);
  const modifyQty = quantity.reduce((acc, cur) => [...acc, ...cur], []);
  const req = {updateCartList: modifyQty};
  // console.log(dailyFoodId,'id')
  // foodId 넘겨줘야함
  useEffect(() => {
    async function loadFoodDetail() {
      queryClient.invalidateQueries(['review']);
      setAllReviewList();
      const foodData = await foodDetail(dailyFoodId);
      if (foodData) {
        const meal = await loadMeal();
        if (meal) {
          await updateMeal(req);
        }
      }
      const data = await analytics().logSelectContent({
        content_type: foodData.makersName,
        item_id: foodData.name,
      });
      const data2 = await analytics().logEvent('food_detail', {
        id: dailyFoodId,
        name: foodData.name,
        makers: foodData.makersName,
      });
    }
    loadFoodDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerStyle: {
        backgroundColor: `${scroll < 60 ? 'transparent' : 'white'}`,
      },
      headerTitle: `${scroll > 60 ? `${headerTitle}` : ''}`,
      headerLeft: () =>
        scroll > 60 ? (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: 3,
              width: 30,
              height: 30,
              justifyContent: 'center',
            }}>
            <BackArrow color={'#343337'} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: 3,
              width: 30,
              height: 30,
              justifyContent: 'center',
            }}>
            <BackArrow color={'#fff'} />
          </Pressable>
        ),
      headerRight: () =>
        scroll > 60 ? (
          <View>
            <ShoppingCart color={'#343337'} margin={[0, 10]} />
            <Badge />
          </View>
        ) : (
          <View>
            <ShoppingCart color={'white'} margin={[0, 10]} />
            <Badge />
          </View>
        ),
    });
  }, [headerTitle, navigation, scroll]);

  const addCartPress = async () => {
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
    const duplication = isLoadMeal
      ?.map(v =>
        v.cartDailyFoodDtoList.map(el =>
          el.cartDailyFoods.some(c => c.dailyFoodId === dailyFoodId),
        ),
      )
      .flat();

    if (duplication?.includes(true)) {
      setModalVisible(true);
    } else {
      try {
        await addToCart();
      } catch (err) {
        Alert.alert('장바구니 담기', err?.toString()?.replace('error: ', ''));
      }
    }
  };
  const addToCart = async () => {
    try {
      if (!time) {
        throw new Error('주문하실 상품의 배송시간을 선택해주세요.');
      }
      await addMeal([
        {
          dailyFoodId: dailyFoodId,
          count: count,
          spotId: isUserInfo?.spotId,
          deliveryTime: time,
        },
      ]);
      balloonEvent();
    } catch (err) {
      Alert.alert('장바구니 담기', err?.toString()?.replace('error: ', ''));
    }
    closeModal();
  };

  const increasePress = () => {
    setCount(prev => Number(prev) + 1);
  };
  const decreasePress = () => {
    setCount(prev => (prev <= 1 ? 1 : prev - 1));
  };

  const handleScroll = e => {
    const scrollY = e.nativeEvent.contentOffset.y;
    setScroll(scrollY);

    // 상세페이지 리뷰
    if (isCloseToBottomOfScrollView(e.nativeEvent)) {
      //'바닥에 도달함 '

      if (hasNextPageReviewDetail) {
        fetchNextPageReviewDetail.fetchNextPage();
      }
    }
  };

  const focusPress = () => {
    setFocus(true);
  };
  const blurPress = () => {
    setFocus(false);
  };

  const changeText = (number, id) => {
    setCount(number);
  };

  const realToTalDiscountRate =
    100 -
    (100 - foodDetailData?.membershipDiscountedRate) *
      0.01 *
      ((100 - foodDetailData?.makersDiscountedRate) * 0.01) *
      ((100 - foodDetailData?.periodDiscountedRate) * 0.01) *
      100;
  // console.log(Math.round(realToTalDiscountRate * 100) / 100, 'rate');

  const discountPrice =
    foodDetailData?.membershipDiscountedPrice +
    foodDetailData?.makersDiscountedPrice +
    foodDetailData?.periodDiscountedPrice;

  const snapOffsets = [0, 0];

  // useEffect(() => {
  //   async function detail() {
  //     await foodDetailDiscount(dailyFoodId);
  //     setReviewData();
  //     refetch();
  //   }

  //   detail();
  // }, [dailyFoodId, refetch]);

  // if (detailFetching) {
  //   return <Skeleton />;
  // }

  return (
    <>
      <Wrap>
        <FlatList
          scrollEnabled={Platform.OS === 'android' ? imgScroll : true}
          showsVerticalScrollIndicator={false}
          onScroll={e => handleScroll(e)}
          scrollEventThrottle={16}
          ListHeaderComponent={
            <View style={{marginBottom: 150}}>
              {scroll > 60 ? (
                <StatusBar />
              ) : (
                <StatusBar barStyle="light-content" />
              )}
              <CarouselImage
                detailFetching={detailFetching}
                img={foodDetailData?.imageList}
                setImgScroll={setImgScroll}
              />
              {!detailFetching ? (
                <>
                  <TouchableWithoutFeedback
                    onPressIn={() => setImgScroll(true)}>
                    <Content>
                      <View>
                        <MakersName>
                          {detailFetching
                            ? ''
                            : foodDetailData?.makersName || ''}
                        </MakersName>
                        <MealTitle>
                          {detailFetching ? '' : foodDetailData?.name || ''}
                        </MealTitle>
                        <Line>
                          {/* {reviewData?.pages[0]?.items.totalReview >= 1 && (
                            <ReviewWrap>
                              <YellowStar width="20px" height="20px" />
                              <ReviewPoint>
                                {reviewData?.pages[0]?.items.starAverage &&
                                reviewData?.pages[0]?.items.starAverage?.toString()
                                  .length === 1
                                  ? reviewData?.pages[0]?.items.starAverage.toFixed(
                                      1,
                                    )
                                  : reviewData?.pages[0]?.items.starAverage}
                              </ReviewPoint>
                              <ReviewCount>
                                ({reviewData?.pages[0]?.items.totalReview})
                              </ReviewCount>
                            </ReviewWrap>
                          )} */}

                          <InformationWrap
                            onPress={() => {
                              navigation.navigate(MealInformationPageName, {
                                data: foodDetailData?.origins,
                                data2: foodDetailData?.allergies,
                              });
                            }}>
                            <InformationText>알레르기/원산지</InformationText>
                          </InformationWrap>
                        </Line>
                        <MealDsc>
                          {detailFetching ? '' : foodDetailData?.description}
                        </MealDsc>

                        {foodDetailData?.spicy !== null && (
                          <Label label={`${foodDetailData?.spicy}`} />
                        )}
                        <PriceTitleWrap>
                          <PriceTitle>최종 판매가</PriceTitle>
                          <ModalWrap>
                            <Modal
                              id={dailyFoodId}
                              price={foodDetailData?.price || 0}
                              membershipDiscountedPrice={
                                foodDetailData?.membershipDiscountedPrice || 0
                              }
                              membershipDiscountedRate={
                                foodDetailData?.membershipDiscountedRate || 0
                              }
                              makersDiscountedPrice={
                                foodDetailData?.makersDiscountedPrice || 0
                              }
                              makersDiscountedRate={
                                foodDetailData?.makersDiscountedRate || 0
                              }
                              periodDiscountedPrice={
                                foodDetailData?.periodDiscountedPrice || 0
                              }
                              periodDiscountedRate={
                                foodDetailData?.periodDiscountedRate || 0
                              }
                              totalDiscountRate={realToTalDiscountRate || 0}
                              discountPrice={discountPrice || 0}
                            />
                          </ModalWrap>
                        </PriceTitleWrap>
                        <PriceWrap>
                          {realToTalDiscountRate !== 0 && (
                            <Percent>
                              {detailFetching
                                ? 0
                                : Math.round(
                                    Math.round(realToTalDiscountRate * 100) /
                                      100,
                                  )}
                              %
                            </Percent>
                          )}
                          {realToTalDiscountRate !== 0 && (
                            <SalePrice>
                              {detailFetching
                                ? 0
                                : withCommas(
                                    foodDetailData?.price - discountPrice,
                                  )}
                              원
                            </SalePrice>
                          )}
                          {realToTalDiscountRate === 0 && (
                            <NoSalePrice>
                              {detailFetching
                                ? 0
                                : withCommas(foodDetailData?.price)}
                              원
                            </NoSalePrice>
                          )}
                          {realToTalDiscountRate !== 0 && (
                            <Price>
                              {detailFetching
                                ? 0
                                : withCommas(foodDetailData?.price)}
                              원
                            </Price>
                          )}
                        </PriceWrap>
                      </View>

                      {foodDetailData?.membershipDiscountedRate === 0 && (
                        <MembershipDiscountBox isFoodDetail={foodDetailData} />
                      )}
                    </Content>
                  </TouchableWithoutFeedback>
                  <Content>
                    <InfoWrap>
                      <InfoTitleView>
                        <InfoTitle>할인 내역</InfoTitle>
                      </InfoTitleView>
                      <InfoTextView>
                        <InfoTextWrap>
                          {foodDetailData?.membershipDiscountedRate !== 0 ? (
                            <Info>멤버십 할인</Info>
                          ) : (
                            <Info>멤버십 가입시 할인</Info>
                          )}
                          {foodDetailData?.membershipDiscountedRate !== 0 ? (
                            <InfoText>
                              {foodDetailData?.membershipDiscountedRate}%
                            </InfoText>
                          ) : (
                            <InfoText>
                              {isfoodDetailDiscount?.membershipDiscountRate}%
                            </InfoText>
                          )}
                        </InfoTextWrap>
                        <InfoTextWrap>
                          <Info>판매자 할인</Info>
                          <InfoText>
                            {foodDetailData?.makersDiscountedRate}%
                          </InfoText>
                        </InfoTextWrap>
                        <InfoTextWrap>
                          <Info>기간 할인</Info>
                          <InfoText>
                            {foodDetailData?.periodDiscountedRate}%
                          </InfoText>
                        </InfoTextWrap>
                      </InfoTextView>
                    </InfoWrap>
                    <InfoWrap>
                      <InfoTitleView>
                        <InfoTitle>배송 정보</InfoTitle>
                      </InfoTitleView>
                      <InfoTextView>
                        <InfoTextWrap>
                          <Info>개별 배송</Info>
                          <InfoText>3,500원</InfoText>
                        </InfoTextWrap>
                        <InfoTextWrap>
                          <Info>멤버십 회원</Info>
                          <InfoText>무료 배송</InfoText>
                        </InfoTextWrap>
                      </InfoTextView>
                    </InfoWrap>
                  </Content>
                  {/* 식단 레포트 영양 정보 */}
                  {/* <Content>
                    <InfoWrap>
                      <InfoTitleView>
                        <InfoTitle>영양 정보</InfoTitle>
                      </InfoTitleView>
                      <InfoTextView>
                        <InfoTextWrap>
                          <Info>칼로리</Info>
                          <InfoText>
                            {isFoodDetail?.calorie
                              ? addCommasInEveryThirdDigit(
                                  isFoodDetail?.calorie,
                                )
                              : 0}
                            kcal
                          </InfoText>
                        </InfoTextWrap>
                        <InfoTextWrap>
                          <Info>탄수화물</Info>
                          <InfoText>
                            {isFoodDetail?.carbohydrate
                              ? addCommasInEveryThirdDigit(
                                  isFoodDetail?.carbohydrate,
                                )
                              : 0}
                            g
                          </InfoText>
                        </InfoTextWrap>
                        <InfoTextWrap>
                          <Info>단백질</Info>
                          <InfoText>
                            {' '}
                            {isFoodDetail?.protein
                              ? addCommasInEveryThirdDigit(
                                  isFoodDetail?.protein,
                                )
                              : 0}
                            g
                          </InfoText>
                        </InfoTextWrap>
                        <InfoTextWrap>
                          <Info>지방</Info>
                          <InfoText>
                            {isFoodDetail?.fat
                              ? addCommasInEveryThirdDigit(isFoodDetail?.fat)
                              : 0}
                            g
                          </InfoText>
                        </InfoTextWrap>
                      </InfoTextView>
                    </InfoWrap>
                  </Content> */}
                  {/* 리뷰자리 */}
                  <MealDetailReview
                    foodName={foodDetailData?.name}
                    imageLocation={foodDetailData?.imageList}
                    dailyFoodId={dailyFoodId}
                    allReviewList={allReviewList}
                    setAllReviewList={setAllReviewList}
                  />
                </>
              ) : (
                <Skeleton />
              )}
            </View>
          }
        />

        <KeyboardAvoiding
          mealDetail
          blurPress={blurPress}
          focus={focus}
          increasePress={increasePress}
          decreasePress={decreasePress}
          bodyRef={bodyRef}
          changeText={changeText}
          count={count}
          value={count.toString()}
        />
        {!focus && (
          <ButtonWrap>
            <Button
              price={foodDetailData?.price - discountPrice}
              onPressEvent2={() => {
                addCartPress();
              }}
              onPressEvent={() => {
                bodyRef.current.focus();
                focusPress();
              }}
              count={count}
              cartCount={
                cartCount[0] && cartCount[0][0] ? cartCount[0][0] || 0 : 0
              }
              capacity={foodDetailData?.capacity}
              increasePress={increasePress}
              decreasePress={decreasePress}
            />
          </ButtonWrap>
        )}
        <BalloonWrap
          message={'장바구니에 담았어요'}
          horizontal={'right'}
          size={'B'}
          location={{top: '11.5%', right: '16px'}}
        />
        <BottomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={`장바구니에 ${'\n'}동일 날짜/시간의 메뉴가 있어요.`}
          description={'그래도 추가하시겠어요?'}
          buttonTitle1={'아니요'}
          buttonType1="grey7"
          buttonTitle2={'추가'}
          buttonType2="yellow"
          onPressEvent1={closeModal}
          onPressEvent2={() => addToCart()}
        />
      </Wrap>
    </>
  );
};
export default Pages;

const Wrap = styled.View`
  background-color: ${props => props.theme.colors.grey[0]};
  position: relative;
  flex: 1;
`;

const ScrollViewWrap = styled.ScrollView`
  background-color: ${props => props.theme.colors.grey[0]};
`;

const FilterImage = styled(LinearGradient)`
  max-width: ${width}px;
  height: 380px;
`;
const Content = styled.View`
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 6px;
  padding: 24px 24px 16px 24px;
`;

const MealImage = styled.Image`
  width: 100%;
  height: 380px;
`;

const Line = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ReviewWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const InformationWrap = styled.Pressable`
  border: 1px solid ${props => props.theme.colors.grey[7]};
  border-radius: 7px;
  padding: 5px 12px 4px 12px;
  align-self: flex-start;
  margin-bottom: 8px;
`;

const PriceTitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;
const PriceWrap = styled.View`
  flex-direction: row;
  align-items: center;
  text-align: center;
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
const InfoWrap = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const InfoTitleView = styled.View`
  width: 20%;
`;
const InfoTextView = styled.View`
  width: 80%;
`;

const InfoTextWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  /* width:100%; */
  align-items: center;
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 35px;
  padding: 0px 16px;
  width: 100%;
`;

const countText = styled.TextInput``;
const KeypadInput = styled.View`
  height: 50px;
  flex-direction: row;
  background-color: ${props => props.theme.colors.grey[0]};
  justify-content: space-between;
  align-items: center;
  opacity: ${props => (props.focus ? 1 : 0)};
`;

const ModalWrap = styled.View`
  margin-left: 2px;
  width: 20px;
`;
const MakersName = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;

const MealTitle = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 8px;
`;

const ReviewPoint = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 4px;
`;

const ReviewCount = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-left: 4px;
`;

const InformationText = styled(Typography).attrs({text: 'ButtonSB'})`
  color: ${props => props.theme.colors.grey[3]};
`;

const MealDsc = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-bottom: 8px;
`;

const PriceTitle = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[2]};
`;

export const Percent = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.red[500]};
  margin-right: 4px;
`;

const SalePrice = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-right: 4px;
`;

const NoSalePrice = styled(SalePrice)``;

export const Price = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[5]};
  text-decoration: line-through;
  text-decoration-color: ${props => props.theme.colors.grey[5]};
`;

const InfoTitle = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[3]};
`;

const Info = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-bottom: 4px;
  width: 50%;
`;

const MessageView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 40%;
  text-align: center;
  position: relative;
`;

const InfoText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
  margin-bottom: 4px;
  width: 50%;
  text-align: right;
`;

const Test = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
  width: 50%;
`;
