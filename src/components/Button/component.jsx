import React from 'react';
import styled from 'styled-components/native';

import PlusIcon from '../../assets/icons/Home/plus.svg';
import Typography from '../Typography';
import {
  getButtonSizeStyles,
  getButtonColor,
  getDisabledColor,
  getLabelColor,
} from './style';

/**
 * @param {object} props
 * @param {string} props.label
 * @param {'full' | 'middle' |'half' | 'modalFull' | 'modalHalf' | 'button38' | 'button32'} props.size
 * @param {'grey1' | 'grey2' | 'grey3' | 'grey7' | 'white' | 'yellow' | 'login' | 'purple'} props.type
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
  text = 'BottomButtonSB',
  style = '',
  onPressEvent = () => {
    console.log('버튼을 누르셨습니다.');
  },
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'plus':
        return <PlusIcon />;
      case 'nomal':
        return null;
    }
  };
  return (
    <Wrap size={size} style={style}>
      <Wrapper
        size={size}
        type={type}
        disabled={disabled}
        onPress={onPressEvent}>
        <LabelWrap>
          {icon && <IconWrap>{renderIcon(icon)}</IconWrap>}
          <Label type={type} disabled={disabled} text={text}>
            {label}
          </Label>
        </LabelWrap>
      </Wrapper>
    </Wrap>
  );
};

export default Component;

const Wrap = styled.View`
  align-items: center;
`;

const Wrapper = styled.Pressable`
  ${({size}) => getButtonSizeStyles(size)};
  ${({type}) => getButtonColor(type)};
  ${({type, disabled}) => disabled && getDisabledColor(type)};
  border-radius: ${({type}) => (type === 'login' ? '0px' : '100px')};
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const IconWrap = styled.View`
  padding-right: 8px;
`;

export const LabelWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Label = styled(Typography)`
  ${({disabled, type}) => getLabelColor(disabled, type)};
`;

//<IconWrap>{renderIcon(icon)}</IconWrap>
