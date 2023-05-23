import {ScrollView, Text, View} from 'react-native';
import styled from 'styled-components';
import MealIcon from '../../../assets/icons/Spot/meal.svg';
import UserIcon from '../../../assets/icons/Spot/user.svg';
import MapIcon from '../../../assets/icons/Spot/map.svg';
import CategoryIcon from '../../../assets/icons/Map/category.svg';
import Typography from '../../../components/Typography';
import {width, height} from '../../../theme';
import {Shadow} from 'react-native-shadow-2';
import BottomSheetFilter from '../../../components/BottomSheetSpotFilter';
import {useState} from 'react';

export const PAGE_NAME = 'SHARE_SPOT_LIST';
const ShareSpotList = ({setShowList}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [touch, setTouch] = useState([0, 1, 2]);
  const [touchInfo, setTouchInfo] = useState([0, 1]);
  return (
    <Wrap>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Caption>가까운 거리순으로 나열됩니다.</Caption>
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
      <CategoryWrap onPress={() => setModalVisible(true)}>
        <CategoryButton distance={6}>
          <CategoryIcon />
        </CategoryButton>
      </CategoryWrap>
      <ListButtonWrap>
        <ListButton onPress={() => setShowList(false)}>
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
        onPressEvent2={() => {
          groupManagePress();
        }}
      />
    </Wrap>
  );
};

export default ShareSpotList;

const Wrap = styled.View`
  margin: 0px 24px;
  flex: 1;
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
  right: 0px;
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
  right: 0px;
  top: 16px;
  z-index: 99;
`;
