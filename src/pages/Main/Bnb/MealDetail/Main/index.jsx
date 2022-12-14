
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { View ,Text, Platform,SafeAreaView, StatusBar, TouchableOpacity,NativeModules, Animated,ScrollView, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView} from "react-native";
import styled from "styled-components";

import StartIcon from '../../../../../assets/icons/star.svg';
import Button from '../../../../../components/ButtonExtendable';
import MoreButton from '../../../../../components/ButtonMore';
import KeyboardAvoiding from "../../../../../components/KeyboardAvoiding";
import Label from '../../../../../components/Label';
import Modal from '../../../../../components/Modal';
import ReviewPage from '../../../../../components/ReviewPage';
import Typography from "../../../../../components/Typography";
import useAnimatedHeaderTitle from "../../../../../hook/useAnimatedHeaderTitle";
import {PAGE_NAME as MealInformationPageName} from '../../MealDetail/Page';

export const PAGE_NAME = 'MEAL_DEATAIL_PAGE';

const Pages = () =>{

    const navigation = useNavigation();

    const [focus,setFocus] = useState(false);
    const [count, setCount] = useState(1);
    const bodyRef = useRef();

    const increasePress = () => {
        setCount(prev => Number(prev) + 1);
      };
    const decreasePress = () => {
        setCount(prev => (prev <= 1 ? 1 : prev - 1));
      };

    const { scrollY } = useAnimatedHeaderTitle({ title: '이름', triggerPoint: 30 });

    const handleScroll = Animated.event(
        [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
        { useNativeDriver: false }
    )

    const focusPress = () => {
        setFocus(true);
      };
    const blurPress = () => {
        setFocus(false);
      };

    const changeText = number => {
        setCount(number);
      };

    const PRICE = 7500;
    let result = PRICE.toLocaleString('ko-KR')

    return (
        <Wrap >
            <ScrollView
             showsVerticalScrollIndicator={false}
             onScroll = { handleScroll }
             scrollEventThrottle={16}
            >
                <View>
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
                        <Label label='신라면 맵기'/>
                        <PriceTitleWrap>
                            <PriceTitle>최종 판매가</PriceTitle>
                            <Modal/>
                        </PriceTitleWrap>
                        <PriceWrap>
                            <Percent>20%</Percent>
                            <SalePrice>{result}원</SalePrice>
                            <Price>15,000원</Price>
                        </PriceWrap>
                    </View>
                </Content>
                <Content>
                    <InfoWrap>
                        <InfoTitleView>
                            <InfoTitle>할인 내역</InfoTitle>
                        </InfoTitleView>
                        <InfoTextView>
                            <InfoTextWrap>
                                <Info>멤버십 할인</Info>
                                <Info>10%</Info>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>판매자 할인</Info>
                                <Info>20%</Info>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>기간 할인</Info>
                                <Info>5%</Info>
                            </InfoTextWrap>
                        </InfoTextView>
                    </InfoWrap>

                    <InfoWrap>
                        <InfoTitleView>
                            <InfoTitle>배송 정보</InfoTitle>
                        </InfoTitleView>
                        <InfoTextView>
                            <InfoTextWrap>
                                <Info>단체 배송</Info>
                                <Info>15,000(50개 마다 부과)</Info>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>개별 배송</Info>
                                <Info>2,200원(5개 마다 부과)</Info>
                            </InfoTextWrap>
                            <InfoTextWrap>
                                <Info>멤버십 회원</Info>
                                <Info>무료 배송</Info>
                            </InfoTextWrap>
                        </InfoTextView>
                    </InfoWrap>
                </Content>
                
                {/* 리뷰자리 */}
                <Content >
                    <View>

                 
                    
                    <ReviewPage/>
                    </View>
                </Content>
                <MoreButton/>
                </View>
                </ScrollView>

                <KeyboardAvoiding
                blurPress={blurPress}
                focus={focus}
                increasePress={increasePress}
                decreasePress={decreasePress}
                bodyRef={bodyRef}
                changeText={changeText}
                count={count}
                value={count.toString()}
                />
                {/* <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' && statusBarHeight+44 }
                >
                    <TouchableWithoutFeedback onBlur={blurPress}>
                        <KeypadInput focus={focus}>
                            <MinusIcon onPress={decreasePress}/>
                            <TextInput
                                keyboardType="number-pad"
                                //onPress={focusPress}
                                ref={bodyRef}
                                onChangeText={changeText}
                                value={count.toString()}
                                />
                            <PlusIcon onPress={increasePress}/>
                        </KeypadInput>
                    </TouchableWithoutFeedback> */}

                {!focus && <ButtonWrap>
                    <Button 
                        price={PRICE} 
                        onPressEvent={() => {bodyRef.current.focus(); focusPress()}} 
                        count={count} 
                        increasePress={increasePress}
                        decreasePress={decreasePress}
                    />
                </ButtonWrap>}
                {/* </KeyboardAvoidingView> */}
                
        </Wrap>
               
        
    )
}
export default Pages;

const Wrap = styled.SafeAreaView`
background-color:${props => props.theme.colors.grey[0]};
position:relative;
flex:1;
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

const InfoWrap = styled.View`
flex-direction:row;
`;

const InfoTitleView = styled.View`
width:20%;
`;
const InfoTextView = styled.View`
width:80%;
`;

const InfoTextWrap = styled.View`
flex-direction:row;
justify-content:space-between;
`;

const ButtonWrap = styled.View`
position:absolute;
bottom:25px;
`;

const countText = styled.TextInput`


`;
const KeypadInput= styled.View`
  height:50px;
  flex-direction:row;
  background-color:${props => props.theme.colors.grey[0]};
  justify-content:space-between;
  align-items:center;
  opacity: ${props => props.focus ? 1: 0 };
  
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

export const Percent = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.red[500]};
margin-right:4px;
`;

const SalePrice = styled(Typography).attrs({text:'Title03SB'})`
color:${props => props.theme.colors.grey[2]};
margin-right:4px;
`;

export const Price = styled(Typography).attrs({text:'Body06R'})`
color:${props => props.theme.colors.grey[5]};
text-decoration:line-through;
text-decoration-color:${props => props.theme.colors.grey[5]};
`;

const InfoTitle = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[3]};

`;

const Info = styled(Typography).attrs({text:'CaptionR'})`
color:${props => props.theme.colors.grey[4]};
margin-bottom:4px;
`;
