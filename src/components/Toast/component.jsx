import React, {useCallback, useRef} from 'react';
import {Animated, Platform} from 'react-native';
import styled, {css} from 'styled-components/native';

import CheckIcon from '../../assets/icons/Toast/CheckIcon.svg';
import ErrorIcon from '../../assets/icons/Toast/ErrorIcon.svg';
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
 * @param {boolean} props.ToastWrap.isBottom
 * @param {boolean} props.ToastWrap.isCenter
 * @param {string} props.ToastWrap.absoluteStyle
 * @param {boolean} props.ToastWrap.isHeader
 * @param {nomal | checked | error} props.ToastWrap.icon
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
    ]).start();
  }, [fadeToast]);
  const toastEventNotOut = useCallback(() => {
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
    ]).start();
  }, [fadeToast]);

  const ToastWrap = useCallback(
    ({
      message = 'test',
      icon = 'nomal',
      isBottom = false,
      isHeader = true,
      absoluteStyle = '',
      isCenter = true,
    }) => {
      const renderIcon = () => {
        switch (icon) {
          case 'checked':
            return <CheckIcon />;
          case 'error':
            return <ErrorIcon />;
          case 'nomal':
            return null;
        }
      };
      return (
        <Wrapper
          style={{opacity: fadeToast}}
          absoluteStyle={absoluteStyle && absoluteStyle}
          isBottom={isBottom}
          isCenter={isCenter}
          isHeader={isHeader}
          Platform={Platform.OS}>
          <Container icon={icon}>
            <IconWrap icon={icon}>{renderIcon(icon)}</IconWrap>
            <ToastMessage>{message.trim()}</ToastMessage>
          </Container>
        </Wrapper>
      );
    },
    [fadeToast],
  );

  return {toastEvent, ToastWrap, toastEventNotOut};
};

export default Component;

const Wrapper = styled(Animated.View)`
  position: absolute;
  align-items: center;
  ${({isBottom, Platform, isHeader}) =>
    isBottom
      ? 'bottom:35px;'
      : Platform === 'ios'
      ? isHeader
        ? 'top:40px'
        : 'top:105px'
      : isHeader
      ? 'top: 30px'
      : 'top: 95px'}
  /* width: 100%; */
  ${({absoluteStyle}) => {
    if (absoluteStyle)
      return css`
        ${absoluteStyle}
      `;
  }}
  ${({isCenter}) => {
    if (isCenter)
      return css`
        align-self: center;
      `;
  }}
  
  border-radius: 100px;
`;
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: ${({icon}) =>
    icon === 'nomal' ? '9px 20px' : '13px 16px 12px 17px'};
  justify-content: center;
  border-radius: ${({icon}) => (icon === 'nomal' ? '14px' : '100px')};
  background-color: ${({theme}) => theme.colors.grey[1]};
  max-width: 339px;
`;
const ToastMessage = styled(Typography).attrs({text: 'Body05R'})`
  overflow: hidden;
  color: ${({theme}) => theme.colors.neutral[0]};
`;

const IconWrap = styled.View`
  padding-right: ${({icon}) => (icon === 'nomal' ? '0px' : '13px')};
`;
