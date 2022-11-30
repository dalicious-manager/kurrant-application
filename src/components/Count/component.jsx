import React, { useState,useRef, useEffect } from 'react';
import { View,Text, TouchableWithoutFeedback, TextInput ,KeyboardAvoidingView ,Platform} from 'react-native';
import NativeStatusBarManager from 'react-native/Libraries/Components/StatusBar/NativeStatusBarManagerIOS';
import styled from 'styled-components';

/**
 * @param {} props
 * @param {} props.size
 * @param {} props.type

 * @returns
 */

const Component = () => {
    const bodyRef = useRef();
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    // console.log(count)
    const changeText = number => {
        setCount(number);
      };
    const addPress = () => {
        setCount(prev => Number(prev) + 1);
      };
      const minusPress = () => {
        setCount(prev => (prev <= 1 ? 1 : prev - 1));
      };

      const showInput = () => {
        setShow(true);
      };

      const blurPress = () => {
        setShow(false);
      };

      useEffect(() => {
        Platform.OS == 'ios'
          ? NativeStatusBarManager.getHeight(statusBarFrameData => {
              setStatusBarHeight(statusBarFrameData.height);
            })
          : null;
      }, []);
  
  return (
    <TouchableWithoutFeedback onBlur={blurPress}>
        <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'none'}
          keyboardVerticalOffset={statusBarHeight + 44}>
            <Keypad show={show}>
                <Text onPress={minusPress}>-</Text>
                    <TextInput
                    ref={bodyRef}
                    keyboardType='number-pad'
                    onChangeText={changeText}>
                        {show && count}
                    </TextInput>
                <Text onPress={addPress}>+</Text>
            </Keypad>
            </KeyboardAvoidingView>
            <CountWrap>
                    <Text onPress={minusPress}>-</Text>
                    <Text onPress={() => {
                          showInput();
                          bodyRef.current.focus();
                        }}>
                        {count}
                    </Text>
                    <Text onPress={addPress}>+</Text>
            </CountWrap>

            
    </View>
    </TouchableWithoutFeedback>
  )
};

export default Component;

const CountWrap = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
border: 1px solid ${props => props.theme.colors.grey[6]};
border-radius:7px;
width:98px;
height:38px;
background-color:${props => props.theme.colors.grey[0]};
`;   

const Keypad = styled.View`
flex-direction:row;
align-items:center;
height: ${props => props.show ? '100px' : 0 };
width: 100%;
background-color: gold;
position:absolute;
`;