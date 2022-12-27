import React from 'react';
import styled, {css} from 'styled-components/native';

/**
 *
 * @param {object} props
 * @param {string} props.imagePath
 * @param {number} props.scale
 * @param {number} props.styles
 * @param {string} props.resizeMode
 * @returns
 */
const Component = ({imagePath, scale, styles,resizeMode='cover'}) => {
  // Render
  return <StyledImage source={imagePath} scale={scale} styles={styles} resizeMode={resizeMode} />;
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
  ${({styles}) => {
    return (
      styles &&
      css`
       ${styles}
      `
    );
  }}
`;

export default Component;
