import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import BottomSheet from '../../../../../../components/BottomSheet/component';
import Button from '../../../../../../components/Button';
import Typography from '../../../../../../components/Typography';
import Wrapper from "../../../../../../components/Wrapper";
import { SCREEN_NAME as RegisterCardScreenName} from '../../../../../../screens/Main/RegisterCard';
import RegisteredBox from './RegisteredBox';


export const PAGE_NAME = "P__MY_PAGE__PAYMENT_MANAGE";

const Pages = ()=>{
    const themeApp = useTheme();
    const [modalVisible, setModalVisible]=useState(false);
    const data=[
        {id:0,text:'신용/체크카드'},
        {id:1,text:'은행 계좌'},
    ]
    const navigation = useNavigation();
    const onSelectEvent=(text,id)=>{

        console.log(text)
        navigation.navigate(id === 1 ? RegisterCardScreenName : RegisterCardScreenName)
    }
    return(
        <Wrapper paddingTop={24} paddingHorizontal={24} >
            
            <CardRegisteredBox>
                <RegisteredTitleBox>
                    <Typography text='Title04SB' textColor={themeApp.colors.grey[2]}>등록 카드</Typography>
                </RegisteredTitleBox>
                <RegiteredView>
                    <RegisteredBox cardName="신한카드" cardNumber="2222222222224316" isMembership={true} isDefault={true}/>
                </RegiteredView>
                <RegiteredView>
                    <RegisteredBox  cardName="국민카드" cardNumber="2222222222225473" />
                </RegiteredView>
            </CardRegisteredBox>
            <ButtonBox>
            <Button
            label='결제수단 추가' 
            icon='plus'
            onPressEvent={()=>setModalVisible(true)}
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
const RegiteredView = styled.View`
    margin-top: 6px;
    margin-bottom: 6px;
`
const ButtonBox = styled.View`
    position: absolute;
    bottom:35px;
    align-items: center;
    justify-content: center;
    left: 24px;
`