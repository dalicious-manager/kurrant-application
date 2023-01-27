import id from "date-fns/esm/locale/id/index.js";
import React, { useState } from "react";
import styled from "styled-components/native";
import FastImage from 'react-native-fast-image'
import ButtonMeal from "~components/ButtonMeal";
import Typography from "~components/Typography";
import ArrowRight from "~assets/icons/Group/checkArrow.svg";
import { Dimensions } from "react-native";
import { css, useTheme } from "styled-components/native";
import { formattedDateAndDay, formattedDateType, formattedDateWeekBtn } from "../../../../../../../../utils/dateFormatter";
import withCommas from "../../../../../../../../utils/withCommas";
import { formattedMealFoodStatus } from "../../../../../../../../utils/statusFormatter";
import { useNavigation } from "@react-navigation/native";
import TextButton from "../../../../../../../../components/TextButton";

import { PurchaseDetailPageName } from "../../../../Detail";

const {width} =Dimensions.get('screen');
const Component = ({
  purchase,
  date,
  index,
  itemIndex
}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
    return (
        <DateOrderItemListContainer isFirst={index ===0 && itemIndex === 0}>
        <DateDetailBox>
          <Typography text={"CaptionR"} textColor={themeApp.colors.grey[4]}>{date} 결제</Typography>
          <DetailWrap>
              <TextButton size='label13R' label='주문상세' type='blue' 
              onPressEvent={()=>{navigation.navigate(PurchaseDetailPageName,{code:purchase.code,date:date})}}/>
              <ArrowRightIcon/>
          </DetailWrap>
        </DateDetailBox>
        <DateOrderItemListBox>
          <DateBar />
          <DateOrderItemList>
            {purchase.orderItem.map((order,i)=>{
              const statusColor = ()=>{
                switch (order.foodStatus) {
                  case 7:
                    return themeApp.colors.red[500]
                  case 11:
                    return themeApp.colors.red[500]
                  case 12:
                    return themeApp.colors.red[500]                
                  default:
                    return themeApp.colors.grey[2];
                }
              }
              return (
                <DateOrderItemBox key={order.id} isFirst={i ===0}>
                  <StatusBox>
                    <StatusText>
                      <Typography text="Title04SB" textColor={statusColor()}>{formattedMealFoodStatus(order.foodStatus)}</Typography>
                    </StatusText>
                    {order?.cancelDate && <Typography text="Samlllabel" textColor={themeApp.colors.grey[5]}>{formattedDateWeekBtn(order?.cancelDate)} 취소</Typography>}
                  </StatusBox>
                  <DateOrderItemContentBox>
                    <DateOrderItemImage>
                      <FastImage
                        style={{ width: '100%', height: '100%', borderRadius:7 }}
                        source={{
                            uri: order.Image,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </DateOrderItemImage>
                    <DateOrderItemContent>
                      <TextBox>
                        <ServiceDate text="SmallLabel" textColor={themeApp.colors.grey[4]}>식사일 : {formattedDateAndDay(order.serviceDate)} {formattedDateType(order.diningType)}</ServiceDate>
                        <Body06R19 textColor={themeApp.colors.grey[2]}>[{order.makersName}]{order.name}</Body06R19>
                        <PriceBox>
                          <Body06R19 textColor={themeApp.colors.grey[4]}>{order.count}개</Body06R19>
                          <Typography  text="Body06SB" textColor={themeApp.colors.grey[2]}>{withCommas(order.price)}원</Typography>
                        </PriceBox>
                      </TextBox>
                      {order.foodStatus === 5 && <ButtonContainer>
                        <ButtonMeal label={"취소"}/>
                        <ButtonMeal label={"메뉴변경"}/>                      
                      </ButtonContainer>}
                    </DateOrderItemContent>
                        
                  </DateOrderItemContentBox>
                </DateOrderItemBox>           
              )
            })}
               
          </DateOrderItemList>
        </DateOrderItemListBox>
      </DateOrderItemListContainer>
    )
}

export default Component;
const DateOrderItemListContainer = styled.View`
  ${({isFirst})=> isFirst ? css`
    margin-top: 16px;
  `:
  css`
    margin-top: 56px;
  `}
  padding-left: 24px;
  padding-right: 24px;
`;

const DateOrderItemListBox = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const DateBar = styled.View`
  width: 3px;
  height: 100%;
  background-color: ${({theme})=> theme.colors.grey[7]};
`

const DateOrderItemList = styled.View`
  width: 100%;
  padding-left: 12px;
`;
const DateOrderItemBox = styled.View`
  ${({isFirst})=> !isFirst && css`
    padding-top: 16px;
  `}
  width: 100%;
`;
const DateOrderItemContentBox = styled.View`
  padding-top: 6px;
  flex-direction: row;
  width: 100%;
`
const PriceBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateOrderItemImage = styled.View`
  width: ${width/3.5}px;  
  height: ${width/3.5}px;
  box-sizing: border-box;
  border-radius: 7px;
`;

const DateOrderItemContent = styled.View`
  margin-left: 12px;
  flex: 1;
  justify-content: space-between;
`

const ButtonContainer = styled.View`
  flex-direction  : row;
  justify-content: flex-end;
`
const TextBox = styled.View`
  
`
const Body06R19 = styled(Typography).attrs({text:'Body06R'})`
  line-height: 19px;
  margin-right: 6px;
`
const ServiceDate = styled(Typography)`
  margin-bottom: 4px;
`;

const StatusBox = styled.View`
  flex-direction: row;
  align-items: center;
`
const StatusText = styled.View`
  margin-right: 5px;
`


const DateDetailBox = styled.View`
  flex-direction: row;
  justify-content: space-between;

`
const DetailWrap = styled.Pressable`
flex-direction:row;
align-items:center;
`;

const ArrowRightIcon = styled(ArrowRight)`
margin-left:4px;
`;