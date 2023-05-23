import React from 'react';
import {Image} from 'react-native';

import {KaKaoImage} from '../../../assets';
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
      <Image source={KaKaoImage} scale={scale} />
    </IconWrapper>
  );
};
export default Component;
