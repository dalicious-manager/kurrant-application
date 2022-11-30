import React from "react";
import { View ,Text, SafeAreaView, StatusBar, TouchableOpacity, Animated } from "react-native";
import styled from "styled-components";

import QuestionIcon from '../../../../../assets/icons/MealCart/question.svg';
import StartIcon from '../../../../../assets/icons/star.svg';
import Typography from "../../../../../components/Typography";
import useAnimatedHeaderTitle from "../../../../../hook/useAnimatedHeaderTitle";
import { TagText, TagTextWrap } from "../../BuyMeal/Main";
import {PAGE_NAME as MealInformationPageName} from '../../MealDetail/Page';

export const PAGE_NAME = 'MEAL_DEATAIL_PAGE';

const Pages = ({navigation}) =>{

    const { scrollY } = useAnimatedHeaderTitle({ title: 'Home', triggerPoint: 30 });

    const handleScroll = Animated.event(
        [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
        { useNativeDriver: false }
    )

    return (

            <Wrap
             onScroll = { handleScroll }
             scrollEventThrottle={16}
            >
                    <StatusBar barStyle='light-content'/>
                    <MealImage source={{uri:'https://cdn.mindgil.com/news/photo/202004/69068_2873_1455.jpg'}}/>
                <Content>
                    <View>
                        <MakersName>일품만찬</MakersName>
                        <MealTitle>맛있는 한식 도시락</MealTitle>
                        <Line>
                            <ReviewWrap>
                                <StartIcon/>
                                <ReviewPoint>4.0</ReviewPoint>
                                <ReviewCount>(132)</ReviewCount>
                            </ReviewWrap>
                            <InformationWrap
                            activeOpacity={1}
                            onPress={()=>{navigation.navigate(MealInformationPageName)}}
                            >
                                <InformationText>알레르기/원산지</InformationText>
                            </InformationWrap>
                        </Line>
                        <MealDsc>
                            샤브육수, 샤브야채, 소고기, 소스4종, 칼국수, 그날의 서비수
                        </MealDsc>
                        <TagTextWrap>
                            <TagText>
                                신라면 맵기
                            </TagText>
                        </TagTextWrap>
                        <PriceTitleWrap>
                            <PriceTitle>최종 판매가</PriceTitle>
                            <QuestionIcon/>
                        </PriceTitleWrap>
                        <PriceWrap>
                            <Percent>20%</Percent>
                            <SalePrice>7,500원</SalePrice>
                            <Price>15,000원</Price>
                        </PriceWrap>
                    </View>
                </Content>
                <Content>
                    <Text>할인 내역</Text>
                    <Text>배송 정보</Text>
                </Content>
            </Wrap>
         
    )
}
export default Pages;

const Wrap = styled.ScrollView`
background-color:${props => props.theme.colors.grey[0]};
`;

const Content = styled.View`
border-bottom-color:${props => props.theme.colors.grey[8]};
border-bottom-width:6px;
padding: 24px 24px 16px 24px;
`;

const MealImage = styled.Image`
width:100%;
height:380px;
`;

const Line = styled.View`
flex-direction:row;
justify-content:space-between;
`;

const ReviewWrap = styled.View`
flex-direction:row;
align-items:center;
margin-bottom:10px;
`;

const InformationWrap = styled.TouchableOpacity`
border: 1px solid ${props => props.theme.colors.grey[7]};
border-radius: 7px;
padding: 5px 12px 4px 12px;
align-self:flex-start;
`;

const PriceTitleWrap = styled.View`
flex-direction:row;
align-items:center;
margin-top:24px;
`;
const PriceWrap = styled.View`
flex-direction:row;
align-items:center;
text-align:center;
`;

const MakersName = styled(Typography).attrs({text:'Body06SB'})`
color:${props => props.theme.colors.grey[2]};
`;

const MealTitle = styled(Typography).attrs({text:'LargeTitle'})`
color:${props => props.theme.colors.grey[2]};
margin-bottom:8px;
`;

const ReviewPoint = styled(Typography).attrs({text:'Body05SB'})`
color:${props => props.theme.colors.grey[2]};
margin-left:4px;
`;

const ReviewCount = styled(Typography).attrs({text:'Body05R'})`
color:${props => props.theme.colors.grey[2]};
margin-left:4px;
`;

const InformationText = styled(Typography).attrs({text:'ButtonSB'})`
color:${props => props.theme.colors.grey[3]};
`;

const MealDsc = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.grey[4]};
`;

const PriceTitle = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[2]};
`;

const Percent = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.red[500]};
margin-right:4px;
`;

const SalePrice = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.grey[2]};
margin-right:4px;
`;

const Price = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.grey[5]};
text-decoration:line-through;
text-decoration-color:${props => props.theme.colors.grey[5]};
`;