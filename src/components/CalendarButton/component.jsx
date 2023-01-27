import { format }from 'date-fns';
import {ko} from 'date-fns/locale';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import React, { useEffect, useRef, useState } from 'react';
import {SafeAreaView,Text,Dimensions} from  'react-native'
import styled from 'styled-components';

import { weekAtom } from '../../biz/useBanner/store';
import useOrderMeal from '../../biz/useOrderMeal';
import { formattedDateBtn, formattedWeekDate } from '../../utils/dateFormatter';
import Typography from '../Typography';


const Component = ({
    pager,
    meal,
    daily,
    chk
    
}) =>{
    
    const [weekly,] = useAtom(weekAtom);
    const {isOrderMeal,orderMeal} = useOrderMeal();
    const scrollViewRef = useRef(null);

    const btn = weekly.map((w) => {
        const a = formattedDateBtn(w[0])
        const b = formattedDateBtn(w[6])
        const result = ( a+ ' - ' +b)
        return result
    });
    btn[0] = '이번주';
    btn[1] = '다음주';

    const [checked,setChecked] = useState(0);
    
    useEffect(()=>{
        setChecked(chk)
        
    },[chk,checked])

    const checkedPress = (idx) => {
        setChecked(idx);
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
    
    const mealPress = async (startdate,enddate) => {
        try {
            await orderMeal(startdate,enddate);
            console.log(startdate,enddate,'index')
        } catch(err) {
            console.log(err)
        }
    }

    const scrollToEndPress = (idx) => {
        if(idx === 3){
            scrollViewRef.current.scrollToEnd({animated: true});
        }else{
            return
        }
      };

    //   const scrollToTop = () => {
    //     if(checked === 3){
    //         scrollViewRef.current.scrollToEnd({animated: true});
    //     }
    //   };

    return (
        <SafeAreaView >
        <Wrap horizontal={true} showsHorizontalScrollIndicator={false}  ref={scrollViewRef}>
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
          
            {meal && btn.map((week,idx) => 
                <Btn key={idx} 
                idx={idx}
                onPress={()=> {pagerPress(idx);checkedPress(idx);mealPress(start[idx],end[idx]);scrollToEndPress(idx)}}
                checked={checked}
                
                
                >
                    <WeekText checked={checked} idx={idx}>{week}</WeekText>
                </Btn>
                )}
            {daily && btn.map((week,idx) => 
                <Btn key={idx}
                idx={idx}
                onPress={()=> {checkedPress(idx);pagerPress(idx);scrollToEndPress(idx)}}
                checked={checked}
                chk={chk}
                
                >
                    <WeekText checked={checked} idx={idx} chk={chk}>{week}</WeekText>
                </Btn>
                )}
           
        </Wrap>
        </SafeAreaView>

    )
}
export default Component;

const Wrap = styled.ScrollView`

`;

const Btn = styled.Pressable`
margin-right:8px;
padding:6px 12px;
border:1px solid;
border-radius:4px;
border-color: ${({checked,idx,chk}) => checked === idx || chk === idx ?  props => props.theme.colors.grey[2] : props => props.theme.colors.grey[8]};
background-color:${({checked,idx,chk}) => checked === idx || chk === idx ? props => props.theme.colors.grey[0]: props => props.theme.colors.grey[8]};
/* align-self:flex-start; */
${({idx})=> idx === 0 ? 'margin-left:28px' : idx === 3 && 'margin-right:28px'}
`;

const WeekText = styled(Typography).attrs({text:'Button10SB'})`
color:${({checked,idx,chk}) => checked === idx || chk === idx ? props => props.theme.colors.grey[2] : props => props.theme.colors.grey[5]};
`;