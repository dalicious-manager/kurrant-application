import React from 'react';
import styled from 'styled-components/native';

import Typography from '../Typography';
import {
  getButtonLabelStyles,
  getButtonSizeStyles,
  getButtonColor,
  getDisabledColor,
  getLabelColor,
} from './style';


/**
 * @param {object} props
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} props.size
 * @param {'primary' | 'gray' | 'red' | 'blue'} props.type
 * @param {boolean} props.disabled
 * @param {function} props.onPressEvent
 * @returns
 */

const Component = ({
  label = '로그인',
  size = 'xl',
  type = 'primary',
  disabled = false,
  onPressEvent = () => { console.log('버튼을 누르셨습니다.') }
}) => (
  <Wrapper size={size} type={type} disabled={disabled} onPress={onPressEvent}>
    <LabelWrap>
      <Label size={size} type={type} disabled={disabled}>
        {label}
      </Label>
    </LabelWrap>
  </Wrapper>
);

export default Component;

const Wrapper = styled.Pressable`
  ${({ size }) => getButtonSizeStyles(size)};
  ${({ type }) => getButtonColor(type)};
  ${({ type, disabled }) => disabled && getDisabledColor(type)};
  border-radius: 6px;
`;

export const LabelWrap = styled.View`
  align-items: center;
  width: 100%;
`;

export const Label = styled(Typography).attrs({ weight: 'B' })`
  color: ${({ theme }) => theme.colors.neutral[30]};
  ${({ type, disabled }) => type === 'gray' && getLabelColor(disabled)};
  ${({ size }) => getButtonLabelStyles(size)};
`;
