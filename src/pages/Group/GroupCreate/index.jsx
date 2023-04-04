import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {View, Alert, SafeAreaView, Image} from 'react-native';
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
import {isCancelSpotAtom} from '../../../biz/useGroupSpots/store';
import Typography from '../../../components/Typography';
import {SCREEN_NAME} from '../../../screens/Main/Bnb';
import {PAGE_NAME as GroupCreateApartmentPageName} from '../GroupApartment';
import {PAGE_NAME as ApartmentSearchPageName} from '../GroupApartment/SearchApartment';
import {PAGE_NAME as GroupCreateCorporationsPageName} from '../GroupCorporations';
export const PAGE_NAME = 'P__GROUP__CREATE';
const Pages = () => {
  const navigation = useNavigation();
  const themeApp = useTheme();
  const [isCancelSpot, setIsCancelSpot] = useAtom(isCancelSpotAtom);
  return (
    <Wrapper>
      {/* <CloseWrap>
                <CloseIcon/>
            </CloseWrap> */}
      <Wrap>
        <SearchBoxWrap
          onPress={() => {
            navigation.navigate(ApartmentSearchPageName);
          }}>
          <SearchTextBox>
            <Typography text="Body06R" textColor={themeApp.colors.grey[2]}>
              스팟 검색
            </Typography>
            <CenterText>
              <Typography text="LargeTitle" textColor={themeApp.colors.grey[2]}>
                내 주변에 배송{'\n'}
                받을 수 있는 스팟 검색
              </Typography>
            </CenterText>
            <Typography text="Body06SB" textColor={themeApp.colors.grey[2]}>
              #아파트 #학원 #공유오피스
            </Typography>
          </SearchTextBox>
          <ImageWrap>
            <ApartmentIcon />
          </ImageWrap>
        </SearchBoxWrap>
        <ApplyText>
          <Typography text={'Title04SB'} textColor={themeApp.colors.grey[2]}>
            신규 신청
          </Typography>
        </ApplyText>
        <ApplyContainer>
          <BoxWrap
            onPress={() => {
              navigation.navigate(GroupCreateApartmentPageName);
            }}>
            <MainTitle>오픈 스팟</MainTitle>
            <SubTitleWrap>
              <SubTitle>가입, 탈퇴가 자유로운{'\n'}배송 스팟 신청</SubTitle>
            </SubTitleWrap>
          </BoxWrap>
          <View style={{width: 11}}></View>
          <BoxWrap
            onPress={() => {
              navigation.navigate(GroupCreateCorporationsPageName);
            }}>
            <MainTitle>프라이빗 스팟</MainTitle>
            <SubTitleWrap>
              <SubTitle>지정한 인원만{'\n'}사용 가능한 스팟 신청</SubTitle>
            </SubTitleWrap>
            <Typography text="SmallLabel" textColor={themeApp.colors.grey[5]}>
              (관리 페이지, 식사 지원금{'\n'}시스템 제공)
            </Typography>
          </BoxWrap>
        </ApplyContainer>
        <NextView
          onPress={() => {
            Alert.alert(
              '스팟 선택',
              '스팟을 등록하지 않으면, 서비스 이용을 하실 수 없습니다.\n그래도 스팟 등록을 다음이 하시겠습니까?',
              [
                {
                  text: '취소',
                  onPress: async () => {},
                  style: 'destructive',
                },
                {
                  text: '확인',
                  onPress: () => {
                    setIsCancelSpot(true);
                    navigation.navigate(SCREEN_NAME);
                  },
                },
              ],
            );
          }}>
          <NextText>다음에 하기</NextText>
        </NextView>
      </Wrap>
    </Wrapper>
  );
};

export default Pages;

const Wrapper = styled.SafeAreaView`
  //margin:56px 24px 50px 24px;
  margin: 24px;
  margin-top: 12px;
  flex: 1;
`;
const BoxWrap = styled.Pressable`
  background-color: ${({theme}) => theme.colors.grey[0]};
  border-radius: 14px;
  padding: 20px;
  flex: 1;
  min-height: 158px;
`;
const SearchBoxWrap = styled.Pressable`
  background-color: ${({theme}) => theme.colors.grey[0]};
  border-radius: 14px;
  padding: 20px;
  min-height: 350px;
`;

const CenterText = styled.View`
  padding-top: 6px;
  padding-bottom: 6px;
`;
const SubTitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SearchTextBox = styled.View`
  flex: 1;
  padding-left: 4px;
`;

const MainTitle = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 6px;
`;

const SubTitle = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-right: 8px;
`;

const Img = styled(Image)`
  width: 124px;
  height: 86px;
`;

const ImageWrap = styled.View`
  flex-direction: row;
  width: 100%;
  padding-right: 2px;
  padding-bottom: 16px;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const NextText = styled(Typography).attrs({text: 'BottomButtonR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const NextView = styled.Pressable`
  width: 100%;
  margin-top: 56px;
  margin-bottom: 27px;
  justify-content: center;
  flex-direction: row;
`;

const ApplyContainer = styled.View`
  flex-direction: row;
  margin-bottom: 9px;
  width: 100%;
  justify-content: space-between;
`;

const ApplyText = styled.View`
  margin-bottom: 12px;
  margin-top: 24px;
`;
const CloseWrap = styled.View`
  margin-bottom: 24px;
`;

const Wrap = styled.ScrollView`
  flex: 1;
`;
