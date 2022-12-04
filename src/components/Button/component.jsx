import React from 'react';
import { Dimensions } from 'react-native';
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

const screenWidth = Dimensions.get('window').width;

/**
 * @param {object} props
 * @param {'full' | 'middle' |'half' | 'button38' | 'button32'} props.size
 * @param {'grey1' | 'grey2' | 'grey3' | 'grey7' | 'white' | 'yellow' | 'login'} props.type
 * @param {boolean} props.disabled
 * @param {function} props.onPressEvent
 * @param {'plus' | 'nomal'} props.icon
 * @returns
 */

const Component = ({
  label = '로그인',
  size = 'full',
  type = 'yellow',
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
    <Wrap size={size}>
      <Wrapper size={size} type={type} disabled={disabled} onPress={onPressEvent}>
        <LabelWrap>
          <IconWrap>{renderIcon(icon)}</IconWrap>
          <Label size={size} type={type} disabled={disabled}>
            {label}
          </Label>
        </LabelWrap>
      </Wrapper>
    </Wrap>
  )
};

export default Component;

const Wrap = styled.View`
width:${({ size }) => size === 'full' && screenWidth}px ;
align-items:center;
`;

const Wrapper = styled.Pressable`
  ${({ size }) => getButtonSizeStyles(size)};
  ${({ type }) => getButtonColor(type)};
  ${({ type, disabled }) => disabled && getDisabledColor(type)};
  border-radius: ${({type}) => type === 'login' ? '0px' : '100px'};
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

export const Label = styled(Typography).attrs({ text: 'BottomButtonSB' })`
  color: ${({ theme, type }) => (type === 'grey2') || (type === 'grey3') ? theme.colors.grey[0] : theme.colors.grey[1] };
  ${({ disabled }) =>  getLabelColor(disabled)};
  ${({ size }) => getButtonLabelStyles(size)};
`;
