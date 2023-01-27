import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import useUserMe from '~biz/useUserMe';

import BottomSheet from '~components/BottomSheet/component';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from "~components/Wrapper";
import { SCREEN_NAME as RegisterCardScreenName} from '~screens/Main/RegisterCard';
import RegisteredBox from '../RegisteredBox';

export const PAGE_NAME = "P__MY_PAGE__EVERY_CARD";

const Pages = ()=>{
    const themeApp = useTheme();
   
    const navigation = useNavigation();
    const {getCardList,readableAtom:{cardList}} = useUserMe();
    const onSelectEvent=()=>{
        navigation.navigate(RegisterCardScreenName)
    }
    console.log(cardList);
    useEffect(()=>{
        const getData  = async()=>{
            await getCardList();
        }
        getData();
    },[])
    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily:'Pretendard-SemiBold',}
            })
          return () => {
            navigation.setOptions({
                tabBarLabelStyle:{fontSize:15,lineHeight:21,fontFamily: 'Pretendard-Regular',}
            })
        }
        }, [])
      );
    return(
        <Wrapper paddingTop={24} paddingHorizontal={24} >
            
            <CardRegisteredBox>
               
                {cardList.map((v)=>{
                    return (
                        <RegiteredView key={v.id}>
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
            label='결제수단 추가' 
            icon='plus'
            onPressEvent={onSelectEvent}
            />
            </ButtonBox>
        </Wrapper>
    )
}

export default Pages;

const CardRegisteredBox = styled.View`
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