import {  useNavigation } from "@react-navigation/native";
import React from "react"
import styled from "styled-components";

import Img from "../../../../assets/icons/Group/complete.svg";
import Button from "../../../../components/Button";
import Typography from "../../../../components/Typography";
import {PAGE_NAME as HomePageName} from '../../../Main/Bnb/Home/Main';
import {PAGE_NAME as apartApplicationCheckPageName} from '../../GroupApartment/ApartmentApplicationCheck';


export const PAGE_NAME = 'P_CREATE_GROUP_COMPLETE_MODAL';

const Pages = ({route}) => {
    
    const name = route.params.name
    
    const navigation = useNavigation();
    return (
        <Conotainer>
            <Img/>
            <Title>스팟 신청이 완료됐어요!</Title>
            <CaptionText>신청 내역은 <CaptionTextSB>마이페이지 스팟 신청내역</CaptionTextSB>에서 {'\n '}확인할 수 있어요.</CaptionText>
            <ButtonContainer>
                <Button
                    type='grey7'
                    label={"스팟 신청 내역 보기"}
                    size='half'
                    onPressEvent={()=>navigation.navigate(apartApplicationCheckPageName)}
                />
                <Button
                    type='yellow'
                    label={"확인"}
                    size='half'
                    onPressEvent={()=>navigation.navigate(HomePageName)}
                />
            </ButtonContainer>
        </Conotainer>
    )
}

export default Pages;

const Conotainer = styled.View`
    background-color: white;
    flex: 1;
    align-items: center;
    padding-top: 150px;
`
const Title = styled(Typography).attrs({text:'LargeTitle'})`
    margin-top: 10px;
    text-align: center;
    color:${({theme}) => theme.colors.grey[2]};
`

const CaptionText= styled(Typography).attrs({text:'Body05R'})`
    margin-top: 10px;
    text-align: center;
    color:${({theme}) => theme.colors.grey[4]};

`

const CaptionTextSB= styled(Typography).attrs({text:'Body05SB'})` 
    color:${({theme}) => theme.colors.grey[4]};

`

const ButtonContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  position: absolute;
  bottom: 35px;
  //margin-bottom: 24px;
  padding-left: 30px;
  padding-right: 30px;
  width:100%;
`;