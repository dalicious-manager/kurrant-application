/* eslint-disable react-hooks/rules-of-hooks */
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useAtom, useAtomValue} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useTheme} from 'styled-components';
import styled, {css} from 'styled-components/native';

import {getFontStyle} from './style';
import {weekAtom, weekServiceAtom} from '../../biz/useBanner/store';
import {calculateSelectDatePosition} from '../../biz/useDailyFood/logic';
import {useGetOrderMeal} from '../../hook/useOrder';
import {PAGE_NAME as MealMainPageName} from '../../pages/Main/Bnb/Meal/Main';
import {formattedDate, formattedWeekDate} from '../../utils/dateFormatter';
import Button from '../CalendarButton';
import Typography from '../Typography';
import {textStyles} from '../Typography/styles';

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
  nowPage,
  isDiningTypes,
  isServiceDays,
}) => {
  const navigation = useNavigation();
  const pager = pagerRef ? pagerRef : useRef();
  const today = new Date();
  const weekly = useAtomValue(weekAtom);
  const themeApp = useTheme();
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

  ///// 여기부터 재신 코드
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    // '첫 렌더시 해당 날짜로 위치하게 하기'
    if (selectDate && isMount) {
      setTimeout(() => {
        pager.current?.setPage(calculateSelectDatePosition(selectDate, weekly));
      }, 100);
      setChk(calculateSelectDatePosition(selectDate, weekly));
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
                  const now = formattedDate(day) === formattedDate(today);
                  const propsDay = formattedWeekDate(day);
                  const lastDay =
                    formattedDate(day, '/') < formattedDate(today, '/');
                  const order = isOrderMeal?.data?.filter(
                    x => x.serviceDate === propsDay,
                  );
                  const isMorning = order?.filter(f => f.diningType === '아침');
                  const isLunch = order?.filter(f => f.diningType === '점심');
                  const isDinner = order?.filter(f => f.diningType === '저녁');
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
                    (nowPage === 1 &&
                      morningServiceDays &&
                      morningServiceDays?.length > 1 &&
                      morningServiceDays[0]?.serviceDays?.includes(txt)) ||
                    false;
                  const lunch =
                    (nowPage === 2 &&
                      lunchServiceDays &&
                      lunchServiceDays?.length > 0 &&
                      lunchServiceDays[0]?.serviceDays?.includes(txt)) ||
                    false;
                  const dinner =
                    (nowPage === 3 &&
                      dinnerServiceDays &&
                      dinnerServiceDays?.length > 0 &&
                      dinnerServiceDays[0]?.serviceDays?.includes(txt)) ||
                    false;
                  const events = () => {
                    console.log(day, propsDay);
                    selectedPress(day);
                    onPressEvent2(propsDay);
                  };
                  const getDates = () => {
                    // if (day.getDate().toString().length > 1) {
                    //   return day.getDate();
                    // }
                    if (day.getDate() === 1) {
                      // console.log(day.getMonth(), 'month');
                      return day.getMonth() + 1 + '.' + day.getDate();
                    }
                    // if(Platform.OS === 'android')
                    return day.getDate();
                  };
                  return (
                    <DaysWrap
                      key={day}
                      idx={idx}
                      disabled={
                        (lastDay || !(morning || lunch || dinner)) && true
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
                      {order && (
                        <DotWrap>
                          {isMorning?.length > 0 && (
                            <Morning>
                              <OrderDining textColor={themeApp.colors.grey[0]}>
                                아
                              </OrderDining>
                            </Morning>
                          )}
                          {isLunch?.length > 0 && (
                            <Lunch>
                              <OrderDining textColor={themeApp.colors.grey[0]}>
                                점
                              </OrderDining>
                            </Lunch>
                          )}
                          {isDinner?.length > 0 && (
                            <Dinner>
                              <OrderDining textColor={themeApp.colors.grey[0]}>
                                저
                              </OrderDining>
                            </Dinner>
                          )}
                        </DotWrap>
                      )}
                      <DayWeek
                        lastDay={lastDay}
                        color={color}
                        size={size}
                        currentPress={currentPress}
                        day={day}
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
                        {(lastDay || !(morning || lunch || dinner)) && (
                          <MidLineBox>
                            <MidLine />
                          </MidLineBox>
                        )}
                        <Day
                          morning={morning}
                          lunch={lunch}
                          dinner={dinner}
                          color={color}
                          lastDay={lastDay}
                          day={day}
                          now={now}
                          currentPress={currentPress}
                          size={size}>
                          {getDates()}
                        </Day>
                      </TodayCircle>
                      {formattedDate(currentPress) === formattedDate(day) ? (
                        <SelectLine />
                      ) : (
                        <SelectDisabledLine />
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
`;

const DaysWrap = styled.Pressable`
  /* padding-left: 10px;
padding-right: 10px; */
  align-items: center;
  justify-content: center;
`;
const SelectLine = styled.View`
  width: 16px;
  height: 1.5px;
  justify-self: center;
  align-self: center;
  margin-top: 5.5px;
  background-color: ${({theme}) => theme.colors.grey[2]};
`;
const SelectDisabledLine = styled.View`
  width: 16px;
  height: 1.5px;
  justify-self: center;
  align-self: center;
  margin-top: 5.5px;
`;
const TodayCircle = styled.View`
  overflow: hidden;
  height: 24px;
  margin-top: 3px;
  align-items: center;
  justify-content: center;
`;
const MidLineBox = styled.View`
  position: absolute;
  z-index: 1;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const MidLine = styled.View`
  background-color: ${({theme}) => theme.colors.grey[6]};
  height: 1px;
  width: 16px;
`;
const DotWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  height: 11px;
  margin-bottom: 4px;
`;

const Dot = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 50px;
  background-color: ${({theme, lastDay}) =>
    lastDay ? theme.colors.grey[5] : theme.colors.grey[2]};
  margin: 4px 2px 0px 2px;
`;

const Day = styled(Typography)`
  color: ${({lastDay, theme, morning, lunch, dinner, now}) =>
    lastDay
      ? theme.colors.grey[5]
      : morning || lunch || dinner
      ? theme.colors.grey[2]
      : theme.colors.grey[5]};

  ${({currentPress, day, size}) => {
    if (formattedDate(currentPress) === formattedDate(day)) {
      return getFontStyle('Body05SB');
    }
    return getFontStyle(size);
  }}
  min-width: 40px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const DayWeek = styled(Typography)`
  color: ${({theme}) => theme.colors.grey[2]};
  ${({currentPress, day, size}) => {
    if (formattedDate(currentPress) === formattedDate(day)) {
      return getFontStyle('Body05SB');
    }
    return getFontStyle(size);
  }}
`;
const OrderDining = styled(Typography)`
  font-size: 10px;
  font-weight: 400;
  position: absolute;
  font-family: 'Pretendard-Regular';
  width: 9px;
`;
const Morning = styled.View`
  background-color: #add691;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  box-sizing: border-box;
  width: 11px;
  height: 11px;
  padding: 0px;
  margin-right: 1px;
`;
const Lunch = styled.View`
  background-color: #ecac87;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  box-sizing: border-box;
  width: 11px;
  height: 11px;
  padding: 0px;
  margin-right: 1px;
`;
const Dinner = styled.View`
  background-color: #8ccee3;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  box-sizing: border-box;
  width: 11px;
  height: 11px;
  padding: 0px;
`;
