import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

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
        <Circle
          cx="12"
          cy="12"
          r="12"
          transform="matrix(-1 0 0 1 24 0)"
          fill="#F5F5F5"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.7071 17.2032C15.0976 16.8127 15.0976 16.1795 14.7071 15.789L10.9142 11.9961L14.7071 8.2032C15.0976 7.81268 15.0976 7.17951 14.7071 6.78899C14.3166 6.39846 13.6834 6.39846 13.2929 6.78899L8.79289 11.289C8.40237 11.6795 8.40237 12.3127 8.79289 12.7032L13.2929 17.2032C13.6834 17.5937 14.3166 17.5937 14.7071 17.2032Z"
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
