import React from "react";
import styled from "styled-components/native";

import { Subtract } from "../../../../assets";
import Image from "../../../../components/Image";
import Typography from "../../../../components/Typography";

const Component = ({children,text})=>{
    return(
        <Container>
            <BoxImage imagePath={Subtract} scale={1.0} />
            <ContentsBox>
                {children}
                <MembershipText>
                    {text}
                </MembershipText>
            </ContentsBox>            
        </Container>
    )
}

export default Component;

const Container = styled.View`
    width: 100%;
    height: 77px;
    /* padding-left: 24px;
    padding-right: 24px; */
    /* justify-content: center; */
    /* align-items: center; */
`;
const ContentsBox = styled.View`
    width: 100%;
    height: 100%;
    padding-left: 24px;
    padding-right: 24px;
    /* justify-content: center; */
    flex-direction: row;
    align-items: center;
`;

const MembershipText = styled(Typography).attrs({text:'Body05R'})`
    margin-left: 14px;
    color:${({theme})=> theme.colors.grey[2]};
`;

const BoxImage = styled(Image).attrs({styles:{
    position:'absolute',
    width:'100%',
    zIndex:-1,
    height: 77,
    resizeMode:'stretch'
}})``;