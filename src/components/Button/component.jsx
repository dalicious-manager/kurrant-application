import React from 'react';
import styled from 'styled-components/native';

import PlusIcon from '../../assets/icons/Home/plus.svg';
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
 * @param {'primary' | 'gray' | 'red' | 'blue' | 'yellow'} props.type
 * @param {boolean} props.disabled
 * @param {function} props.onPressEvent
 * @param {'plus' | 'nomal'} props.icon
 * @returns
 */

const Component = ({
  label = '로그인',
  size = 'xl',
  type = 'primary',
  disabled = false,
  icon = 'nomal',
  onPressEvent = () => { console.log('버튼을 누르셨습니다.') }
}) => {
  
  const renderIcon = () => {
    switch(icon) {
      case 'plus':
        return <PlusIcon/>;
      case 'nomal':
        return null;
    }
  }
  return (
    <Wrapper size={size} type={type} disabled={disabled} onPress={onPressEvent}>
      <LabelWrap>
        <IconWrap>{renderIcon(icon)}</IconWrap>
        <Label size={size} type={type} disabled={disabled}>
          {label}
        </Label>
      </LabelWrap>
  </Wrapper>
  )
};

export default Component;

const Wrapper = styled.Pressable`
  ${({ size }) => getButtonSizeStyles(size)};
  ${({ type }) => getButtonColor(type)};
  ${({ type, disabled }) => disabled && getDisabledColor(type)};
  border-radius: 100px;
  align-items:center;
  flex-direction:row;
  justify-content:center;
`;

const IconWrap = styled.View`
padding-right:8px;
`;

export const LabelWrap = styled.View`
  flex-direction:row;
  justify-content:center;
  align-items: center;
  width: 100%;
  
`;

export const Label = styled(Typography).attrs({ weight: 'N' })`
  color: ${({ theme }) => theme.colors.grey[800]};
  ${({ type, disabled }) => type === 'gray' && getLabelColor(disabled)};
  ${({ size }) => getButtonLabelStyles(size)};
`;
