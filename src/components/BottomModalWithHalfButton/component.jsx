import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import Button from '../Button';
import Typography from '../Typography';

/**
 * @param {object} props
 * @param {boolean} props.modalVisible
 * @param {function} props.setModalVisible
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.buttonTitle1
 * @param {string} props.buttonTitle2
 * @param {'grey1' | 'grey2' | 'grey3' | 'grey7' | 'white' | 'yellow' | 'login'} props.buttonType1
 * @param {'grey1' | 'grey2' | 'grey3' | 'grey7' | 'white' | 'yellow' | 'login'} props.buttonType2
 * @param {function} props.onPressEvent1
 * @param {function} props.onPressEvent2
 * @returns
 */
const Component = props => {
  const {
    modalVisible,
    setModalVisible,
    title = '옵션 선택',
    description = '',
    buttonTitle1 = '모달버튼',
    buttonTitle2 = '모달버튼',
    buttonType1 = 'yellow',
    buttonType2 = 'grey2',
    halfButtonTitle,
    halfButtonType = 'yellow',
    onPressEventHalf = () => {},
    onPressEvent1 = () => {},
    onPressEvent2,
    image,
    closeType = true,
  } = props;
  //멀티 셀렉터시 이용
  // const [selected, setSelected] = useState(new Map());

  const themeApp = useTheme();
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const upY = useRef(new Animated.Value(0)).current;
  const [up, setUP] = useState(0);
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
    if (closeType) {
      closeBottomSheet.start(() => {
        setModalVisible(false);
      });
    }
    return;
  };
  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent>
      <Overlay>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Background />
        </TouchableWithoutFeedback>
        <AnimatedView
          style={{
            transform: [{translateY: translateY}],
            width: Dimensions.get('screen').width,
          }}>
          {/* <DragButton
            onPressIn={pressInUp}
            onPressOut={pressOutUp}>
            <DragButtonView/>
          </DragButton> */}
          <BottomSheetTitleView>
            {image && <View style={{marginBottom: 24}}>{image}</View>}
            <BottomSheetTitle textColor={themeApp.colors.grey[2]}>
              {title}
            </BottomSheetTitle>
            {description !== '' && (
              <BottomSheetDecs textColor={themeApp.colors.grey[3]}>
                {description}
              </BottomSheetDecs>
            )}
          </BottomSheetTitleView>

          {halfButtonTitle ? (
            <ButtonWrap>
              <ButtonMargin>
                <Button
                  label={halfButtonTitle}
                  size="modalHalf"
                  type={halfButtonType}
                  text={'Button09SB'}
                  onPressEvent={onPressEventHalf}
                />
              </ButtonMargin>
            </ButtonWrap>
          ) : !onPressEvent2 ? (
            <ButtonWrap>
              <Button
                label={buttonTitle1}
                size="modalFull"
                type={buttonType1}
                text={'Button09SB'}
                onPressEvent={onPressEvent1}
              />
            </ButtonWrap>
          ) : (
            <HalfBox>
              <ButtonMargin>
                <Button
                  label={buttonTitle1}
                  size="modalHalf"
                  type={buttonType1}
                  text={'Button09SB'}
                  onPressEvent={onPressEvent1}
                />
              </ButtonMargin>
              <ButtonMargin>
                <Button
                  label={buttonTitle2}
                  size="modalHalf"
                  type={buttonType2}
                  text={'Button09SB'}
                  onPressEvent={onPressEvent2}
                />
              </ButtonMargin>
            </HalfBox>
          )}
        </AnimatedView>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  position: relative;
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Background = styled.View`
  flex: 1;
`;

const AnimatedView = styled(Animated.View)`
  align-items: center;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 20px;
  padding-bottom: 56px;
`;
const ButtonMargin = styled.View`
  margin: 0px 3px;
`;
const BottomSheetTitleView = styled.View`
  width: 100%;
  padding: 0px 24px;
  padding-top: 18px;
  align-items: center;
`;
const BottomSheetTitle = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 6px;
  max-width: 300px;
  text-align: center;
`;
const BottomSheetDecs = styled(Typography).attrs({text: 'Body06R'})`
  margin-bottom: 22px;
  max-width: 300px;
  text-align: center;
  color: ${props => props.theme.colors.grey[3]};
`;
const HalfBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const ButtonWrap = styled.View`
  margin: 0px 24px;
`;

export default Component;
