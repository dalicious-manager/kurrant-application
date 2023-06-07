import {useNavigation} from '@react-navigation/native';
import {
  addDays,
  eachWeekOfInterval,
  subDays,
  eachDayOfInterval,
  format,
  daysInYear,
} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useAtom, useAtomValue} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, View, Text} from 'react-native';
import PagerView from 'react-native-pager-view';
import styled, {css} from 'styled-components/native';

import {weekAtom} from '~biz/useBanner/store';

import {calculateSelectDatePosition} from '~biz/useDailyFood/logic';

import {PAGE_NAME as MealMainPageName} from '~pages/Main/Bnb/Meal/Main';
import {formattedDate, formattedWeekDate} from '~utils/dateFormatter';
import Button from '~components/CalendarButton';
import Typography from '~components/Typography';
import {getFontStyle} from '~components/BuyCalendar/style';
import {useGetOrderMeal} from '~hook/useOrder';
import {
  calcDate,
  stringDateToJavascriptDate,
  toStringByFormatting,
} from '../../../../../utils/dateFormatter';
import {makeDietRepoCalendarDateArr} from './logic';

/**
 *
 * @param {} props
 * @param { 'grey2' | 'grey7' } props.type
 * @param { 'grey2' | 'white' } props.color
 * @param { 'Body05R' | 'Body06R'} props.size
 * @returns
 */

