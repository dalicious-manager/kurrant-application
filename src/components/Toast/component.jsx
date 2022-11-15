import React, { useCallback, useRef } from 'react';
import { Animated, Button } from 'react-native';
import styled from 'styled-components/native';

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
 * @param {function} props.toastEvent onPress 
 * @returns 
 */

const Component = () => {
  const fadeToast = useRef(new Animated.Value(0)).current;

  const toastEvent = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeToast, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeToast, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeToast, {
        toValue: 0,
        duration: 550,
        useNativeDriver: true,
      }),
    ]
    ).start()
  }, [fadeToast]);

  const ToastWrap = useCallback(
    ({ message }) => (
      <Wrapper style={{ opacity: fadeToast }}>
        <ToastMessage>{message.trim()}</ToastMessage>
      </Wrapper>
    ), [fadeToast])


  return { toastEvent, ToastWrap };
};

export default Component;

const Wrapper = styled(Animated.View)`
  position: absolute;
  align-items: center;
  top: 50px;
  width: 100%;
`;
const ToastMessage = styled(Typography).attrs({ variant: 'h500', weight: 'B' })`
  padding: 4px 16px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #313131; 
  color: ${({ theme }) => theme.colors.neutral[0]};
`;