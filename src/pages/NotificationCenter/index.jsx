
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import useBoard from "../../biz/useBoard";
import { NotificationIcon } from "../../components/Icon";
import Typography from "../../components/Typography";
import Wrapper from "../../components/Wrapper";


export const PAGE_NAME = "P__NOTIFICATION_CENTER"

const alramData =[
    {
        id:0,
        title:"콥샐러드 주문시 1+10",
        type:"promotion",
        description:"커런트에 '라그릴리아'가 새로운 메이커스로 합류합니다.",
        dateTime:"07. 21 13:30"
    },
    {
      id:1,
      title:"미식가 테스트하고 경품 받아가세요!",
      type:"event",
      description:"커런트에 '라그릴리아'가 새로운 메이커스로 합류합니다.",
      dateTime:"07. 21 13:30"
    },
    {
      id:2,
      title:"생일 축하 쿠폰이 발행됐어요.",
      type:"coupon",
      description:"커런트에 '라그릴리아'가 새로운 메이커스로 합류합니다.",
      dateTime:"07. 21 13:30"
    },
    {
      id:3,
      title:"생일 축하 쿠폰이 발행됐어요.",
      type:"coupon",
      description:"커런트에 '라그릴리아'가 새로운 메이커스로 합류합니다.",
      dateTime:"07. 21 13:30"
    },
    {
      id:4,
      title:"생일 축하 쿠폰이 발행됐어요.",
      type:"coupon",
      description:"커런트에 '라그릴리아'가 새로운 메이커스로 합류합니다.",
      dateTime:"07. 21 13:30"
    }
]

const Pages= ()=>{
    const themeApp = useTheme();
    const {getAlarm,readableAtom:{alarm}} = useBoard();
    const typeName = (type)=>{
        switch (type.toLowerCase()) {
            case "promotion":
              return "프로모션"
            case "order":
              return "주문상태"
            case "notice":
              return "공지사항"
            case "event":
              return "이벤트"
            case "coupon":
              return "쿠폰"
            case "buymeal":
              return "정기식사"
            case "spot":
              return "스팟공지"
            default:
              break;
          }
    }
    useEffect(()=>{
      const getUseAlarm=async()=>{
        await getAlarm();
      }
      getUseAlarm();
    },[])
    console.log(alarm);
    return(
        <Wrapper>
            {alramData.map((v)=>{                
              return(
                <NotificationBox key={v.id}>
                <TitleBox>
                    <TitleBoxFront>
                        <IconBox>
                            <NotificationIcon name={v.type}/>
                        </IconBox>
                        <Typography text={"Body05SB"} textColor={themeApp.colors.grey[2]}>{v.title}</Typography>
                    </TitleBoxFront>
                    <Typography text={"CaptionR"} textColor={themeApp.colors.grey[4]}>{typeName(v.type)}</Typography>
                </TitleBox>
                <ContentBox>
                    <Typography text={"Body06R"} textColor={themeApp.colors.grey[4]}>{v.content}</Typography>
                </ContentBox>
                <Typography text={"CaptionR"} textColor={themeApp.colors.grey[5]}>{v.dateTime}</Typography>
            </NotificationBox>        
              )  
            })}
               
        </Wrapper>
    )
}

export default Pages;

const NotificationBox = styled.View`
    padding: 24px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme})=>theme.colors.grey[8]};
`
const TitleBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const ContentBox = styled.View`
    margin-top: 4px;
    margin-bottom: 4px;
`
const TitleBoxFront = styled.View`
    flex-direction: row;
`
const IconBox = styled.View`
    margin-right: 8px;
`