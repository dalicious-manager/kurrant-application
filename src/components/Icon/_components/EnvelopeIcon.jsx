import React from 'react';

import {EnvelopeImage} from '../../../assets';
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
      <Image imagePath={EnvelopeImage} scale={scale} />
    </IconWrapper>
  );
};
export default Component;
