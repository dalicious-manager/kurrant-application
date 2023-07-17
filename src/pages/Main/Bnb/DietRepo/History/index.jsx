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
  formattedWeekDate,
  toStringByFormatting,
} from '../../../../../utils/dateFormatter';
import {
  addDateInDateRange,
  calcWeekArr,
  extractMonthAndDateFromDate2,
  findIfDateIsInDateRange,
  mondayOfThisWeek,
  sundayOfThisWeek,
} from '../logic';
import {stringDateToJavascriptDate} from '../../../../../utils/dateFormatter';
import {
  modifyEachHistoryListData,
  modifyDateFormatAndValueForHistoryLineChartData,
  modifyDateFormatForStackedBarData,
  sampleStackedBarData1,
} from './logic';
import useGetDietRepo from '../useGetDietRepo';
import LoadingScreen from '~components/LoadingScreen';
import {getStorage, setStorage} from '../../../../../utils/asyncStorage';
import useDietRepoMutation from '../useDietRepoMutation';

export const PAGE_NAME = 'P_MAIN__DIET_REPO__HISTORY';

const Pages = ({route}) => {
  const screenWidth = Dimensions.get('screen').width;

  const [week, setWeek] = useState(
    route?.params?.date
      ? calcWeekArr(stringDateToJavascriptDate(route?.params?.date, '-'))
      : calcWeekArr(new Date()),
  );

  const {historyDataList, isDietRepoHistoryRefetchLoading} = useGetDietRepo(
    undefined,
    undefined,
    undefined,
    toStringByFormatting(week[0]),
    toStringByFormatting(week[6]),
  );

  const {saveMeal, saveMealStatus} = useDietRepoMutation();

  // week 값은 이렇습니다
  // [월요일 자바스크립트 date객체,
  // 화요일 자바스크립트 date객체,
  // 수요일 자바스크립트 date객체,
  // 목요일 자바스크립트 date객체,
  // 금요일 자바스크립트 date객체,
  // 토요일 자바스크립트 date객체,
  // 일요일 자바스크립트 date객체]

  // useEffect(() => {
  //   console.log('week 값');
  //   console.log(week);
  // }, [week]);

  useEffect(() => {
    (async () => {
      // console.log('로컬 지움');
      // await removeItemFromStorage('dietRepoDate');
      // return;

      // console.log('스토리지 확인');
      // console.log('다이어트 레포 확인 ' + (await getStorage(`dietRepoDate`)));

      const dietRepoDate = await getStorage(`dietRepoDate`);

      // console.log('다이어트 데이트');
      // console.log(dietRepoDate);

      if (!dietRepoDate) {
        // console.log('case 1');
        // console.log(formattedWeekDate(mondayOfThisWeek(calcDate(-7, week[0]))));
        // console.log(formattedWeekDate(sundayOfThisWeek(week[0])));
        saveMeal([
          formattedWeekDate(mondayOfThisWeek(calcDate(-7, week[0]))),
          formattedWeekDate(sundayOfThisWeek(week[0])),
        ]);

        // console.log('들어갈 데이터 ');
        // console.log(
        //   formattedWeekDate(mondayOfThisWeek(calcDate(-7, week[0]))).concat(
        //     ', ',
        //     formattedWeekDate(mondayOfThisWeek(week[0])),
        //   ),
        // );

        return setStorage(
          'dietRepoDate',
          // 2주전 월요일 , 이번주 일요일
          formattedWeekDate(mondayOfThisWeek(calcDate(-7, week[0]))).concat(
            ', ',
            formattedWeekDate(mondayOfThisWeek(week[0])),
          ),
        );
      } else {
        if (
          findIfDateIsInDateRange(
            dietRepoDate,
            toStringByFormatting(mondayOfThisWeek(week[0])),
          )
        ) {
          // console.log('case 2');
          return;
        }

        // 없다면 보내주고 추가해야됨
        // console.log('case 3');

        // console.log('들어갈 데이터 ');
        // console.log(toStringByFormatting(week[0]));
        // console.log(
        //   addDateInDateRange(
        //     dietRepoDate,
        //     formattedWeekDate(mondayOfThisWeek(week[0])),
        //   ),
        // );

        // 여기서 부터 밥먹고

        saveMeal([
          formattedWeekDate(mondayOfThisWeek(week[0])),

          formattedWeekDate(sundayOfThisWeek(week[0])),

          () => {
            // 성공하면
            setStorage(
              'dietRepoDate',
              // 2주전 월요일 , 이번주 일요일
              addDateInDateRange(
                dietRepoDate,
                formattedWeekDate(mondayOfThisWeek(week[0])),
              ),
            );
          },
        ]);
      }
    })();
  }, [week[0]]);

  return (
    <>
      <ContainerScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <DateSelectorWrap>
          <CirclePressable
            isClickDisabled={
              week.filter(
                v => toStringByFormatting(v) === route?.params?.pastLimitDate,
              ).length > 0
            }
            onPress={() => {
              if (
                week.filter(
                  v => toStringByFormatting(v) === route?.params?.pastLimitDate,
                ).length > 0
              )
                return;

              setWeek(calcWeekArr(calcDate(-7, week[0])));
            }}>
            <GreyArrowLeftInACircle />
          </CirclePressable>
          <DateSelectorText>
            {`${
              extractMonthAndDateFromDate2(
                toStringByFormatting(week[0]),
                '-',
              )[0]
            }.${
              extractMonthAndDateFromDate2(
                toStringByFormatting(week[0]),
                '-',
              )[1]
            }`}
            ~
            {`${
              extractMonthAndDateFromDate2(
                toStringByFormatting(week[6]),
                '-',
              )[0]
            }.${
              extractMonthAndDateFromDate2(
                toStringByFormatting(week[6]),
                '-',
              )[1]
            }`}
          </DateSelectorText>
          <CirclePressable
            isClickDisabled={
              week.filter(
                v =>
                  toStringByFormatting(v) === toStringByFormatting(new Date()),
              ).length > 0
            }
            onPress={() => {
              if (
                week.filter(
                  v =>
                    toStringByFormatting(v) ===
                    toStringByFormatting(new Date()),
                ).length > 0
              )
                return;

              setWeek(calcWeekArr(calcDate(7, week[0])));
            }}>
            <GreyArrowRightInACircle />
          </CirclePressable>
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

          data={modifyDateFormatForStackedBarData(
            modifyEachHistoryListData(historyDataList, week),
          )}
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

          data={modifyDateFormatAndValueForHistoryLineChartData(
            modifyEachHistoryListData(historyDataList, week),
          )}
          title="칼로리"
          width={'100%'}
        />
        <GreyBlock width={screenWidth} />

        <HistoryTables data={historyDataList} />
        <Filler />
      </ContainerScrollView>
      {isDietRepoHistoryRefetchLoading && <LoadingScreen />}
    </>
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

const CirclePressable = styled(Pressable)`
  opacity: ${({isClickDisabled}) => (isClickDisabled ? 0.3 : 1)};
`;

const CircleRightClick = styled(GreyArrowRightInACircle)``;
