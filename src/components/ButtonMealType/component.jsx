import React from "react";
import styled from "styled-components";

import Typography from "../Typography";


const Component = ({
    label,
    disabled = false,
    touch,
    setTouch
}) => {
    
    const touchPress = () => { 
        
        setTouch(prev => !prev)
    }
    return (
        <Wrap onPress={touchPress} disabled={disabled} touch={touch}>
            <TextView>
                <Label disabled={disabled} touch={touch}>{label}</Label>
            </TextView>
            {disabled && <Line/>}
        </Wrap>
    )

}

export default Component ;

const Wrap = styled.Pressable`
border-color:${({theme,disabled,touch}) => !touch ? theme.colors.grey[8] : disabled && theme.colors.grey[7]};
border-width:1px;
border-radius:14px;
background-color:${({theme,disabled,touch}) => touch ? theme.colors.grey[2] : disabled ? theme.colors.grey[0] : theme.colors.grey[8]};
align-items:center;
justify-content:center;
overflow:hidden;
`;

const Line = styled.View`
width:100%;
border-bottom:solid;
border-color: ${({theme}) => theme.colors.grey[7]}; 
border-width:1px;
transform: rotate(160deg);
position: absolute;
top:18px;
box-sizing:border-box;
`;

const TextView = styled.View`
padding:8px 36px;
`;

const Label = styled(Typography).attrs({text:'BottomButtonSB'})`
color:${({theme,disabled,touch}) => !touch ? theme.colors.grey[5] :disabled ? theme.colors.grey[6] : theme.colors.grey[0] };
`;