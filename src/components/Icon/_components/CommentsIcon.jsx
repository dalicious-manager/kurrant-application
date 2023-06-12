import React from 'react';
import CommentsIcon from '~assets/icons/comments.svg';

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
const Component = ({name, size = 16, color}) => {
  return (
    <IconWrapper>
      <CommentsIcon name={name} size={size} color={color} />
    </IconWrapper>
  );
};

export default Component;
