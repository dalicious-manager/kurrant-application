import {useNavigation} from '@react-navigation/native';
import {useAtomValue} from 'jotai';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, View, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NaverMapView, {Marker} from 'react-native-nmap';
import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components';

import {
  SelectSpot,
  UnSelectSpot,
  SelectSpotIcon,
  UnSelectSpotIcon,
} from '../../../assets';
import useGroupSpots from '../../../biz/useGroupSpots/hook';
import useUserInfo from '../../../biz/useUserInfo/hook';
import {isUserInfoAtom} from '../../../biz/useUserInfo/store';
import BottomSheetSpot from '../../../components/BottomSheetSpot';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import {useGetPrivateSpot} from '../../../hook/usePrivateSpot';
import {useGetUserInfo} from '../../../hook/useUserInfo';
import {SCREEN_NAME} from '../../../screens/Main/Bnb';
import {height, width} from '../../../theme';
import {PAGE_NAME as SpotTypePage} from '../SpotType';

export const PAGE_NAME = 'INVITE_SPOT';
const InviteSpot = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  const {data: privateSpotList} = useGetPrivateSpot();
  const {isUserGroupSpotCheck, userSpotRegister} = useGroupSpots();
  // const {isUserInfo} = useUserInfo();
  const [tab, setTab] = useState(0);
  const [center, setCenter] = useState({
    latitude: 0,
    longitude: 0,
  });

  const spotList = privateSpotList?.data;
  const userSpotId = isUserInfo?.spotId;
  const anotherSpot = async id => {
    await userSpotRegister({
      id: id,
    });
    navigation.navigate(SCREEN_NAME);
  };
  useEffect(() => {
    if (privateSpotList) {
      const data = {
        latitude: Number(privateSpotList?.data[0]?.latitude),
        longitude: Number(privateSpotList?.data[0]?.longitude),
      };
      setCenter(data);
    }
  }, [privateSpotList, privateSpotList?.data]);

  return (
    <Wrap>
      <Content>
        <TitleText>
          {isUserInfo?.name}님이{'\n'}초대받은 스팟이에요({spotList?.length}개)
        </TitleText>
        <SemiTitle>초대받은 스팟 정보를 확인해주세요</SemiTitle>
        <View>
          <SpotButtonScroll horizontal showsHorizontalScrollIndicator={false}>
            {spotList?.map((v, i) => {
              const center = {
                latitude: Number(v.latitude),
                longitude: Number(v.longitude),
              };
              return (
                <SpotButtonWrap
                  key={v.name}
                  onPress={() => {
                    setTab(i);
                    setCenter(center);
                  }}>
                  <SpotButton tab={tab === i} distance={2} offset={[0, 2]}>
                    <Image
                      source={tab === i ? SelectSpotIcon : UnSelectSpotIcon}
                      style={{width: 24, height: 24}}
                    />
                    <SpotButtonText tab={tab === i}>{v.name}</SpotButtonText>
                  </SpotButton>
                </SpotButtonWrap>
              );
            })}
          </SpotButtonScroll>
          <MapWrap>
            <NaverMapView
              center={{...center, zoom: 18}}
              zoomControl={false}
              scaleBar={false}
              style={{flex: 1, borderRadius: 14, overflow: 'hidden'}}>
              {spotList?.map((el, idx) => {
                const center = {
                  latitude: Number(el.latitude),
                  longitude: Number(el.longitude),
                };

                return (
                  <Marker
                    key={idx}
                    onClick={e => {
                      e.stopPropagation();
                      setTab(idx);
                    }}
                    onPress={e => {
                      e.stopPropagation();
                      setTab(idx);
                    }}
                    coordinate={center}
                    width={43}
                    height={43}
                    image={tab === idx ? SelectSpot : UnSelectSpot}
                  />
                );
              })}
            </NaverMapView>
          </MapWrap>
        </View>
      </Content>
      <ButtonWrap>
        <Button
          label="초대받은 스팟 사용하기"
          onPressEvent={() => setModalVisible(true)}
        />
        <AnotherSpotButtonText
          onPress={() => navigation.navigate(SpotTypePage)}>
          다른 타입 스팟 고르기
        </AnotherSpotButtonText>
      </ButtonWrap>
      <BottomSheetSpot
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="배송 스팟 선택"
        data={isUserGroupSpotCheck?.spotListResponseDtoList}
        selected={selected}
        setSelected={setSelected}
        userSpotId={userSpotId}
        onPressEvent={id => {
          anotherSpot(id);
        }}
      />
    </Wrap>
  );
};
export default InviteSpot;

const Wrap = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  padding: 0px 24px;
  margin-top: ${height * 56}px;
`;
const ButtonWrap = styled.View`
  margin: 0px 24px;
  position: absolute;
  bottom: ${height * 50}px;
`;
const TitleText = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
const SemiTitle = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-top: 8px;
`;

const MapWrap = styled.View`
  margin-top: 24px;
  height: ${height * 327}px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 14px;
`;

const SpotButton = styled(Shadow)`
  background-color: ${({tab}) => (tab ? '#edf3ff' : 'white')};
  border: 1px solid ${({tab}) => (tab ? '#5691ff' : 'white')};
  border-radius: 100px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 10px;
`;

const SpotButtonScroll = styled.ScrollView`
  flex-direction: row;
  position: absolute;
  z-index: 1;
  top: 36px;
  padding-bottom: 6px;
  padding-left: 16px;
  width: 100%;
`;

const SpotButtonText = styled(Typography).attrs({text: 'Button09SB'})`
  color: ${({theme, tab}) => (tab ? '#3478F6' : theme.colors.grey[3])};
  margin-left: 4px;
`;

const SpotButtonWrap = styled.Pressable`
  /* border-radius: 100px; */
`;

const AnotherSpotButtonText = styled(Typography).attrs({text: 'BottomButtonR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-top: 20px;
  text-align: center;
`;
