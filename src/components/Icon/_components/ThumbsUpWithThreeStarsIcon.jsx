import React from 'react';
import styled from 'styled-components';
import ThumbsUpWithThreeStarsIcon from '~assets/icons/ThumbsUpWithThreeStarsIcon.svg';

import IconWrapper from '../component';
/**
 *
 * @param {object} props
 * @param {'arrow-down'} props.name
 * @param {number} props.size
 * @param {string} props.color
 * @param {string} props.additionalCss
 * @Reference https://oblador.github.io/react-native-vector-icons/
 * @returns
 */
const Component = ({name, size = 16, color, additionalCss}) => {
  return (
    <ApplyAdditionalCssFeatures additionalCss={additionalCss}>
      <IconWrapper>
        <ThumbsUpWithThreeStarsIcon name={name} size={size} color={color} />
      </IconWrapper>
    </ApplyAdditionalCssFeatures>
  );
};

export default Component;

const ApplyAdditionalCssFeatures = styled.View`
  ${({additionalCss}) => additionalCss}
`;
