import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text ,View, Dimensions} from "react-native";
import styled from "styled-components";

import ArrowDown from "../../../../assets/icons/Group/arrowDown.svg";
import CallIcon from "../../../../assets/icons/Group/call.svg";
import ChatIcon from "../../../../assets/icons/Group/chat.svg";
import ArrowRight from "../../../../assets/icons/Group/checkArrow.svg";
import useApartApplication from "../../../../biz/useApartApplication/hook";
import BottomDate from "../../../../components/BottomDate";
import ProgressBar from "../../../../components/ProgressBarSpot";
import TextButton from "../../../../components/TextButton";
import Typography from "../../../../components/Typography";
import { getStorage } from "../../../../utils/asyncStorage";
import {PAGE_NAME as ApartmentApplicationDetailPageName} from '../ApartmentApplicationCheck/Pages/DetailPage';
import {PAGE_NAME as ApartmentApplicationRejectPageName} from '../ApartmentApplicationCheck/Pages/RejectPage';

const windowWidth = Dimensions.get('window').width;
export const PAGE_NAME = "P__GROUP__CHECK__APPLICATION__APART" ;
const Pages = () => {

    const navigation = useNavigation();
    const [modalVisible,setModalVisible] = useState(false);
    const [selected,setSelected] = useState();
    const {apartApplicationCheck,apartApplicationList,isApartCheck,isApartApplicationList} = useApartApplication();
    
    const datePress = () => {
        setModalVisible(true)
    }
    const loadId = selected?.substr(1);

    
    useEffect(() => {
       async function LoadCheckList() {
           const getId =  await getStorage('applicationId');
           
           if(selected === undefined){
               await apartApplicationCheck(getId);
               await apartApplicationList();
           } else {
                await apartApplicationCheck(loadId);
                await apartApplicationList();
           }
        }

        LoadCheckList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loadId])
    
    const user = isApartCheck.user;
    const info = isApartCheck.info;
    const name = isApartCheck.info?.apartmentName;
    const propsId = isApartApplicationList.filter(el => el.name === name);
    console.log(isApartCheck)
    return (
        <Wrapper>
            <ScrollViewWrap showsVerticalScrollIndicator={false} >
                <ApplicationDate>
                    <Heading>신청일</Heading>
                    <DateWrap onPress={datePress}>
                        <DateText>{isApartCheck.date}</DateText>
                        <ArrowDown/>
                    </DateWrap>
                </ApplicationDate>
                <Border/>
                <ContentsWrap>
                    <Heading>진행 상황</Heading>
                    <ProgressAllWrap >
                        <ProgressBarWrap >
                            {isApartCheck.progressStatus === 1 && <ProgressBar progress={1}/> }
                            {isApartCheck.progressStatus === 2 && <ProgressBar progress={2}/> }
                            {isApartCheck.progressStatus === 3 && <ProgressBar progress={3}/> }
                            {isApartCheck.progressStatus === 4 && <ProgressBar progress={4}/> }
                        </ProgressBarWrap>
                        <ProgressTitleWrap>
                            <ProgressTitle>스팟 개설 신청</ProgressTitle>
                            <ProgressTitle>운영 사항 협의</ProgressTitle>
                           {isApartCheck.progressStatus !== 4 && <ProgressTitle>스팟 개설 완료</ProgressTitle>}
                            {isApartCheck.progressStatus === 4 && 
                                <>
                                    <ProgressTitle>미승인</ProgressTitle>
                                    <RejectWrap>
                                        <TextButton size={'label13R'} label={'사유 보기'} type={'redLine'} onPressEvent={() => {navigation.navigate(ApartmentApplicationRejectPageName,{reason:isApartCheck.rejectedReason})}}/>
                                    </RejectWrap>
                                </>
                            }
                          
                        </ProgressTitleWrap>
                    </ProgressAllWrap>
                </ContentsWrap>
                <Border/>
                <ContentsWrap>
                    <HeadingWrap>
                        <Heading>신청 정보</Heading>
                        <DetailWrap >
                            <TextButton size='label13R' label='상세보기' type='blue' onPressEvent={()=>{navigation.navigate(ApartmentApplicationDetailPageName,{data:isApartCheck,id:propsId})}}/>
                            <ArrowRightIcon/>
                        </DetailWrap>
                    </HeadingWrap>
                    <TitleWrap>
                        <Title>서비스 이용 아파트명</Title>
                        <TitleContent>{info?.apartmentName}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>서비스 신청자명</Title>
                        <TitleContent>{user?.name}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>신청자 연락처</Title>
                        <TitleContent>{user?.phone}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>신청자 이메일</Title>
                        <TitleContent>{user?.email}</TitleContent>
                    </TitleWrap>
                </ContentsWrap>
            </ScrollViewWrap>
                <ButtonWrap>
                    <CallButton>
                        <CallIcon/>
                        <CallText>전화 문의</CallText>
                    </CallButton>
                    <ChatButton>
                        <ChatIcon/>
                        <ChatText>1:1 문의</ChatText>
                    </ChatButton>
                </ButtonWrap>
                <BottomDate title='신청일' modalVisible={modalVisible} setModalVisible={setModalVisible} data={isApartApplicationList} setSelected={setSelected} selected={selected}/>
        </Wrapper>
        
    )
}

