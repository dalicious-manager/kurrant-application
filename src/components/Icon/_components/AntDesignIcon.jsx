import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useTheme} from 'styled-components/native';

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
  const appTheme = useTheme();
  return (
    <IconWrapper>
      <AntDesignIcon
        name={name}
        size={size}
        color={color || appTheme.colors.neutral[300]}
      />
    </IconWrapper>
  );
};
export default Component;
