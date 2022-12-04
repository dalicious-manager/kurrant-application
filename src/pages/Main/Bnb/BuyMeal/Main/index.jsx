import React, { useRef } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity ,ImageBackground} from "react-native";
import PagerView from 'react-native-pager-view';
import styled from 'styled-components';

import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import Button from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';
import Typography from '../../../../../components/Typography';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const Pages = ({navigation}) => {

    return (
        <SafeView>
            <Wrap showsVerticalScrollIndicator={false}>
                <CalendarWrap>
                    <Calendar/>
                </CalendarWrap>
                <Contents 
                activeOpacity={1}
                onPress={()=>{navigation.navigate(MealDetailPageName)}}>
                    <ContentsText>
                        <MakersName>[폴어스]</MakersName>
                        <MealName>리코타 치즈 샐러드</MealName>
                        <MealDsc>샐러드에 샐러드 없는 그런 샐러드에 리코타 치즈를 얹은 프리미엄 상품</MealDsc>
                        <Price>8,500원</Price>
                        <TagTextWrap>
                            <TagText>신라면 맵기</TagText>
                        </TagTextWrap>
                    </ContentsText>
                    <MealImageWrap>
                        <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                        <CartIconWrap>
                            <CartIcon/>
                        </CartIconWrap>
                    </MealImageWrap>
                </Contents>
                <Contents>
                    <ContentsText>
                        <MakersName>[폴어스]</MakersName>
                        <MealName>리코타 치즈 샐러드</MealName>
                        <MealDsc>샐러드에 샐러드 없는 그런 샐러드에 리코타 치즈를 얹은 프리미엄 상품</MealDsc>
                        <Price>8,500원</Price>
                    </ContentsText>
                    <MealImageWrap>
                        <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                        <CartIconWrap>
                            <CartIcon/>
                        </CartIconWrap>
                    </MealImageWrap>
                </Contents>
                <Contents>
                    <ContentsText>
                        <MakersName>[폴어스]</MakersName>
                        <MealName>리코타 치즈 샐러드</MealName>
                        <MealDsc>샐러드에 샐러드 없는 그런 샐러드에 리코타 치즈를 얹은 프리미엄 상품</MealDsc>
                        <Price>8,500원</Price>
                    </ContentsText>
                    <MealImageWrap>
                        <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                        <CartIconWrap>
                            <CartIcon/>
                        </CartIconWrap>
                    </MealImageWrap>
                    <BlurView/>
                    <SoldOut>품절됐어요</SoldOut>
                </Contents>
                

            </Wrap>
            <ButtonWrap>
                <Button label={'장바구니 보기'} type={'yellow'} onPressEvent={()=>{navigation.navigate(MealCartPageName)}}/>
            </ButtonWrap>
        </SafeView>
    )
}

export default Pages;

const SafeView = styled.SafeAreaView`
background-color:${props => props.theme.colors.grey[0]};
flex:1;
`;
const Wrap = styled.ScrollView`
  margin:0px 28px;
//background-color:olive;
`;

const CalendarWrap = styled.View`
width:100%;
height:100px;
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 1px;


`;

const Contents = styled.TouchableOpacity`
flex-direction:row;
padding:24px 0px 28px 0px;
justify-content:space-between;
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 1px;
align-items:center;
position:relative;
/* padding-bottom:28px; */
`;

const ContentsText = styled.View`
width:60%;
`;

export const TagTextWrap = styled.View`
background-color:${props => props.theme.colors.red[100]};
border-radius:4px;
align-self:flex-start;
padding:2px 4px;
margin-top:6px;
`;

export const TagText = styled(Typography).attrs({text:'SmallLabel'})`
color:${props => props.theme.colors.red[500]};
`;
const MealImageWrap = styled.View`
height:107px;
position:relative;
`;

const MealImage = styled.Image`
width:107px;
height:107px;
border-radius:7px;
`;

const CartIconWrap = styled.View`
width:40px;
height:40px;
background:rgba(255, 255, 255, 0.7);
backdrop-filter: blur(4px);
border-radius:50px;
align-items:center;
justify-content:center;
position:absolute;
bottom:8px;
right:8px;
`;

const BlurView = styled.View`
position:absolute;
width:100%;
height:100%;

background-color:#ffffffCC;
`;


const SoldOut = styled(Typography).attrs({text:'Title04SB'})`
position:absolute;
top:50%;
right:6%;
color:${props => props.theme.colors.grey[4]};

`;
const ButtonWrap = styled.View`
position:absolute;
bottom:35px;

`;

const MakersName = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[2]};
`;
const MealName = styled(Typography).attrs({text:'Body05SB'})`
color:${props => props.theme.colors.grey[2]};
`;

const MealDsc = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[4]};
`;

const Price = styled(MakersName)``;