export default Pages;


const Wrapper = styled.SafeAreaView`
flex:1;
background-color:${({theme}) => theme.colors.grey[0]};
`;
const ScrollViewWrap = styled.ScrollView`
background-color:${({theme}) => theme.colors.grey[0]};

`;

const Border = styled.View`
background-color:${({theme}) => theme.colors.grey[8]};
width:100%;
height:6px;
`;
const ContentsWrap = styled.View`
margin:24px;
`;
const TitleWrap = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
`;

const HeadingWrap = styled.View`
flex-direction:row;
justify-content:space-between;
`;

const Heading = styled(Typography).attrs({text:'Body05SB'})`
color:${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-top:36px;
`;

const ProgressTitle = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[2]};
//margin-top:24px;
`;

const TitleContent = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[4]};
margin-top:36px;
`;

const DateText = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[4]};
margin-right:10px;
`;

const ProgressTitleWrap = styled.View`
height:114px;
justify-content:space-between;
width:100%;


`;

const ProgressBarWrap = styled.View`
//flex-direction:row;
`;

const DateWrap = styled.Pressable`
flex-direction:row;
align-items:center;
`;
const ProgressAllWrap = styled.View`
flex-direction:row;
align-content:center;
text-align:center;
margin-top:24px;
width:100%;

`;

export const ButtonWrap = styled.View`
flex-direction:row;
justify-content:space-between;
position:absolute;
bottom:35px;
width:${windowWidth}px;
padding:0px 20px;
`;

export const CallButton = styled.Pressable`
background-Color:${({theme}) => theme.colors.grey[0]};
padding:16px 36px;
border: 1px solid ${({theme}) => theme.colors.grey[5]};
border-radius:100px;
flex-direction:row;
justify-content:center;
align-items:center;
`;

export const ChatButton = styled.Pressable`
padding:16px 40px;
background-color:${({theme}) => theme.colors.grey[7]};
border-radius:100px;
flex-direction:row;
justify-content:center;
align-items:center;
`;

export const CallText = styled(Typography).attrs({text:'BottomButtonSB'})`
color:${({theme}) => theme.colors.grey[3]};
margin-left:10px;
`;

export const ChatText = styled(Typography).attrs({text:'BottomButtonSB'})`
color:${({theme}) => theme.colors.grey[1]};
margin-left:10px;
`;

const RejectWrap = styled.Pressable`
position:absolute;
bottom:0;
right:36px;
`;

const ApplicationDate = styled.View`
margin:24px;
flex-direction:row;
justify-content:space-between;
align-items:center;


`;

const DetailWrap = styled.Pressable`
flex-direction:row;
align-items:center;
`;

const ArrowRightIcon = styled(ArrowRight)`
margin-left:4px;
`;