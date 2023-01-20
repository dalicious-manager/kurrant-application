import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import styled, { useTheme } from "styled-components/native";

import Button from "~components/Button";
import Typography from "~components/Typography";
import Wrapper from "~components/Wrapper";
import useBoard from "../../../../../biz/useBoard";


import ListBox from "../ListBox";

import { PAGE_NAME as NoticeDetailPageName} from "../NoticeDetail";

export const PAGE_NAME = "P__MY_PAGE__SPOT_NOTICE"

const Pages =  ()=>{
    const themeApp = useTheme();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const {getNotice,readableAtom:{spotNotice,isGetNoticeLoading}}=useBoard();
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
      useEffect(()=>{
        const getUseNotice = async()=>{
            await getNotice(1);
        }
        getUseNotice();
      },[])
    return(
        <Wrapper>
            {spotNotice?.map((v)=>{
                return <ListBox key={v.id} title={v.title} description="2022.12.05" onPressEvent={()=>navigation.navigate(NoticeDetailPageName,{
                    noticeData:v
                })}/>
            })}
           
        </Wrapper>
    )
}


export default Pages;

const TitleBox = styled.View`
    margin: 8px 0px;
    padding: 0px 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const TitleBtnBox = styled.View`
    min-width: 106px;
    max-width: 110px;
    margin-left: 82px;
    align-items: center;
    text-align: center;
    justify-content: center;
`
const DescriptionBox = styled.View`
    margin: 24px;
    margin-top: 33px;
`
const Line = styled.View`
    width: 100%;
    height: 12px;
    background-color: ${({theme})=> theme.colors.grey[8]};
`
const FAQBox = styled.View`
    padding: 16px 24px;
`