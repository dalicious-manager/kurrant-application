import React from 'react';
import {
  Circle,
  ClipPath,
  Defs,
  G,
  Mask,
  Path,
  Rect,
  Svg,
} from 'react-native-svg';

import styled from 'styled-components';
/**
 *
 * @param {object} props
 * @param {'arrow-down'} props.name
 * @param {number} props.size
 * @param {string} props.color
 * @Reference https://oblador.github.io/react-native-vector-icons/
 * @returns
 */
const Component = ({
  width = '14px',
  height = '15px',
  size = 20,
  color,
  style = 'white',
}) => {
  return (
    <Wrapper width={width} height={height}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <G clip-path="url(#clip0_10973_173564)">
          <Mask
            id="mask0_10973_173564"
            style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="14"
            a
            height="15">
            <Rect
              x="0.5"
              y="1"
              width="13"
              height="13"
              rx="1.5"
              fill="white"
              a
              stroke="#88888E"
            />
          </Mask>
          <G mask="url(#mask0_10973_173564)">
            <Path
              d="M1 7.27273C1 7.27273 2.14286 6 3.28571 6C5 6 6.30134 9.05301 6.71429 9.47107C7.12723 9.88914 7.28571 10.0496 7.85714 10.0496C8.42857 10.0496 9.18182 9 10.2727 9C11.3636 9 12.1877 9.74469 12.4545 10C12.7214 10.2553 13 10.6236 13 10.6236V13H1.5L1 7.27273Z"
              fill="#88888E"
            />
          </G>
          <Rect
            x="1"
            y="1.5"
            width="12"
            height="12"
            rx="2"
            stroke="#88888E"
            stroke-width="1.3"
          />
          <Circle cx="9.25" cy="4.75" r="1.25" fill="#88888E" />
        </G>
        <Defs>
          <ClipPath id="clip0_10973_173564">
            <Rect
              width="14"
              height="14"
              fill="white"
              transform="translate(0 0.5)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  width: ${({width}) => width};
  height: ${({height}) => height};
`;
