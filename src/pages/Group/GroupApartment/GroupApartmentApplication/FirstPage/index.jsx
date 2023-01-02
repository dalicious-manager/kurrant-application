import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm} from 'react-hook-form';
import { Keyboard, SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import { isApartmentApplicant, isApartUserEmailAtom, isApartUserNameAtom, isApartUserPhoneAtom } from "../../../../../biz/useApartApplication/store";
import { isUserInfoAtom } from "../../../../../biz/useUserInfo/store";
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
    const userInfo = useAtomValue(isUserInfoAtom);
    //console.log(userInfo)
    const [isApplicant,setApplicant] = useAtom(isApartmentApplicant);
    
     //const [isName,setName] = useAtom(isApartUserNameAtom);
    // const [isPhone,setPhone] = useAtom(isApartUserPhoneAtom);
    // const [isEmail,setEmail] = useAtom(isApartUserEmailAtom);
    console.log(isApplicant)
    const information = useForm(); // 체크박스
    const form = useForm({
        mode:'all'
      });

    const {formState:{errors},watch,handleSubmit} = form;

    const inputStyle = {
        marginBottom:16,
        }

    const namechk = watch('name');
    const phonechk = watch('phone');
    const emailchk = watch('email');

    const isValidation = 
        (namechk && !errors.name) &&
        (phonechk &&!errors.phone) &&
        (emailchk && !errors.email);

    const saveAtom = () =>{
        // setName(namechk)
        setApplicant({
            'name' : namechk,
            'phone' : phonechk,
            'email' : emailchk
        });
    };

    // const save = async () => {
    //   try {
    //     await AsyncStorage.setItem('name', namechk);
    //     //await AsyncStorage.setItem('info', JSON.stringify(info)); // 객체 형태 저장
    //   } catch (e) {
    //     // 오류 예외 처리
    //   }
    // }

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
                <KeyDismiss onPress={()=>Keyboard.dismiss()}>
                    <Container>
                        <RefTextInput
                        label="신청자명"
                        name="name"
                        placeholder="신청자명"
                        style={inputStyle}
                        defaultValue={isApplicant.name}
                        //value={isName}
                        //onChangeText={(newText) => setName(newText)}
                        rules={
                            {
                              required: '필수 입력 항목 입니다.',
                              pattern: {                        
                                value: /^[가-힣a-zA-Z]+$/,
                                message: '올바른 이름을 입력해 주세요.',
                              }
                            }
                          }
                        
                        />
                        <RefTextInput
                        label="신청자 연락처"
                        name="phone"
                        placeholder="신청자 연락처"
                        keyboardType="numeric"
                        style={inputStyle}
                        defaultValue={isApplicant.phone}
                        // value={isApplicant.phone}
                        rules={
                            {
                              required: '필수 입력 항목 입니다.',
                              pattern: {                        
                                value: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                                message: '올바른 휴대폰 번호를 입력해주세요.',
                              }
                            }
                          }

                        
                        />
                        <RefTextInput
                        label="신청자 이메일"
                        name="email"
                        placeholder="신청자 이메일"
                        keyboardType="email-address"
                        autoCapitalize = "none"
                        style={inputStyle}
                        defaultValue={isApplicant.email}
                        // value={isApplicant.email}
                        rules={
                            {
                              required: '필수 입력 항목 입니다.',
                              pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: '이메일 형식에 맞지 않습니다.',
                              }
                            }
                          }
                        
                        />
                    </Container>
                </KeyDismiss>
            </FormProvider>
            
            
            <ButtonWrap>
                <Button 
                label={'다음'} 
                // disabled={!isValidation}
                onPressEvent={()=>{navigation.navigate(ApartmentApplicationSecondPageName);saveAtom()}} />
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

const KeyDismiss = styled.Pressable`
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

const Label = styled(Typography).attrs({ text:'Body05R' })`
  color: ${({ theme }) => theme.colors.grey[2]};
  margin-right:8px;
`;
