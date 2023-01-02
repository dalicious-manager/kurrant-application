import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,Text, SafeAreaView ,Image} from "react-native";
import styled from "styled-components";

import { AlreadyApartment, Apartment, Corporation ,ApartMeal } from "../../../assets";
import AlreadyApartIcon from "../../../assets/icons/Group/alreadyApart.svg";
import ApartmentIcon from "../../../assets/icons/Group/apartment.svg";
import ArrowRight from "../../../assets/icons/Group/arrowRight.svg";
import CloseIcon from "../../../assets/icons/Group/close.svg";
import CorporationIcon from "../../../assets/icons/Group/corporation.svg";
import Typography from "../../../components/Typography";
import { SCREEN_NAME } from "../../../screens/Main/Bnb";
import {PAGE_NAME as Home} from '../../Main/Bnb/Home/Main';
import {PAGE_NAME as GroupCreateApartmentPageName} from '../GroupApartment';

export const PAGE_NAME = "P__GROUP__CREATE" ;
const Pages = () => {

    const navigation = useNavigation();
    return (
        <Wrapper>
            {/* <CloseWrap>
                <CloseIcon/>
            </CloseWrap> */}
            <BoxWrap>
                <MainTitle>기업 식사 도입하기</MainTitle>
                <SubTitleWrap>
                    <SubTitle>신규 스팟 개설 신청 </SubTitle>
                    <ArrowRight/>
                </SubTitleWrap>
                <ImageWrap>
                    {/* <Img source={Corporation} /> */}
                    <CorporationIcon/>
                </ImageWrap>
            </BoxWrap>
            <BoxWrap onPress={()=>{navigation.navigate(GroupCreateApartmentPageName)}}>
                <MainTitle>아파트 조식 도입하기</MainTitle>
                <SubTitleWrap>
                    <SubTitle>신규 스팟 개설 신청 </SubTitle>
                    <ArrowRight/>
                </SubTitleWrap>
                <ImageWrap>
                    {/* <Img source={Apartment} /> */}
                    <ApartmentIcon/>
                </ImageWrap>
            </BoxWrap>
            <BoxWrap>
                <MainTitle>우리 아파트가 이미{"\n"}커런트밀 고객사인가요?</MainTitle>
                <SubTitleWrap>
                    <SubTitle>우리 아파트 검색</SubTitle>
                    <ArrowRight/>
                </SubTitleWrap>
                <ImageWrap>
                    <Img source={ApartMeal} />
                    {/* <AlreadyApartIcon/> */}
                </ImageWrap>
            </BoxWrap>
            <NextView onPress={() => {navigation.navigate(SCREEN_NAME)}}>
                <NextText>다음에 하기</NextText>
            </NextView>
        </Wrapper>
    )
}

export default Pages;

const Wrapper = styled.SafeAreaView`
//margin:56px 24px 50px 24px;
margin:24px;
flex:1;
`;
const BoxWrap = styled.Pressable`
background-color:${({theme}) => theme.colors.grey[0]};
border-radius:14px;
padding:24px 0px 20px 24px;
margin-bottom:16px;
min-height:186px;
`;

const SubTitleWrap = styled.View`
flex-direction:row;
align-items:center;
`;

const MainTitle = styled(Typography).attrs({text:'Title02SB'})`
color:${({theme}) => theme.colors.grey[2]};
margin-bottom:6px;
`;

const SubTitle = styled(Typography).attrs({text:'Button09R'})`
color:${({theme}) => theme.colors.grey[4]};
margin-right:8px;
`;

const Img = styled(Image)`
width:124px;
height:86px;

`;

const ImageWrap = styled.View`
flex-direction:row;
justify-content:flex-end;
position:absolute;
top:72px;
right:0px;
`;

const NextText = styled(Typography).attrs({text:'BottomButtonR'})`
color:${({theme}) => theme.colors.grey[4]};
`;

const NextView = styled.Pressable`
/* position:absolute;
bottom:0; */
width:100%;
justify-content:center;
flex-direction:row;
margin-top:24px;
`;

const CloseWrap = styled.View`
margin-bottom:24px;
`;
