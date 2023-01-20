import React from 'react';

import {NaverImage} from '../../../assets';
import { Image } from 'react-native';
import IconWrapper from '../component';
/**
 *
 * @param {object} props
 * @param {number} props.scale
 * @returns
 */
const Component = ({scale = 1.4}) => {
  return (
    <IconWrapper>
      <Image source={NaverImage} scale={scale} />
    </IconWrapper>
  );
};
export default Component;
