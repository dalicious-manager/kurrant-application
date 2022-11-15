import React from 'react';
import styled, {css} from 'styled-components/native';

/**
 *
 * @param {object} props
 * @param {string} props.imagePath
 * @param {number} props.scale
 * @returns
 */
const Component = ({imagePath, scale, styles}) => {
  // Render
  return <StyledImage source={imagePath} scale={scale} />;
};

// Styling
const StyledImage = styled.Image`
  ${({scale}) => {
    return (
      scale &&
      css`
        transform: scale(${scale});
      `
    );
  }}

  ${({size}) => {
    return (
      size &&
      css`
        width: ${size}px;
        height: ${size}px;
      `
    );
  }}
`;

export default Component;
