import styled from 'styled-components';

import Typography from '~components/Typography';
import LineChart from '../../Chart/LineChart';

const HistoryLineChart = ({
  width = '100%',
  height = '250px',

  title,
}) => {
  return (
    <Container width={width} height={height}>
      <Title>{title}</Title>
      <LineChart
        dataBasic={[
          {x: '10일', y: 20},
          {x: '11일', y: 120},
          {x: '12일', y: 320},
          {x: '13일', y: 220},
          {x: '14일', y: 410},
          {x: '15일', y: 11010},
          {x: '16일', y: 210},
        ]}
      />
    </Container>
  );
};

export default HistoryLineChart;

const Container = styled.View`
  width: ${({width}) => width};
  height: ${({height}) => height};
  border: 1px solid black;
`;

const Title = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
