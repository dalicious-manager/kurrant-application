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
const Component = ({
  width,
  height,
  size = 20,
  color = '#FDC800',
  style = 'white',
}) => {
  return (
    <Wrapper width={width} height={height}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.57684 0.963969L7.74034 3.32147C7.83384 3.51097 8.01484 3.64247 8.22434 3.67297L10.8258 4.05097C11.3528 4.12747 11.5638 4.77597 11.1818 5.14747L9.29934 6.98247C9.22473 7.05524 9.16891 7.14505 9.13669 7.24416C9.10446 7.34328 9.0968 7.44873 9.11434 7.55147L9.55884 10.1425C9.64884 10.668 9.09784 11.068 8.62634 10.8205L6.29934 9.59697C6.20715 9.54845 6.10453 9.52309 6.00034 9.52309C5.89616 9.52309 5.79354 9.54845 5.70134 9.59697L3.37434 10.8205C2.90234 11.068 2.35134 10.668 2.44134 10.1425L2.88584 7.55147C2.90335 7.44873 2.89566 7.34329 2.86343 7.24418C2.83121 7.14507 2.77542 7.05527 2.70084 6.98247L0.818342 5.14747C0.436842 4.77597 0.647342 4.12747 1.17484 4.05097L3.77584 3.67297C3.98534 3.64247 4.16684 3.51097 4.26034 3.32147L5.42334 0.963969C5.65934 0.485969 6.34084 0.485969 6.57684 0.963969Z"
          fill={color}
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
