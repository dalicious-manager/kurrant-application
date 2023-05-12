import {Text} from 'react-native';
import styled from 'styled-components';
import LineChart from '../Chart/LineChart';
import HistoryLineChart from './HistoryChart.jsx/HistoryLineChart';
import HistoryStackedBarChart from './HistoryChart.jsx/HistoryStackedBarChart';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__HISTORY';

const Pages = () => {
  return (
    <Container>
      <HistoryStackedBarChart title="영양소 정보" width={'100%'} />
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
