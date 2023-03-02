import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import styled from 'styled-components';
import {useTheme} from 'styled-components/native';

import {
  AlreadyApartment,
  Apartment,
  Corporation,
  ApartMeal,
} from '../../../assets';
import ApartmentIcon from '../../../assets/icons/Group/apartment.svg';
import ArrowRight from '../../../assets/icons/Group/arrowRight.svg';
import CloseIcon from '../../../assets/icons/Group/close.svg';
import CorporationIcon from '../../../assets/icons/Group/corporation.svg';
import Typography from '../../../components/Typography';
import {SCREEN_NAME} from '../../../screens/Main/Bnb';
import {PAGE_NAME as GroupCreateApartmentPageName} from '../GroupApartment';
import {PAGE_NAME as ApartmentSearchPageName} from '../GroupApartment/SearchApartment';
import {PAGE_NAME as GroupCreateCorporationsPageName} from '../GroupCorporations';
export const PAGE_NAME = 'P__GROUP__CREATE';
const Pages = () => {
  const navigation = useNavigation();
  const themeApp = useTheme();
  return (
    <Wrapper>
      {/* <CloseWrap>
                <CloseIcon/>
            </CloseWrap> */}
      <Wrap>
        <BoxWrap
          onPress={() => {
            navigation.navigate(GroupCreateCorporationsPageName);
          }}>
          <MainTitle>프라이빗 스팟</MainTitle>
          <SubTitleWrap>
            <SubTitle>지정한 인원만 사용할 수{'\n'}있는 스팟 신청 </SubTitle>
          </SubTitleWrap>
          <Typography text="SmallLabel" textColor={themeApp.colors.grey[5]}>
            (관리 페이지, 식사 지원금 시스템 제공)
          </Typography>
          <ImageWrap>
            <CorporationIcon />
          </ImageWrap>
        </BoxWrap>
        <BoxWrap
          onPress={() => {
            navigation.navigate(GroupCreateApartmentPageName);
          }}>
          <MainTitle>오픈 스팟</MainTitle>
          <SubTitleWrap>
            <SubTitle>가입과 탈퇴가 자유로운{'\n'}배송 스팟 신청</SubTitle>
          </SubTitleWrap>
          <ImageWrap>
            <ApartmentIcon />
          </ImageWrap>
        </BoxWrap>
        <BoxWrap
          onPress={() => {
            navigation.navigate(ApartmentSearchPageName);
          }}>
          <MainTitle>오픈 스팟 찾기</MainTitle>
          <SubTitleWrap>
            <SubTitle>내 주변에 오픈 스팟 검색</SubTitle>
            <ArrowRight />
          </SubTitleWrap>
          <ImageWrap>
            {/* <AlreadyApartIcon/> */}
            <Image source={AlreadyApartment} style={{width: 124, height: 86}} />
          </ImageWrap>
        </BoxWrap>
      </Wrap>
      <NextView
        onPress={() => {
          navigation.navigate(SCREEN_NAME);
        }}>
        <NextText>다음에 하기</NextText>
      </NextView>
    </Wrapper>
  );
};

export default Pages;

const Wrapper = styled.SafeAreaView`
  //margin:56px 24px 50px 24px;
  margin: 24px;
  flex: 1;
`;
const BoxWrap = styled.Pressable`
  background-color: ${({theme}) => theme.colors.grey[0]};
  border-radius: 14px;
  padding: 24px 0px 20px 24px;
  margin-bottom: 16px;
  min-height: 186px;
`;

const SubTitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MainTitle = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 6px;
`;

const SubTitle = styled(Typography).attrs({text: 'Button09R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-right: 8px;
`;

const Img = styled(Image)`
  width: 124px;
  height: 86px;
`;

const ImageWrap = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  top: 72px;
  right: 0px;
`;

const NextText = styled(Typography).attrs({text: 'BottomButtonR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const NextView = styled.Pressable`
  position: absolute;
  bottom: 20px;
  width: 100%;
  justify-content: center;
  flex-direction: row;
`;

const CloseWrap = styled.View`
  margin-bottom: 24px;
`;

const Wrap = styled.View`
  margin-top: 56px;
`;
