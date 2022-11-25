import React from 'react';
import { Image, SafeAreaView, Text, View } from "react-native";
import styled from 'styled-components';

import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import Calendar from '../../../../../components/Calendar';
export const PAGE_NAME = 'BUY_MEAL_PAGE';
const Pages = () => {

    return (
        <SafeView>
            <Wrap>
            
                <Contents>
                    <ContentsText>
                        <Text>[폴어스]</Text>
                        <Text>리코타 치즈 샐러드</Text>
                        <Text>샐러드에 샐러드 없는 그런 샐러드에 리코타 치즈를 얹은 프리미엄 상품</Text>
                        <Text>8,500원</Text>
                        <View>
                            <TagText>신라면 맵기</TagText>
                        </View>
                    </ContentsText>
                    <MealImageWrap>
                        <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                        <CartIconWrap>
                            <CartIcon/>
                        </CartIconWrap>
                    </MealImageWrap>
                </Contents>
                <Calendar/>
            </Wrap>
        
        </SafeView>
    )
}

export default Pages;

const SafeView = styled.SafeAreaView`
background-color:${props => props.theme.colors.grey[0]};
flex:1;
`;
const Wrap = styled.View`
//margin:0px 28px;
`;

const Contents = styled.View`
flex-direction:row;
//width:100%;
margin:28px;
justify-content:space-between;
border-bottom-color: ${props => props.theme.colors.grey[100]};
border-bottom-width: 1;
align-items:center;
//background-color: gold;
`;

const ContentsText = styled.View`
width:60%;
`;

const TagText = styled.Text`
color:${props => props.theme.colors.red[500]};
background-color:${props => props.theme.colors.red[100]};
border-radius:4px;

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