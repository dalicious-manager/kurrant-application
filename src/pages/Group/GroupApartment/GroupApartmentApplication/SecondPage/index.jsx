import Postcode from '@actbase/react-daum-postcode';
import DatePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, Platform, Pressable, SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import Arrow from "../../../../../assets/icons/Group/arrowDown.svg";
import { apartApplicationDate, isApartAddressAtom, isApartDongCountAtom, isApartFamilyCountAtom, isApartFullAddressAtom, isApartNameAtom, isApartSendAddressAtom, isApartSendAddressInfoAtom, isApartStartDateAtom } from '../../../../../biz/useApartApplication/store';
import Button from "../../../../../components/Button";
import ProgressBar from "../../../../../components/ProgressBar2";
import RefTextInput from "../../../../../components/RefTextInput";
import Typography from '../../../../../components/Typography';
import useKeyboardEvent from '../../../../../hook/useKeyboardEvent';
import { getStorage, setStorage } from '../../../../../utils/asyncStorage';
import { formattedApplicationDate, formattedDate, formattedMealTime } from '../../../../../utils/dateFormatter';
import {PAGE_NAME as ApartmentApplicationThirdPageName} from '../ThirdPage';
import {PAGE_NAME as ApartmentApplicationPostcodePageName} from './Pages';

export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__SECOND" ;
const Pages = () => {

    const navigation = useNavigation();
    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [text, setText] = useAtom(apartApplicationDate);
    const [isApartAddress,setApartAddress] = useAtom(isApartSendAddressAtom);
    const isApartFullAddress = useAtomValue(isApartFullAddressAtom); // TextInput value
    const isSendAddress = useAtomValue(isApartSendAddressInfoAtom); // body에 담을 주소2
    const form = useForm({
        mode:'all'
      });

    const {formState:{errors},watch,handleSubmit,setValue} = form;

    const apartNameChk = watch('apartName');
    const apartAddressChk = watch('address');
    const apartFamilyCountChk = watch('familyCount');
    const apartDongCountChk = watch('dongCount');
    const apartStartDateChk = watch('startDate');
  
    const isValidation = 
    (apartNameChk && !errors.apartName) &&
    (apartAddressChk&&  !errors.address) &&
    (apartFamilyCountChk &&!errors.familyCount) &&
    (apartDongCountChk &&!errors.dongCount) && (apartStartDateChk && !errors.startDate)
    ;

    const inputStyle = {
        marginBottom:16,
      }
//console.log(isApartAddress)
    const saveAtom = async () => {
        await setStorage('page2',JSON.stringify({
            'apartmentName' : apartNameChk,
            'address':apartAddressChk,
            'familyCount': apartFamilyCountChk,
            'dongCount' : apartDongCountChk,
            'serviceStartDate' : apartStartDateChk
        }));
        const data = await getStorage('page2');
        const get = JSON.parse(data);
        setApartAddress({
            'apartmentName' : apartNameChk,
            'familyCount': Number(apartFamilyCountChk),
            'dongCount' : Number(apartDongCountChk),
            'serviceStartDate' : (Object.keys(get).length !== 0) ? get.serviceStartDate : formattedApplicationDate(date)

        })
    }
    const keyboardStatus = useKeyboardEvent();
    
    const showDatePicker = () => {
        setShow(true)
    }

    const onChangeDate = (event,selectedDate) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }
        
        setDate(selectedDate);
        setText(formattedDate(selectedDate));
        setValue('startDate',formattedDate(selectedDate))
      };

    const confirmPress = () =>{
        
        setShow(false);
    }
     
    useLayoutEffect(()=>{
        setValue('address',isApartFullAddress)
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[isApartFullAddress]);

     useEffect(()=>{
        const getData = async () =>{
            const data = await getStorage('page2');
           if(data){
            const get = JSON.parse(data);
            setValue('apartName',get.apartmentName)
            setValue('address',get.address)
            setValue('familyCount',get.familyCount)
            setValue('dongCount',get.dongCount)
            setValue('startDate',get.serviceStartDate)
          } else{
            console.log('no')
          }
         }

         getData()
     },[])
    return (
        <Wrap>
            <ProgressBar progress={2}/>
            <FormProvider {...form}>
                <KeyDismiss onPress={()=>Keyboard.dismiss()}>
                    <Container>
                        <RefTextInput
                        label="아파트명"
                        name="apartName"
                        placeholder="아파트명"
                        style={inputStyle}
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
                                message: '올바른 아파트명을 입력해 주세요.',
                              }
                            }
                          }
                        />

                        <View style={inputStyle}>
                            <RefTextInput
                            label="아파트주소"
                            name="address"
                            placeholder="아파트 주소"
                            defaultValue={isApartFullAddress}
                            onPressIn={()=>navigation.navigate(ApartmentApplicationPostcodePageName)}
                            />
                            <ArrowIcon/>
                        </View>

                    
                        <RefTextInput
                        label="단지 총 세대수"
                        name="familyCount"
                        placeholder="단지 총 세대수"
                        keyboardType="numeric"
                        style={inputStyle}
                        suffix={
                            {
                              isNeedDelete : true,
                              
                            }
                          }
                        rules={
                            {
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: '숫자만 입력해 주세요.',
                                }
                            }
                        }
                        />

                        <RefTextInput
                        label="아파트 단지내 동 개수"
                        name="dongCount"
                        placeholder="아파트 단지내 동 개수"
                        keyboardType="numeric"
                        caption="동 개수를 입력해주세요.(예.101동 - 105동이면 5개)"
                        style={inputStyle}
                        suffix={
                            {
                              isNeedDelete : true,
                              
                            }
                          }
                          rules={
                            {
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
                            // value={text}
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
                
            
            {(!show && !keyboardStatus.isKeyboardActivate )&&
            <ButtonWrap>
                <Button 
                    label={'다음'}  
                    disabled={!isValidation}
                    onPressEvent={()=>{navigation.navigate(ApartmentApplicationThirdPageName);saveAtom()}}/>
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