import React from 'react';
import {Path, Svg} from 'react-native-svg';

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
  width = '6px',
  height = '9px',
  size = 20,
  color,
  style = 'white',
}) => {
  return (
    <Wrapper width={width} height={height}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 6 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M1 0.5L5 4.5L1 8.5"
          stroke="#3478F6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  width: ${({width}) => width};
  height: ${({height}) => height};
`;
