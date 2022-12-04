import { useLinkBuilder } from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Pressable,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  
} from 'react-native';
import NativeStatusBarManager from 'react-native/Libraries/Components/StatusBar/NativeStatusBarManagerIOS';
import styled from 'styled-components';

import Arrow from '../../assets/icons/MealDetail/arrow.svg';
import Trapezoid from '../../assets/icons/MealDetail/trapezoid.svg';
import Typography from "../Typography";

const screenWidth = Dimensions.get('window').width;

const HomeScreen = (props) => {
  const { price } = props

  const bodyRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [fadeIn, setFadeIn] = useState(false);
  const [rotate, setRotate] = useState('0deg');
  const [count, setCount] = useState(1);
  const [focus, setFocus] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const PRICE = price * count
  const result = PRICE.toLocaleString('ko-KR')

  const handlePress = () => {
    Animated.timing(fadeAnim, {
      toValue: fadeIn ? 0 : 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setFadeIn(prev => !prev);
    Animated.timing(rotateAnim, {
      toValue: fadeIn ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const changeText = number => {
    setCount(number);
  };
  const addPress = () => {
    setCount(prev => Number(prev) + 1);
  };
  const minusPress = () => {
    setCount(prev => (prev <= 1 ? 1 : prev - 1));
  };
  const testPress = () => {
    setFocus(true);
  };
  const blurPress = () => {
    setFocus(false);
  };
  useEffect(() => {
    
    setRotate(
      rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    );
  }, [rotateAnim]);

  useEffect(() => {
    
    Platform.OS === 'ios'
      ? NativeStatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} onBlur={blurPress}>

      <Container>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={statusBarHeight}>
          <KeypadInputWrap focus={focus}>
          <KeypadInput>
              <Text onPress={minusPress}>-</Text>
              <TextInput
                keyboardType="number-pad"
                onPress={testPress}
                ref={bodyRef}
                onChangeText={changeText}
                value={count.toString()}
                />
                  {/* {count}
                  </TextInput> */}
              <Text onPress={addPress}>+</Text>
            </KeypadInput>
          </KeypadInputWrap>
          </KeyboardAvoidingView>

        {!focus && <BtnContainer focus={focus}>
          <PressView>
            <Pressable onPress={handlePress}>
              <Trapezoid />
              <Animated.View
                style={{
                  transform: [{rotate: rotate}],
                  position: 'absolute',
                  top: 5,
                  right: 24,
                }}>
                <Arrow />
              </Animated.View>
            </Pressable>
          </PressView>

          <InnerContainer>
            <Animated.View style={{height: fadeAnim}}>
              <AnimationView>
                <Inner>
                    <PriceText>{result}원</PriceText>
                  <View>
                    <Text>
                      <Text onPress={minusPress}>-</Text>
                      <Text
                        onPress={() => {
                          testPress();
                          bodyRef.current.focus();
                        }}
                        >
                        {count}
                      </Text>
                      <Text onPress={addPress}>+</Text>
                    </Text>
                  </View>
                </Inner>
              </AnimationView>
            </Animated.View>
            <PressButton >
              <ButtonText>
                {fadeIn ? '장바구니에 담기' : `${count}개 담기`}
              </ButtonText>
            </PressButton>
          </InnerContainer>
        </BtnContainer>}

        

      </Container> 
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

const KeypadInputWrap = styled.View`
 height: ${props => props.focus ? '305px' : 0};
 overflow:hidden;
`;
const KeypadInput= styled.View`
  height:50px;
  width: ${screenWidth}px;
  flex-direction:row;
  background-color:${props => props.theme.colors.grey[3]};
  justify-content:space-between;
  align-items:center;
  
`;
const Container = styled.SafeAreaView`
  //justify-content: flex-end;
  align-items: center;
  width: ${screenWidth}px;
`;
const BtnContainer = styled.View`
  
 // margin-bottom:100px;
`;

const PressView = styled.View`
 position:relative;
 flex-direction:row;
 justify-content:center;
`;

const PressButton = styled.View`
background-color:${props => props.theme.colors.yellow[500]};
width:343px;
height:56px;
border-radius:29px;
padding:15px;


`;

const AnimationView = styled.View`
background-color:${props => props.theme.colors.yellow[500]};
//width:343px;
height:70px;
border-radius:29px;
padding:4px;
box-sizing:border-box;
`;

const InnerContainer = styled.View`
background-color:${props => props.theme.colors.yellow[500]};
border-radius:29px;
overflow:hidden;
`;

const Inner = styled.View`
background-color:${props => props.theme.colors.grey[0]};
height:56px;
//width:339px;
border-top-left-radius:27px;
border-top-right-radius:27px;
justify-content:space-between;
flex-direction:row;
padding:0px 18px;
align-items:center;

`;

const PriceText = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.grey[2]};
`;

const ButtonText = styled(Typography).attrs({text:'BottomButtonSB'})`
color:${props => props.theme.colors.grey[2]};
text-align:center;
`;

