import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import Button from "../../../../../components/Button";
import Check from "../../../../../components/Check";
import Form from "../../../../../components/Form";
import ProgressBar from "../../../../../components/ProgressBar2";
import RefTextInput from "../../../../../components/RefTextInput";
import Typography from "../../../../../components/Typography";
import {PAGE_NAME as ApartmentApplicationSecondPageName} from '../SecondPage';


export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__FIRST" ;
const Pages = () => {
    const navigation = useNavigation();
    
    const form = useForm({
        mode:'all'
      });

    const information = useForm();

    const inputStyle = {
        marginBottom:16,
      }
    

    return (
        <Wrap>
            <ProgressBar progress={1}/>
            <CheckWrap>
                <Form form={information}>
                    <Label>회원정보와 동일</Label>
                    <Check name="agreeCheck" />
                </Form>
            </CheckWrap>
            <FormProvider {...form}>
                <Container>
                    <RefTextInput
                    label="신청자명"
                    name="name"
                    placeholder="신청자명"
                    style={inputStyle}
                    />
                    <RefTextInput
                    label="신청자 연락처"
                    name="phone"
                    placeholder="신청자 연락처"
                    keyboardType="numeric"
                    style={inputStyle}
                    />
                    <RefTextInput
                    label="신청자 이메일"
                    name="email"
                    placeholder="신청자 이메일"
                    keyboardType="email-address"
                    style={inputStyle}
                    />
                </Container>
            </FormProvider>
            
            
            <ButtonWrap>
                <Button label={'다음'} onPressEvent={()=>{navigation.navigate(ApartmentApplicationSecondPageName)}}/>
            </ButtonWrap>
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.SafeAreaView`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;

const CheckWrap = styled.View`
flex-direction:row;
text-align:center;
justify-content:flex-end;
margin:0px 24px;
`;

const ButtonWrap = styled.View`
padding:0px 20px;
position:absolute;
bottom:35px;
`;

const Container = styled.View`
margin:0px 24px;
`;

const Label = styled(Typography).attrs({ text:'Body05R' })`
  color: ${({ theme }) => theme.colors.grey[2]};
  margin-right:8px;
`;