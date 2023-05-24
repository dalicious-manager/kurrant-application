import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Pressable,
  ScrollView,
} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import {SharePickSpot, PickGrey, TimeIcon, Card} from '../../assets';
import Button from '../Button';
import Typography from '../Typography';
import {Shadow} from 'react-native-shadow-2';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import MealIcon from '../../assets/icons/Spot/meal.svg';
import UserIcon from '../../assets/icons/Spot/user.svg';
import PlusIcon from '../../assets/icons/Map/plus.svg';
import LinearGradient from 'react-native-linear-gradient';
import {PAGE_NAME as ApplySpotPage} from '../../pages/Spots/shareSpot/ApplySpot';
import {useNavigation} from '@react-navigation/native';

const Component = props => {
  const {
    modalVisible,
    setModalVisible,
    title = '옵션 선택',
    description = '',
    buttonTitle1 = '모달버튼',
    buttonTitle2 = '모달버튼',
    buttonType1 = 'yellow',
    buttonType2 = 'grey2',
    onPressEvent1 = () => {},
    onPressEvent2,
    image,
  } = props;

  const navigation = useNavigation();

  const data = [
    {
      name: '13F 라운지',
      time: ['09:00', '09:00', '09:00', '09:00', '09:00', '09:00', '09:00'],
      key: true,
    },
    {
      name: '14F 라운지',
      time: ['09:00', '09:00', '09:00', '09:00', '09:00', '09:00', '09:00'],
      key: false,
    },
    {
      name: '17F 라운지',
      time: [
        '09:00',
        '09:00',
        '09:00',
        '09:00',
        '09:00',
        '09:00',
        '09:00',
        '09:00',
        '09:00',
      ],
      key: true,
    },
    {
      name: '15F 라운지',
      time: ['09:00', '09:00', '09:00', '09:00'],
      key: true,
    },
    {
      name: '16F 라운지',
      time: ['09:00', '09:00', '09:00', '09:00', '09:00', '09:00', '09:00'],
      key: false,
    },
    {
      name: '17F 라운지',
      time: ['09:00', '09:00', '09:00'],
      key: true,
    },
    {
      name: '17F 라운지',
      time: ['09:00', '09:00', '09:00'],
      key: true,
    },
  ];
  const bottomSheetRef = useRef(null);

  // variables
  const [snap, setSnap] = useState(0);
  const snapPoints = useMemo(() => ['6%', '30%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    setSnap(index);
  }, []);

  const detailButton = () => {
    bottomSheetRef.current?.snapToIndex(2);
  };

  // renders
  return (
    <BottomSheet
      handleStyle={{height: 20}}
      handleIndicatorStyle={{
        backgroundColor: '#E4E3E7',
        width: 40,
        height: 4,
      }}
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      {(snap === 0 || snap === 1) && (
        <Contents>
          <SpotNameText>{title}</SpotNameText>
          <SpotPickWrap>
            <Image source={SharePickSpot} style={{width: 20, height: 24}} />
          </SpotPickWrap>
          <DiningTypeWrap>
            <MealIcon />
            <DiningTypeText>아침・점심・저녁</DiningTypeText>
            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>
          <UserViewWrap>
            <UserIcon />
            <Body06RText style={{marginLeft: 12}}>152명</Body06RText>
          </UserViewWrap>
          <Button
            label="상세보기"
            type="white2"
            onPressEvent={() => detailButton()}
          />
        </Contents>
      )}
      {snap === 2 && (
        <Content>
          <Contents>
            <Title>{title}</Title>
            <ScrollView
              style={{marginTop: 24}}
              showsVerticalScrollIndicator={false}>
              <Address>
                <Image source={PickGrey} style={{width: 20, height: 20}} />
                <Body06RText style={{marginLeft: 16}}>
                  서울 강남구 선릉로93길 40 1층
                  스파크플러스(역삼동,나라키움역삼A빌딩)
                  {'\n'}
                  <Body06RText style={{color: '#BDBAC1'}}>
                    역삼동 704-45
                  </Body06RText>
                </Body06RText>
              </Address>
              <Border />
              <DiningTypeWrap snap={snap}>
                <MealIcon width={20} height={20} />
                <DiningTypeText snap={snap}>아침・점심・저녁</DiningTypeText>
                <Body06RText>운영중</Body06RText>
              </DiningTypeWrap>
              <Border />
              <UserViewWrap snap={snap}>
                <UserIcon width={20} height={20} />
                <Body06RText style={{marginLeft: 16}}>152명</Body06RText>
              </UserViewWrap>
              <Border />
              <DeliveryWrap>
                <Delivery>
                  <Image source={TimeIcon} style={{width: 20, height: 20}} />
                  <Body06RText style={{marginLeft: 16}}>
                    배송 스팟/시간
                  </Body06RText>
                </Delivery>
                <ApplyButton onPress={() => navigation.navigate(ApplySpotPage)}>
                  <PlusIcon />
                  <ApplyText>스팟/시간 신청</ApplyText>
                </ApplyButton>
              </DeliveryWrap>
              <InnerView>
                {data.map((el, idx) => {
                  const lastArr = data[data.length - 1];

                  return (
                    <DetailSpotTimeWrap key={idx} last={el === lastArr}>
                      <DetailSpotWrap>
                        <DetailSpotName>{el.name}</DetailSpotName>
                        {el.key && (
                          <CardBoolean>
                            <VerticalBorder />
                            <Image
                              source={Card}
                              style={{width: 14, height: 14}}
                            />
                            <NeedCardText>카드키 필요</NeedCardText>
                          </CardBoolean>
                        )}
                      </DetailSpotWrap>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {el.time.map((v, i) => {
                          return (
                            <Label key={i}>
                              <LabelText>{v}</LabelText>
                            </Label>
                          );
                        })}
                      </ScrollView>
                    </DetailSpotTimeWrap>
                  );
                })}
              </InnerView>
            </ScrollView>
          </Contents>
          <ButtonWrap
            colors={[
              'rgba(255, 255, 255, 0.0)',
              'rgba(255, 255, 255, 0.0)',
              'rgba(255, 255, 255, 0.0)',
              'rgba(255, 255, 255, 0.5)',
              'rgba(255, 255, 255, 0.7)',
              'rgba(255, 255, 255, 0.9)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
            ]}
            useAngle={true}
            angle={180}>
            <Button label="이 스팟 사용하기" />
          </ButtonWrap>
        </Content>
      )}
    </BottomSheet>
  );
};

