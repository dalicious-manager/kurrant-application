import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import Button from "../../../../../components/Button";
import ProgressBar from "../../../../../components/ProgressBar2";
import RefTextInput from "../../../../../components/RefTextInput";
import {PAGE_NAME as ApartmentApplicationThirdPageName} from '../ThirdPage';


export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__SECOND" ;
const Pages = () => {
    const navigation = useNavigation();

    const form = useForm({
        mode:'all'
      });

    const inputStyle = {
        marginBottom:16,
      }

    

    return (
        <Wrap>
            <ProgressBar progress={2}/>
            <FormProvider {...form}>
                <Container>
                    <RefTextInput
                    label="아파트명"
                    name="apartName"
                    placeholder="아파트명"
                    style={inputStyle}
                    />
                    <RefTextInput
                    label="아파트주소"
                    name="address"
                    placeholder="아파트 주소"
                    keyboardType="numeric"
                    style={inputStyle}
                    />
                    <RefTextInput
                    label="단지 총 세대수"
                    name="familyCount"
                    placeholder="단지 총 세대수"
                    keyboardType="email-address"
                    style={inputStyle}
                    />
                    <RefTextInput
                    label="아파트 단지내 동 개수"
                    name="dongCount"
                    placeholder="아파트 단지내 동 개수"
                    keyboardType="numeric"
                    style={inputStyle}
                    />
                    <RefTextInput
                    label="이용 시작 얘정일"
                    name="phone"
                    placeholder="이용 시작 예정일"
                    keyboardType="numeric"
                    style={inputStyle}
                    />
                </Container>
            </FormProvider>
            <ButtonWrap>
                <Button label={'다음'} onPressEvent={()=>{navigation.navigate(ApartmentApplicationThirdPageName)}}/>
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


const Container = styled.View`
margin:0px 24px;
`;