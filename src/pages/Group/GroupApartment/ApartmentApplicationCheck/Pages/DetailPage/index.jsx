import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text ,View} from "react-native"
import styled from "styled-components";

import CallIcon from "../../../../../../assets/icons/Group/call.svg";
import ChatIcon from "../../../../../../assets/icons/Group/chat.svg";
import Arrow from "../../../../../../assets/icons/Group/detailArrow.svg";
import TextButton from "../../../../../../components/TextButton";
import Typography from "../../../../../../components/Typography";
import { ButtonWrap, CallButton, CallText, ChatButton, ChatText } from "../../../ApartmentApplicationCheck";
import {PAGE_NAME as ApartmentApplicationEtcPageName} from '../../Pages/DetailPage/EtcPage';

export const PAGE_NAME = "P__GROUP__CREATE__APARTMENT__APPLICATION__DETAIL" ;
const Pages = ({route}) => {
    
    const user = route.params.data.user;
    const address = route.params.data.address;
    const info = route.params.data.info;
    const meal = route.params.data.meal;
    const id = route.params.id[0];
    
    const navigation = useNavigation();
    return (
        <Wrap>
            <ScrollWrap showsVerticalScrollIndicator={false} >
                <ContentsWrap>
                    <HeadingWrap>
                        <Heading>신청자 정보</Heading>
                    </HeadingWrap>
                    <TitleWrap>
                        <Title>서비스 신청자명</Title>
                        <TitleContent>{user?.name}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>서비스 연락처</Title>
                        <TitleContent>{user?.phone}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>서비스 이메일</Title>
                        <TitleContent>{user?.email}</TitleContent>
                    </TitleWrap>
                </ContentsWrap>
                <Border/>
                <ContentsWrap>
                    <HeadingWrap>
                        <Heading>기본 정보</Heading>
                    </HeadingWrap>
                    <TitleWrap>
                        <Title>아파트명</Title>
                        <TitleContent>{info?.apartmentName}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>주소</Title>
                        <TitleContent>{address?.address1}({address?.address2})</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>단지 총 세대수</Title>
                        <TitleContent>{info?.familyCount}개</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>아파트 단지내 동 개수</Title>
                        <TitleContent>{info?.dongCount}개</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>서비스 이용 시작 예정일</Title>
                        <TitleContent>{info?.serviceStartDate}</TitleContent>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>식사 타입</Title>
                        <DiningTypeWrap>
                            {info?.diningTypes.map((d,idx)=> (
                                <TitleContent key={idx}>{ (idx ? ', ' : '') + d }</TitleContent>
                            ))}
                        </DiningTypeWrap>
                    </TitleWrap>
                    <TitleWrap>
                        <Title>기타 내용</Title>
                        <TextButtonWrap >
                            <TextButton label='내용보기' type='grey4' size='label15R' onPressEvent={()=>{navigation.navigate(ApartmentApplicationEtcPageName,{data:id})}} />
                            <ArrowIcon/>
                        </TextButtonWrap>
                    </TitleWrap>
                </ContentsWrap>
                
                    {meal?.map((m,idx) => (
                        <React.Fragment key={idx}>
                            <Border/>
                            <ContentsWrap>
                            <HeadingWrap>
                                <Heading>{m.diningType} 식사 정보</Heading>
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
                            <Title>서비스 이용 예상 세대수</Title>
                                <TitleContent>{m.expectedUserCount}세대</TitleContent>
                            </TitleWrap>
                            </ContentsWrap>
                        </React.Fragment>
                    ))}

                
            </ScrollWrap>
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