import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
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
import BalloonMessage from '../BalloonMessage';
import Label from '../Label';
import Typography from '../Typography';

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
  } = props;
  //멀티 셀렉터시 이용
  // const [selected, setSelected] = useState(new Map());

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
  const snapPoints = useMemo(() => ['60%', '90%'], []);
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
  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent>
      <GestureHandlerRootView style={{flex: 1}}>
        <Overlay>
          {snap === 0 && (
            <BalloonMessage
              location={{top: '200px'}}
              vertical="down"
              message={`배송받으실 스팟을 선택해주세요.${'\n'}추후 변경 가능합니다.`}
            />
          )}

          <TouchableWithoutFeedback onPress={closeModal}>
            <Background />
          </TouchableWithoutFeedback>

          <BottomSheet snapPoints={snapPoints} onChange={handleSheetChange}>
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
                <>
                  <ItemContainer>
                    <GroupView>
                      <GroupName>{item.clientName}</GroupName>
                      <View style={{marginLeft: 8}}>
                        <Label
                          label={
                            item.spotType === 0 ? '프라이빗 스팟' : '오픈 스팟'
                          }
                          type={item.spotType === 0 ? 'red' : 'green'}
                        />
                      </View>
                    </GroupView>
                    <Border />
                  </ItemContainer>

                  {item.spots.map(el => {
                    return (
                      <ContentItemContainer
                        onPress={() => {
                          onSelect(el.spotId);
                          onPressEvent(el.spotId);
                        }}
                        key={el.spotId}>
                        {el.spotId === userSpotId ? (
                          <ContentItemBox>
                            <ContentItemText>{el.spotName}</ContentItemText>
                            <CheckedIcon />
                          </ContentItemBox>
                        ) : (
                          <ContentItemText>{el.spotName}</ContentItemText>
                        )}
                      </ContentItemContainer>
                    );
                  })}
                </>
              )}
              // keyExtractor={item => item.clientId.toString()}
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
  padding: 19px 24px 55px 24px;
  background-color: white;
`;

const GroupView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default BottomSheetSpot;

const MessageWrap = styled.View`
  position: absolute;
`;
