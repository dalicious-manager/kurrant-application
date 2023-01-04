import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import React, { useLayoutEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SafeAreaView, Text ,View} from "react-native";
import styled from "styled-components";

import Arrow from "../../../../../assets/icons/Spot/arrowRight.svg";
import { isApartMealInfoAtom } from "../../../../../biz/useApartApplication/store";
import Button from "../../../../../components/Button";
import MealButton from "../../../../../components/ButtonMealType";
import Label from "../../../../../components/Label";
import ProgressBar from "../../../../../components/ProgressBar2";
import Typography from "../../../../../components/Typography";
import {PAGE_NAME as ApartmentApplicationLastPageName} from '../LastPage';
import {PAGE_NAME as ApartmentApplicationInformationPageName} from './Pages/index';

export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__THIRD" ;
const Pages = () => {
    const navigation = useNavigation();

    const [touch,setTouch] = useState(false);
    // const [touch2,setTouch2] = useState(false);
    // const [touch3,setTouch3] = useState(false);
    const mealInfo = useAtomValue(isApartMealInfoAtom);
    
    const inputStyle = {
        marginBottom:16,
      }
    

    return (
        <Wrap>
            <ProgressBar progress={3}/>
                <ContainerWrap>
                    <Container>
                        <Title>식사 타입</Title>
                            <MealButtonWrap>
                                <MealButton label={'아침'} touch={touch} setTouch={setTouch} />
                                <MealButton label={'점심'} disabled={true}  />
                                <MealButton label={'저녁'} disabled={true} />
                            </MealButtonWrap>
                    </Container>
                    {touch && <Container>
                        <Title>식사 정보</Title>
                        <InfoBar onPress={()=>{navigation.navigate(ApartmentApplicationInformationPageName)}}>
                            <DiningType>아침</DiningType>
                            <InfoBarView>
                                {mealInfo === null ? <Label type='blue' label='입력하기' size='labelM' /> :<Label type='grey8' label='입력완료' size='labelM' />}
                                <ArrowIcon/>
                            </InfoBarView>
                        </InfoBar>
                    </Container>}
                </ContainerWrap>
            <ButtonWrap>
                <Button label={'다음'} onPressEvent={()=>{navigation.navigate(ApartmentApplicationLastPageName)}}/>
            </ButtonWrap>
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.SafeAreaView`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;

const ButtonWrap = styled.View`
padding:0px 20px;
position:absolute;
bottom:35px;
`;

const MealButtonWrap = styled.View`
flex-direction:row;
justify-content:space-between;
`;

const ContainerWrap = styled.View`
margin:0px 24px;
`;

const Container = styled.View`
margin-bottom:40px;
`;

export const Title = styled(Typography).attrs({text:'Body06R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-bottom:8px;
`;

const InfoBar = styled.Pressable`
border: 1px solid ${({theme}) => theme.colors.grey[7]};
padding: 16px 20px;
border-radius:14px;
flex-direction:row;
align-items:center;
justify-content:space-between;
`;

const InfoBarView = styled.View`
flex-direction:row;
align-items:center;
`;

const DiningType = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[2]};
`;

const ArrowIcon = styled(Arrow)`
margin-left:12px;
`;