import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {useTheme} from 'styled-components/native';

import IconWrapper from '../component';

/**
 *
 * @param {object} props
 * @param {'closecircle'} props.name
 * @param {number} props.size
 * @param {string} props.color
 * @Reference https://oblador.github.io/react-native-vector-icons/
 * @returns
 */
const Component = ({name, size = 16, color}) => {
  const appTheme = useTheme();
  return (
    <IconWrapper>
      <Octicons
        name={name}
        size={size}
        color={color || appTheme.colors.neutral[300]}
      />
    </IconWrapper>
  );
};
export default Component;
