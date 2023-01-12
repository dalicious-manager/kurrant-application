import React from 'react';

import SettingIcon from '~assets/icons/notify-setting.svg';

import IconWrapper from '../component';
/**
 *
 * @param {object} props
 * @param {'arrow-down'} props.name
 * @param {number} props.size
 * @param {string} props.color
 * @Reference https://oblador.github.io/react-native-vector-icons/
 * @returns
 */
const Component = ({ size = 20, color, style}) => {
  return (
    <IconWrapper style={style}>
      <SettingIcon size={size} color={color} />
    </IconWrapper>
  );
};

export default Component;
