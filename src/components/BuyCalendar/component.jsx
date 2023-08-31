/* eslint-disable react-hooks/rules-of-hooks */
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useAtomValue} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import PagerView from 'react-native-pager-view';
import styled from 'styled-components/native';

import {getFontStyle} from './style';
import {weekAtom} from '../../biz/useBanner/store';
import {calculateSelectDatePosition} from '../../biz/useDailyFood/logic';
import {useGetOrderMeal} from '../../hook/useOrder';
import {PAGE_NAME as MealMainPageName} from '../../pages/Main/Bnb/Meal/Main';
import {formattedDate, formattedWeekDate} from '../../utils/dateFormatter';
import Button from '../CalendarButton';
import Typography from '../Typography';

/**
 *
 * @param {} props
 * @param { 'grey2' | 'grey7' } props.type
 * @param { 'grey2' | 'white' } props.color
 * @param { 'Body05R' | 'Body06R'} props.size
 * @returns
 */

const Component = ({
  BooleanValue,
  type = 'grey7',
  color = 'grey2',
  size = 'Body06R',
  onPressEvent,
  onPressEvent2,
  onPressEvent3,
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
  const {data: isOrderMeal, refetch: orderMealRefetch} = useGetOrderMeal(
    formattedWeekDate(weekly[0][0]),
    formattedWeekDate(
      weekly[weekly.length - 1][weekly[weekly.length - 1].length - 1],
    ),
  );
  const [currentPress, setCurrentPress] = useState(selectDate);
  const [chk, setChk] = useState(0);

  const selectedPress = day => {
    setCurrentPress(day);
  };

  const onPageScroll = e => {
    const {position} = e.nativeEvent;
    setChk(position);
  };

  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    // '첫 렌더시 해당 날짜로 위치하게 하기'
    if (selectDate && isMount) {
      setTimeout(() => {
        pager?.current?.setPage(
          calculateSelectDatePosition(selectDate, weekly),
        );
      }, 100);
      setChk(calculateSelectDatePosition(selectDate, weekly));
      setIsMount(false);
    }
    setCurrentPress(selectDate);
  }, [selectDate, weekly, isMount, setIsMount]);

  return (
    <React.Fragment>
      {BooleanValue ? <Button pager={pager} daily chk={chk} /> : <></>}

      <PagerViewWrap
        ref={pager}
        initialPage={0}
        pageMargin={22}
        onPageScroll={e => {
          if (onPageScroll2) onPageScroll2(e);
          onPageScroll(e);
        }}
        margins={margin}>
        {weekly.map((week, i) => {
          return (
            <View key={i}>
              <Wrap>
                {week.map((day, idx) => {
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
                  const morningServiceDays = isServiceDays?.filter(v => {
                    return v.diningType === 1;
                  });
                  const lunchServiceDays = isServiceDays?.filter(v => {
                    return v.diningType === 2;
                  });
                  const dinnerServiceDays = isServiceDays?.filter(v => {
                    return v.diningType === 3;
                  });
                  // 서비스일
                  const morning =
                    (morningServiceDays &&
                      morningServiceDays?.length > 1 &&
                      morningServiceDays[0]?.serviceDays?.includes(txt)) ||
                    false;
                  const lunch =
                    (lunchServiceDays &&
                      lunchServiceDays?.length > 0 &&
                      lunchServiceDays[0]?.serviceDays?.includes(txt)) ||
                    false;
                  const dinner =
                    (dinnerServiceDays &&
                      dinnerServiceDays?.length > 0 &&
                      dinnerServiceDays[0]?.serviceDays?.includes(txt)) ||
                    false;

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
                        (morning === false &&
                          lunch === false &&
                          dinner === false)
                      }
                      onPress={() => {
                        onPressEvent
                          ? navigation.reset({
                              routes: [
                                {
                                  name: MealMainPageName,
                                  params: {data: propsDay},
                                },
                              ],
                            })
                          : onPressEvent2 && events();
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
      </PagerViewWrap>
    </React.Fragment>
  );
};

export default Component;

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
