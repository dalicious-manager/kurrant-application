import DatePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { useAtom } from 'jotai';
import React, { useLayoutEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Platform, SafeAreaView, Text ,View} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import styled from "styled-components";

import Arrow from "../../../../../../assets/icons/Group/arrowDown.svg";
import { apartDeliveryAtom, isApartMealInfoAtom } from '../../../../../../biz/useApartApplication/store';
import { corpApplicationWeek, isCorpMealInfoAtom, isCorpMealMorningInfoAtom } from '../../../../../../biz/useCorporationApplication/store';
import Button from "../../../../../../components/Button";
import WeekButton from "../../../../../../components/ButtonWeek";
import RefTextInput from "../../../../../../components/RefTextInput";
import Typography from "../../../../../../components/Typography";
import { formattedMealTime, formattedTime } from '../../../../../../utils/dateFormatter';
import { Cancel, Confirm, IosButton } from '../../SecondPage';


export const PAGE_NAME = 'CORPORATION__APPLICATION__MEAL__INFO';
const Pages = ({route}) => {
    const navigation = useNavigation();

    const [isCorpMealInfo,setMealInfo] = useAtom(isCorpMealMorningInfoAtom);
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [infoShow,setInfoShow] = useState(false);
    const [text, setText] = useAtom(apartDeliveryAtom);
    
    const [touch,setTouch] = useAtom(corpApplicationWeek);
    console.log(touch)
    // const [monday,setMonday] = useState(false);
    // const [thuesday,setThuesday] = useState(false);
    // const [wendnesday,setWendnesday] = useState(false);
    // const [thursday,setThursday] = useState(false);
    // const [friday,setFriday] = useState(false);
    // const [saturday,setSaturday] = useState(false);
    // const [sunday,setSunday] = useState(false);
    
    // const checkDay = [monday,thuesday,wendnesday,thursday,friday,saturday,sunday];
    //console.log(formattedTime(time))
    const form = useForm({
        mode:'all'
      });
    
    const {formState:{errors},watch,handleSubmit} = form;
    const svcDongCountChk = watch('svcDongCount');
    const deliveryTimeChk = watch('deliveryTime');

    const isValidation = 
        (svcDongCountChk && !errors.name) &&
        (touch.length !== 0) && (text !== '')
        

    const inputStyle = {
        marginBottom:16,
      };


    const saveAtom = () => {
            setMealInfo([{
                'diningType':1,
                'expectedUserCount':Number(svcDongCountChk),
                'serviceDays':touch,
                'deliveryTime':formattedTime(time)
            }]);
    }
    
    const showTimePicker = () => {
        setShow(true)
    }

    const onChange = (event,selectedTime) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }
        // const currentDate = selectedDate;
        setTime(selectedTime);
        setText(formattedMealTime(selectedTime));
      };
    
    

    return (
        
        <Wrap>
            <FormProvider {...form}>
                <KeyDismiss onPress={()=>Keyboard.dismiss()}>
                    <Container>
                        <RefTextInput
                        label="서비스 이용 예상 세대수"
                        name="svcDongCount"
                        keyboardType="numeric"
                        placeholder="서비스 이용 예상 세대수"
                        style={inputStyle}
                        />
                        <WeekButton 
                        touch={touch} setTouch={setTouch}
                        />
                        <View style={inputStyle}>
                            <RefTextInput
                            label="배송 시간"
                            name="deliveryTime"
                            placeholder="배송 시간"
                            onPressIn={showTimePicker}
                            showSoftInputOnFocus={false}
                            value={text}
                            />
                            <ArrowIcon/>
                        </View>
                    </Container>
                </KeyDismiss>
            </FormProvider>

            

            {infoShow && <InfoWrap>
                <LetterWrap>
                    <Letter>
                        <InfoTitle>🚩아래 내용은 모두 상담시 안내해드립니다.</InfoTitle>
                    </Letter>
                    <Letter>
                        <Title>배송 시간</Title>
                        <Description>식사가 배송되는 시간입니다.</Description>
                    </Letter>
                    <Letter>
                        <Title>주문 마감 시간</Title>
                        <Description>통상적으로 배송 12~24시간 전에 주문 마감이 되고,{'\n'} 주문 마감 이후 주문건은 할인 혜택에서 제외됩니다. </Description>
                    </Letter>
                    <Letter>
                        <Title>주문취소 가능 시간</Title>
                        <Description>주문 취소는 배송 2~3시간 전까지 가능하고, 그 후에는 {'\n'} 취소가 불가능합니다.</Description>
                    </Letter>
                    <Letter>
                        <Title>배송비</Title>
                        <Description>
                            ・ 50인 미만 {'\n'} 
                            강남 3구(15,000원/일), 강남 3구 외 서울지역(20,000원/일), 수도권 지역(25,000원/일){'\n'} 
                            ・ 50인 이상 {'\n'} 
                            멤버십 가입시 무료 배송(가입비 10,000원/월)
                        </Description>
                    </Letter>
                </LetterWrap>
            </InfoWrap>}
            {show && (
                <DatePickerWrap>
                   {Platform.OS === 'ios' && <IosButton>
                        <Pressable onPress={()=>{setShow(false)}}>
                            <Cancel>취소</Cancel>
                        </Pressable>
                        <Pressable onPress={()=>{setShow(false);setInfoShow(true)}}>
                            <Confirm>완료</Confirm>
                        </Pressable>
                    </IosButton>}
                    
                        <DatePicker
                        value={time}
                        display="spinner"
                        onChange={onChange}
                        locale='ko-KR'
                        mode="time"
                        />
                </DatePickerWrap>
                   
                
            )}
            {!show && <ButtonWrap>
                <Button 
                    // disabled={!isValidation}
                    label={'저장'} 
                    onPressEvent={()=>{saveAtom();}}/>
            </ButtonWrap>}
        </Wrap>
    )
}
//navigation.goBack();
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


const Container = styled.View`
margin:56px 24px 0px 24px;
`;

const Letter = styled.View`
margin-bottom:12px;
`;

const LetterWrap = styled.View`
padding: 12px 16px 0px 12px;
background-color:${({theme}) => theme.colors.blue[100]};
`;

const InfoTitle = styled(Typography).attrs({text:'Body06R'})`
color:${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme}) => theme.colors.blue[500]};
`;

const Description = styled(Typography).attrs({text:'CaptionR'})`
color:${({theme}) => theme.colors.grey[4]};
`;

const DatePickerWrap = styled.View`
width:100%;
position:absolute;
bottom:0;
`;

const ArrowIcon = styled(Arrow)`
position:absolute;
right:4px;
bottom:12px;
`;

const InfoWrap = styled.View`
margin:24px;
`;