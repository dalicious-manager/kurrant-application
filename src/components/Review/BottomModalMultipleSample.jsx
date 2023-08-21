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
} from 'react-native';
import styled from 'styled-components/native';

import CheckedIcon from '../../assets/icons/BottomSheet/Checked.svg';
import Typography from '../Typography';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const BottomModalMultipleSample = props => {
  const {
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
  //멀티 셀렉터시 이용
  //   const [selected, setSelected] = useState(new Map());

  const navigation = useNavigation();

  const onSelect = useCallback(
    (id, text) => {
      //멀티 셀렉터시 이용
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      if (setSelected) setSelected(id);
      if (setValue) setValue(text);
      //   setModalVisible(false);
    },
    [setModalVisible, setSelected],
  );

  const panY = useRef(new Animated.Value(screenHeight)).current;
  const [snap, setSnap] = useState(0);
  const [y, setY] = useState(0);
  const snapPoints = useMemo(() => ['35%', '90%'], []);
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
            {description !== '' && (
              <BottomSheetDecs>{description}</BottomSheetDecs>
            )}
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
                {selected === item.id ? (
                  <ContentItemBox>
                    <ContentItemText>{item.text}</ContentItemText>
                    <CheckedIcon />
                  </ContentItemBox>
                ) : (
                  <ContentItemText>{item.text}</ContentItemText>
                )}
              </ContentItemContainer>
            )}
            keyExtractor={item => item.id.toString()}
          />
          <ManagePressView />
        </BottomSheet>

        {booleanValue && (
          <ManagePressView
            onPress={() => {
              onPressEvent2(setModalVisible(false));
            }}>
            <ContentItemText>스팟 관리하기</ContentItemText>
          </ManagePressView>
        )}
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
  padding: 0px 24px;
`;

const BottomSheetTitle = styled(Typography).attrs({text: 'Title03SB'})`
  margin-bottom: 6px;
`;

const BottomSheetDecs = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
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

const ManagePressView = styled.Pressable`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
  background-color: white;
`;

export default BottomModalMultipleSample;
