import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {ScrollView, Text, View, Pressable} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components';

import CategoryIcon from '../../../assets/icons/Map/category.svg';
import FindIcon from '../../../assets/icons/Map/find.svg';
import BackArrow from '../../../assets/icons/MealDetail/backArrow.svg';
import MapIcon from '../../../assets/icons/Spot/map.svg';
import MealIcon from '../../../assets/icons/Spot/meal.svg';
import UserIcon from '../../../assets/icons/Spot/user.svg';
import BottomSheetFilter from '../../../components/BottomSheetSpotFilter';
import Typography from '../../../components/Typography';
import {width, height} from '../../../theme';

export const PAGE_NAME = 'SHARE_SPOT_LIST';
const ShareSpotList = ({setShowList, showList}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [touch, setTouch] = useState([0, 1, 2]);
  const [touchInfo, setTouchInfo] = useState([0, 1]);

  return (
    <Wrap>
      <Pressable
        style={{position: 'relative', marginTop: 8, marginBottom: 12}}
        // onPress={() => {
        //   navigation.navigate(MapSearchResult);
        // }}
      >
        <Icon />
        <Search>
          <PlaceHolderText>지번, 도로명, 건물명으로 검색</PlaceHolderText>
        </Search>
      </Pressable>

      <Caption>가까운 거리순으로 나열됩니다.</Caption>
      <CategoryWrap onPress={() => setModalVisible(true)}>
        <CategoryButton distance={6}>
          <CategoryIcon />
        </CategoryButton>
      </CategoryWrap>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Contents>
          <SpotNameText>스파크플러스 선릉점</SpotNameText>
          <DiningTypeWrap>
            <MealIcon />
            <DiningTypeText>아침・점심・저녁</DiningTypeText>
            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>
          <UserViewWrap>
            <UserIcon />
            <Body06RText style={{marginLeft: 12}}>152명</Body06RText>
          </UserViewWrap>
          <Border />
        </Contents>
        <Contents>
          <SpotNameText>스파크플러스 선릉점</SpotNameText>
          <DiningTypeWrap>
            <MealIcon />
            <DiningTypeText>아침・점심・저녁</DiningTypeText>
            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>
          <UserViewWrap>
            <UserIcon />
            <Body06RText style={{marginLeft: 12}}>152명</Body06RText>
          </UserViewWrap>
          <Border />
        </Contents>
        <Contents>
          <SpotNameText>스파크플러스 선릉점</SpotNameText>
          <DiningTypeWrap>
            <MealIcon />
            <DiningTypeText>아침・점심・저녁</DiningTypeText>
            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>
          <UserViewWrap>
            <UserIcon />
            <Body06RText style={{marginLeft: 12}}>152명</Body06RText>
          </UserViewWrap>
          <Border />
        </Contents>
        <Contents>
          <SpotNameText>스파크플러스 선릉점</SpotNameText>
          <DiningTypeWrap>
            <MealIcon />
            <DiningTypeText>아침・점심・저녁</DiningTypeText>
            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>
          <UserViewWrap>
            <UserIcon />
            <Body06RText style={{marginLeft: 12}}>152명</Body06RText>
          </UserViewWrap>
          <Border />
        </Contents>
        <Contents>
          <SpotNameText>스파크플러스 선릉점</SpotNameText>
          <DiningTypeWrap>
            <MealIcon />
            <DiningTypeText>아침・점심・저녁</DiningTypeText>
            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>
          <UserViewWrap>
            <UserIcon />
            <Body06RText style={{marginLeft: 12}}>152명</Body06RText>
          </UserViewWrap>
          <Border />
        </Contents>
      </ScrollView>

      <ListButtonWrap>
        <ListButton onPress={() => navigation.goBack()}>
          <MapIcon />
          <ListButtonText>지도보기</ListButtonText>
        </ListButton>
      </ListButtonWrap>
      <BottomSheetFilter
        touch={touch}
        setTouch={setTouch}
        touchInfo={touchInfo}
        setTouchInfo={setTouchInfo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="필터"
        // onPressEvent2={() => {
        //   groupManagePress();
        // }}
      />
    </Wrap>
  );
};

export default ShareSpotList;

const Wrap = styled.View`
  padding: 0px 24px;
  flex: 1;
  background-color: white;
`;

const Contents = styled.View`
  padding-top: 24px;
  padding-bottom: 8px;
`;

const SpotNameText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;

const DiningTypeText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.blue[500]};
  margin-left: 12px;
  margin-right: 8px;
`;

const DiningTypeWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const UserViewWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Body06RText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Caption = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-top: 16px;
`;

const ListButtonWrap = styled.View`
  z-index: 999;
  position: absolute;
  right: 24px;
  bottom: 56px;
`;

const ListButton = styled.Pressable`
  background-color: ${({theme}) => theme.colors.grey[2]};
  width: ${width * 116}px;
  height: ${height * 56}px;
  border-radius: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ListButtonText = styled(Typography).attrs({text: 'Button09SB'})`
  color: ${({theme}) => theme.colors.grey[0]};
  margin-left: 4px;
`;

const Border = styled.View`
  margin-top: 16px;
  height: 1px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const CategoryButton = styled(Shadow)`
  border-radius: 50px;
  width: ${width * 48}px;
  height: ${height * 48}px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const CategoryWrap = styled.Pressable`
  position: absolute;
  right: 24px;
  top: 80px;
  z-index: 99;
`;

const Search = styled.View`
  //margin: 0px 24px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  padding: 11px 14px 11px 28px;
  border-radius: 8px;
  height: 44px;
`;

const PlaceHolderText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;
const Icon = styled(FindIcon)`
  position: absolute;
  bottom: 14px;
  left: 10px;
  z-index: 1;
  margin-right: 4px;
`;