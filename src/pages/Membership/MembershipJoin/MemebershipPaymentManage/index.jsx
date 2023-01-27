import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import useUserMe from '~biz/useUserMe';

import BottomSheet from '~components/BottomSheet/component';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from "~components/Wrapper";
import { SCREEN_NAME as RegisterCardScreenName} from '~screens/Main/RegisterCard';
import RegisteredBox from './RegisteredBox';


export const PAGE_NAME = "P__MEMBERSHIP__PAYMENT_MANAGE";

const Pages = ()=>{
    const themeApp = useTheme();
    const [modalVisible, setModalVisible]=useState(false);
    const data=[
        {id:0,text:'신용/체크카드'},
        // {id:1,text:'은행 계좌'},
    ]
    const navigation = useNavigation();
    const {getCardList,setCardList,readableAtom:{cardList}} = useUserMe();
    const onSelectEvent=(text,id)=>{

        console.log(text)
        navigation.navigate(id === 1 ? RegisterCardScreenName : RegisterCardScreenName)
    }
    console.log(cardList);
    useEffect(()=>{
        const getData  = async()=>{
            await getCardList();
        }
        getData();
    },[])
    return(
        <Wrapper paddingTop={24} paddingHorizontal={24} >
            <InfoBox>
                <InfoText text={'CaptionR'} textColor={themeApp.colors.grey[4]}>매월/매년 결제일자 마다 선택하신 결제 수단으로 자동결제가 이루어집니다.{'\n'}결제수단 삭제는 <InfoTextEffect text={'CaptionR'} textColor={themeApp.colors.grey[4]}>마이페이지&gt;결제수단 관리</InfoTextEffect>에서 가능합니다.</InfoText>
            </InfoBox>
            <CardRegisteredBox>
                <RegisteredTitleBox>
                    <Typography text='Title04SB' textColor={themeApp.colors.grey[2]}>등록 카드</Typography>
                </RegisteredTitleBox>
                {cardList.map((v)=>{
                    return (
                        <RegiteredView key={v.id} onPress={()=>setCardList([])}>
                            <RegisteredBox cardName={`${v.cardCompany}카드`} cardNumber={v.cardNumber} isMembership={v.defaultType === 2 || v.defaultType===3} isDefault={v.defaultType === 1 || v.defaultType===3}/>
                        </RegiteredView>
                    )
                })}
                
                {/* <RegiteredView>
                    <RegisteredBox  cardName="국민카드" cardNumber="2222222222225473" />
                </RegiteredView> */}
            </CardRegisteredBox>
            <ButtonBox>
            <Button
            label='결제수단 등록' 
            onPressEvent={()=>onSelectEvent("결제수단",0)}
            />
            </ButtonBox>
            <BottomSheet 
                modalVisible={modalVisible} setModalVisible={setModalVisible} title="결제수단 추가" data={data} setValue={onSelectEvent} height={200}/>
        </Wrapper>
    )
}

export default Pages;

const CardRegisteredBox = styled.View`
`
const RegisteredTitleBox = styled.View`
    margin-bottom: 6px;
`
const RegiteredView = styled.Pressable`
    margin-top: 6px;
    margin-bottom: 6px;
`
const InfoBox = styled.View`
    margin-bottom: 21px;
`
const InfoText = styled(Typography)`
`
const InfoTextEffect = styled(Typography)`
    text-decoration: underline;
`
const ButtonBox = styled.View`
    position: absolute;
    bottom:35px;
    align-items: center;
    justify-content: center;
    left: 24px;
`