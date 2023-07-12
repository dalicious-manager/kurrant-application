import React from 'react';
import {Line, Path, Svg} from 'react-native-svg';

import IconWrapper from '../component';
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
  width = '24px',
  height = '24px',
  size = 20,
  color,
  style = 'white',
}) => {
  return (
    <Wrapper width={width} height={height}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M7 18H17V20C17 20.5523 16.5523 21 16 21H8C7.44772 21 7 20.5523 7 20V18Z"
          fill="#BDBAC1"
        />
        <Path
          d="M0.75 5C0.75 4.44772 1.19772 4 1.75 4H22.25C22.8023 4 23.25 4.44772 23.25 5V8.625C23.25 14.1478 18.7728 18.625 13.25 18.625H10.75C5.22715 18.625 0.75 14.1478 0.75 8.625V5Z"
          fill="#BDBAC1"
          stroke="white"
          stroke-linejoin="round"
        />
        <Line x1="1" y1="7.5" x2="23" y2="7.5" stroke="white" />
      </Svg>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  width: ${({width}) => width};
  height: ${({height}) => height};
`;
