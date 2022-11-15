import React from 'react';
import styled, { css } from 'styled-components/native';

import { KaKaoIcon, AppleIcon, Octicons } from '../Icon';
import Typography from '../Typography';
import { getSnsButtonColor, getSnsButtonBorder } from './style';

/**
 * @param {object} props
 * @param {'apple' | 'email' | 'kakao'} props.type_sns
 * @param {function} props.onPressEvent
 * @returns
 */
const Component = ({ type_sns = 'email', onPressEvent = () => { console.log('sns 버튼을 누르셨습니다.') } }) => {
  const snsButtonLabel = {
    kakao: '카카오 계정으로 로그인',
    email: '이메일로 가입',
    apple: 'Apple로 로그인',
  };

  const renderButton = () => {
    switch (type_sns) {
      case 'kakao':
        return <KaKaoIcon />;
      case 'email':
        return <Octicons name={'mail'} size={22} color={'#fff'} />;
      case 'apple':
        return <AppleIcon />;
    }
  };

  return (
    <ButtonWrap type_sns={type_sns} onPress={onPressEvent}>
      <SnsButton type_sns={type_sns}>
        <Label type_sns={type_sns}>{snsButtonLabel[type_sns]}</Label>
      </SnsButton>
      <IconWrap type_sns={type_sns}>{renderButton(type_sns)}</IconWrap>
    </ButtonWrap>
  );
};

export default Component;

const ButtonWrap = styled.Pressable`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  ${({ type_sns }) => getSnsButtonBorder(type_sns)};
`;
const SnsButton = styled.View`
  align-items: center;
  ${({ type_sns }) => getSnsButtonColor(type_sns)}
`;
const IconWrap = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  align-items: center;
  justify-content: center;
  ${({ type_sns }) =>
    type_sns === 'email' &&
    css`
      padding: 0 20px;
    `}
`;

const Label = styled(Typography).attrs({ variant: 'h600', weight: 'B' })`
  color: ${({ theme }) => theme.colors.neutral[900]};
  padding: 13px 0;
  ${({ type_sns }) =>
    type_sns === 'email' &&
    css`
      color: ${({ theme }) => theme.colors.neutral[0]};
    `}
`;
