import React from 'react';
import styled from 'styled-components/native';

import BidRowGraph from './_components/BidRowGraph';
import BidRowPercentage from './_components/BidRowPercentage';
import {getTypeColorWithVisual} from './styles';

/**
 *
 * @param {object} props
 * @param {'selling' | 'buying'} props.type
 * @param {'graph' | 'percentage'} props.visual
 * @param {object} props.info
 * @param {string} props.info.left.top
 * @param {string} props.info.left.bottom
 * @param {string} props.info.left.unit
 * @param {string} props.info.right.currentValue
 * @param {string} props.info.right.maxValue
 * @param {string} props.info.right.percentage
 * @param {string} props.info.right.total
 * @returns
 */
const Component = ({type, visual, info, ...rest}) => {
  // Variables
  // @ Align
  const alignVisualContainer = visual === 'graph' ? 'flex-start' : 'center';
  const alignInfoContainer = visual === 'graph' ? 'flex-start' : 'flex-end';
  // @ Color
  const colors = getTypeColorWithVisual(type, visual);
  // @ Verify
  const isNeedGraph = visual === 'graph';

  // Render
  return (
    <Container bgColor={colors.backgroundColor}>
      {isNeedGraph && (
        <BidRowGraph
          alignVisualContainer={alignVisualContainer}
          alignInfoContainer={alignInfoContainer}
          colors={colors}
          info={info}
          {...rest}
        />
      )}
      {!isNeedGraph && (
        <BidRowPercentage
          alignVisualContainer={alignVisualContainer}
          alignInfoContainer={alignInfoContainer}
          colors={colors}
          info={info}
          {...rest}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  max-width: 140px;
  height: 36px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({bgColor}) => bgColor};
`;

export default Component;
