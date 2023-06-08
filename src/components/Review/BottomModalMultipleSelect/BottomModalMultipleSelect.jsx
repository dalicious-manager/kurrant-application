import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import styled from 'styled-components/native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import Typography from '~components/Typography';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const BottomModalMultipleSelect = props => {
  const {
    modalVisible,
    setModalVisible,

    onConfirmPress = () => {},

    title = '옵션 선택',
    description = '',
    data = {},
    multiple = false,
    selected,
    setSelected,
    onPressEvent = () => {},
    userSpotId,
    SelecterComponent = undefined,

    booleanValue,
    onPressEvent2 = () => {},
    setValue = () => {},
  } = props;
  //멀티 셀렉터시 이용
  //   const [selected, setSelected] = useState(new Map());

  const navigation = useNavigation();

  const onSelect = useCallback(
    (id, text) => {
      //멀티 셀렉터시 이용
      //   const newSelected = new Map(selected);
      //   newSelected.set(id, !selected.get(id));
      if (setSelected) setSelected(id);
      if (setValue) setValue(text);
      //   setModalVisible(false);
    },
    [setModalVisible, setSelected],
  );

  const panY = useRef(new Animated.Value(screenHeight)).current;
  const [snap, setSnap] = useState(0);
  const [y, setY] = useState(0);
  const snapPoints = useMemo(() => ['51%', '90%'], []);
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
        <GestureHandlerRootView
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <Background />
          </TouchableWithoutFeedback>
          <BottomSheet
            ref={list}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            style={{
              marginBottom: 50,
            }}>
            <BottomSheetTitleView>
              <BottomSheetTitle>{title}</BottomSheetTitle>

              <ConfirmPressable
                onPress={() => {
                  onConfirmPress();

                  setModalVisible(false);
                }}>
                <ConfirmText>확인</ConfirmText>
              </ConfirmPressable>
            </BottomSheetTitleView>
            <BottomSheetFlatList
              data={data}
              scrollEnabled={snap === 1}
              onScrollBeginDrag={e => {
                setScrollStart(e.nativeEvent.contentOffset.y);
              }}
              onMomentumScrollBegin={e => {
                if (scrollEnd === 0) {
                  handleSnapPress(0);
                }
              }}
              onScrollEndDrag={e => {
                setContentScroll(e.nativeEvent.contentOffset.y === 0);
                setScrollEnd(e.nativeEvent.contentOffset.y);
                if (e.nativeEvent.contentOffset.y === 0) {
                  if (contentScroll) {
                    handleSnapPress(0);
                  }
                }
              }}
              renderItem={({item}) => (
                <ContentItemContainer
                  onPressIn={pressInUp}
                  onPressOut={pressOutUp}
                  onPress={() => {
                    onSelect(item.id, item.text);
                    onPressEvent(item.id);
                  }}>
                  <SelecterComponent selected={selected} item={item} />
                </ContentItemContainer>
              )}
              keyExtractor={item => item.id.toString()}
            />
            <ManagePressView></ManagePressView>
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

const BottomSheetTitleView = styled.View`
  width: 100%;
  padding: 0px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 16px;
`;

const BottomSheetTitle = styled(Typography).attrs({text: 'Title03SB'})``;

const ConfirmPressable = styled.Pressable``;
const ConfirmText = styled(Typography).attrs({text: 'CaptionSB'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

const ContentItemContainer = styled.Pressable`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 20px 24px;
  /* padding-left: 40px; */
`;

const ManagePressView = styled.Pressable`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
  background-color: white;
  /* background-color: black; */
  /* border: 1px solid black; */
`;

export default BottomModalMultipleSelect;
