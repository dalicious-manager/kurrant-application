import React from 'react';
import {G, Mask, Path, Svg} from 'react-native-svg';

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
  width,
  height,
  size = 20,
  color = '#BDBAC1',
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
        <Mask
          id="mask0_10906_178346"
          style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="1"
          width="14"
          height="13">
          <Path
            d="M1.22191 6.96777C1.21492 6.88723 1.22474 6.80612 1.25076 6.72957C1.27678 6.65303 1.31843 6.58273 1.37306 6.52313C1.42769 6.46354 1.49411 6.41595 1.56811 6.38339C1.64211 6.35083 1.72207 6.334 1.80291 6.33398H2.91679C3.0715 6.33398 3.21987 6.39544 3.32927 6.50484C3.43866 6.61423 3.50012 6.76261 3.50012 6.91732V12.459C3.50012 12.6137 3.43866 12.7621 3.32927 12.8715C3.21987 12.9809 3.0715 13.0423 2.91679 13.0423H2.28504C2.13904 13.0424 1.99833 12.9876 1.89071 12.889C1.78309 12.7903 1.71638 12.6549 1.70375 12.5094L1.22191 6.96777ZM5.25012 6.73502C5.25012 6.49119 5.40179 6.27302 5.622 6.16919C6.10295 5.94227 6.92225 5.4864 7.29179 4.87011C7.76808 4.07561 7.85791 2.64032 7.8725 2.31161C7.87454 2.26552 7.87337 2.21944 7.8795 2.17394C7.95854 1.60432 9.05783 2.26961 9.47929 2.97311C9.70825 3.35461 9.73741 3.85598 9.7135 4.24769C9.68754 4.66652 9.56475 5.07107 9.44429 5.47298L9.18762 6.32961H12.3542C12.4444 6.3296 12.5333 6.35048 12.614 6.3906C12.6947 6.43073 12.765 6.48901 12.8194 6.56087C12.8738 6.63273 12.9108 6.71621 12.9275 6.80478C12.9442 6.89334 12.9402 6.98457 12.9157 7.07132L11.3495 12.6176C11.3149 12.74 11.2413 12.8477 11.1399 12.9243C11.0385 13.001 10.9148 13.0424 10.7877 13.0423H5.83346C5.67875 13.0423 5.53037 12.9809 5.42098 12.8715C5.31158 12.7621 5.25012 12.6137 5.25012 12.459V6.73502Z"
            fill="white"
            stroke="white"
            stroke-width="1.16667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Mask>
        <G mask="url(#mask0_10906_178346)">
          <Path d="M0 0.5H14V14.5H0V0.5Z" fill={color} />
        </G>
      </Svg>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  width: ${({width}) => width};
  height: ${({height}) => height};
`;
