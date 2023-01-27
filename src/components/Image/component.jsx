import React from 'react';
import styled, {css} from 'styled-components/native';

/**
 *
 * @param {object} props
 * @param {string} props.imagePath
 * @param {number} props.scale
 * @param {number} props.styles
 * @param {number} props.width
 * @param {number} props.height
 * @param {string} props.resizeMode
 * @returns
 */

const Component = ({
  imagePath,
  scale,
  width,
  height,
  styles,
  resizeMode = 'cover',
}) => {
  // Render
  return (
    <StyledImage
      source={imagePath}
      scale={scale}
      styles={styles}
      width={width}
      height={height}
      resizeMode={resizeMode}
    />
  );
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

  ${({width}) => {
    return (
      width &&
      css`
        width: ${width}px;
      `
    );
  }}
  ${({height}) => {
    return (
      height &&
      css`
        height: ${height}px;
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
