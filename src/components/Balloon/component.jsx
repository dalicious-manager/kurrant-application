import React, { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import DownArrowIcon from '../../assets/icons/Balloon/BalloonDownArrow.svg';
import UpArrowIcon from '../../assets/icons/Balloon/BalloonUpArrow.svg';
import Typography from '../Typography';

/** 예시 */
// import Toast from '../Toast';
// const { toastEvent, ToastWrap } = Toast();

// <ToastWrap message={'안녕하세요'} /> <- message 작성
// <Button title='wip' onPress={toastEvent} /> <- 사용하교 싶은 버튼에 적용하기

/**
 * 
 * @param {object} props 
 * @param {string} props.ToastWrap 
 * @param {string} props.ToastWrap.message 
 * @param {nomal | up | down} props.ToastWrap.vertical 
 * @param {B | s} props.ToastWrap.size 
 * @param {left | center | right} props.ToastWrap.horizontal 
 * @param {object} props.ToastWrap.location 
 * @param {function} props.toastEvent onPress 
 * @returns 
 */

const Component = () => {
  const fadeBalloon = useRef(new Animated.Value(0)).current;
 
  const balloonEvent = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeBalloon, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeBalloon, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeBalloon, {
        toValue: 0,
        duration: 550,
        useNativeDriver: true,
      }),
    ]
    ).start()
  }, [fadeBalloon]);

  const BalloonWrap = useCallback(
    ({ message, 
      vertical = 'up', 
      horizontal='left', 
      location={},
      size='s'
    }) => {
      const renderIcon = () => {
        switch(vertical) {
          case 'up':
            return <UpArrowIcon/>;
          case 'down':
            return <DownArrowIcon/>;
          case 'nomal':
            return null;
        }
      }
      return <Wrapper style={{ opacity: fadeBalloon }} location={location}>
        <Container vertical={vertical} size={size}>
          <IconWrap vertical={vertical} horizontal={horizontal}>{renderIcon(vertical)}</IconWrap>
          {size === 'B' ? <ToastMessageLarge>{message.trim()}</ToastMessageLarge> : <ToastMessageSmall>{message.trim()}</ToastMessageSmall>}
        </Container>
      </Wrapper>
  }, [fadeBalloon])


  return { balloonEvent, BalloonWrap };
};

export default Component;

const Wrapper = styled(Animated.View)`
  position: absolute;
  align-items: center;  
  ${({location})=>{
    let retSpot = location?.top ? `top :${location.top}; `: '';
    retSpot+=location?.left ? `left :${location.left}; ` : '';
    retSpot+=location?.bottom ? `bottom :${location.bottom}; `: '';
    retSpot+=location?.right ? `right :${location.right}; `: '';
    console.log(retSpot);
    return retSpot
  }}
`;
const Container = styled.View`
  flex:1;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: ${({size})=> size === 'B' ? '6px 12px' : '3.5px 12px'};
  justify-content: center;
  border-radius: ${({size})=> size === 'B' ? '10px' : '7px'};
  background-color: ${({theme})=> theme.colors.grey[1]}; 
  max-width: 339px;
`
const ToastMessageSmall = styled(Typography).attrs({ text: 'CaptionR'})`  
  overflow: hidden;  
  color: ${({ theme }) => theme.colors.neutral[0]};
`;

const ToastMessageLarge = styled(Typography).attrs({ text: 'Body06R'})`  
  overflow: hidden;  
  color: ${({ theme }) => theme.colors.neutral[0]};
`;

const IconWrap = styled.View`
  position: absolute;
  ${({vertical})=> vertical === 'up' ? 'top:  -8px' : 'bottom:-8px'};
  ${({horizontal})=> horizontal === 'right' ? 'right: 10px' : horizontal === 'left' && 'left: 10px'};
  
`;