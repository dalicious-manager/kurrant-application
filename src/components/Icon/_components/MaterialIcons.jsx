import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import IconWrapper from '../component';

/**
 *
 * @param {object} props
 * @param {'closecircle' | 'close' | star | staro } props.name
 * @param {number} props.size
 * @param {string} props.color
 * @Reference https://oblador.github.io/react-native-vector-icons/
 * @returns
 */
const Component = ({name, size = 16, color}) => {
  return (
    <IconWrapper>
      <MaterialIcons name={name} size={size} color={color} />
    </IconWrapper>
  );
};
export default Component;
