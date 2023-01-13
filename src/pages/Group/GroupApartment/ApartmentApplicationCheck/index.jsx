import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {Dimensions,Linking} from "react-native";
import styled from "styled-components";

import SkeletonUI from "./Skeleton";
import ArrowDown from "../../../../assets/icons/Group/arrowDown.svg";
import CallIcon from "../../../../assets/icons/Group/call.svg";
import ChatIcon from "../../../../assets/icons/Group/chat.svg";
import ArrowRight from "../../../../assets/icons/Group/checkArrow.svg";
import useApartApplication from "../../../../biz/useApartApplication/hook";
import useCorporationApplication from "../../../../biz/useCorporationApplication/hook";
import useGroupSpots from "../../../../biz/useGroupSpots/hook";
import BottomDate from "../../../../components/BottomDate";
import ProgressBar from "../../../../components/ProgressBarSpot";
import TextButton from "../../../../components/TextButton";
import Typography from "../../../../components/Typography";
import {PAGE_NAME as CorporationApplicationDetailPageName} from '../../GroupCorporations/CorporationApplicationCheck/DetailPage';
import {PAGE_NAME as ApartmentApplicationDetailPageName} from '../ApartmentApplicationCheck/Pages/DetailPage';
import {PAGE_NAME as ApartmentApplicationRejectPageName} from '../ApartmentApplicationCheck/Pages/RejectPage';

const windowWidth = Dimensions.get('window').width;
export const PAGE_NAME = "P__GROUP__CHECK__APPLICATION__APART" ;
const Pages = () => {

    const navigation = useNavigation();
    const [modalVisible,setModalVisible] = useState(false);
    const [selected,setSelected] = useState();
    const {apartApplicationCheck,isApartCheck,isApartLoading} = useApartApplication();
    const {isApplicationList, applicationList} = useGroupSpots();
    const {corpApplicationCheck, isCorpCheck} = useCorporationApplication();
    const [state,setState] = useState();
    

    const datePress = () => {
        setModalVisible(true)
    }
    const selectId = Number(selected?.substr(1));
    const selectType = Number(selected?.charAt(0));
    const loadData = isApplicationList[0]
    const recentType = loadData?.clientType;
    const recentId = loadData?.id
    console.log(selectType,'-로드타입',typeof(state),state,'-state',recentType,'-최신타입')

    const user = isApartCheck.user;
    const info = isApartCheck.info;
    const name = info?.apartmentName;
    const propsId = isApplicationList.filter(el => el.name === name);

    const corpUser = isCorpCheck.user;
    const corpInfo = isCorpCheck.corporationInfo;
    const corpName = corpInfo?.corporationName;
    const propsCorpId = isApplicationList.filter(el => el.name === corpName);
    
    useEffect(() => {
        async function LoadList(){
            await applicationList();
            
        }
        LoadList();
        
        async function LoadRecentList(){
            
            if(selected === undefined){
                if(recentType === 0){
                    await apartApplicationCheck(recentId);
                }else {
                    await corpApplicationCheck(recentId)
                }
                setState(recentType)
            
            } else if (selectType === 0){
                await apartApplicationCheck(selectId);
                setState(selectType)
            } else {
                await corpApplicationCheck(selectId);
                setState(selectType)
            }
            
            
        }
        LoadRecentList();
       
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectId, selectType, recentId, recentType, selected]);

    if(isApartLoading){
        return <SkeletonUI/>
    }


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
                            {(state === 0 && isApartCheck.progressStatus === 0 || state === 1 && isCorpCheck.progressStatus === 0) && <ProgressBar progress={1}/> }
                            {(state === 0 && isApartCheck.progressStatus === 1 || state === 1 && isCorpCheck.progressStatus === 1) && <ProgressBar progress={2}/> }
                            {(state === 0 && isApartCheck.progressStatus === 2 || state === 1 && isCorpCheck.progressStatus === 2) && <ProgressBar progress={3}/> }
                            {(state === 0 && isApartCheck.progressStatus === 3 || state === 1 && isCorpCheck.progressStatus === 3) && <ProgressBar progress={4}/> }
                        </ProgressBarWrap>
                        <ProgressTitleWrap>
                            <ProgressTitle>스팟 개설 신청</ProgressTitle>
                            <ProgressTitle>운영 사항 협의</ProgressTitle>
                           {(state === 0 && isApartCheck.progressStatus !== 3 || state === 1 && isCorpCheck.progressStatus !== 3) && <ProgressTitle>스팟 개설 완료</ProgressTitle>}
                            {(state === 0 && isApartCheck.progressStatus === 3 || state === 1 && isCorpCheck.progressStatus === 3) && 
                                <>
                                    <ProgressTitle>미승인</ProgressTitle>
                                    <RejectWrap>
                                        <TextButton size={'label13R'} label={'사유 보기'} type={'redLine'} 
                                        onPressEvent={() => state === 0 ? navigation.navigate(ApartmentApplicationRejectPageName,{reason:isApartCheck.rejectedReason}) : navigation.navigate(ApartmentApplicationRejectPageName,{reason:isCorpCheck.rejectedReason})}/>
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
                            <TextButton size='label13R' label='상세보기' type='blue' 
                            onPressEvent={()=>{state === 0 ? navigation.navigate(ApartmentApplicationDetailPageName,{data:isApartCheck,id:propsId}) : navigation.navigate(CorporationApplicationDetailPageName,{data:isCorpCheck,id:propsCorpId})}}/>
                            <ArrowRightIcon/>
                        </DetailWrap>
                    </HeadingWrap>
                    <TitleWrap>
                        <Title>{state === 0 ? '서비스 이용 아파트명' : '서비스 이용사명'}</Title>
                        <TitleContent>{state === 0 ? `${name}` : `${corpName}`}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>서비스 신청자명</Title>
                        <TitleContent>{state === 0 ? `${user?.name}` : `${corpUser?.name}`}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>신청자 연락처</Title>
                        <TitleContent>{state === 0 ? `${user?.phone}` : `${corpUser?.phone}`}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>신청자 이메일</Title>
                        <TitleContent>{state === 0 ? `${user?.email}` : `${corpUser?.email}`}</TitleContent>
                    </TitleWrap>
                </ContentsWrap>
            </ScrollViewWrap>
                <ButtonWrap>
                    <CallButton onPress={() => {Linking.openURL(`tel:1577-9612`)}}>
                        <CallIcon/>
                        <CallText>전화 문의</CallText>
                    </CallButton>
                    <ChatButton>
                        <ChatIcon/>
                        <ChatText>1:1 문의</ChatText>
                    </ChatButton>
                </ButtonWrap>
                <BottomDate title='신청일' modalVisible={modalVisible} setModalVisible={setModalVisible} data={isApplicationList} setSelected={setSelected} selected={selected}/>
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