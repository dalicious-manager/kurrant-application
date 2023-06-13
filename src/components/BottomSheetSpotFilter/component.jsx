import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Pressable,
  PanResponder,
  View,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import CheckedIcon from '../../assets/icons/BottomSheet/Checked.svg';
import Button from '../../components/Button';
import ButtonInfoType from '../../components/ButtonInfoType';
import ButtonMealType from '../../components/ButtonMealType';
import {width} from '../../theme';
import Typography from '../Typography';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const BottomSheetSpot = props => {
  const {
    touch,
    setTouch,
    touchInfo,
    setTouchInfo,

    modalVisible,
    setModalVisible,
    title = '옵션 선택',
    description = '',
    data = {},
    selected,
    setSelected,
    onPressEvent = () => {},
    userSpotId,
    booleanValue,
    onPressEvent2 = () => {},
    setValue = () => {},
  } = props;

  const panY = useRef(new Animated.Value(screenHeight)).current;
  const [snap, setSnap] = useState(0);
  const [y, setY] = useState(0);
  const snapPoints = useMemo(() => ['48%', '48%'], []);
  const [contentScroll, setContentScroll] = useState(true);
  const [scrollStart, setScrollStart] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(10);

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 50,
    useNativeDriver: true,
  });
  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 50,
    useNativeDriver: true,
  });
  const list = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  );
  const handleSheetChange = useCallback(index => {
    setSnap(index);
  }, []);
  const handleSnapPress = useCallback(index => {
    list.current?.snapToIndex(index);
  }, []);
  const pressOutUp = e => {
    e.stopPropagation();
    const {pageY} = e.nativeEvent;
    if (pageY > y + 50) {
      if (snap === 0) {
        closeModal();
      } else {
        if (contentScroll && scrollStart == 0) {
          handleSnapPress(0);
        }
      }
    } else if (pageY < y - 50) {
      handleSnapPress(1);
    } else {
      if (contentScroll && scrollStart == 0) {
        handleSnapPress(0);
      }
    }
  };
  const pressInUp = e => {
    e.stopPropagation();
    const {pageY} = e.nativeEvent;
    setY(pageY);
  };

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible, resetBottomSheet]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };
  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent>
      <Overlay onPressIn={pressInUp} onPressOut={pressOutUp}>
        <GestureHandlerRootView style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <Background />
          </TouchableWithoutFeedback>

          <BottomSheet
            ref={list}
            handleStyle={{height: 32}}
            handleIndicatorStyle={{
              backgroundColor: '#E4E3E7',
              width: 40,
              height: 4,
            }}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            style={{
              marginBottom: 50,
            }}>
            <Content>
              <BottomSheetTitleView>
                <BottomSheetTitle>{title}</BottomSheetTitle>
                <Pressable
                  onPress={() => {
                    setTouch([1, 2, 3]);
                    setTouchInfo([1]);
                  }}>
                  <BottomSheetDecs>초기화</BottomSheetDecs>
                </Pressable>
              </BottomSheetTitleView>

              <View>
                <TitleText>식사 타입</TitleText>

                <ButtonTypeWrap>
                  <ButtonMealType touch={touch} setTouch={setTouch} />
                </ButtonTypeWrap>
                <TitleText style={{marginTop: 24}}>출입 정보</TitleText>

                <ButtonTypeWrap style={{justifyContent: 'flex-start'}}>
                  <ButtonInfoType
                    margin={((screenWidth - 48 - width * 103 * 3) / 2).toFixed(
                      1,
                    )}
                    touch={touchInfo}
                    setTouch={setTouchInfo}
                  />
                </ButtonTypeWrap>
              </View>
            </Content>

            <ManagePressView>
              <Button
                label="적용"
                text="Button09SB"
                onPressEvent={onPressEvent}
              />
            </ManagePressView>
          </BottomSheet>
        </GestureHandlerRootView>
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
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 20px;
`;

const DragButton = styled.TouchableOpacity`
  flex: 1;
`;

const DragButtonView = styled.View`
  background-color: white;
  width: 40px;
  height: 5px;
  border-radius: 10px;
`;

const BottomSheetTitleView = styled.View`
  width: 100%;
  margin-bottom: 24px;
  flex-direction: row;
  justify-content: space-between;
`;

const BottomSheetTitle = styled(Typography).attrs({text: 'Title03SB'})`
  margin-bottom: 6px;
`;

const BottomSheetDecs = styled(Typography).attrs({text: 'Button09R'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

const TitleText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;

const ContentItemContainer = styled.Pressable`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
  padding-left: 40px;
`;

const ItemContainer = styled.View`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
`;

const ContentItemBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentItemText = styled(Typography).attrs({text: 'Body05R'})``;

const GroupName = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const Border = styled.View`
  width: 100%;
  height: 1px;
  margin-top: 12px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const ManagePressView = styled.View`
  padding: 0px 24px;
  background-color: white;
  /* position: absolute;
  bottom: 56px; */
`;

export default BottomSheetSpot;

const ButtonTypeWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.View`
  margin: 0px 24px;
  margin-bottom: 40px;
`;
