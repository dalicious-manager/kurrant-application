import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text,View } from "react-native";
import styled from "styled-components";

import Arrow from "../../../../assets/icons/Group/arrowWhite.svg";
import Pen from "../../../../assets/icons/Group/pen.svg";
import useGroupSpots from "../../../../biz/useGroupSpots/hook";
import BottomSheetSpot from "../../../../components/BottomSheetSpot";
import TextButton from "../../../../components/TextButton";
import Typography from "../../../../components/Typography";
import withCommas from "../../../../utils/withCommas";
import {PAGE_NAME as CreateGroupPageName} from "../../GroupCreate";

export const PAGE_NAME = "P__GROUP__MANAGE__DETAIL" ;
const Pages = ({route}) => {
    
    const spotId = route.params.id
    const navigation = useNavigation();
    const {groupSpotDetail,isDetailSpot,userGroupSpotCheck,isUserGroupSpotCheck} = useGroupSpots();
    const [modalVisible,setModalVisible] = useState(false);
    const [selected,setSelected] = useState();
    
    const modalOpen = () => {
        setModalVisible(true);
    }
    
    useEffect(()=>{
        async function LoadGroupDetail(){
            try {
                await groupSpotDetail(spotId); 
            } catch(err){
                alert(err)
            }
         
         
        }
        LoadGroupDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[spotId])
    return (
        <Wrap>
            
            <SpotSelect>스팟 선택</SpotSelect>
            <SpotView onPress={modalOpen}>
                <SpotName>{isDetailSpot?.spotName}</SpotName>
                <Arrow/>
            </SpotView>
            <ContentView>
                <TextView>
                    <Title>배송지</Title>
                    <ContentText>{isDetailSpot?.address}</ContentText>
                </TextView>
                {isDetailSpot.ho !== null && <TextView>
                    <Title>세부 주소</Title>
                    <HoView>
                        <ContentText>{isDetailSpot?.ho}호</ContentText>
                        <PenIcon/>
                    </HoView>
                </TextView>}
                <TextView>
                    <Title>주문 마감 / 배송 시간</Title>
                    {isDetailSpot?.mealTypeInfoList?.map((el,idx) => {
                        const diningType = el.diningType === 1 ? '아침' : el.diningType === 2 ? '점심' : '저녁'
                        return (
                            <ContentText key={idx}>{diningType} 식사(전일{el.lastOrderTime} / 당일{el.deliveryTime})</ContentText>
                        )
                    })}
                </TextView>
                <TextView>
                    <Title>회사 지원금</Title>
                    {isDetailSpot?.mealTypeInfoList?.map((el,idx) => {
                        const diningType = el.diningType === 1 ? '아침' : el.diningType === 2 ? '점심' : '저녁'
                        return (
                            <ContentText key={idx}>{diningType} 식사 ({withCommas(el.supportPrice)})원</ContentText>
                        )
                    })}
                </TextView>
                <TextView>
                    <Title>그룹명</Title>
                    <ContentText>{isDetailSpot?.clientName}</ContentText>
                    <Withdraw>
                        <TextButton size='label13R' type='grey5' label='그룹 탈퇴'/>
                    </Withdraw>
                </TextView>
            </ContentView>
            <AddSpotWrap onPress={() => navigation.navigate(CreateGroupPageName)}>
                <AddSpotText>다른 그룹 신청/추가</AddSpotText>
            </AddSpotWrap>
            <BottomSheetSpot modalVisible={modalVisible} setModalVisible={setModalVisible} 
            title='스팟 선택' data={isUserGroupSpotCheck} selected={selected} setSelected={setSelected} 
            // onPressEvent={(id)=>{goDetailPage(id)}}
            />
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.View`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
padding:0px 24px;
align-items:center;
`;

const SpotView = styled.Pressable`
flex-direction:row;
justify-content:space-between;
align-items:center;
padding:16px 24px;
background-color:${({theme}) => theme.colors.grey[2]};
border-radius:14px;
width:100%;
margin-bottom:16px;
`;

const ContentView = styled.View`
width:100%;
padding:24px 24px 0px 24px;
background-color:white;
border-radius:14px;
border:1px solid ${({theme}) => theme.colors.grey[7]};
position:relative;
`;

const TextView = styled.View`
margin-bottom:20px;
`;

const AddSpotWrap = styled.Pressable`
position:absolute;
bottom:56px;
`;

const Withdraw = styled.View`
position:absolute;
bottom:0;
right:0;
`;

const SpotSelect = styled(Typography).attrs({text:'Title04SB'})`
color:${({theme}) => theme.colors.grey[2]};
margin-bottom:24px;
margin-top:40px;
`;

const SpotName = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[0]};
`;

const Title = styled(Typography).attrs({text:'Body06R'})`
color:${({theme}) => theme.colors.grey[4]};
`;

const ContentText = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[1]};
`;

const AddSpotText = styled(Typography).attrs({text:'Body06R'})`
color:${({theme}) => theme.colors.grey[3]};
text-decoration:underline;
text-decoration-color:${({theme}) => theme.colors.grey[3]};
`;

const HoView  = styled.View`
flex-direction:row;
align-items:center;
`;

const PenIcon = styled(Pen)`
margin-left:4px;
`;