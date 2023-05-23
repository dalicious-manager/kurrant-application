import React from 'react';
import {Path, Svg} from 'react-native-svg';
import styled from 'styled-components';

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
const Component = ({width, height, size = 20, color, style = 'white'}) => {
  return (
    <Wrapper width={width} height={height}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M11.65 1.5487C11.65 1.7487 11.5833 1.9487 11.3833 2.08203L6.38333 7.08203C6.05 7.41536 5.58333 7.41536 5.25 7.08203L0.25 2.08203C-0.0833333 1.7487 -0.0833333 1.28203 0.25 0.948698C0.583333 0.615365 1.05 0.615365 1.38333 0.948698L5.85 5.48203L10.3167 1.01536C10.65 0.682031 11.1167 0.682031 11.45 1.01536C11.5833 1.1487 11.65 1.3487 11.65 1.5487Z"
          fill="#88888E"
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
