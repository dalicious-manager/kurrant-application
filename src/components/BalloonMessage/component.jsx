import React, {useCallback, useRef} from 'react';
import {Animated, Image} from 'react-native';
import styled from 'styled-components/native';

import {MessageIcon, MessageTopIcon, MessageDownIcon} from '../../assets';
import UpArrowIcon from '../../assets/icons/Balloon/BalloonUpArrow.svg';
import DownArrowIcon from '../../assets/icons/Spot/arrowDown.svg';
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

const Component = ({
  location = {},
  message = '메세지',
  vertical = 'up',
  horizontal = 'left',
}) => {
  const renderIcon = () => {
    switch (vertical) {
      case 'up':
        return <Image source={MessageTopIcon} />;
      case 'down':
        return <Image source={MessageDownIcon} />;
      case 'nomal':
        return null;
    }
  };

  return (
    <Wrapper location={location}>
      <Container vertical={vertical}>
        <IconWrap vertical={vertical} horizontal={horizontal}>
          {renderIcon(vertical)}
        </IconWrap>
        <Image source={MessageIcon} style={{width: 42, height: 42}} />
        <ToastMessage>{message.trim()}</ToastMessage>
      </Container>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  margin: 0px 24px;
  position: relative;
  align-items: center;
  ${({location}) => {
    let retSpot = location?.top ? `top :${location.top}; ` : '';
    retSpot += location?.left ? `left :${location.left}; ` : '';
    retSpot += location?.bottom ? `bottom :${location.bottom}; ` : '';
    retSpot += location?.right ? `right :${location.right}; ` : '';
    // console.log(retSpot);
    return retSpot;
  }}
`;
const Container = styled.View`
  position: absolute;
  flex-direction: row;
  align-items: center;
  padding: 16px;

  border-radius: 14px;
  background-color: #eff2fe;
  width: 100%;
`;
const ToastMessage = styled(Typography).attrs({text: 'MealCount'})`
  margin-left: 16px;
  color: ${({theme}) => theme.colors.grey[2]};
`;

const IconWrap = styled.View`
  position: absolute;
  ${({vertical}) => (vertical === 'up' ? 'top:  -8px' : 'bottom:-8px')};
  ${({horizontal}) =>
    horizontal === 'right'
      ? 'right: 10px'
      : horizontal === 'left' && 'left: 27px'};
`;
