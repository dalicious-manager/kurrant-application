import Postcode from '@actbase/react-daum-postcode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, Platform, Pressable, SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import Arrow from "../../../../../assets/icons/Group/arrowDown.svg";
import { corpApplicationDate, isCorpFullAddressAtom, isCorpRemainingAddress, isCorpSendAddressAtom, isCorpSendAddressInfoAtom } from '../../../../../biz/useCorporationApplication/store';
import Button from "../../../../../components/Button";
import ProgressBar from "../../../../../components/ProgressBar";
import RefTextInput from "../../../../../components/RefTextInput";
import Typography from '../../../../../components/Typography';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import { formattedApplicationDate, formattedDate } from '../../../../../utils/dateFormatter';
import {PAGE_NAME as corpApplicationThirdPageName} from '../ThirdPage';
import {PAGE_NAME as corpApplicationPostcodePageName} from './Pages';

export const PAGE_NAME = "P__GROUP__CREATE__COR__APPLICATION__SECOND" ;
const Pages = () => {

    const navigation = useNavigation();
    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    // const [text, setText] = useAtom(corpApplicationDate); // 지워도될지도
    const [isCorpAddress,setCorpAddress] = useAtom(isCorpSendAddressAtom); // corporationInfo
    const [isSendAddress,setSendAddress] = useAtom(isCorpSendAddressInfoAtom); // 나머지 주소 추가
    const isCoprFullAddress = useAtomValue(isCorpFullAddressAtom); // TextInput value
    //const isSendAddress = useAtomValue(isCorpSendAddressInfoAtom); // body에 담을 주소2
    
    console.log(isSendAddress,'아아')
    const form = useForm({
        mode:'all'
      });

    const {formState:{errors},watch,handleSubmit,setValue} = form;
    
    const corpNameChk = watch('corpName');
    const corpAddresschk = watch('address');
    const corpRemainingAddressChk = watch('address2');
    const corpemployeeCountChk = watch('employeeCount');
    const corpStartDateChk = watch('startDate')
    
    const isValidation = 
    (corpNameChk && !errors.corpName) &&
    (isCoprFullAddress !== '') &&
    (corpRemainingAddressChk &&!errors.corpRemainingAddressChk) &&
    (corpemployeeCountChk &&!errors.employeeCount) && (corpStartDateChk &&!errors.corpStartDateChk)
    ;

    const inputStyle = {
        marginBottom:16,
      }
    const keyboardStatus = useKeyboardEvent();
    const saveAtom =  () => {
        // AsyncStorage.setItem('corpPage2',JSON.stringify({
        //     'corporationName' : corpNameChk,
        //     'employeeCount':corpemployeeCountChk,
        //     'startDate': corpStartDateChk
        // }))
        setSendAddress({...isSendAddress,'address2':corpRemainingAddressChk})
        setCorpAddress({
            'corporationName' : corpNameChk,
            'employeeCount':Number(corpemployeeCountChk),
            'startDate' : formattedApplicationDate(date)

        });
        
    }
    
    const showDatePicker = () => {
        setShow(true)
    }

    const onChangeDate = (event,selectedDate) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }
        setDate(selectedDate);
        
        setValue('startDate',formattedDate(selectedDate))
      };

    const confirmPress = () =>{
        
        setShow(false);
    }

    // useEffect(()=>{
    //     AsyncStorage.getItem('corpPage2',(_err,result) => {
    //         const page2 = JSON.parse(result);
    //         setCorpAddress({
    //             'corporationName' : page2.corporationName,
    //             'employeeCount': page2.employeeCount,
    //             'startDate' : page2.startDate
    
    //         });
    //         console.log(page2,'??@')
    //     })
    // },[setCorpAddress])
     useLayoutEffect(()=>{
        setValue('address',isCoprFullAddress)
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[isCoprFullAddress])
    return (
        <Wrap>
            <ProgressBar progress={2}/>
            <FormProvider {...form}>
                <KeyDismiss onPress={()=>Keyboard.dismiss()}>
                    <Container>
                        <RefTextInput
                        label="기업명"
                        name="corpName"
                        placeholder="기업명"
                        style={inputStyle}
                        defaultValue={isCorpAddress.corporationName}
                        rules={
                            {
                              required: '필수 입력 항목 입니다.',
                              pattern: {                        
                                value: /^[가-힣a-zA-Z]+$/,
                                message: '올바른 기업명을 입력해 주세요.',
                              }
                            }
                          }
                        />

                        <View style={inputStyle}>
                            <RefTextInput
                            label="기업주소"
                            name="address"
                            placeholder="기업 주소"
                            onPressIn={()=>navigation.navigate(corpApplicationPostcodePageName)}
                            />
                            <ArrowIcon/>
                        </View>

                    
                        <RefTextInput
                        label="나머지 주소"
                        name="address2"
                        placeholder="나머지 주소"
                        style={inputStyle}
                        // defaultValue={isCorpAddress.familyCount !== undefined && String(isCorpAddress.familyCount)}
                        />

                        <RefTextInput
                        label="기업 총 인원수(미이용자 포함)"
                        name="employeeCount"
                        placeholder="기업 총 인원수(미이용자 포함)"
                        keyboardType="numeric"
                        style={inputStyle}
                        defaultValue={isCorpAddress.corporationName}

                        rules={
                            {
                            //   required: '필수 입력 항목 입니다.',
                              pattern: {                        
                                value: /^[0-9]+$/,
                                message: '숫자만 입력해 주세요.',
                              }
                            }
                          }
                        />

                        <View>
                            <RefTextInput
                            label="이용 시작 예정일"
                            name="startDate"
                            placeholder="이용 시작 예정일"
                            showSoftInputOnFocus={false}
                            onPressIn={showDatePicker}
                            defaultValue={isCorpAddress.startDate}
                            />
                            <ArrowIcon/>
                        </View>
                        
                    </Container>
                </KeyDismiss>
            </FormProvider>

            {show && (
                <React.Fragment>
                   {Platform.OS === 'ios' && <IosButton>
                        <Pressable onPress={()=>{setShow(false)}}>
                            <Cancel>취소</Cancel>
                        </Pressable>
                        <Pressable onPress={confirmPress}>
                            <Confirm>완료</Confirm>
                        </Pressable>
                    </IosButton>}
                    <DatePicker
                    value={date}
                    display="spinner"
                    onChange={onChangeDate}
                    locale='ko-KR'
                    style={{backgroundColor:'#F5F5F5'}}
                    />
                   
                </React.Fragment>
            )}
                
            
            {(!show&&!keyboardStatus.isKeyboardActivate) &&<ButtonWrap>
                <Button 
                    label={'다음'}  
                    // disabled={!isValidation}
                    onPressEvent={()=>{navigation.navigate(corpApplicationThirdPageName);saveAtom()}}/>
            </ButtonWrap>}
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.View`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;

const KeyDismiss = styled.Pressable`
flex:1;
`;

const ButtonWrap = styled.View`
padding:0px 20px;
position:absolute;
bottom:35px;
`;


const Container = styled.ScrollView`
margin:0px 24px;
margin-top:40px;
`;

export const IosButton = styled.Pressable`
width:100%;
flex-direction:row;
justify-content:space-between;
padding:8px 20px;
background-color:#F5F5F5;
z-index:999;
`;

export const Cancel = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[4]};
`;

export const Confirm = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.blue[500]};
`;

const ArrowIcon = styled(Arrow)`
position:absolute;
right:4px;
bottom:12px;
`;