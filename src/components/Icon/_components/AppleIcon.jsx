import React from 'react';

import {AppLogoImage} from '../../../assets';
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
      <Image imagePath={AppLogoImage} scale={scale} />
    </IconWrapper>
  );
};
export default Component;
