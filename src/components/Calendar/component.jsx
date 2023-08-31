/* eslint-disable react-hooks/rules-of-hooks */
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useAtomValue} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import PagerView from 'react-native-pager-view';
import styled from 'styled-components/native';

import {getCircleColor, getTodayColor, getFontStyle} from './style';
import {weekAtom} from '../../biz/useBanner/store';
import {calculateSelectDatePosition} from '../../biz/useDailyFood/logic';
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
  const [currentPress, setCurrentPress] = useState(selectDate);
  const [chk, setChk] = useState(0);

  const selectedPress = day => {
    setCurrentPress(day);
  };
  //console.log(sliderValue, '슬라이드');

  const onPageScroll = e => {
    const {position} = e.nativeEvent;
    setChk(position);
  };

  ///// 여기부터 재신 코드
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    // '첫 렌더시 해당 날짜로 위치하게 하기'
    if (selectDate && isMount) {
      pager.current?.setPage(calculateSelectDatePosition(selectDate, weekly));
      setIsMount(false);
    }
    setCurrentPress(selectDate);
  }, [selectDate, weekly, isMount, setIsMount]);

  /////// 끝

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
                  const pressDay = formattedDate(day);
                  const propsDay = formattedWeekDate(day);
                  const lastDay =
                    formattedDate(day, '/') < formattedDate(today, '/');
                  const order = meal?.filter(x => x.serviceDate === propsDay);
                  const set = new Set(order?.map(x => x.diningType));
                  const orderCount = [...set].length;
                  // const morningServiceDays = isServiceDays?.filter(v => {
                  //   return v.diningType === 1;
                  // });
                  // const lunchServiceDays = isServiceDays?.filter(v => {
                  //   return v.diningType === 2;
                  // });
                  // const dinnerServiceDays = isServiceDays?.filter(v => {
                  //   return v.diningType === 3;
                  // });
                  // // 서비스일
                  // const morning =
                  //   (morningServiceDays &&
                  //     morningServiceDays?.length > 1 &&
                  //     morningServiceDays[0]?.serviceDays?.includes(txt)) ||
                  //   false;
                  // const lunch =
                  //   (lunchServiceDays &&
                  //     lunchServiceDays?.length > 0 &&
                  //     lunchServiceDays[0]?.serviceDays?.includes(txt)) ||
                  //   false;
                  // const dinner =
                  //   (dinnerServiceDays &&
                  //     dinnerServiceDays?.length > 0 &&
                  //     dinnerServiceDays[0]?.serviceDays?.includes(txt)) ||
                  //   false;

                  const events = () => {
                    selectedPress(day);
                    onPressEvent2(propsDay);
                  };
                  return (
                    <DaysWrap
                      key={day}
                      idx={idx}
                      disabled={lastDay && true}
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
                      <Day lastDay={lastDay} color={color} size={size}>
                        {txt}
                      </Day>
                      <TodayCircle
                        now={now}
                        type={type}
                        currentPress={currentPress}
                        day={day}>
                        <Day
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
  ${({type, now}) => now && getCircleColor(type)};
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
  color: ${({lastDay, theme, morning, lunch, dinner}) =>
    lastDay
      ? theme.colors.grey[5]
      : morning || lunch || dinner
      ? theme.colors.grey[2]
      : theme.colors.grey[2]};
  ${({color, now}) => now && getTodayColor(color)};
  ${({size}) => getFontStyle(size)};
`;
