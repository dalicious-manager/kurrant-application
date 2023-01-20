import { useLinkBuilder } from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Animated,
  Pressable,
  Dimensions
} from 'react-native';
import styled from 'styled-components';

import Arrow from '../../assets/icons/Arrow/arrowTop.svg';
import MinusIcon from '../../assets/icons/MealDetail/minus.svg';
import PlusIcon from '../../assets/icons/MealDetail/plus.svg';
import Trapezoid from '../../assets/icons/MealDetail/trapezoid.svg';
import Count from '../../components/Count';
import withCommas from '../../utils/withCommas';
import Typography from "../Typography";


const screenWidth = Dimensions.get('window').width;

/** 
* @param {function} props.onPressEvent
*/

const Component = ({
  price,
  count,
  onPressEvent,
  increasePress,
  decreasePress,
  onPressEvent2 = () => console.log('장바구니 버튼')
}) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [fadeIn, setFadeIn] = useState(false);
  const [rotate, setRotate] = useState('0deg');

  const PRICE = price * count
  //const result = PRICE.toLocaleString('ko-KR')

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

  useEffect(() => {
    
    setRotate(
      rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    );
  }, [rotateAnim]);


  return (
      <Container>
        <BtnContainer >
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
                    <PriceText>{withCommas(PRICE)}원</PriceText>
                  {/* <InnerView>
                    <MinusIcon  onPress={decreasePress} />
                      <Text onPress={onPressEvent}>
                          {count}
                      </Text>
                      <PlusIcon onPress={increasePress}/>
                  </InnerView> */}
                  <Count
                  detail
                  count={count}
                  increasePress={increasePress}
                  decreasePress={decreasePress}
                  onPressEvent={onPressEvent}
                  />
                </Inner>
              </AnimationView>
            </Animated.View>
            <PressButton onPress={onPressEvent2}>
              <ButtonText>
                {fadeIn ? '장바구니에 담기' : `${count}개 담기`}
              </ButtonText>
            </PressButton>
          </InnerContainer>
        </BtnContainer>
      </Container> 
    
  );
};

export default Component;


const Container = styled.SafeAreaView`
  align-items: center;
`;
const BtnContainer = styled.Pressable`
  width:100%;
`;

const PressView = styled.View`
 position:relative;
 flex-direction:row;
 justify-content:center;
`;

const PressButton = styled.Pressable`
background-color:${props => props.theme.colors.yellow[500]};
width:100%;
height:56px;
border-radius:29px;
padding:16px;
`;

const AnimationView = styled.View`
background-color:${props => props.theme.colors.yellow[500]};
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

const InnerView = styled.View`
flex-direction:row;
align-items:center;
justify-content:space-around;
width:98px;
height:38px;
border:1px solid ${props => props.theme.colors.grey[6]};
border-radius:7px;
`;

const Inner = styled.View`
background-color:${props => props.theme.colors.grey[0]};
height:56px;
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

