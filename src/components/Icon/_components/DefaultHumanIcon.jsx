import React from 'react';

import DefaultHumanIcon from '../../../assets/icons/DefaultHuman.svg';

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
const Component = ({size = 20, color, style = 'white'}) => {
  return (
    <IconWrapper style={style}>
      <DefaultHumanIcon size={size} color={color} />
    </IconWrapper>
  );
};

export default Component;
