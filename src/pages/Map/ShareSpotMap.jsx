import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Pressable, View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import NaverMapView, {Marker, Circle} from 'react-native-nmap';
import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components';

import Info from './components/Info';
import Location from './LocationCircle';
import {PAGE_NAME as MapSearchResult} from './SearchResult';
import {MarkerIcon, SpotIcon, SpotNameIcon} from '../../assets';
import AddSpotIcon from '../../assets/icons/Map/addSpot.svg';
import CategoryIcon from '../../assets/icons/Map/category.svg';
import ArrowIcon from '../../assets/icons/Map/changeArrow.svg';
import FindIcon from '../../assets/icons/Map/find.svg';
import ListIcon from '../../assets/icons/Map/list.svg';
import BottomSheetFilter from '../../components/BottomSheetSpotFilter';
import BottomSheetSpot from '../../components/BottomSheetSpotInfo';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Typography from '../../components/Typography';
import {useGetAddress, useGetRoadAddress} from '../../hook/useMap';
import {width, height} from '../../theme';
import {userLocationAtom} from '../../utils/store';
import {PAGE_NAME as MySpotDetailPage} from '../Spots/mySpot/DetailAddress';
import ShareSpotList from '../Spots/shareSpot/ShareSpotList';

// latitude : 위도 (y) ,longitude :경도 (x)
export const PAGE_NAME = 'SHARE_SPOT_MAP';
const ShareSpotMap = () => {
  const toast = Toast();

  const [modalVisible2, setModalVisible2] = useState(false);

  const [mealTouch, setMealTouch] = useState([0, 1, 2]);
  const [touchInfo, setTouchInfo] = useState([0, 1]);

  const [modalVisible, setModalVisible] = useState(false);
  const [showList, setShowList] = useState(false);
  const [tab, setTab] = useState();
  const [touch, setTouch] = useState();
  const [show, setShow] = useState(false);
  const [move, setMove] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [center, setCenter] = useState();
  const [zoom, setZoom] = useState(18);
  const [initCenter, setInitCenter] = useAtom(userLocationAtom); // 기초 좌표 강남역

  // const {data: roadAddress, refetch: roadAddressRefetch} = useGetRoadAddress(
  //   center ? center?.longitude : initCenter.longitude,
  //   center ? center?.latitude : initCenter.latitude,
  // );
  // const {data: address, refetch: addressRefetch} = useGetAddress(
  //   roadAddress?.roadAddress,
  // );

  const handleCameraChange = event => {
    const newCenter = {latitude: event.latitude, longitude: event.longitude};
    setCenter(newCenter);
    // setInitCenter(newCenter);
    setZoom(event.zoom);
    setMove(false);
  };

  const spot0 = [
    {
      latitude: 37.504624,
      longitude: 127.045503,
      name: '스파크플러스 선릉점',
    },
    {latitude: 37.505607, longitude: 127.05154, name: '스파크플러스 선릉3호점'},
    {latitude: 37.505102, longitude: 127.045989, name: '달리셔스'},
  ];

  useEffect(() => {
    setTimeout(() => {
      setInitCenter({
        latitude: 37.49703,
        longitude: 127.028191,
      });
    }, 500);
  }, []);
  // useEffect(() => {
  //   roadAddressRefetch();
  // }, [center, initCenter]);
  // useEffect(() => {
  //   addressRefetch();
  // }, [roadAddress, initCenter]);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (paramLocation !== undefined) {
  //       setInitCenter(paramLocation);
  //     }
  //   }, [paramLocation]),
  // );

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

      {showList ? (
        <ShareSpotList setShowList={setShowList} />
      ) : (
        <MapView>
          <LocationButtonWrap>
            <Location
              setInitCenter={setInitCenter}
              setShow={setShow}
              toast={toast}
            />
          </LocationButtonWrap>
          <ListButtonWrap>
            <ListButton onPress={() => setShowList(true)}>
              <ListIcon />
              <ListButtonText>목록보기</ListButtonText>
            </ListButton>
          </ListButtonWrap>
          <CategoryWrap onPress={() => setModalVisible2(true)}>
            <CategoryButton distance={6}>
              <CategoryIcon />
            </CategoryButton>
          </CategoryWrap>
          <AddSpotWrap onPress={() => console.log('didi')}>
            <AddSpotButton distance={6}>
              <Image source={SpotIcon} style={{width: 30, height: 29}} />
            </AddSpotButton>
          </AddSpotWrap>

          <NaverMapView
            onTouch={() => {
              setMove(true);
            }}
            scaleBar={false}
            zoomControl={true}
            center={{...initCenter, zoom: 18}}
            style={{width: '100%', height: '100%'}}
            onCameraChange={handleCameraChange}>
            {spot0.map((el, idx) => {
              return (
                <Marker
                  onClick={() => {
                    setTab(el.name);
                    setModalVisible(true);
                  }}
                  onPress={() => {
                    setTab(el.name);
                    setModalVisible(true);
                  }}
                  key={idx}
                  coordinate={el}
                  width={43}
                  height={43}
                  image={
                    tab === el.name
                      ? require('./icons/selectSpot.png')
                      : require('./icons/shareSpotMarker.png')
                  }
                />
              );
            })}
          </NaverMapView>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              justifyContent: 'center',
              zIndex: 1,
              top: '50%',
            }}>
            <FastImage
              source={MarkerIcon}
              style={{
                width: 36,
                height: 36,
              }}
            />
          </View>
        </MapView>
      )}
      {modalVisible && (
        <BottomSheetSpot
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={tab}
          data={[]}
          // onPressEvent={id => {
          //   anotherSpot(id);
          // }}
          // onPressEvent2={() => {
          //   groupManagePress();
          // }}
        />
      )}

      {show && (
        <toast.ToastWrap
          message={`설정>권한 에서 '정확한 위치' 접근 권한을 허용해 주세요`}
          isHeader={false}
        />
      )}
      <BottomSheetFilter
        touch={mealTouch}
        setTouch={setMealTouch}
        touchInfo={touchInfo}
        setTouchInfo={setTouchInfo}
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        title="필터"
        // onPressEvent2={() => {
        //   groupManagePress();
        // }}
      />
    </Wrap>
  );
};

export default ShareSpotMap;

const MapView = styled.Pressable`
  flex: 1;
  position: relative;
`;

const Wrap = styled.View`
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
  bottom: 132px;
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
