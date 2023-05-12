import {Text} from 'react-native';
import styled from 'styled-components';
import LineChart from '../Chart/LineChart';
import HistoryLineChart from './HistoryChart.jsx/HistoryLineChart';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__HISTORY';

const Pages = () => {
  return (
    <Container>
      <Text>다이어트 레포</Text>
      <HistoryLineChart title="칼로리" width={'100%'} />
    </Container>
  );
};
export default Pages;

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  padding: 0px 24px;
`;
