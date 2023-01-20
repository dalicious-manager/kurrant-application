import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { css, useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import FastImage from 'react-native-fast-image'
import Typography from "../../../../../../../../components/Typography";
import { formattedDateAndDay, formattedDateType } from "../../../../../../../../utils/dateFormatter";
import withCommas from "../../../../../../../../utils/withCommas";
import TextButton from "../../../../../../../../components/TextButton";
import { formattedMealFoodStatus } from "../../../../../../../../utils/statusFormatter";

const {width} =Dimensions.get('screen');
const Component = ({
  serviceDate,
  makersName,
  diningType,
  name,
  count,
  price,
  foodStatus,
}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
    return (
        <OrderItemContainer >
         <DateOrderItemContentBox>
            <DateOrderItemImage>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius:7 }}
                source={{
                    uri: "https://recipe1.ezmember.co.kr/cache/recipe/2020/12/17/5dd8b5fc87e0696950f8836f6f50657e1.jpg",
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </DateOrderItemImage>
            <DateOrderItemContent>
              <TextBox>
                <ServiceDateBox>
                  <ServiceDate text="SmallLabel" textColor={themeApp.colors.grey[4]}>식사일 : {formattedDateAndDay(serviceDate)} {formattedDateType(diningType)}</ServiceDate>
                  {foodStatus === 5  && <TextButton label="주문취소" type="blue" size="label13R" />}
                  {foodStatus === 10 && <TextButton label="수령확인" type="blue" size="label13R" />}
                </ServiceDateBox>
                <Body06R19 textColor={themeApp.colors.grey[2]}>[{makersName}]{name}</Body06R19>
                <PriceBox>
                  <Body06R19 textColor={themeApp.colors.grey[4]}>{count}개</Body06R19>
                  <Typography  text="Body06SB" textColor={themeApp.colors.grey[2]}>{withCommas(price)}원</Typography>
                </PriceBox>
                <FoodStatusBox>
                  <Typography  text="Body06SB" textColor={themeApp.colors.grey[2]}>{formattedMealFoodStatus(foodStatus)}</Typography>
                </FoodStatusBox>
              </TextBox>              
            </DateOrderItemContent>
          </DateOrderItemContentBox>
      </OrderItemContainer>
    )
}

export default Component;
const OrderItemContainer = styled.View`  
  padding-bottom: 24px;
`;
const DateOrderItemContentBox = styled.View`
  padding-top: 6px;
  flex-direction: row;
  width: 100%;
  padding: 0px 24px;
`
const PriceBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateOrderItemImage = styled.View`
  width: ${width/5.5}px;
  height: ${width/5.5}px;
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
  
`;
const FoodStatusBox = styled.View`
  margin-top: 8px;
`
const ServiceDateBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`
