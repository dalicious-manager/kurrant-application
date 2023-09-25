import {KakaoMapView} from '@jiggag/react-native-kakao-maps';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Pressable,
  View,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components';

import FindIcon from '../../assets/icons/Map/find.svg';
import Typography from '../../components/Typography';
import {width, height} from '../../theme';

export const PAGE_NAME = 'RECOMMEND_MAKERS_MAP';
const RecommendMakersMap = ({route}) => {
  return (
    <Wrap>
      <KakaoMapView
        markerImageUrl="https://github.com/jiggag/react-native-kakao-maps/blob/develop/example/custom_image.png?raw=true"
        markerList={[
          {
            lat: 37.59523,
            lng: 127.086,
            markerName: 'marker',
          },
          {
            lat: 37.59523,
            lng: 127.08705,
            markerName: 'marker2',
          },
        ]}
        width={300}
        height={500}
        centerPoint={{
          lat: 37.59523,
          lng: 127.086,
        }}
        onChange={event => {
          console.log('[onChange]', event.nativeEvent);
        }}
      />
    </Wrap>
  );
};

export default RecommendMakersMap;

const MapView = styled.Pressable`
  flex: 1;
`;

const Wrap = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;

const Search = styled.View`
  margin: 0px 24px;
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
  left: 32px;
  z-index: 1;
  margin-right: 4px;
`;

const LocationButtonWrap = styled.View`
  position: absolute;
  bottom: ${({snap}) => (snap === 1 ? '35%' : '132px')};
  right: 24px;
  z-index: 99;
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
  top: 16px;
  z-index: 99;
`;

const AddSpotButton = styled(Shadow)`
  border-radius: 50px;
  width: ${width * 56}px;
  height: ${height * 56}px;
  background-color: white;
  padding: 13px 12px 14px 14px;
`;
const AddSpotWrap = styled.Pressable`
  position: absolute;
  left: 24px;
  bottom: 56px;
  z-index: 99;
`;

const BalloonWrapper = styled.View`
  z-index: 99;
  position: absolute;
  left: 30px;
  bottom: 130px;
`;
