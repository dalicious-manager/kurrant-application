import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text ,View,Dimensions,Linking} from "react-native"
import styled from "styled-components";

import CallIcon from "../../../../../assets/icons/Group/call.svg";
import ChatIcon from "../../../../../assets/icons/Group/chat.svg";
import Arrow from "../../../../../assets/icons/Group/detailArrow.svg";
import TextButton from "../../../../../components/TextButton";
import Typography from "../../../../../components/Typography";
import withCommas from "../../../../../utils/withCommas";
import {PAGE_NAME as CorporationEtcPageName} from "./EtcPage";

const windowWidth = Dimensions.get('window').width;
export const PAGE_NAME = "P__GROUP__CREATE__CORPORATION__APPLICATION__DETAIL" ;
const phoneNumber = 'tel:1577-9612';
const kakaoURL = 'https://pf.kakao.com/_uAxixjxb';

const Pages = ({route}) => {
    
    const user = route.params.data.user;
    const address = route.params.data.address;
    const mealDetails = route.params.data.mealDetails;
    const info = route.params.data.corporationInfo;
    const spots = route.params.data.spots;
    const option = route.params.data.option;
    const id = route.params.id[0];
    
    const navigation = useNavigation();
    return (
        <Wrap>
            <ScrollWrap showsVerticalScrollIndicator={false} >
                <ContentsWrap>
                    <HeadingWrap>
                        <Heading>담당자 정보</Heading>
                    </HeadingWrap>
                    <TitleWrap>
                        <Title>서비스 신청자명</Title>
                        <TitleContent>{user.name}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>서비스 연락처</Title>
                        <TitleContent>{user.phone}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>서비스 이메일</Title>
                        <TitleContent>{user.email}</TitleContent>
                    </TitleWrap>
                </ContentsWrap>
                <Border/>
                <ContentsWrap>
                    <HeadingWrap>
                        <Heading>기본 정보</Heading>
                    </HeadingWrap>
                    <TitleWrap>
                        <Title>서비스 이용사명</Title>
                        <TitleContent>{info.corporationName}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>주소</Title>
                        <TitleContent>{address.address1}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>나머지 주소</Title>
                        <TitleContent>{address.address2}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>기업 총 인원수</Title>
                        <TitleContent>{info.employeeCount} 명</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>서비스 이용 시작 예정일</Title>
                        <TitleContent>{info.startDate}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>식사 타입</Title>
                        <DiningTypeWrap>
                            {info?.diningTypes.map((d,idx) => (
                                <TitleContent key={idx}>{ (idx ? ', ' : '') + d }</TitleContent>
                            ))}
                        </DiningTypeWrap>
                    </TitleWrap>
                </ContentsWrap>
                    {spots.map((s,idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <Border/>
                                <ContentsWrap>
                                    <HeadingWrap>
                                        <Heading>스팟 정보({idx+1})</Heading>
                                    </HeadingWrap>
                                    <TitleWrap>
                                        <Title>스팟명</Title>
                                        <TitleContent>{s.spotName}</TitleContent>
                                    </TitleWrap>
                                    <TitleWrap>
                                        <Title>배송지</Title>
                                        <TitleContent>{s.address.address1}</TitleContent>
                                    </TitleWrap>
                                    <TitleWrap>
                                        <Title>나머지 주소</Title>
                                        <TitleContent>{s.address.address2}</TitleContent>
                                    </TitleWrap>
                                    <TitleWrap>
                                        <Title>이용할 식사 타입</Title>
                                        <DiningTypeWrap>
                                            {s.diningTypes.map((d,i)=> (
                                                <TitleContent key={i}>{ (i ? ', ' : '') + d }</TitleContent>
                                            ))}
                                        </DiningTypeWrap>
                                    </TitleWrap>
                                </ContentsWrap>
                            </React.Fragment>
                        )
                    })}
                    {mealDetails?.map((m,idx) => {
                        const garbage = option.isGarbage === true ? '사용' : '미사용';
                        const hotStorage = option.isHotStorage === true ? '사용' : '미사용';
                        const setting = option.isSetting === true ? '사용' : '미사용'
                        return (
                            <React.Fragment key={idx}>
                            <Border/>
                            <ContentsWrap>
                            <HeadingWrap>
                                <Heading>식사 정보({m.diningType})</Heading>
                            </HeadingWrap>
                            <TitleWrap>
                                <Title>배송 시간</Title>
                                <TitleContent>당일 {(m.deliveryTime).slice(0,5)}</TitleContent>
                            </TitleWrap>
                            <TitleWrap>
                                <Title>서비스 이용 요일</Title>
                                <TitleContent>{m.serviceDays}</TitleContent>
                            </TitleWrap>
                            <TitleWrap>
                                <Title>이용 예정 임직원수</Title>
                                <TitleContent>{m.expectedUserCount}명</TitleContent>
                            </TitleWrap>
                            <TitleWrap>
                                <Title>희망하는 식단 가격 범위</Title>
                                <TitleContent>{m.priceAverage}</TitleContent>
                            </TitleWrap>
                            <TitleWrap>
                                <Title>일일 회사 지원금</Title>
                                <TitleContent>{m.supportPrice === 0 ? '없음' : withCommas(m.supportPrice)+'원'}</TitleContent>
                            </TitleWrap>
                            <TitleWrap>
                                <Title>쓰레기 수거 서비스</Title>
                                <TitleContent>{garbage}</TitleContent>
                            </TitleWrap>
                            <TitleWrap>
                                <Title>온장고 설치 서비스</Title>
                                <TitleContent>{hotStorage}</TitleContent>
                            </TitleWrap>
                            <TitleWrap>
                                <Title>식사 세팅 서비스</Title>
                                <TitleContent>{setting}</TitleContent>
                            </TitleWrap>
                            <TitleWrap>
                                <Title>기타 내용</Title>
                                <TextButtonWrap >
                                    <TextButton label='내용보기' type='grey4' size='label15R' onPressEvent={()=>{navigation.navigate(CorporationEtcPageName,{data:id})}} />
                                    <ArrowIcon/>
                                </TextButtonWrap>
                            </TitleWrap>
                            </ContentsWrap>
                        </React.Fragment>
                        )
                    })}
            </ScrollWrap>
                <ButtonWrap>
                    <CallButton onPress={() => {Linking.openURL(`${phoneNumber}`)}}>
                        <CallIcon/>
                        <CallText>전화 문의</CallText>
                    </CallButton>
                    <ChatButton onPress={() => {Linking.openURL(`${kakaoURL}`)}}>
                        <ChatIcon/>
                        <ChatText>1:1 문의</ChatText>
                    </ChatButton>
                </ButtonWrap>
        </Wrap>
    )
}

export default Pages;

const Wrap = styled.SafeAreaView`
background-color:${({theme}) => theme.colors.grey[0]};
flex:1;
`;
const ScrollWrap = styled.ScrollView`
background-color:${({theme}) => theme.colors.grey[0]};
margin-bottom:50px;
`;

const Border = styled.View`
background-color:${({theme}) => theme.colors.grey[8]};
width:100%;
height:6px;
`;
const Heading = styled(Typography).attrs({text:'Body05SB'})`
color:${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[2]};
margin-top:36px;
`;

const TitleContent = styled(Typography).attrs({text:'Body05R'})`
color:${({theme}) => theme.colors.grey[4]};
margin-top:36px;
`;

const ContentsWrap = styled.View`
margin:24px;
`;

const TitleWrap = styled.View`
flex-direction:row;
justify-content:space-between;
align-items:center;
text-align:cetner;
`;

const HeadingWrap = styled.View`
flex-direction:row;
justify-content:space-between;
`;

const TextButtonWrap = styled.Pressable`
margin-top:36px;
flex-direction:row;
 align-items:center;
`;

const DiningTypeWrap = styled.View`
flex-direction:row;
text-align:center;
`;

const ArrowIcon = styled(Arrow)`
margin-left:6px;
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
