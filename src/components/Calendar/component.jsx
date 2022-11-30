import { addDays, eachWeekOfInterval, subDays,eachDayOfInterval,format } from 'date-fns';
import {ko} from 'date-fns/locale';
import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import styled from 'styled-components/native';

import Typography from '../Typography';


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
    const ref = useRef()
    const today = new Date();

  return (
     <PagerViewWrap ref={ref}>
        {/* <Button onPress={()=>{ref.current.setPage(2)}} title="버튼"/> */}
    {dates.map((week) => {
        return (
            <View key={week} >
                <Wrap>
                    {week.map(day => {
                        const txt = format(day,'EEE',{locale:ko});
                        const now = (day.toDateString() === today.toDateString());
                        const lastWeek = (day.toLocaleDateString() < today.toLocaleDateString());
                        return (
                        <DaysWrap key={day}>
                            <Day lastWeek={lastWeek}>{txt}</Day>
                            <TodayCircle now={now} >
                                <Day lastWeek={lastWeek}>{day.getDate()}</Day>
                            </TodayCircle>
                        </DaysWrap>
                        )
                    })}
                </Wrap>
        </View>
        )
    })}
    </PagerViewWrap>
  );
};

export default Component;

const PagerViewWrap = styled(PagerView)`
flex:1;
`;

const Wrap = styled.View`
flex-direction:row;
justify-content:space-between;
margin-top:16px;
`;

const DaysWrap = styled.View`
align-items:center;
`;

const TodayCircle = styled.View`
width:24px;
height:24px;
border-radius:50px;
margin-top:10px;
align-items:center;
justify-content:center;
background-color:${props => props.now && props.theme.colors.grey[7]};
`;

const Day = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.lastWeek ? props.theme.colors.grey[5]:props.theme.colors.grey[2]};
`;
