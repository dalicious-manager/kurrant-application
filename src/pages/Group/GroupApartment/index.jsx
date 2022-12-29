import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import Button from "../../../components/Button";
import {PAGE_NAME as GroupCreateApartmentApplicationPageName} from './GroupApartmentApplication/FirstPage';

export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT" ;
const Pages = () => {

    const navigation = useNavigation();
    

    return (
        <Wrap>
            
            <Text>{PAGE_NAME}</Text>

            <ButtonWrap>
                <Button label={'스팟 개설 신청하기'} onPressEvent={()=>navigation.navigate(GroupCreateApartmentApplicationPageName)}/>
            </ButtonWrap>
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.SafeAreaView`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;

const ButtonWrap = styled.View`
padding:0px 20px;
position:absolute;
bottom:35px;
`;