const DietRepoCalendar = ({
  BooleanValue,
  type = 'grey7',
  color = 'grey2',
  size = 'Body06R',
  onPressEvent,
  onPressEvent2,

  onPageScroll2,
  selectDate,
  meal,
  pagerRef,
  margin = '0px',
  sliderValue,
  isServiceDays,
}) => {
  const navigation = useNavigation();
  const pager = pagerRef ? pagerRef : useRef();
  const today = new Date();
  const weekly = useAtomValue(weekAtom);
  // const {isOrderMeal, orderMeal} = useOrderMeal();
  //   const {data: isOrderMeal, refetch: orderMealRefetch} = useGetOrderMeal(
  //     formattedWeekDate(weekly[0][0]),
  //     formattedWeekDate(
  //       weekly[weekly.length - 1][weekly[weekly.length - 1].length - 1],
  //     ),
  //   );

  const isOrderMeal = undefined;

  const [currentPress, setCurrentPress] = useState(selectDate);
  const [chk, setChk] = useState(0);

  const morningServiceDays = isServiceDays?.morningServiceDays;
  const lunchServiceDays = isServiceDays?.lunchServiceDays;
  const dinnerServiceDays = isServiceDays?.dinnerServiceDays;

  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    console.log('calendarDate ');
    console.log(calendarDate);
  }, [calendarDate]);

  // useEffect(() => {
  //   console.log('chk fffå');
  //   console.log(chk);
  // }, [chk]);

  // 스크롤 되면 데이터 새로 만들게하기

  const selectedPress = day => {
    setCurrentPress(day);
  };

  const [isMount, setIsMount] = useState(true);

  // useEffect(() => {
  //   setIsMount(true);
  // }, []);

  // useEffect(() => {
  //   // '첫 렌더시 해당 날짜로 위치하게 하기'

  //   console.log('isMount');
  //   console.log(isMount);

  //   if (isMount) {
  //     setTimeout(() => {
  //       pager.current.setPage(1);
  //       setChk(1);
  //       setIsMount(false);
  //     }, 100);
  //   }

  //   setCurrentPress(selectDate);
  //   }, [selectDate, weekly, isMount, setIsMount]);

  useEffect(() => {
    setTimeout(() => {
      pager.current.setPage(2);
      setChk(2);
      setIsMount(false);
    }, 100);
  }, []);

  useEffect(() => {
    console.log('isMount');
    console.log(isMount);
  }, [isMount]);

  // useEffect(() => {
  //   console.log('chk ' + chk);
  // }, [chk]);

  useEffect(() => {
    console.log(makeDietRepoCalendarDateArr(calendarDate));
  }, [calendarDate]);

  return (
    <React.Fragment>
      {BooleanValue ? <Button pager={pager} daily chk={chk} /> : <></>}

      <PagerViewWrap
        ref={pager}
        initialPage={2}
        pageMargin={22}
        onPageScroll={e => {}}
        onPageSelected={e => {
          const {position} = e.nativeEvent;
          console.log('스크롤 중임 ' + position);

          // 지금 문제가 첫 렌더링때 이게 되버림

          // 뒤로 가기 , 앞으로 가기

          if (isMount) return false;

          if (chk > position) {
            //뒤로가기

            setCalendarDate(calcDate(-7, calendarDate));
            pager.current.setPageWithoutAnimation(2);
            setChk(2);
          } else if (chk < position) {
            // 앞으로 가기

            setCalendarDate(calcDate(7, calendarDate));
            pager.current.setPageWithoutAnimation(2);
            setChk(2);
          } else {
          }

          // if (chk > position) {
          //   // 뒤로 가기
          //   console.log('뒤로가기');
          //   console.log(chk);
          //   console.log(position);
          //   console.log(toStringByFormatting(calendarDate));
          //   console.log('------');
          //   setCalendarDate(calcDate(-7, calendarDate));
          // } else if (chk < position) {
          //   console.log('앞으로가기');
          //   console.log(chk);
          //   console.log(position);
          //   console.log(toStringByFormatting(calendarDate));
          //   console.log('------');
          //   setCalendarDate(calcDate(7, calendarDate));
          // } else {
          //   console.log('chk === position');
          //   console.log(chk);
          //   console.log(position);
          //   console.log(toStringByFormatting(calendarDate));
          // }
          // pager.current.setPageWithoutAnimation(1);
          // setChk(1);
        }}
        margins={margin}>
        {[
          // [
          //   stringDateToJavascriptDate('2023-04-30', '-'),
          //   stringDateToJavascriptDate('2023-05-01', '-'),
          //   stringDateToJavascriptDate('2023-05-02', '-'),
          //   stringDateToJavascriptDate('2023-05-03', '-'),
          //   stringDateToJavascriptDate('2023-05-04', '-'),
          //   stringDateToJavascriptDate('2023-05-05', '-'),
          //   stringDateToJavascriptDate('2023-05-06', '-'),
          // ],
          // [
          //   stringDateToJavascriptDate('2023-05-07', '-'),
          //   stringDateToJavascriptDate('2023-05-08', '-'),
          //   stringDateToJavascriptDate('2023-05-09', '-'),
          //   stringDateToJavascriptDate('2023-05-10', '-'),
          //   stringDateToJavascriptDate('2023-05-11', '-'),
          //   stringDateToJavascriptDate('2023-05-12', '-'),
          //   stringDateToJavascriptDate('2023-05-13', '-'),
          // ],
          // [
          //   stringDateToJavascriptDate('2023-05-14', '-'),
          //   stringDateToJavascriptDate('2023-05-15', '-'),
          //   stringDateToJavascriptDate('2023-05-16', '-'),
          //   stringDateToJavascriptDate('2023-05-17', '-'),
          //   stringDateToJavascriptDate('2023-05-18', '-'),
          //   stringDateToJavascriptDate('2023-05-19', '-'),
          //   stringDateToJavascriptDate('2023-05-20', '-'),
          // ],
          ...makeDietRepoCalendarDateArr(calendarDate),
        ].map((week, i) => {
          return (
            <View key={i}>
              <Wrap>
                {week.map((day, idx) => {
                  const txt = format(day, 'EEE', {locale: ko});
                  //ㄱconsole.log(txt, 'day');
                  const now = formattedDate(day) === formattedDate(today);
                  const pressDay = formattedDate(day);
                  const propsDay = formattedWeekDate(day);
                  const lastDay =
                    formattedDate(day, '/') > formattedDate(today, '/');
                  const order = isOrderMeal?.data?.filter(
                    x => x.serviceDate === propsDay,
                  );
                  const set = new Set(order?.map(x => x.diningType));

                  const orderCount = [...set].length;

                  // 서비스일
                  const morning =
                    (sliderValue === 0 && morningServiceDays?.includes(txt)) ||
                    morningServiceDays?.includes(txt);
                  const lunch =
                    (sliderValue === 1 && lunchServiceDays?.includes(txt)) ||
                    lunchServiceDays?.includes(txt);
                  const dinner =
                    (sliderValue === 2 && dinnerServiceDays?.includes(txt)) ||
                    dinnerServiceDays?.includes(txt);

                  const events = () => {
                    // 클릭콜백 여기
                    console.log('날짜 누름');
                    console.log(day);
                    console.log(propsDay);
                    selectedPress(day);
                    onPressEvent2(propsDay);
                  };
                  return (
                    <DaysWrap
                      key={day}
                      idx={idx}
                      disabled={
                        (lastDay && true) ||
                        morning === false ||
                        lunch === false ||
                        dinner === false
                      }
                      onPress={() => {
                        events();
                      }}>
                      <DayWeek
                        lastDay={lastDay}
                        color={color}
                        size={size}
                        morning={morning}
                        lunch={lunch}
                        now={now}
                        dinner={dinner}>
                        {now ? '오늘' : txt}
                      </DayWeek>
                      <TodayCircle
                        now={now}
                        type={type}
                        currentPress={currentPress}
                        day={day}>
                        <Day
                          morning={morning}
                          lunch={lunch}
                          dinner={dinner}
                          color={color}
                          lastDay={lastDay}
                          now={now}
                          size={size}>
                          {day.getDate()}
                        </Day>
                      </TodayCircle>
                      {order && (
                        <DotWrap>
                          {Array.from(Array(orderCount), (x, idx) => (
                            <Dot key={idx} lastDay={lastDay} />
                          ))}
                        </DotWrap>
                      )}
                    </DaysWrap>
                  );
                })}
              </Wrap>
            </View>
          );
        })}

        {/* <View>
          <Wrap>
            {[
              stringDateToJavascriptDate('2023-05-14', '-'),
              stringDateToJavascriptDate('2023-05-15', '-'),
              stringDateToJavascriptDate('2023-05-16', '-'),
              stringDateToJavascriptDate('2023-05-17', '-'),
              stringDateToJavascriptDate('2023-05-18', '-'),
              stringDateToJavascriptDate('2023-05-19', '-'),
              stringDateToJavascriptDate('2023-05-20', '-'),
            ].map((day, idx) => {
              console.log('day 데이터 확인');
              console.log(day);

              const txt = format(day, 'EEE', {locale: ko});
              //ㄱconsole.log(txt, 'day');
              const now = formattedDate(day) === formattedDate(today);
              const propsDay = formattedWeekDate(day);
              const lastDay =
                formattedDate(day, '/') < formattedDate(today, '/');
              const order = isOrderMeal?.data?.filter(
                x => x.serviceDate === propsDay,
              );
              const set = new Set(order?.map(x => x.diningType));

              const orderCount = [...set].length;

              // 서비스일
              const morning =
                (sliderValue === 0 && morningServiceDays?.includes(txt)) ||
                morningServiceDays?.includes(txt);
              const lunch =
                (sliderValue === 1 && lunchServiceDays?.includes(txt)) ||
                lunchServiceDays?.includes(txt);
              const dinner =
                (sliderValue === 2 && dinnerServiceDays?.includes(txt)) ||
                dinnerServiceDays?.includes(txt);

              const events = () => {
                selectedPress(day);
                onPressEvent2(propsDay);
              };
              return (
                <DaysWrap
                  key={day}
                  idx={idx}
                  disabled={
                    (lastDay && true) ||
                    morning === false ||
                    lunch === false ||
                    dinner === false
                  }
                  onPress={() => {}}>
                  <DayWeek
                    lastDay={lastDay}
                    color={color}
                    size={size}
                    morning={morning}
                    lunch={lunch}
                    now={now}
                    dinner={dinner}>
                    {now ? '오늘' : txt}
                  </DayWeek>
                  <TodayCircle
                    now={now}
                    type={type}
                    currentPress={currentPress}
                    day={day}>
                    <Day
                      morning={morning}
                      lunch={lunch}
                      dinner={dinner}
                      color={color}
                      lastDay={lastDay}
                      now={now}
                      size={size}>
                      {day.getDate()}
                    </Day>
                  </TodayCircle>
                  {order && (
                    <DotWrap>
                      {Array.from(Array(orderCount), (x, idx) => (
                        <Dot key={idx} lastDay={lastDay} />
                      ))}
                    </DotWrap>
                  )}
                </DaysWrap>
              );
            })}
          </Wrap>
        </View> */}
      </PagerViewWrap>
    </React.Fragment>
  );
};

