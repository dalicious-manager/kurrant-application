import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  PanResponder,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import CheckedIcon from '../../assets/icons/BottomSheet/Checked.svg';
import {mainDimAtom} from '../../utils/store';
import BalloonMessage from '../BalloonMessage';
import Label from '../Label';
import Typography from '../Typography';
import SseRedDot from '../../utils/sse/SseService/SseRedDot/SseRedDot';

const screenHeight = Dimensions.get('screen').height;

const BottomSheetSpot = props => {
  const {
    modalVisible,
    setModalVisible,
    title = '옵션 선택',
    description = '',
    data = {},
    setSelected,
    onPressEvent = () => {},
    userSpotId,
    booleanValue,
    onPressEvent2 = () => {},
    sseType7List,
  } = props;
  //멀티 셀렉터시 이용

  // const [selected, setSelected] = useState(new Map());
  const [showDim, setShowDim] = useAtom(mainDimAtom);
  const onSelect = useCallback(
    id => {
      //멀티 셀렉터시 이용
      // const newSelected = new Map(selected);
      // newSelected.set(id, !selected.get(id));
      setSelected(id);
      setModalVisible(false);
    },
    [setModalVisible, setSelected],
  );

  const panY = useRef(new Animated.Value(screenHeight)).current;
  const [snap, setSnap] = useState(0);
  const [y, setY] = useState(0);
  const snapPoints = useMemo(() => ['70%', '90%'], []);
  const [contentScroll, setContentScroll] = useState(true);
  const [scrollStart, setScrollStart] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(10);
  const [parentHeight, setParentHeight] = useState(0);

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

  const handleSheetChange = useCallback(index => {
    setSnap(index);
  }, []);
  const handleSnapPress = useCallback(index => {
    setSnap(index);
  }, []);

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

  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    setParentHeight(height);
  };

  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent>
      <GestureHandlerRootView style={{flex: 1}}>
        <Overlay>
          {snap === 0 && !showDim && userSpotId === null && (
            <BalloonMessage
              location={{bottom: '-18%'}}
              vertical="down"
              message={`배송받으실 스팟을 선택해주세요.${'\n'}추후 변경 가능합니다.`}
            />
          )}

          <TouchableWithoutFeedback onPress={closeModal}>
            <Background />
          </TouchableWithoutFeedback>

          <BottomSheet snapPoints={snapPoints} onChange={handleSheetChange}>
            <BottomSheetTitleView>
              <TitleWrap>
                <BottomSheetTitle>{title}</BottomSheetTitle>
                {booleanValue && (
                  <ManagePressView
                    onPress={() => {
                      onPressEvent2(userSpotId && setModalVisible(false));
                    }}>
                    <ManageText>설정/관리</ManageText>
                  </ManagePressView>
                )}
              </TitleWrap>
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
              onMomentumScrollBegin={() => {
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
                <View onLayout={onLayout}>
                  <ItemContainer>
                    <SseRedDotType7
                      // sseType7
                      isSse={sseType7List?.includes(item.clientId)}
                      position={'absolute'}
                      top={'4px'}
                      right={'3px'}
                    />

                    <GroupView>
                      <View style={{marginRight: 8}}>
                        <Label
                          label={
                            item.spotType === 0
                              ? '프라이빗 스팟'
                              : item.spotType === 2
                              ? '공유 스팟'
                              : '마이 스팟'
                          }
                          type={
                            item.spotType === 0
                              ? 'blue'
                              : item.spotType === 2
                              ? 'green'
                              : 'pink'
                          }
                        />
                      </View>
                      <GroupName>{item.clientName}</GroupName>
                    </GroupView>
                    <Border />
                  </ItemContainer>

                  {item.spots.map(el => {
                    const spotNameCut = el.spotName?.includes(null);
                    const useSpotName = spotNameCut
                      ? el.spotName.split('null')[0]
                      : el.spotName;
                    const arrs = data[data.length - 1];

                    return (
                      <ContentItemContainer
                        lastArr={arrs === item}
                        onPress={() => {
                          onSelect(el.spotId);
                          onPressEvent(el.spotId);
                        }}
                        key={el.spotId}>
                        {el.spotId === userSpotId ? (
                          <ContentItemBox>
                            <TextView>
                              <ContentItemText>{useSpotName}</ContentItemText>
                              {el.isRestriction && (
                                <Restriction>외부인 출입 제한</Restriction>
                              )}
                            </TextView>
                            <CheckedIcon />
                          </ContentItemBox>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <ContentItemText>{useSpotName}</ContentItemText>
                            {el.isRestriction && (
                              <Restriction>외부인 출입 제한</Restriction>
                            )}
                          </View>
                        )}
                      </ContentItemContainer>
                    );
                  })}
                </View>
              )}
              // keyExtractor={item => item.clientId.toString()}
            />
          </BottomSheet>
        </Overlay>
      </GestureHandlerRootView>
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
  margin-bottom: 12px;
`;

const BottomSheetDecs = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const ContentItemContainer = styled.Pressable`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
  padding-left: 40px;
  //margin-bottom: ${({lastArr}) => (lastArr ? '50px' : '0px')};
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

const ContentItemText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
const ManageText = styled(Typography).attrs({text: 'Button09R'})`
  color: ${({theme}) => theme.colors.grey[3]};
`;

const GroupName = styled(Typography).attrs({text: 'Body06SB'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const Border = styled.View`
  width: 100%;
  height: 1px;
  margin-top: 12px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const ManagePressView = styled.Pressable`
  /* width: ${Dimensions.get('screen').width}px;
  padding: 19px 24px 55px 24px;
  background-color: white; */
`;

const GroupView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default BottomSheetSpot;

const MessageWrap = styled.View`
  position: absolute;
`;

const TitleWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Restriction = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.grey[5]};
  margin-left: 8px;
`;

const TextView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SseRedDotType7 = styled(SseRedDot)``;
