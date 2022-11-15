import React from 'react';
import styled from 'styled-components/native';

import Typography from '../../Typography';
/**
 *
 * @param {object} props
 * @param {string} props.alignVisualContainer
 * @param {string} props.alignInfoContainer
 * @param {object} props.colors
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
const Component = ({
  info,
  alignVisualContainer,
  alignInfoContainer,
  colors,
  ...rests
}) => {
  // Variables
  // @ Calculate : current : max = x : 100
  const percentage = Math.floor(
    (info.right.currentValue / info.right.total) * 100,
  );
  // @ Color
  const isPositive = percentage >= 0;
  const dataColor = isPositive ? colors.up : colors.down;
  // @ Data
  const data = {
    value: percentage,
    formatting: percentage.toFixed(2) + '%',
  };
  // Render
  return (
    <>
      <InfoContainer alignInfoContainer={alignInfoContainer}>
        <Typography variant="h400" weight="R" textColor={dataColor}>
          {info.left.top}
        </Typography>
        <Typography variant="h400" weight="R" textColor={colors.normal}>
          {`${info.left.bottom} ${info.left.unit}`}
        </Typography>
      </InfoContainer>
      <VisualContainer
        bgColor={colors.backgroundColor}
        alignVisualContainer={alignVisualContainer}>
        <RemainBarText variant="h400" weight="R" textColor={dataColor}>
          {data.formatting}
        </RemainBarText>
      </VisualContainer>
    </>
  );
};

const InfoContainer = styled.View`
  width: 60%;
  height: 100%;
  padding: 1px 0 0 4px;
  align-items: ${({alignInfoContainer}) => alignInfoContainer};
`;

const VisualContainer = styled.View`
  position: relative;
  width: 40%;
  height: 100%;
  align-items: flex-end;
  justify-content: ${({alignVisualContainer}) => alignVisualContainer};
  padding-left: 8px;
`;

const RemainBarText = styled(Typography)`
  width: 100%;
  align-self: center;
  padding-left: 1px;
`;

export default Component;
