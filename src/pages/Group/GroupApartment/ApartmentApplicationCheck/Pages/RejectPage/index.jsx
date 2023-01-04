import React from "react";
import { SafeAreaView, Text } from "react-native";
import styled from "styled-components";

import Button from "../../../../../../components/Button";
import Typography from "../../../../../../components/Typography";

export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__REJECT" ;
const Pages = () => {
    return(
        <SafeArea>
            <Wrap>

                <Title>미승인 사유</Title>
                <Content/>
            </Wrap>
            <ButtonWrap>
                <Button label='확인'/>
            </ButtonWrap>
        </SafeArea>
    )
}

export default Pages;

const SafeArea = styled.SafeAreaView`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;

const Wrap = styled.View`
margin:24px;

`;
const Title = styled(Typography).attrs({text:'Body06R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-bottom:8px;
`;

const Content = styled.View`
width:100%;
border:1px solid ${({theme}) => theme.colors.grey[7]};
border-radius:14px;
padding:16px 20px;
min-height:168px;

`;

const ButtonWrap = styled.View`
margin: 0px 24px;
position:absolute;
bottom: 35px;
`;