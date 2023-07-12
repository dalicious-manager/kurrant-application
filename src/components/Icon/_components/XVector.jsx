import React from 'react';
import {Path, Svg} from 'react-native-svg';

import XVectorIcon from '../../../assets/icons/XCircle.svg';
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
      <XVectorIcon size={size} color={color} />
    </IconWrapper>
  );
};

export default Component;
