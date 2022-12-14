import React from "react";
import { Pressable, Text, View } from "react-native";
import styled from "styled-components";

import Arrow from '../../assets/icons/Arrow/arrowRight.svg';
import Typography from "../Typography";



const Component = ({
    onPressEvent = () => { console.log( '더보기 버튼 누름')}
}) =>{

    return (
    <Wrapper>
        <PressButton onPress={onPressEvent}>
            <MoreText>더보기</MoreText>
            <ArrowIcon/>
        </PressButton>
    </Wrapper>
    )

}

export default Component;

const Wrapper = styled.View`
margin:0 auto;

`;

const PressButton = styled.Pressable`
background-color:${props => props.theme.colors.grey[0]};
flex-direction:row;
justify-content:center;
align-items:center;
border: 1px solid ${props => props.theme.colors.grey[7]};
border-radius:7px;
width:327px;
height:55px;
`;

const ArrowIcon = styled(Arrow)`
margin-left:10px;
color:${props => props.theme.colors.grey[4]};
`

const MoreText = styled(Typography).attrs({text:'Body05SB'})`
color:${props => props.theme.colors.grey[3]};
`;