import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import Button from "../../../../../components/Button";
import ProgressBar from "../../../../../components/ProgressBar2";
import {PAGE_NAME as ApartmentApplicationLastPageName} from '../LastPage';


export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__THIRD" ;
const Pages = () => {
    const navigation = useNavigation();

    

    return (
        <Wrap>
            <ProgressBar progress={3}/>
            <Text>{PAGE_NAME}-3</Text>
            {/* {progress === 2 && 
                <Text>dddd</Text>
            } */}
            <ButtonWrap>
                <Button label={'다음'} onPressEvent={()=>{navigation.navigate(ApartmentApplicationLastPageName)}}/>
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