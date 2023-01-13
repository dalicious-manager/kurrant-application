import React from 'react';

import TrashIcon from '../../../assets/icons/NotificationCenter/trashcan.svg';
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
       <TrashIcon name={name} size={size} color={color} />
    </IconWrapper>
  );
};
export default Component;