export default DietRepoCalendar;

const PagerViewWrap = styled(PagerView)`
  flex: 1;
  margin: ${({margins}) => margins && margins};
`;

const Wrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0px;
`;

const DaysWrap = styled.Pressable`
  /* padding-left: 10px;
padding-right: 10px; */
  padding-left: ${({idx}) => (idx === 0 ? '0px' : '6px')};
  padding-right: ${({idx}) => (idx === 6 ? '0px' : '6px')};
  align-items: center;
  border: 1px solid black;
`;

const TodayCircle = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 50px;
  margin-top: 3px;
  align-items: center;
  justify-content: center;
  background-color: ${({currentPress, day, pressDay}) =>
    formattedDate(currentPress) === formattedDate(day) ? '#E4E3E7' : 'white'};
`;

const DotWrap = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Dot = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 50px;
  background-color: ${({theme, lastDay}) =>
    lastDay ? theme.colors.grey[5] : theme.colors.grey[2]};
  margin: 4px 2px 0px 2px;
`;

const Day = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({lastDay, theme, morning, lunch, dinner, now}) =>
    lastDay
      ? theme.colors.grey[5]
      : morning || lunch || dinner
      ? theme.colors.grey[2]
      : theme.colors.grey[5]};
  ${({size}) => getFontStyle(size)};
`;
const DayWeek = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({lastDay, theme, morning, lunch, dinner, now}) =>
    lastDay
      ? theme.colors.grey[5]
      : morning || lunch || dinner
      ? now
        ? theme.colors.yellow[500]
        : theme.colors.grey[2]
      : theme.colors.grey[5]};

  ${({size}) => getFontStyle(size)};
`;
