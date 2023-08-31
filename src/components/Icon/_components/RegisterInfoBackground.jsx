import React from 'react';
import {G, Path, Rect, Svg} from 'react-native-svg';

// import XVectorIcon from '../../../assets/icons/XCircle.svg';
import RegisterInfoBack4 from '../../../assets/icons/RegisterInfo/RegisterInfoBack4.svg';

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
const Component = ({width, height, color, size, style = 'white'}) => {
  return (
    <IconWrapper style={style}>
      <RegisterInfoBack4 size={size} color={color} />
    </IconWrapper>
  );
};

export default Component;
