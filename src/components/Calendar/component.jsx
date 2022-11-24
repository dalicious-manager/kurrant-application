import { addDays, eachWeekOfInterval, subDays,eachDayOfInterval,format } from 'date-fns';
import {ko} from 'date-fns/locale';
import moment from 'moment';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Calendar ,LocaleConfig } from 'react-native-calendars';
import PagerView from 'react-native-pager-view';
import WeeklyCalendar from 'react-native-weekly-calendar';
import styled, { css } from 'styled-components/native';


/**
 *
 * @param {} props
 * @param {} props.type 
 * @returns
 */
 
const dates = eachWeekOfInterval(
    {
     start: subDays(new Date(), 0), // 지난주
     end: addDays(new Date(), 7), // 다음주
    },
    {
     weekStartsOn:0, // 일요일부터 시작
    }
).reduce((acc,cur) =>{
    const allDays = eachDayOfInterval({
        start: cur,
        end: addDays(cur, 6)
    });

    acc.push(allDays);

    return acc;
},[]);

//console.log(dates)

const Component = () => {

    const today = new Date();

  return (
   <PagerView style={{flex:1}}>
    {dates.map((week, i) => {
        return (
            <View key={i} >
            <Wrap>
                {week.map(day => {
                    const txt = format(day,'EEE',{locale:ko});
                    const now = (day.toDateString() === today.toDateString());
                    const lastWeek = (day.toLocaleDateString() < today.toLocaleDateString());
                    //console.log(lastWeek)
                    return (
                    <DaysWrap>
                        <Day lastWeek={lastWeek}>{txt}</Day>
                        <Test now={now} >
                            <Day lastWeek={lastWeek}>{day.getDate()}</Day>
                        </Test>
                    </DaysWrap>
                    )
                })}
            </Wrap>
        </View>
        )
    })}
   </PagerView>
  );
};

export default Component;

const Wrap = styled.View`
flex-direction:row;
justify-content:space-around;
margin-top:16px;
`;

const DaysWrap = styled.View`
align-items:center;


`;

const Test = styled.View`
width:24px;
height:24px;
border-radius:50px;
margin-top:10px;
align-items:center;
justify-content:center;
background-color:${props => props.now && props.theme.colors.grey[200]};
`;

const Day = styled.Text`
color:${props => props.lastWeek && props.theme.colors.grey[500]};


`;
