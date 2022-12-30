import React, { useState } from "react";
import { View,Text } from "react-native";
import styled from "styled-components";

import Typography from "../Typography";

const Component = ({
    touch,
    setTouch,
    monday,
    setmonday,
    thuesday, 
    setThuesday,
    wendnesday,
    setWendnesday,
    thursday,
    setThursday,
    friday,
    setFriday,
    saturday,
    setSaturday,
    sunday,
    setSunday

}) => {

    //const week =['월', '화', '수', '목', '금', '토', '일'];
   // const [checked,setChecked] = useState();

    // const onPressButton = (idx) =>{
    //     setTouch(prev => !prev);
    //     setChecked(idx)
    // }
    
    const buttonPress = () => {
        setmonday(prev => !prev);     
    }

    const buttonPress2 = () =>{
        setThuesday(prev => !prev);
    }
    const buttonPress3 = () =>{
        setWendnesday(prev => !prev);
    }
    const buttonPress4 = () =>{
        setThursday(prev => !prev);
    }
    const buttonPress5 = () =>{
        setFriday(prev => !prev);
    }
    const buttonPress6 = () =>{
        setSaturday(prev => !prev);
    }
    const buttonPress7 = () =>{
        setSunday(prev => !prev);  
    }
    return (
        <Wrap>
            <ButtonWrap touch={monday} onPress={buttonPress}>
                <WeekText touch={monday}>월</WeekText>
            </ButtonWrap>
            <ButtonWrap touch={thuesday} onPress={buttonPress2}>
                <WeekText touch={thuesday}>화</WeekText>
            </ButtonWrap>
            <ButtonWrap touch={wendnesday} onPress={buttonPress3}>
                <WeekText touch={wendnesday}>수</WeekText>
            </ButtonWrap>
            <ButtonWrap touch={thursday} onPress={buttonPress4}>
                <WeekText touch={thursday}>목</WeekText>
            </ButtonWrap>
            <ButtonWrap touch={friday} onPress={buttonPress5}>
                <WeekText touch={friday}>금</WeekText>
            </ButtonWrap>
            <ButtonWrap touch={saturday} onPress={buttonPress6}>
                <WeekText touch={saturday}>토</WeekText>
            </ButtonWrap>
            <ButtonWrap touch={sunday} onPress={buttonPress7}>
                <WeekText touch={sunday}>일</WeekText>
            </ButtonWrap>
            {/* {week.map((m ,idx)=> {
                return (
                    <ButtonWrap key={idx} onPress={()=>{onPressButton(idx)}} touch={touch} idx={idx} checked={checked}>
                        <WeekText touch={touch}  checked={checked} idx={idx}>{m}</WeekText>
                    </ButtonWrap>
                )
            })} */}
            {/* <Wrap>
                <WeekText>월</WeekText>
            </Wrap> */}
        </Wrap>
    )
}

export default Component;

const Wrap = styled.View`
flex-direction:row;
justify-content:space-between;
`;
const ButtonWrap = styled.Pressable`
background-color:${({theme,touch,checked,idx}) => touch ? theme.colors.grey[2] : theme.colors.grey[8]};
padding: 8px 12px;
border-radius:7px;
`;

const WeekText =styled(Typography).attrs({text:'BottomButtonSB'})`
color:${({theme,touch,checked,idx}) => touch ?  theme.colors.grey[0] : theme.colors.grey[0]};
`;