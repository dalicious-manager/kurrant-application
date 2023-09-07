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
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import CheckedIcon from '../../assets/icons/BottomSheet/Checked.svg';
import Typography from '../Typography';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const BottomSheetCard = props => {
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
  } = props;
  //멀티 셀렉터시 이용
  // const [selected, setSelected] = useState(new Map());

  const navigation = useNavigation();

  const onSelect = useCallback(
    (id, text) => {
      setSelected(id);
      onPressEvent(text, id);
      setModalVisible(false);
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
    } else if (pageY < y - 30) {
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
              renderItem={({item}) => {
                return (
                  <ContentItemContainer
                    disabled={item.id === 11}
                    onPressIn={pressInUp}
                    onPressOut={pressOutUp}
                    onPress={() => onSelect(item.id, item.text)}>
                    {selected === item.id ? (
                      <ContentItemBox>
                        <ContentItemText status={item.id}>
                          {item.text}
                        </ContentItemText>
                        <CheckedIcon />
                      </ContentItemBox>
                    ) : (
                      <ContentItemText status={item.id}>
                        {item.text}
                      </ContentItemText>
                    )}
                  </ContentItemContainer>
                );
              }}
              keyExtractor={item => item.id}
            />
            <ManagePressView />
          </BottomSheet>
        </GestureHandlerRootView>
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

const ContentItemBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentItemText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme, status}) => status === 11 && theme.colors.grey[5]};
`;

const ManagePressView = styled.Pressable`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
  background-color: white;
`;

export default BottomSheetCard;