export default Component;
const Contents = styled.View`
  padding: 12px 24px 35px 24px;
  position: relative;
`;
const Content = styled.View`
  // padding: 12px 24px 35px 24px;
  position: relative;
`;

const SpotNameText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;

const DiningTypeText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.blue[500]};
  margin-left: ${({snap}) => (snap === 2 ? '16px' : '12px')};
  margin-right: 8px;
`;

const DiningTypeWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({snap}) => (snap === 2 ? '0px' : '8px')};
`;

const UserViewWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({snap}) => (snap === 2 ? '0px' : '16px')};
`;

const Body06RText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).attrs({text: 'Title03R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const SpotPickWrap = styled.Pressable`
  width: 48px;
  height: 48px;

  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 24px;
`;

const Border = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  margin: 16px 0px;
`;

const Address = styled.View`
  flex-direction: row;
`;

const DeliveryWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Delivery = styled.View`
  flex-direction: row;
`;

const ApplyText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-left: 4px;
`;

const ApplyButton = styled.Pressable`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
`;

const VerticalBorder = styled.View`
  width: 1px;
  height: 10px;
  background-color: ${({theme}) => theme.colors.grey[7]};
  margin-right: 8px;
`;

const Label = styled.Pressable`
  background-color: ${({theme}) => theme.colors.grey[8]};
  border-radius: 4px;
  padding: 3px 8px;
  align-self: flex-start;
  margin-right: 8px;
`;

const LabelText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[3]};
`;

const DetailSpotName = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const NeedCardText = styled(Typography).attrs({text: 'SmallLabelR'})`
  color: ${({theme}) => theme.colors.blue[500]};
  padding-left: 4px;
  text-align: center;
`;

const CardBoolean = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

const DetailSpotWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const InnerView = styled.View`
  padding: 16px 0px 0px 32px;
`;

const DetailSpotTimeWrap = styled.View`
  margin-bottom: ${({last}) => (last ? '150px' : '24px')};
`;

const ButtonWrap = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  /* padding: 0px 48px;
  padding-top: 20px;
  width: 100%; */
  padding: 0px 20px;
  height: 124px;
  bottom: 0px;
  width: 100%;
  justify-content: flex-start;
`;

const TimeWrap = styled(LinearGradient)``;
