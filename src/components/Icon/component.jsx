import React from 'react';
import styled from 'styled-components/native';
/**
 *
 * @param {object} props
 * @param {number} scale
 * @param {number} height
 * @param {number} width
 * @returns
 */
const Component = ({children, ...rest}) => {
  return <IconWrapper>{children}</IconWrapper>;
};

// Styling
const IconWrapper = styled.View``;

export default Component;
