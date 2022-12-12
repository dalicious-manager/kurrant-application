import { addDays, eachWeekOfInterval, subDays,eachDayOfInterval,format } from 'date-fns';
import {ko} from 'date-fns/locale';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View ,Text} from 'react-native';
import PagerView from 'react-native-pager-view';
import styled from 'styled-components/native';

import { weekAtom } from '../../biz/useBanner/store';
import { formattedDateAndDay } from '../../utils/dateFormatter';
import Button from '../CalendarButton';
import Typography from '../Typography';
import { getCircleColor, getTodayColor, getFontStyle } from './style';


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
    type ='grey7', 
    color ='grey2', 
    size ='Body06R'
}) => {
    
    const pager = useRef();
    const today = new Date();
    const [weekly,] = useAtom(weekAtom)
    
  return (
    <React.Fragment>
     {BooleanValue ? <Button pager={pager} title="버튼"/> : <></>}
     <PagerViewWrap ref={pager} initialPage={0}>
    {weekly.map((week) => {
        return (
            <View key={week}>
                <Wrap>
                    {week.map(day => {
                        const txt = format(day,'EEE',{locale:ko});
                        const now = (day.toDateString() === today.toDateString());
                        //const lastWeek = (day.toLocaleDateString() < today.toLocaleDateString());
                        const lastWeek = (day.getDate() < today.getDate())
                       
                        return (
                        <DaysWrap key={day}>
                            <Day lastWeek={lastWeek} color={color} size={size}>{txt}</Day>
                            <TodayCircle now={now} type={type}>
                                <Day color={color} lastWeek={lastWeek} now={now} size={size}>{day.getDate()}</Day>
                            </TodayCircle>
                        </DaysWrap>
                        )
                    })}
                </Wrap>
        </View>
        )
    })}
    </PagerViewWrap>
    </React.Fragment>
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
 ${({ type, now }) => now && getCircleColor(type)};
`;

const Day = styled(Typography).attrs({text:'Body06R'})`
color:${({ lastWeek,theme }) => lastWeek ? theme.colors.grey[5] : theme.colors.grey[2]};
${({ color, now }) => now && getTodayColor(color)};
${({ size }) => getFontStyle(size)};
`;
