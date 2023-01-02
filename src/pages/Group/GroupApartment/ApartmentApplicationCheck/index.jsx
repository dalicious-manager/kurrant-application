import React from "react";
import { SafeAreaView, Text } from "react-native";
import styled from "styled-components";

import Typography from "../../../../components/Typography";

export const PAGE_NAME = "P__GROUP__CHECK__APPLICATION__APART" ;
const Pages = () => {
    return (
        <Wrapper>
            <ScrollViewWrap>
                {/* <Text>신청일</Text>
                <Border/> */}
            </ScrollViewWrap>
        </Wrapper>
    )
}

export default Pages;


const Wrapper = styled.SafeAreaView`
flex:1;
`;
const ScrollViewWrap = styled.ScrollView`
background-color:${({theme}) => theme.colors.grey[0]};

`;

const Border = styled.View`
background-color:${({theme}) => theme.colors.grey[8]};
width:100%;
height:6px;
`;

const Heading = styled(Typography).atrrs({text:'Body05SB'})`
color:${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).atrrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[2]};
`;