import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Pressable,
  View,
  Text,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
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
import BackButton from '../../components/BackButton';
import BalloonSpot from '../../components/BalloonSpot';
import BottomSheetFilter from '../../components/BottomSheetSpotFilter';
import BottomSheetSpot from '../../components/BottomSheetSpotInfo';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Typography from '../../components/Typography';
import {useGetAddress, useGetRoadAddress} from '../../hook/useMap';
import {useGetShareSpotList} from '../../hook/useShareSpot';
import {width, height} from '../../theme';
import {myLocationAtom, userLocationAtom} from '../../utils/store';
import {PAGE_NAME as RegisterSpotMapPage} from '../Map/RegisterSpotMap';
import {PAGE_NAME as MySpotDetailPage} from '../Spots/mySpot/DetailAddress';
import {PAGE_NAME as ShareSpotListPage} from '../Spots/shareSpot/ShareSpotList';
import ShareSpotList from '../Spots/shareSpot/ShareSpotList';

// latitude : 위도 (y) ,longitude :경도 (x)
export const PAGE_NAME = 'SHARE_SPOT_MAP';
const ShareSpotMap = ({route}) => {
  const paramsLocation = route?.params?.location;
  const paramsId = route?.params?.id;

  const toast = Toast();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [snap, setSnap] = useState(0);
  const [mealTouch, setMealTouch] = useState([1, 2, 3]);
  const [touchInfo, setTouchInfo] = useState([1]);
  const {balloonEvent, BalloonWrap, balloonEventNotOut} = BalloonSpot();
  const [modalVisible, setModalVisible] = useState(false);
  const [showList, setShowList] = useState(false);
  const [tab, setTab] = useState();
  const [touch, setTouch] = useState();
  const [show, setShow] = useState(false);
  const [move, setMove] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [zoom, setZoom] = useState(18);
  const [initCenter, setInitCenter] = useAtom(userLocationAtom); // 기초 좌표 강남역
  const [myLocation, setMyLocation] = useAtom(myLocationAtom); // 기초 좌표 강남역

  const {
    data: groupList,
    hasNextPage,
    fetchNextPage,
    refetch,
    isSuccess,
  } = useGetShareSpotList(
    myLocation.latitude,
    myLocation.longitude,
    mealTouch,
    touchInfo,
  );

  const handleCameraChange = event => {
    const newCenter = {latitude: event.latitude, longitude: event.longitude};
    if (move) {
      setInitCenter(newCenter);
    }

    setZoom(event.zoom);
    setMove(false);
  };

  const bottomSheetDown = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const markerPress = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const filterButton = () => {
    refetch();
    setModalVisible2(false);
  };

  useEffect(() => {
    balloonEvent();
  }, []);

  // useEffect(() => {
  //   refetch();
  // }, [mealTouch, refetch, touchInfo]);

  useFocusEffect(
    useCallback(() => {
      if (paramsLocation !== undefined) {
        setTab(paramsId);
        setInitCenter(paramsLocation);
        setModalVisible(true);
        bottomSheetRef.current?.snapToIndex(1);
      }
    }, [paramsLocation, setInitCenter, paramsId]),
  );

  return (
    <Wrap>
      <Pressable
        style={{marginTop: 8, marginBottom: 12}}
        onPress={() => {
          navigation.navigate(MapSearchResult);
        }}>
        <Icon />
        <Search>
          <PlaceHolderText>지번, 도로명, 건물명으로 검색</PlaceHolderText>
        </Search>
      </Pressable>

      {groupList === undefined ? (
        <View style={{flex: 1}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <MapView>
          <LocationButtonWrap snap={snap}>
            <Location
              initCenter={initCenter}
              setInitCenter={setInitCenter}
              setMyLocation={setMyLocation}
              setShow={setShow}
              toast={toast}
            />
          </LocationButtonWrap>
          <ListButtonWrap>
            <ListButton onPress={() => navigation.navigate(ShareSpotListPage)}>
              <ListIcon />
              <ListButtonText>목록보기</ListButtonText>
            </ListButton>
          </ListButtonWrap>
          <CategoryWrap onPress={() => setModalVisible2(true)}>
            <CategoryButton distance={6}>
              <CategoryIcon />
            </CategoryButton>
          </CategoryWrap>
          <BalloonWrapper>
            <BalloonWrap
              message={'원하시는 스팟이 없나요?'}
              vertical="down"
              size="B"
              location={{bottom: '56px', left: '24px'}}
            />
          </BalloonWrapper>
          <AddSpotWrap onPress={() => navigation.navigate(RegisterSpotMapPage)}>
            <AddSpotButton distance={6}>
              <Image source={SpotIcon} style={{width: 30, height: 29}} />
            </AddSpotButton>
          </AddSpotWrap>

          <Pressable
            style={{flex: 1}}
            onPressIn={() => {
              if (Platform.OS === 'ios') setMove(true);
            }}>
            <NaverMapView
              onMapClick={() => bottomSheetDown()}
              onTouch={() => {
                if (Platform.OS === 'android') setMove(true);
              }}
              scaleBar={false}
              zoomControl={false}
              center={{...initCenter, zoom: 18}}
              style={{width: '100%', height: '100%'}}
              onCameraChange={handleCameraChange}>
              {groupList?.pages?.map(v =>
                v.items.map(el => {
                  const center = {
                    latitude: Number(el.latitude),
                    longitude: Number(el.longitude),
                  };

                  return (
                    <Marker
                      onClick={e => {
                        e.stopPropagation();
                        setTab(el.id);
                        markerPress();
                        setModalVisible(true);
                      }}
                      onPress={e => {
                        e.stopPropagation();
                        setTab(el.id);
                        markerPress();
                        setModalVisible(true);
                      }}
                      key={el.id}
                      coordinate={{...center}}
                      width={43}
                      height={43}
                      image={
                        tab === el.id
                          ? require('./icons/selectSpot.png')
                          : require('./icons/shareSpotMarker.png')
                      }
                    />
                  );
                }),
              )}

              <Marker
                image={MarkerIcon}
                coordinate={myLocation}
                style={{width: 36, height: 36}}
              />
            </NaverMapView>
          </Pressable>
        </MapView>
      )}

      {modalVisible && (
        <BottomSheetSpot
          snap={snap}
          setInitCenter={setInitCenter}
          setSnap={setSnap}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          bottomSheetRef={bottomSheetRef}
          title={tab}
          data={groupList?.pages
            ?.map(v => v.items.filter(el => el.id === tab))
            .flat()}
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
        onPressEvent={filterButton}
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
  left: 80px;
  bottom: 104px;
`;
