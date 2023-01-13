import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useLayoutEffect } from "react";
import styled, { useTheme } from "styled-components/native";

import Button from "~components/Button";
import Typography from "~components/Typography";
import Wrapper from "~components/Wrapper";

import ListBox from "../ListBox";

import { PAGE_NAME as NoticeDetailPageName} from "../NoticeDetail";

export const PAGE_NAME = "P__MY_PAGE__PUBLIC_NOTICE"

const Pages =  ()=>{
    const themeApp = useTheme();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    
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
        <Wrapper>            
            <ListBox title="신규 기능 안내 - 코끼리 샐러드 판매가 조정 공지사항" description="2022.12.05" onPressEvent={()=>navigation.navigate(NoticeDetailPageName)}/>
            <ListBox title="신규 기능 안내 - 코끼리 샐러드 판매가 조정 공지사항" description="2022.12.05" onPressEvent={()=>navigation.navigate(NoticeDetailPageName)}/>
            <ListBox title="코끼리 샐러드 판매가 조정 공지사항" description="2022.12.05" onPressEvent={()=>navigation.navigate(NoticeDetailPageName)}/>
            <ListBox title="원할머니보쌈 도시락 구성" description="2022.12.05" onPressEvent={()=>navigation.navigate(NoticeDetailPageName)}/>
            <ListBox title="조식 관련 공지사항" description="2022.12.05" onPressEvent={()=>navigation.navigate(NoticeDetailPageName)}/>
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