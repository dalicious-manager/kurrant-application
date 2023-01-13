import { useNavigation } from "@react-navigation/native";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { Alert, Text } from "react-native";
import styled from "styled-components";

import Plus from "../../../../../assets/icons/Group/plus.svg";
import SpotDelete from "../../../../../assets/icons/Group/spotDelete.svg"
import { corpApplicationSpotsAtom, corpApplicationTotalSpotAtom } from "../../../../../biz/useCorporationApplication/store";
import Button from "../../../../../components/Button";
import ProgressBar from "../../../../../components/ProgressBar";
import Typography from "../../../../../components/Typography";
import {PAGE_NAME as CorpApplicationSpotPageName } from "../FourthPage/Pages";
import {PAGE_NAME as CorporationApplicationLastPageName} from "../LastPage";
import { Title } from "../ThirdPage";

export const PAGE_NAME = "P__GROUP__CREATE__COR__APPLICATION__FOURTH" ;
const Pages = () => {

    const navigation = useNavigation();
    
    const [isTotalSpot,SetTotalSpot] = useAtom(corpApplicationTotalSpotAtom);
    console.log(isTotalSpot,'페이지 4')

    const spotDelete = (name) => {
            Alert.alert(
              "스팟 삭제",
              "등록한 스팟 정보가 사라집니다. \n 정말 삭제하시겠어요?",
              [
                {
                  text:'아니요',
                  onPress:() => {},
                  
                },
                {
                  text:'삭제',
                  onPress:() => {
                    SetTotalSpot(isTotalSpot?.filter(el => el.spotName !== name));
                  },
                  style:'destructive'
                }
              ]
            )
    }


    return (
        <Wrap>
            <ProgressBar progress={4}/>
                <ContainerWrap>
                    <Container>
                        <Title>스팟(배송지)</Title>
                        {isTotalSpot?.map((n,i) => {
                            return (
                                <Spot key={i}>
                                    <SpotName>{n.spotName}</SpotName>
                                    <SpotDelete onPress={()=>{spotDelete(n.spotName)}}/>
                                </Spot>
                            )
                        })}
                        
                        <ApplicationSpot onPress={()=>{navigation.navigate(CorpApplicationSpotPageName)}}>
                            <Plus/>
                        </ApplicationSpot>
                    
                    </Container>
                </ContainerWrap>

            <ButtonWrap>
                <Button label={'스팟 개설 신청'} onPressEvent={()=>{navigation.navigate(CorporationApplicationLastPageName)}}/>
            </ButtonWrap>
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.View`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;

const ContainerWrap = styled.View`
margin:0px 24px;
margin-top:40px;
`;

const Container = styled.View`
margin-bottom:40px;
`;

const ApplicationSpot = styled.Pressable`
background-color:${({theme}) => theme.colors.grey[8]};
border-radius:14px;
width:100%;
min-height:56px;
align-items:center;
justify-content:center;
`;

const Spot = styled.View`
background-color:${({theme}) => theme.colors.grey[0]};
border:1px solid ${({theme}) => theme.colors.grey[7]};
border-radius:14px;
width:100%;
min-height:56px;
flex-direction:row;
padding:16px 20px;
justify-content:space-between;
align-items:center;
margin-bottom:16px;
`;

const ButtonWrap = styled.View`
padding:0px 20px;
position:absolute;
bottom:35px;
`;

const SpotName = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[2]};
`;