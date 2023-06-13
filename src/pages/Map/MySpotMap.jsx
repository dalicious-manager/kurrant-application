import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Pressable,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, {Marker} from 'react-native-nmap';
import styled from 'styled-components/native';

import Info from './components/Info';
import Location from './LocationCircle';
import {PAGE_NAME as MapSearchResult} from './SearchResult';
import ArrowIcon from '../../assets/icons/Map/changeArrow.svg';
import FindIcon from '../../assets/icons/Map/find.svg';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Typography from '../../components/Typography';
import {useGetAddress, useGetRoadAddress} from '../../hook/useMap';
import {height} from '../../theme';
import {mySpotRootAtom, userLocationAtom} from '../../utils/store';
import {PAGE_NAME as MySpotDetailPage} from '../Spots/mySpot/DetailAddress';

const WIDTH = Dimensions.get('screen').width;

// latitude : 위도 (y) ,longitude :경도 (x)
export const PAGE_NAME = 'MAP';
const MySpotMap = ({route}) => {
  const paramLocation = route?.params?.center;
  const mapRef = useRef(null);
  const toast = Toast();
  const [fromRoot, setFromRoot] = useAtom(mySpotRootAtom); // 어느 경로로 왔는지 0 : 지도에서 1: 검색 리스트에서
  const [mapHeight, setMapHeight] = useState(0);
  const navigation = useNavigation();
  const [tab, setTab] = useState(false);
  const [show, setShow] = useState(false);
  const [move, setMove] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  // const [center, setCenter] = useState();
  const [initCenter, setInitCenter] = useAtom(userLocationAtom); // 기초 좌표 강남역
  const {data: roadAddress, refetch: roadAddressRefetch} = useGetRoadAddress(
    initCenter ? initCenter.longitude : 0,
    initCenter ? initCenter.latitude : 0,
  );
  const {data: address, refetch: addressRefetch} = useGetAddress(
    roadAddress && roadAddress.roadAddress,
  );

  const changAddress = () => {
    setShowAddress(prev => !prev);
  };

  const handleCameraChange = event => {
    const newCenter = {latitude: event.latitude, longitude: event.longitude};
    // setCenter(newCenter);
    if (move) {
      setInitCenter(newCenter);
    }
    setMove(false);
  };

  useEffect(() => {
    roadAddressRefetch();
  }, [initCenter, roadAddressRefetch, showAddress]);
  useEffect(() => {
    addressRefetch();
  }, [roadAddress, initCenter, addressRefetch, showAddress]);

  useFocusEffect(
    useCallback(() => {
      if (paramLocation !== undefined) {
        setInitCenter(paramLocation);
      }
    }, [paramLocation, setInitCenter]),
  );
  const handleLayout = () => {
    mapRef.current.measure((x, y, width, height) => {
      setMapHeight(height);
    });
  };
  if (!roadAddress) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <Wrap>
      <Pressable
        style={{position: 'relative', marginTop: 8, marginBottom: 12}}
        onPress={() => {
          navigation.navigate(MapSearchResult, {
            name: 'mySpot',
          });
        }}>
        <Icon />
        <Search>
          <PlaceHolderText>지번, 도로명, 건물명으로 검색</PlaceHolderText>
        </Search>
      </Pressable>

      <MapView ref={mapRef} onLayout={handleLayout}>
        <LocationButtonWrap>
          <Location
            initCenter={initCenter}
            setInitCenter={setInitCenter}
            setShow={setShow}
            toast={toast}
          />
        </LocationButtonWrap>
        {/* 탭 */}
        <InfoView tab={tab}>
          <Info
            onPressEvent={() => {
              setTab(true);
            }}
          />
        </InfoView>
        <Pressable
          style={{flex: 1}}
          onPressIn={() => {
            if (Platform.OS === 'ios') setMove(true);
          }}>
          <NaverMapView
            onTouch={() => {
              if (Platform.OS === 'android') setMove(true);
            }}
            scaleBar={false}
            zoomControl={false}
            center={
              initCenter
                ? {...initCenter, zoom: 18}
                : {
                    latitude: 37.49703,
                    longitude: 127.028191,
                    zoom: 18,
                  }
            }
            style={{flex: 1}}
            onCameraChange={handleCameraChange}
          />
        </Pressable>

        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            zIndex: 1,
            top: (mapHeight - 49 - 35) / 2,
          }}>
          <FastImage
            source={
              move ? require('./icons/pick.png') : require('./icons/marker.png')
            }
            style={{
              width: 36,
              height: 49,
            }}
          />
        </View>
      </MapView>

      {roadAddress?.roadAddress && (
        <AddressView>
          {showAddress ? (
            <AddressText>{address}</AddressText>
          ) : (
            <AddressText>{roadAddress?.roadAddress}</AddressText>
          )}
          <ChangeAddressWrap onPress={changAddress} move={move} tab={tab}>
            <Arrow move={move} tab={tab} />
            {showAddress ? (
              <ChangeAddressText move={move} tab={tab}>
                도로명으로 보기
              </ChangeAddressText>
            ) : (
              <ChangeAddressText move={move} tab={tab}>
                지번으로 보기
              </ChangeAddressText>
            )}
          </ChangeAddressWrap>
          <ButtonWrap>
            <Button
              onPressEvent={() => {
                navigation.navigate(MySpotDetailPage, {
                  address: address,
                  roadAddress: roadAddress?.roadAddress,
                  showAddress: showAddress,
                  center: initCenter,
                  zipcode: roadAddress?.zipcode,
                  jibunAddress: address,
                });
                setFromRoot(0);
              }}
              label="이 위치로 주소 설정"
              disabled={move || !tab}
              type={move || !tab ? 'map' : 'yellow'}
            />
          </ButtonWrap>
        </AddressView>
      )}

      {show && (
        <toast.ToastWrap
          message={`설정>권한 에서 '정확한 위치' 접근 권한을 허용해 주세요`}
          isHeader={false}
        />
      )}
    </Wrap>
  );
};

export default MySpotMap;

const MapView = styled.View`
  flex: 1;
  background-color: 'red';
  width: 100%;
  position: relative;
`;

const Wrap = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;

const AddressView = styled.View`
  padding: 24px;
  padding-top: 16px;
  height: 198px;
`;
const AddressText = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const ChangeAddressWrap = styled.Pressable`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme, move}) => theme.colors.grey[8]};

  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

const ChangeAddressText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme, move, tab}) =>
    move || !tab ? theme.colors.grey[5] : theme.colors.grey[2]};
`;

const Arrow = styled(ArrowIcon)`
  margin-right: 8px;
  color: ${({move, theme, tab}) =>
    move || !tab ? theme.colors.grey[5] : theme.colors.grey[2]};
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 35px;
  left: 24px;
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

const InfoView = styled.Pressable`
  position: absolute;
  height: 100%;
  z-index: ${({tab}) => (tab ? 0 : 999)};
`;

const LocationButtonWrap = styled.View`
  position: absolute;
  bottom: 24px;
  right: 24px;
  z-index: 99;
`;
