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
import Skeleton from '../SelectedDefaultCard/Skeleton';

export const PAGE_NAME = "P__MY_PAGE__EVERY_CARD";

const Pages = ()=>{
   
    const navigation = useNavigation();
    const {getCardList,cardDelete,readableAtom:{cardList,isCardListLoading}} = useUserMe();
    const themeApp = useTheme();
    const onSelectEvent=()=>{
        navigation.navigate(RegisterCardScreenName)
    }
    console.log(cardList);
    const deleteCard = async(id)=>{
        await cardDelete({
            cardId:id
        });
        
    }
    // useEffect(()=>{
        
    // },[])
    useFocusEffect(
        useCallback(() => {
            const getData  = async()=>{
                await getCardList();
            }
            getData();
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
    // if(isCardListLoading){
    //     return <Skeleton/>
    // }
    return(
        <Wrapper paddingTop={24} paddingHorizontal={24} >
            
            {cardList.length > 0 ?<CardRegisteredBox>
               
                { cardList.map((v)=>{
                    return (
                        <RegiteredView key={v.id}>
                            <RegisteredBox 
                                cardName={`${v.cardCompany}카드`} 
                                onPressEvent={()=>deleteCard(v.id)} 
                                cardNumber={v.cardNumber} 
                                isMembership={v.defaultType === 2 || v.defaultType===3} 
                                isDefault={v.defaultType === 1 || v.defaultType===3}/>
                        </RegiteredView>
                    )
                }) 
                }
                
                {/* <RegiteredView>
                    <RegisteredBox  cardName="국민카드" cardNumber="2222222222225473" />
                </RegiteredView> */}
            </CardRegisteredBox>
            : 
            <NoneCardContainer>
                <Typography text="Body05R" textColor={themeApp.colors.grey[5]}>아직 등록된 결제 수단이 없어요</Typography>
            </NoneCardContainer>}
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
const NoneCardContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
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