import React from 'react';
import CalendarIcon from '~assets/icons/Home/calendar16.svg';

import IconWrapper from '../component';
/**
 *
 * @param {object} props
 * @param {number} props.scale
 * @returns
 */
const Component = ({name, size = 16, color}) => {
  return (
    <IconWrapper>
      <CalendarIcon name={name} size={size} color={color} />
    </IconWrapper>
  );
};
export default Component;
