import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';


/**
 * @param {object} props
 * @param {boolean} props.modalVisible
 * @param {function} props.setModalVisible
 * @param {function} props.setTime
 * @param {date} props.time
 * @returns
 */
const Component = props => {
  const { modalVisible, setModalVisible ,setTime,time} = props;
  //멀티 셀렉터시 이용
  // const [selected, setSelected] = useState(new Map());
  function onTimeSelected(event, value) {
    console.log(value.toLocaleTimeString('en-US'))
    setTime(value);
  };


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
    <Modal visible={modalVisible} animationType={'slide'} transparent>
      {Platform.OS === 'ios' ? <Overlay>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Background />
        </TouchableWithoutFeedback>
        <AnimatedView
          style={{
            transform: [{ translateY: translateY }],
            width: Dimensions.get('screen').width,
          }}>
         <DateTimePicker
            value={time}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
            is24Hour={false}
            onChange={onTimeSelected}
          />
        </AnimatedView>
      </Overlay> : <DateTimePicker
            value={new Date()}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
            is24Hour={false}
            onChange={onTimeSelected}
          />}
    </Modal>
  );
};

const Overlay =styled.View`
  position: relative;
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.7);
`
const Background = styled.View`
  flex: 1;
`

const AnimatedView = styled(Animated.View)`
  align-items: center;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-top: 20px;
  padding-bottom: 56px;
`


export default Component;
