import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import { useAtom, useAtomValue } from "jotai";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FormProvider, useForm} from 'react-hook-form';
import { Alert, Keyboard, Pressable, SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import { isApartmentApplicant, isApartUserEmailAtom, isApartUserNameAtom, isApartUserPhoneAtom } from "../../../../../biz/useApartApplication/store";
import { isUserInfoAtom } from "../../../../../biz/useUserInfo/store";
import BackButton from "../../../../../components/BackButton";
import BottomModal from "../../../../../components/BottomModal";
import Button from "../../../../../components/Button";
import Check from "../../../../../components/Check";
import Form from "../../../../../components/Form";
import ProgressBar from "../../../../../components/ProgressBar2";
import RefTextInput from "../../../../../components/RefTextInput";
import Typography from "../../../../../components/Typography";
import useKeyboardEvent from "../../../../../hook/useKeyboardEvent";
import { getStorage, setStorage } from "../../../../../utils/asyncStorage";
import {PAGE_NAME as ApartmentApplicationSecondPageName} from '../SecondPage';

export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__FIRST" ;
const Pages = () => {
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const navigation = useNavigation();
    const userInfo = useAtomValue(isUserInfoAtom);
    const [modalVisible,setModalVisible] = useState(false);
    const [isApplicant,setApplicant] = useAtom(isApartmentApplicant);
    const information = useForm(); // 체크박스
    const form = useForm({
        mode:'all'
      });

    const {formState:{errors},watch,handleSubmit,setValue} = form;

    const inputStyle = {
        marginBottom:16,
        }
    console.log(isApplicant)
    const chkBox = information.watch(information).information
    const nameChk = watch('name');
    const phoneChk = watch('phone');
    const emailChk = watch('email');
    const {name,phone,email} = userInfo;
    console.log(nameChk,name,'dkdkdkdkdk')
    const isValidation = 
        (nameChk || nameChk !== '' ) &&
        (phoneChk || phoneChk !== '') &&
        (emailChk || emailChk !== '');

    const keyboardStatus = useKeyboardEvent();
    const saveAtom = async () =>{
      
        setApplicant({
          'name' : nameChk??name,
          'phone' : phoneChk??phone,
          'email' : emailChk??email
      });
      
        if(nameChk !== '' && phoneChk !== '' && emailChk !== ''){
          await setStorage('page1',JSON.stringify({'name':nameChk??name,'phone':phoneChk??phone,'email':emailChk??email}));
        }
        
    };
    
    const controlInput = () => {
      if(chkBox !== undefined && !chkBox){
        setValue('name',name)
        setValue('phone',phone)
        setValue('email',email)
        
      } else{
        
        setValue('name','')
        setValue('phone','')
        setValue('email','')
      }
    };
    useEffect(()=>{
      const getData = async () => {
        const data = await getStorage('page1');
        if(data !== null){

          const get = JSON.parse(data);
      
          if( Object.keys(get).length !== 0){
            setModalVisible(true)
          }
        }
      }
      
      getData()
    },[]);

   const continuousWrite = async() => {
    const data = await getStorage('page1');
      const get = JSON.parse(data);
        setValue('name',get.name)
        setValue('phone',get.phone)
        setValue('email',get.email)
    setModalVisible(false)
   }

   const removeStorage = async() => {
      AsyncStorage.removeItem('page1')
      AsyncStorage.removeItem('page2')
      AsyncStorage.removeItem('page2-1')
      AsyncStorage.removeItem('page3')
      AsyncStorage.removeItem('page3-1')
      setModalVisible(false)
   }

   useLayoutEffect(()=>{
    navigation.setOptions({   
        
        headerLeft: () => <BackButton onPressEvent={async()=>{
          const data = await getStorage('page1');
          const get = JSON.parse(data);
          if((get && get.constructor) === Object && Object.keys(get).length !== 0){
            Alert.alert(
              "작성 중단",
              "다음에 이어 작성할 수 있도록 저장할까요?",
              [
                {
                  text:'삭제',
                  onPress:async() => {
                    AsyncStorage.removeItem('page1')
                    AsyncStorage.removeItem('page2')
                    AsyncStorage.removeItem('page3')
                    AsyncStorage.removeItem('page3-1')
                  },
                  style:'destructive'
                  
                },
                {
                  text:'저장',
                  onPress:() => {},
                  
                }
              ]
            )
          }
        }}/>
        
      });


},[]);

    return (
        <Wrap>
            <ProgressBar progress={1}/>
            <CheckWrap>
                <Form form={information}>
                    <Label>회원정보와 동일</Label>
                    <Check name="information"  value={true} onPressEvents={()=>controlInput()}/>
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
                        defaultValue={name}
                        ref={nameRef}
                        suffix={
                          {
                            isNeedDelete : true,
                            
                          }
                        }
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
                        defaultValue={phone}
                        ref={phoneRef}
                        suffix={
                          {
                            isNeedDelete : true,
                            
                          }
                        }
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
                        defaultValue={email}
                        suffix={
                          {
                            isNeedDelete : true,
                            
                          }
                        }
                        ref={emailRef}
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
            
            
            {!keyboardStatus.isKeyboardActivate && 
            <ButtonWrap>
                <Button 
                label={'다음'} 
                disabled={!isValidation}
                onPressEvent={()=>{saveAtom();navigation.navigate(ApartmentApplicationSecondPageName);}} />
            </ButtonWrap>}
            <BottomModal modalVisible={modalVisible} setModalVisible={setModalVisible} 
                title={'작성중인 내용이 있어요'} 
                description={'이어서 작성 하시겠어요?'} 
                buttonTitle1={'새로 작성'} buttonType1='grey7' 
                buttonTitle2={'이어서 작성'} buttonType2='yellow' 
                onPressEvent1={()=>{removeStorage()}} onPressEvent2={()=>continuousWrite()}/>
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
