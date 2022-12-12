import React, { useRef, forwardRef,useState } from 'react';
import {useForm} from 'react-hook-form';
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity ,ImageBackground, Pressable,Dimensions} from "react-native";
import PagerView from 'react-native-pager-view';
import styled from 'styled-components';

import CartIcon from '../../../../../assets/icons/BuyMeal/cartBlur.svg';
import Button from '../../../../../components/Button';
import Calendar from '../../../../../components/Calendar';
import Lable from '../../../../../components/Label';
import MembershipBar from '../../../../../components/MembershipBar';
import Typography from '../../../../../components/Typography';
import {PAGE_NAME as MealCartPageName} from '../../MealCart/Main';
import {PAGE_NAME as MealDetailPageName} from '../../MealDetail/Main';

export const PAGE_NAME = 'BUY_MEAL_PAGE';

const screenHeight = Dimensions.get('window').height;

const Pages = ({navigation}) => {
    
    const dinningRef = useRef();
    const [press,setPress] = useState('focus');
    
    return (
        <SafeView>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <MembershipBar/> */}
                <CalendarWrap>
                    <Calendar BooleanValue type={'grey2'} color={'white'} size={'Body05R'}/>
                </CalendarWrap>
                <PagerViewWrap>
                    <ProgressWrap>
                        <View style={{alignItems:'center'}}>
                            <View >
                                <ProgressBar/>
                                <ProgressCircle/>
                            </View>
                            <Progress>
                                <ProgressText onPress={() => dinningRef.current.setPage(0)}>아침</ProgressText>
                                <ProgressText onPress={() => dinningRef.current.setPage(1)}>점심</ProgressText>
                                <ProgressText onPress={() => dinningRef.current.setPage(2)}>저녁</ProgressText>
                            </Progress>
                        </View>
                    </ProgressWrap>
                    <Pager ref={dinningRef} initialPage={1}>
                        <View key="1">
                            <Contents 
                            onPress={()=>{navigation.navigate(MealDetailPageName)}}>
                                <ContentsText>
                                    <MakersName>[폴어스]</MakersName>
                                    <MealName>리코타 치즈 샐러드</MealName>
                                    <MealDsc>샐러드에 샐러드 없는 그런 샐러드에 리코타 치즈를 얹은 프리미엄 상품</MealDsc>
                                    <Price>8,500원</Price>
                                    <Lable label='신라면 맵기'/>
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
                                <View style={{backgroundColor:'gold', width:'100%',height:'100%',position:'absolute'}}/>
                                {/* <BlurView/>
                                <SoldOut>품절됐어요</SoldOut> */}
                            </Contents>
                        </View>
                        <View key="2">
                            <Contents 
                            activeOpacity={1}
                            onPress={()=>{navigation.navigate(MealDetailPageName)}}>
                                <ContentsText>
                                    <MakersName>[폴어스]</MakersName>
                                    <MealName>리코타 치즈 샐러드</MealName>
                                    <MealDsc>샐러드에 샐러드 없는 그런 샐러드에 리코타 치즈를 얹은 프리미엄 상품</MealDsc>
                                    <Price>8,500원</Price>
                                    <Lable label='신라면 맵기'/>
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
                        </View>
                        <View key="3">
                            <Contents 
                            activeOpacity={1}
                            onPress={()=>{navigation.navigate(MealDetailPageName)}}>
                                <ContentsText>
                                    <MakersName>[폴어스]</MakersName>
                                    <MealName>리코타 치즈 샐러드</MealName>
                                    <MealDsc>샐러드에 샐러드 없는 그런 샐러드에 리코타 치즈를 얹은 프리미엄 상품</MealDsc>
                                    <Price>8,500원</Price>
                                    <Lable label='신라면 맵기'/>
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
                        </View>
                    </Pager> 
                </PagerViewWrap>
             
                {/* <Contents 
                    activeOpacity={1}
                    onPress={()=>{navigation.navigate(MealDetailPageName)}}>
                        <ContentsText>
                            <MakersName>[폴어스]</MakersName>
                            <MealName>리코타 치즈 샐러드</MealName>
                            <MealDsc>샐러드에 샐러드 없는 그런 샐러드에 리코타 치즈를 얹은 프리미엄 상품</MealDsc>
                            <Price>8,500원</Price>
                            <Lable label='신라면 맵기'/>
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
                    </Contents> */}
               
            </ScrollView>
            
            <ButtonWrap>
                <Button label={'장바구니 보기'} type={'yellow'} onPressEvent={()=>{navigation.navigate(MealCartPageName)}}/>
            </ButtonWrap>
        </SafeView>
        
    )
}

export default Pages;

const SafeView = styled.View` 
background-color:${props => props.theme.colors.grey[0]};
flex:1;
`;

const CalendarWrap = styled.View`
margin:0px 28px;
height:120px;
border-bottom-color: ${props => props.theme.colors.grey[8]};
border-bottom-width: 1px;
//background-color:gold;
`;

const PagerViewWrap = styled.View`
height:${screenHeight}px;
`;

const ProgressWrap = styled.View`
flex-direction:row;
align-items:center;
justify-content:center;
`;

const Progress = styled.View`
flex-direction:row;
justify-content:space-between;
width:111px;
`;

const ProgressBar = styled.View`
width:87px;
height:2px;
margin:9px 0px;
background-color:${props => props.theme.colors.grey[2]};
`;

const ProgressCircle = styled.View`
width:16px;
height:16px;
border-radius:50px;
background-color:${props => props.theme.colors.grey[0]};
position:absolute;
`;

const Pager = styled(PagerView)`
flex:1;
`;

const Contents = styled.Pressable`
margin: 0px 28px;
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

const MealImageWrap = styled.View`
//height:107px;
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

const Price = styled(MakersName)`
margin-bottom:6px;
`;

const ProgressText = styled(Typography).attrs({text:'CaptionSB'})`
color:${props => props.theme.colors.grey[2]};
`;