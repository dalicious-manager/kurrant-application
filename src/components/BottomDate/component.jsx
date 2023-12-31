import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  View,
} from 'react-native';
import styled from 'styled-components/native';

import CheckedIcon from '../../assets/icons/BottomSheet/Checked.svg';
import Typography from '../Typography';

const BottomSheet = props => {
  const {
    modalVisible,
    setModalVisible,
    title = '옵션 선택',
    description = '',
    data = {},
    selected,
    setSelected,
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
  //   const pressOutUp = e => {
  //     const { pageY } = e.nativeEvent;
  //     console.log('test : ' + pageY);
  //     if (pageY > y + 30) {
  //       if (up < 500) {
  //         closeModal();
  //       } else {
  //         downSheet.start();
  //         list.current.scrollToOffset({ animated: false, y: 0 });
  //       }
  //     } else if (pageY < y - 30) {
  //       upSheet.start();
  //     } else {
  //       downSheet.start();
  //       list.current.scrollToOffset({ animated: false, y: 0 });
  //     }
  //   };
  //   const pressInUp = e => {
  //     const { pageY } = e.nativeEvent;
  //     console.log('test2 : ' + pageY);
  //     setY(pageY);
  //   };
  const upSheet = Animated.timing(upY, {
    toValue: 700,
    duration: 300,
    useNativeDriver: false,
  });
  const downSheet = Animated.timing(upY, {
    toValue: 350,
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
  return (
    <Modal visible={modalVisible} animationType={'slide'} transparent>
      <Overlay>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Background />
        </TouchableWithoutFeedback>
        <AnimatedView
          style={{
            transform: [{translateY: translateY}],
            height: up,
            width: Dimensions.get('screen').width,
          }}>
          {/* <DragButton
            onPressIn={pressInUp}
            onPressOut={pressOutUp}>
            <DragButtonView/>
          </DragButton> */}
          <BottomSheetTitleView>
            <BottomSheetTitle>{title}</BottomSheetTitle>
            {description !== '' && (
              <BottomSheetDecs>{description}</BottomSheetDecs>
            )}
          </BottomSheetTitleView>
          <FlatList
            data={data}
            ref={list}
            scrollEnabled={true}
            renderItem={({item}) => (
              <ContentItemContainer
                onPress={() =>
                  onSelect(
                    item.clientType.toString() + item.id.toString(),
                    item.date,
                  )
                }>
                {selected ===
                item.clientType.toString() + item.id.toString() ? (
                  <ContentItemBox>
                    <ContentItemText>{item.date}</ContentItemText>
                    <CheckedView>
                      <ContentNameText>{item.name}</ContentNameText>
                      <CheckedIcon />
                    </CheckedView>
                  </ContentItemBox>
                ) : (
                  <ContentItemBox>
                    <ContentItemText>{item.date}</ContentItemText>
                    <ContentNameText>{item.name}</ContentNameText>
                  </ContentItemBox>
                )}
              </ContentItemContainer>
            )}
            keyExtractor={item =>
              item.clientType.toString() + item.id.toString()
            }
          />
        </AnimatedView>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  position: relative;
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Background = styled.View`
  flex: 1;
`;

const AnimatedView = styled(Animated.View)`
  min-height: 226px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 20px;
`;

// const DragButton = styled.TouchableOpacity`
//   width: 100px;
//   height: 50px;
//   border-radius: 50px;
//   position: absolute;
//   justify-content: center;
//   align-items: center;
//   z-index: 1;
//   top: -33px;
// `;

// const DragButtonView = styled.View`
//   background-color: white;
//   width: 40px;
//   height: 5px;
//   border-radius: 10px;
// `;

const BottomSheetTitleView = styled.View`
  width: 100%;
  padding: 0px 28px;
`;

const BottomSheetTitle = styled(Typography).attrs({text: 'Title03SB'})`
  margin-bottom: 6px;
`;

const BottomSheetDecs = styled(Typography).attrs({text: 'Body06R'})``;

const ContentItemContainer = styled.TouchableOpacity`
  width: ${Dimensions.get('screen').width}px;
  height: 60px;
  padding: 19px 24px;
  /* background-color:gold; */
`;

const ContentItemBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ContentItemText = styled(Typography).attrs({text: 'Body05R'})``;

const ContentNameText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-right: 4px;
`;

const CheckedView = styled.View`
  flex-direction: row;
  align-items: center;
`;
export default BottomSheet;
