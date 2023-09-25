import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import WarningIcon from '../../assets/icons/MealCart/warning.svg';
import useAuth from '../../biz/useAuth/hook';
import {foodDetailDataAtom} from '../../biz/useBanner/store';
import useShoppingBasket from '../../biz/useShoppingBasket/hook';
import {useGetDailyfoodDetail} from '../../hook/useDailyfood';
import {useAddShoppingBasket} from '../../hook/useShoppingBasket';
import {useGetUserInfo} from '../../hook/useUserInfo';
import {PAGE_NAME as mealDetailPageName} from '../../pages/Main/Bnb/MealDetail/Main';
import withCommas from '../../utils/withCommas';
import Count from '../Count';
import Label from '../Label';
import Typography from '../Typography';
const BottomSheet = props => {
  const {
    modalVisible,
    setModalVisible,
    title = {},
    description = '',
    data = ({} = () => {}),
    height = 500,
    btn = '버튼이름',
    toast,
    setShow,
    time,
  } = props;
  //멀티 셀렉터시 이용
  const [selected, setSelected] = useState();
  const [dailyfoodId, setDailyfoodId] = useState();
  const [foodDetailData, setFoodDetailData] = useAtom(foodDetailDataAtom);
  const navigation = useNavigation();
  const {setSoldOutMeal, loadMeal} = useShoppingBasket();
  const {mutateAsync: addMeal, isLoading: isAddMeal} = useAddShoppingBasket();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  const {
    readableAtom: {userRole},
  } = useAuth();
  const {
    data: isFoodDetail,
    isLoading: detailLoading,
    isFetching: detailFetching,
    isSuccess: detailSuccess,
    refetch: detailFetch,
  } = useGetDailyfoodDetail(dailyfoodId, userRole);
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const upY = useRef(new Animated.Value(0)).current;
  const list = useRef();
  const [up, setUP] = useState(0);
  const [y, setY] = useState(0);
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });
  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });
  const pressOutUp = e => {
    const {pageY} = e.nativeEvent;
    if (pageY > y + 30) {
      if (up < 500) {
        closeModal();
      } else {
        downSheet.start();
        list.current.scrollToOffset({animated: false, y: 0});
      }
    } else if (pageY < y - 30) {
      upSheet.start();
    } else {
      downSheet.start();
      list.current.scrollToOffset({animated: false, y: 0});
    }
  };
  const pressInUp = e => {
    const {pageY} = e.nativeEvent;
    setY(pageY);
  };
  const upSheet = Animated.timing(upY, {
    toValue: 700,
    duration: 300,
    useNativeDriver: false,
  });
  const downSheet = Animated.timing(upY, {
    toValue: height,
    duration: 300,
    useNativeDriver: false,
  });
  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible, resetBottomSheet]);
  useEffect(() => {
    const id = upY.addListener(state => {
      setUP(state.value);
    });
    return () => {
      upY.removeListener(id);
    };
  }, [up, upY]);
  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const increasePress = id => {
    const addData = data.map(el => {
      if (el.id === id) {
        return {...el, count: el.count + 1};
      } else {
        return {...el};
      }
    });
    setSoldOutMeal(addData);
  };
  const decreasePress = id => {
    const decrease = data.map(el => {
      if (el.id === id) {
        return {...el, count: el.count <= 0 ? 0 : el.count - 1};
      } else {
        return {...el};
      }
    });
    setSoldOutMeal(decrease);
  };

  const addCart = async () => {
    console.log(time);

    try {
      if (time?.length <= 0) throw new Error('시간을 선택해 주세요');
      const meal = data
        .filter(el => el.count !== 0)
        .map(v => {
          return {
            dailyFoodId: v.id,
            count: v.count,
            spotId: isUserInfo?.spotId,
            deliveryTime: time[0].time,
          };
        });
      await addMeal(meal);
      setModalVisible(false);
      setShow(true);
      toast.toastEvent();
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      Alert.alert('장바구니 추가', err?.toString()?.replace('error: ', ''));
    }
  };

  const disabledList = data.filter(el => el.count !== 0);

  const detailPagePress = id => {
    setDailyfoodId(id);
    setTimeout(() => {
      navigation.navigate(mealDetailPageName, {
        dailyFoodId: id,
        deliveryTime: time,
        detailFetching: detailFetching,
      });
    }, 200);
  };
  useEffect(() => {
    if (dailyfoodId && isFoodDetail?.data)
      setFoodDetailData(isFoodDetail?.data);
  }, [dailyfoodId, isFoodDetail?.data, setFoodDetailData]);
  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent>
      <Overlay>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Background />
        </TouchableWithoutFeedback>
        <AnimatedView
          height={height}
          style={{
            transform: [{translateY: translateY}],
            height: up,
            width: Dimensions.get('screen').width,
          }}>
          <DragButton onPressIn={pressInUp} onPressOut={pressOutUp}>
            <DragButtonView />
          </DragButton>
          <BottomSheetTitleView>
            <BottomSheetTitle>{title}</BottomSheetTitle>
            <Pressable onPress={addCart} disabled={disabledList.length === 0}>
              <BottomSheetButton count={disabledList.length}>
                {btn}
              </BottomSheetButton>
            </Pressable>
            {description !== '' && (
              <BottomSheetDecs>{description}</BottomSheetDecs>
            )}
          </BottomSheetTitleView>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            ref={list}
            scrollEnabled={up > 500}
            renderItem={({item}) => (
              <Wrap>
                <MealImageWrap>
                  <FastImage
                    source={{
                      uri: `${item.image}`,
                      priority: FastImage.priority.high,
                    }}
                    style={{
                      width: 114,
                      height: 114,
                      borderRadius: 7,
                    }}
                  />
                </MealImageWrap>
                <ContentsText
                  onPress={() => {
                    detailPagePress(item.id);
                  }}>
                  <Name>[{item.makersName}]</Name>
                  <Name>{item.foodName}</Name>
                  <Price>{withCommas(item.price)}원</Price>
                  {item.spicy !== null && <Label label={`${item.spicy}`} />}
                  {item.capacity < item.count && (
                    <SoldOutView>
                      <WarningIcon />
                      <ShortageText>
                        재고부족(재고 수량:{item.capacity})
                      </ShortageText>
                    </SoldOutView>
                  )}
                </ContentsText>

                <CountWrap>
                  <Count
                    quantity={item.count}
                    increasePress={() => increasePress(item.id)}
                    decreasePress={() => decreasePress(item.id)}
                  />
                </CountWrap>
              </Wrap>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </AnimatedView>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.Pressable`
  position: relative;
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Background = styled.View`
  flex: 1;
`;

const AnimatedView = styled(Animated.View)`
  min-height: ${({height}) => `${height}px`};
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 20px;
`;

const DragButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: -33px;
`;

const DragButtonView = styled.View`
  background-color: white;
  width: 40px;
  height: 5px;
  border-radius: 10px;
`;

const BottomSheetTitleView = styled.View`
  width: 100%;
  padding: 0px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

const BottomSheetTitle = styled(Typography).attrs({text: 'Title03SB'})`
  margin-bottom: 6px;
`;

const BottomSheetDecs = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const BottomSheetButton = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${({theme, count}) =>
    count === 0 ? theme.colors.grey[6] : theme.colors.blue[500]};
`;

export default BottomSheet;

const Name = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Price = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-bottom: 6px;
`;

const MealImageWrap = styled.View``;

const Wrap = styled.View`
  flex-direction: row;
  padding: 16px 0px;
  //justify-content:space-between;
  min-height: 184px;
  border-bottom-color: ${props => props.theme.colors.grey[8]};
  border-bottom-width: 1px;
`;

const ContentsText = styled.Pressable`
  width: 60%;
  padding-left: 12px;
  margin-bottom: 60px;
`;

const CountWrap = styled.View`
  position: absolute;
  bottom: 16px;
  right: 0px;
`;

const SoldOutView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
  position: absolute;
  bottom: -20px;
  right: -22px;
`;

const ShortageText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.red[500]};
  margin-left: 4px;
`;
