import React from 'react';

import {EyeImage} from '../../../assets';
import Image from '../../Image';
import IconWrapper from '../component';
/**
 *
 * @param {object} props
 * @param {number} props.scale
 * @returns
 */
const Component = ({scale = 0.5}) => {
  return (
    <IconWrapper>
      <Image imagePath={EyeImage} scale={scale} />
    </IconWrapper>
  );
};
export default Component;
