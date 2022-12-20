import { format }from 'date-fns';
import {ko} from 'date-fns/locale';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import {SafeAreaView,Text} from  'react-native'
import warnOnce from 'react-native/Libraries/Utilities/warnOnce';
import styled from 'styled-components';

import { weekAtom } from '../../biz/useBanner/store';
import { formattedDateBtn, formattedWeekDate } from '../../utils/dateFormatter';
import Typography from '../Typography';

const Component = ({
    pager,
    buyMeal,
    orderMealList
}) =>{

    const [weekly,] = useAtom(weekAtom);
    
    const btn = weekly.map((w) => {
        const a = formattedDateBtn(w[0])
        const b = formattedDateBtn(w[6])
        const result = ( a+ ' - ' +b)
        return result
    });
    btn[0] = '이번주';
    btn[1] = '다음주';

    const [checked,setChecked] = useState(0);
    
    const checkedPress = (idx) => {
        setChecked(idx)
    }

    const pagerPress = (idx) => {
        pager.current.setPage(idx)
    }

    const start = weekly.map((s) => {
        const startData = formattedWeekDate(s[0]);
        return (
            startData
        )
    });

    const end = weekly.map((e) => {
        const endData =  formattedWeekDate(e.slice(-1)[0]);
        return (
            endData
        )
    });

    // console.log(startDate[0],endDate[0])
    const mealPress = (startDate,endDate) => {
       console.log('시작',startDate, '끝',endDate)
    }

   
    return (
        <SafeAreaView>
        <Wrap horizontal={true} showsHorizontalScrollIndicator={false} >
            {/* <Btn onPress={() => {pager.current.setPage(0); setChecked(!checked)}}>
                <Text>이번주</Text>
            </Btn>
            <Btn onPress={() => pager.current.setPage(1)}>
                <Text>다음주</Text>
            </Btn>
            <Btn onPress={() => pager.current.setPage(2)}>
                <Text>다다음주</Text>
            </Btn>
            <Btn onPress={() => pager.current.setPage(3)}>
                <Text>다다다음주</Text>
            </Btn> */}
          
            {btn.map((week,idx) => 
                <Btn key={idx} 
                idx={idx}
                onPress={()=> {pagerPress(idx);checkedPress(idx);mealPress(start[idx],end[idx])}}
                checked={checked}
                >
                    <WeekText checked={checked} idx={idx}>{week}</WeekText>
                </Btn>
                )}
           
        </Wrap>
        </SafeAreaView>

    )
}
export default Component;

const Wrap = styled.ScrollView`
//background:lightblue;
`;

const Btn = styled.Pressable`
margin-right:8px;
padding:6px 12px;
border:1px solid;
border-radius:4px;
border-color: ${({checked,idx}) => checked === idx ?  props => props.theme.colors.grey[2] : props => props.theme.colors.grey[8]};
background-color:${({checked,idx}) => checked === idx ? props => props.theme.colors.grey[0]: props => props.theme.colors.grey[8]};
align-self:flex-start;
`;

const WeekText = styled(Typography).attrs({text:'Button10SB'})`
color:${({checked,idx}) => checked === idx ? props => props.theme.colors.grey[2] : props => props.theme.colors.grey[5]};
`;