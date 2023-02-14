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
    chk
    
}) =>{
    
    const [weekly,] = useAtom(weekAtom);
    const [checked,setChecked] = useState(0);
    const scrollViewRef = useRef(null);

    const btn = weekly.map((w) => {
        const a = formattedDateBtn(w[0])
        const b = formattedDateBtn(w[6])
        const result = ( a+ ' - ' +b)
        return result
    });
    btn[0] = '이번주';
    btn[1] = '다음주';

 
    const pagerPress = (idx) => {
        pager.current.setPage(idx)
    }

    
    const scrollToPress = (idx) => { 
        if(idx === 3){
            scrollViewRef.current.scrollToEnd({animated: true});
        }else if(idx === 1){
            scrollViewRef.current.scrollTo({animated: true});
        }
      };


    useEffect(() => {
        //setChecked(chk)
        if(chk === 3){
            scrollViewRef.current.scrollToEnd({animated: true});
        }else if(chk === 1){
            scrollViewRef.current.scrollTo({animated: true});
        }
    },[chk])

    return (
        <SafeAreaView >
        <Wrap horizontal={true} showsHorizontalScrollIndicator={false}  ref={scrollViewRef}>
            {btn.map((week,idx) => 
                <Btn key={idx} 
                idx={idx}
                onPress={()=> {pagerPress(idx);scrollToPress(idx)}}
                checked={chk}
                chk={chk}
                >
                    <WeekText text={chk===idx ? "Button10SB":"Button10R" } checked={chk} idx={idx}>{week}</WeekText>
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
border-color: ${({checked,idx,chk}) => checked === idx  ?  props => props.theme.colors.grey[2] : props => props.theme.colors.grey[8]};
background-color:${({checked,idx,chk}) => checked === idx ? props => props.theme.colors.grey[0]: props => props.theme.colors.grey[8]};
/* align-self:flex-start; */
${({idx})=> idx === 0 ? 'margin-left:28px' : idx === 3 && 'margin-right:28px'}
`;

const WeekText = styled(Typography)`
color:${({checked,idx,chk}) => checked === idx  ? props => props.theme.colors.grey[2] : props => props.theme.colors.grey[5]};
`;