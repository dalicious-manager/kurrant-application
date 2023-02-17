import { useLinkBuilder } from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Animated,
  Pressable,
  Dimensions,
  View
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
  cartCount,
  onPressEvent,
  increasePress,
  decreasePress,
  onPressEvent2 = () => console.log('장바구니 버튼'),
  capacity
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [fadeIn, setFadeIn] = useState(false);
  const [rotate, setRotate] = useState('0deg');

  const PRICE = price * count
  console.log(cartCount,
    capacity)
  const handlePress = () => {
    Animated.timing(fadeAnim, {
      toValue: fadeIn ? 0 : 72,
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
              <TrapezoidIcon
              capacity={Number(capacity)-Number(cartCount|| 0)} count={Number(count)}
              />
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

          <InnerContainer capacity={Number(capacity)-Number(cartCount|| 0)} count={Number(count)}>
            <Animated.View style={{height: fadeAnim}}>
              <AnimationView capacity={Number(capacity)-Number(cartCount|| 0)} count={Number(count)}>
                <Inner>
                    <PriceText>{withCommas(PRICE)}원</PriceText>
                    <CountView >
                      <Count
                      detail
                      count={Number(count)}
                      increasePress={increasePress}
                      decreasePress={decreasePress}
                      onPressEvent={onPressEvent}
                      capacity={Number(capacity)-Number(cartCount|| 0)}
                      />
                      <CapacityText capacity={Number(capacity)-Number(cartCount)} count={Number(count)}>재고수량 : {Number(capacity)-Number(cartCount|| 0)}</CapacityText>
                    </CountView>
                </Inner>
              </AnimationView>
            </Animated.View>
            <PressButton onPress={onPressEvent2} capacity={Number(capacity)-Number(cartCount|| 0)} count={Number(count)} disabled={(Number(capacity) < Number(count)+Number(cartCount|| 0))}>
              <ButtonText capacity={Number(capacity)-Number(cartCount|| 0)} count={Number(count)}>
                {(Number(capacity) < Number(count)+Number(cartCount|| 0)) ? '재고가 부족해요' : fadeIn ? '장바구니 담기' : `${Number(count)}개 담기`}
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
background-color:${({theme,capacity,count}) => (count > capacity) ? theme.colors.grey[7] : theme.colors.yellow[500]};
width:100%;
height:56px;
border-radius:29px;
padding:16px;
`;

const AnimationView = styled.View`
background-color:${({theme,capacity,count}) => (count > capacity) ? theme.colors.grey[7] : theme.colors.yellow[500]};
height:70px;
border-radius:29px;
padding:2px;
box-sizing:border-box;
`;

const InnerContainer = styled.View`
background-color:${({theme,capacity,count}) => (count > capacity) ? theme.colors.grey[7] : theme.colors.yellow[500]};
border-radius:29px;
overflow:hidden;
`;


const Inner = styled.View`
background-color:${props => props.theme.colors.grey[0]};
height:70px;
border-top-left-radius:27px;
border-top-right-radius:27px;
justify-content:space-between;
flex-direction:row;
padding:8px 18px 4px 18px;
align-items:center;

`;

const PriceText = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.grey[2]};
`;

const ButtonText = styled(Typography).attrs({text:'BottomButtonSB'})`
color:${({theme,capacity,count}) => count > capacity ? theme.colors.grey[0] : theme.colors.grey[2]};
text-align:center;
`;

const CapacityText = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme,capacity,count}) => count > capacity ? theme.colors.red[500] : theme.colors.grey[2]};
`;

const CountView = styled.View`
align-items:flex-end;
`;

const TrapezoidIcon = styled(Trapezoid)`
color:${({theme,capacity,count}) => count > capacity ? theme.colors.grey[7] : theme.colors.yellow[500]};
`;