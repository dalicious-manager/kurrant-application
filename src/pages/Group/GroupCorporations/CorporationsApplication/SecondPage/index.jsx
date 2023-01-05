import Postcode from '@actbase/react-daum-postcode';
import DatePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { useAtom, useAtomValue } from 'jotai';
import React, { useLayoutEffect, useRef, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, Platform, Pressable, SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import Arrow from "../../../../../assets/icons/Group/arrowDown.svg";
import { corpApplicationDate, isCorpFullAddressAtom, isCorpSendAddressAtom } from '../../../../../biz/useCorporationApplication/store';
import Button from "../../../../../components/Button";
import ProgressBar from "../../../../../components/ProgressBar";
import RefTextInput from "../../../../../components/RefTextInput";
import Typography from '../../../../../components/Typography';
import { formattedApplicationDate, formattedDate } from '../../../../../utils/dateFormatter';
import {PAGE_NAME as corpApplicationThirdPageName} from '../ThirdPage';
import {PAGE_NAME as corpApplicationPostcodePageName} from './Pages';


export const PAGE_NAME = "P__GROUP__CREATE__COR__APPLICATION__SECOND" ;
const Pages = () => {

    const navigation = useNavigation();
    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [text, setText] = useAtom(corpApplicationDate);
    const [isCorpAddress,setCorpAddress] = useAtom(isCorpSendAddressAtom);
    const isCoprFullAddress = useAtomValue(isCorpFullAddressAtom); // TextInput value
    //const isSendAddress = useAtomValue(isApartSendAddressInfoAtom); // body에 담을 주소2
    console.log(isCorpAddress)
    const form = useForm({
        mode:'all'
      });

    const {formState:{errors},watch,handleSubmit} = form;

    const corpNameChk = watch('corpName');
    const corpAddress2Chk = watch('address2');
    const corpemployeeCountChk = watch('employeeCount');
    
    
    
    const isValidation = 
    (corpNameChk && !errors.corpName) &&
    (isCoprFullAddress !== '') &&
    (corpAddress2Chk &&!errors.address2) &&
    (corpemployeeCountChk &&!errors.employeeCount) && (text !== '')
    ;

    const inputStyle = {
        marginBottom:16,
      }
//console.log(isApartAddress)
    // const saveAtom = () => {
    //     setCorpAddress({
    //         'corporationName' : corpNameChk,
    //         'employeeCount':corpemployeeCountChk,
    //         'startDate' : formattedApplicationDate(date)

    //     })
    // }
    
    const showDatePicker = () => {
        setShow(true)
    }

    const onChangeDate = (event,selectedDate) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }
        // const currentDate = selectedDate;
        setDate(selectedDate);
        setText(formattedDate(selectedDate));
      };

    const confirmPress = () =>{
        
        setShow(false);
    }
     
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
                        defaultValue={isCorpAddress.apartmentName}
                        rules={
                            {
                              required: '필수 입력 항목 입니다.',
                              pattern: {                        
                                value: /^[가-힣a-zA-Z]+$/,
                                message: '올바른 아파트명을 입력해 주세요.',
                              }
                            }
                          }
                        />

                        <View style={inputStyle}>
                            <RefTextInput
                            label="기업주소"
                            name="address"
                            placeholder="기업 주소"
                            value={isCoprFullAddress}
                            onPressIn={()=>navigation.navigate(corpApplicationPostcodePageName)}
                            />
                            <ArrowIcon/>
                        </View>

                    
                        <RefTextInput
                        label="나머지 주소"
                        name="address2"
                        placeholder="나머지 주소"
                        // keyboardType="numeric"
                        style={inputStyle}
                        // defaultValue={isCorpAddress.familyCount !== undefined && String(isCorpAddress.familyCount)}
                        />

                        <RefTextInput
                        label="기업 총 인원수(미이용자 포함)"
                        name="employeeCount"
                        placeholder="기업 총 인원수(미이용자 포함)"
                        keyboardType="numeric"
                        style={inputStyle}
                        // defaultValue={isCorpAddress.dongCount !== undefined && String(isCorpAddress.dongCount)}
                        />

                        <View>
                            <RefTextInput
                            label="이용 시작 예정일"
                            name="startDate"
                            placeholder="이용 시작 예정일"
                            value={text}
                            showSoftInputOnFocus={false}
                            onPressIn={showDatePicker}
                            
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
                    />
                   
                </React.Fragment>
            )}
                
            
            {!show&&<ButtonWrap>
                <Button 
                    label={'다음'}  
                    // disabled={!isValidation}
                    onPressEvent={()=>{navigation.navigate(corpApplicationThirdPageName)}}/>
            </ButtonWrap>}
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.SafeAreaView`
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