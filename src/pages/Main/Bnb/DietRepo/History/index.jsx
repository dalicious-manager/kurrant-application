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
import {useEffect, useState} from 'react';

import {
  calcDate,
  toStringByFormatting,
} from '../../../../../utils/dateFormatter';
import {calcWeekArr, extractMonthAndDateFromDate2} from '../logic';
import {stringDateToJavascriptDate} from '../../../../../utils/dateFormatter';
import {
  modifyHistoryLineChartData,
  modifyStackedBarData,
  sampleStackedBarData1,
} from './logic';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__HISTORY';

const Pages = ({route}) => {
  const screenWidth = Dimensions.get('screen').width;

  const [date, setDate] = useState(route?.params?.date);

  // week 값은 이렇습니다
  // [월요일 자바스크립트 date객체,
  // 화요일 자바스크립트 date객체,
  // 수요일 자바스크립트 date객체,
  // 목요일 자바스크립트 date객체,
  // 금요일 자바스크립트 date객체,
  // 토요일 자바스크립트 date객체,
  // 일요일 자바스크립트 date객체]

  const [week, setWeek] = useState(
    route?.params?.date
      ? calcWeekArr(stringDateToJavascriptDate(route?.params?.date, '-'))
      : calcWeekArr(new Date()),
  );

  // params에 date가 들어갈때 그 일주일을 계산하기

  // useEffect(() => {
  //   console.log('date');
  //   console.log(date);
  // }, [date]);

  // useEffect(() => {
  //   console.log('주');
  //   console.log(week);

  //   console.log(toStringByFormatting(week[0]));
  //   console.log(
  //     extractMonthAndDateFromDate2(toStringByFormatting(week[0]), '-'),
  //   );
  // }, [week]);

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
        <Pressable
          onPress={() => {
            console.log(calcDate(-7, week[0]));
            setWeek(calcWeekArr(calcDate(-7, week[0])));
          }}>
          <GreyArrowLeftInACircle />
        </Pressable>
        <DateSelectorText>
          {`${
            extractMonthAndDateFromDate2(toStringByFormatting(week[0]), '-')[0]
          }.${
            extractMonthAndDateFromDate2(toStringByFormatting(week[0]), '-')[1]
          }`}
          ~
          {`${
            extractMonthAndDateFromDate2(toStringByFormatting(week[6]), '-')[0]
          }.${
            extractMonthAndDateFromDate2(toStringByFormatting(week[6]), '-')[1]
          }`}
        </DateSelectorText>
        <Pressable
          onPress={() => {
            setWeek(calcWeekArr(calcDate(7, week[0])));
          }}>
          <GreyArrowRightInACircle />
        </Pressable>
      </DateSelectorWrap>

      <HistoryStackedBarChart
        // data={[
        //   {x: '06월', carbohydrate: 120, protein: 240, fat: 60},
        //   {x: '07월', carbohydrate: 220, protein: 140, fat: 160},
        //   {x: '08월', carbohydrate: 320, protein: 50, fat: 90},
        //   {x: '09월', carbohydrate: 100, protein: 30, fat: 190},
        //   {x: '10월', carbohydrate: 220, protein: 50, fat: 90},
        //   {x: '11월', carbohydrate: 0, protein: 0, fat: 0},
        //   {x: '12월', carbohydrate: 520, protein: 75, fat: 0},
        // ]}
        data={modifyStackedBarData(sampleStackedBarData1)}
        dataOrder={['carbohydrate', 'protein', 'fat']}
        colorSetting={{
          carbohydrate: '#4F6FDF',
          protein: '#819DFF',
          fat: '#C8D4FF',
        }}
        title="영양소 정보"
        width={'100%'}
      />

      <HistoryLineChart
        // data={[
        //   {x: '10일', y: 820},
        //   {x: '11일', y: 120},
        //   {x: '12일', y: 1220},
        //   {x: '13일', y: 220},
        //   {x: '14일', y: 1410},
        //   {x: '15일', y: 610},
        //   {x: '오늘', y: 2100},
        // ]}
        data={modifyHistoryLineChartData(sampleStackedBarData1)}
        title="칼로리"
        width={'100%'}
      />
      <GreyBlock width={screenWidth} />

      <HistoryTables data={sampleStackedBarData1} />
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
