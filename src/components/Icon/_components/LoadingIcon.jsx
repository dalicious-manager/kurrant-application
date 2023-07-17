import React from 'react';
import Loading from '~assets/icons/loading.svg';

import IconWrapper from '../component';
/**
 *
 * @param {object} props
 * @param {'loading'} props.name
 * @param {number} props.size
 * @param {string} props.color
 * @Reference https://oblador.github.io/react-native-vector-icons/
 * @returns
 */
const Component = ({size = 20, color, style}) => {
  return (
    <IconWrapper style={style}>
      <Loading size={size} color={color} />
    </IconWrapper>
  );
};

export default Component;
