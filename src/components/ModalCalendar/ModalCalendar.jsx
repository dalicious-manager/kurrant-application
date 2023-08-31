import DatePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import Typography from '~components/Typography';

/**
 * @param {object} props
 * @param {boolean} props.modalVisible
 * @param {function} props.setModalVisible
 * @param {object} props.calendarProps
 * @returns
 */
const ModalCalendar = props => {
  const {
    modalVisible,
    setModalVisible,

    calendarProps,
  } = props;
  //멀티 셀렉터시 이용
  // const [selected, setSelected] = useState(new Map());

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
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
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
          <React.Fragment>
            {Platform.OS === 'ios' && (
              <IosButton>
                <Pressable
                  onPress={() => {
                    calendarProps.setModal(false);
                  }}>
                  <Cancel>취소</Cancel>
                </Pressable>
                <Pressable
                  onPress={() =>
                    calendarProps.confirm(
                      calendarProps.setModal,
                      calendarProps.setSelected,
                      // selectedDate,
                    )
                  }>
                  <Confirm>완료</Confirm>
                </Pressable>
              </IosButton>
            )}
            <DatePicker
              value={calendarProps?.selected}
              display="spinner"
              onChange={(event, date) => {
                calendarProps.onChange(
                  event,
                  date,
                  calendarProps.setModal,
                  calendarProps.setSelected,
                );
              }}
              locale="ko-KR"
            />
          </React.Fragment>
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
  padding-bottom: 56px;
`;
export const IosButton = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: #f5f5f5;
  z-index: 999;
`;

export const Cancel = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

export const Confirm = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

export default ModalCalendar;
