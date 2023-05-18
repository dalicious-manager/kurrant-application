import {Dimensions, Pressable, Text} from 'react-native';
import styled from 'styled-components';

import HistoryLineChart from './HistoryChart/HistoryLineChart';
import HistoryStackedBarChart from './HistoryChart/HistoryStackedBarChart';
import HistoryTables from './HistoryTables/HistoryTables';

import Typography from '~components/Typography';
import {
  GreyArrowLeftInACircle,
  GreyArrowRightInACircle,
} from '../../../../../components/Icon';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__HISTORY';

const Pages = () => {
  const screenWidth = Dimensions.get('screen').width;

  const TablesSampleData = [
    {
      date: '05.08',
      cal: 2100,
      carbo: 400,
      protein: 40,
      fat: 45,
    },

    {
      date: '05.09',
      cal: 2100,
      carbo: 400,
      protein: 40,
      fat: 45,
    },

    {
      date: '05.10',
      cal: 2100,
      carbo: 400,
      protein: 40,
      fat: 45,
    },

    {
      date: '05.11',
      cal: 2000,
      carbo: 300,
      protein: 30,
      fat: 45,
    },
  ];

  return (
    <ContainerScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
      }}>
      <DateSelectorWrap>
        <Pressable onPress={() => {}}>
          <GreyArrowLeftInACircle />
        </Pressable>
        <DateSelectorText>
          {'05.08'} ~ {'05.14'}
        </DateSelectorText>
        <Pressable onPress={() => {}}>
          <GreyArrowRightInACircle />
        </Pressable>
      </DateSelectorWrap>

      <HistoryStackedBarChart title="영양소 정보" width={'100%'} />

      <HistoryLineChart title="칼로리" width={'100%'} />
      <GreyBlock width={screenWidth} />

      <HistoryTables data={TablesSampleData} />
      <Filler />
    </ContainerScrollView>
  );
};
export default Pages;

const ContainerScrollView = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;

  padding: 0px 24px;
`;

const GreyBlock = styled.View`
  width: ${({width}) => width}px;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  margin-top: 24px;
`;
const Filler = styled.View`
  width: 100%;
  height: 48px;
`;

const DateSelectorWrap = styled.View`
  flex-direction: row;

  align-items: center;
`;

const DateSelectorText = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin: 24px 16px;
`;
