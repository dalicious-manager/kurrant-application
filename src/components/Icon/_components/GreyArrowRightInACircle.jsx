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
        <Circle cx="12" cy="12" r="12" fill="#F5F5F5" />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.29289 17.2032C8.90237 16.8127 8.90237 16.1795 9.29289 15.789L13.0858 11.9961L9.29289 8.2032C8.90237 7.81268 8.90237 7.17951 9.29289 6.78899C9.68342 6.39846 10.3166 6.39846 10.7071 6.78899L15.2071 11.289C15.5976 11.6795 15.5976 12.3127 15.2071 12.7032L10.7071 17.2032C10.3166 17.5937 9.68342 17.5937 9.29289 17.2032Z"
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
