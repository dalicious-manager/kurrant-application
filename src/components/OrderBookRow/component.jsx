import React from 'react';
import styled from 'styled-components/native';

import {getTypeColor} from './styles';
import Typography from '../Typography';
/**
 *
 * @param {object} props
 * @param {'selling' | 'buying'} props.type
 * @param {number} props.amount
 * @param {number} props.count
 * @param {string} props.unit
 * @param {number} props.graphMaxValue
 * @param {number} props.graphCurrentValue
 * @returns
 */
const Component = ({
  type,
  amount,
  count,
  unit,
  graphMaxValue,
  graphCurrentValue,
}) => {
  // Calculate

  // mock expression : current : max = x : 100
  const lengthRate = Math.floor((graphCurrentValue * 100) / graphMaxValue);

  // Variables
  const typeColor = getTypeColor(type);
  const graphAlign = type === 'sell' ? 'flex-end' : 'flex-start';

  return (
    <Container bgColor={typeColor.backgroundColor}>
      <InfoContainer>
        <Typography variant="h400" weight="R" textColor={typeColor.font}>
          {count}
        </Typography>
        <Typography
          variant="h400"
          weight="R"
          textColor={typeColor.font}>{`${amount} ${unit}`}</Typography>
      </InfoContainer>
      <GraphContainer bgColor={typeColor.backgroundColor} align={graphAlign}>
        <RemainBar lengthRate={lengthRate} bgColor={typeColor.bar} />
        <RemainBarText variant="h300" weight="R">
          {graphCurrentValue}
        </RemainBarText>
      </GraphContainer>
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

const InfoContainer = styled.View`
  width: 50%;
  height: 100%;
  padding: 1px 0;
  align-items: flex-end;
`;

const GraphContainer = styled.View`
  position: relative;
  width: 50%;
  height: 100%;
  align-items: ${({align}) => align};
  justify-content: center;
  padding-left: 4px;
`;

const RemainBar = styled.View`
  height: 50%;
  justify-content: center;
  width: ${({lengthRate}) => lengthRate || 0}%;
  ${({bgColor}) => bgColor};
`;

const RemainBarText = styled(Typography)`
  width: 100%;
  position: absolute;
  align-self: center;
  padding-left: 4px;
`;

export default Component;
