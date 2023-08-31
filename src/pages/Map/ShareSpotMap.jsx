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
import NaverMapView, {Marker} from 'react-native-nmap';
import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components';

import Location from './LocationCircle';
import {PAGE_NAME as MapSearchResult} from './SearchResult';
import {MarkerIcon, SpotIcon} from '../../assets';
import CategoryIcon from '../../assets/icons/Map/category.svg';
import FindIcon from '../../assets/icons/Map/find.svg';
import ListIcon from '../../assets/icons/Map/list.svg';
import BalloonSpot from '../../components/BalloonSpot';
import BottomModal from '../../components/BottomModal';
import BottomSheetFilter from '../../components/BottomSheetSpotFilter';
import BottomSheetSpot from '../../components/BottomSheetSpotInfo';
import Toast from '../../components/Toast';
import Typography from '../../components/Typography';
import {useGetShareSpotList} from '../../hook/useShareSpot';
import {width, height} from '../../theme';
import {
  mealTouchAtom,
  myLocationAtom,
  shareMapZoomAtom,
  touchInfoAtom,
  userLocationAtom,
} from '../../utils/store';
import {PAGE_NAME as GroupManagePageName} from '../Group/GroupManage/SpotManagePage';
import {PAGE_NAME as RegisterSpotMapPage} from '../Map/RegisterSpotMap';
import {PAGE_NAME as ShareSpotListPage} from '../Spots/shareSpot/ShareSpotList';
// latitude : 위도 (y) ,longitude :경도 (x)
export const PAGE_NAME = 'SHARE_SPOT_MAP';
const ShareSpotMap = ({route}) => {
  const paramsLocation = route?.params?.location;
  const paramsId = route?.params?.id;
  const from = route?.params?.from;

  const toast = Toast();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [snap, setSnap] = useState(0);
  const [mealTouch, setMealTouch] = useAtom(mealTouchAtom);
  const [touchInfo, setTouchInfo] = useAtom(touchInfoAtom);
  const {balloonEvent, BalloonWrap} = BalloonSpot();
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomModal, setBottomModal] = useState(false);
  const [tab, setTab] = useState();
  const [show, setShow] = useState(false);
  const [move, setMove] = useState(false);
  const [zoom, setZoom] = useAtom(shareMapZoomAtom);
  const [initCenter, setInitCenter] = useAtom(userLocationAtom); // 기초 좌표 강남역
  const [myLocation, setMyLocation] = useAtom(myLocationAtom);
  const {
    data: groupList,
    refetch,
    isSuccess,
  } = useGetShareSpotList(
    0,
    paramsLocation?.latitude ?? initCenter.latitude,
    paramsLocation?.longitude ?? initCenter.longitude,
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
    setTab();
    setModalVisible2(false);
    setModalVisible(false);
  };

  const closeModal = () => {
    setBottomModal(false);
    setTab();
  };
  const goTospotManagePage = () => {
    setBottomModal(false);
    navigation.navigate(GroupManagePageName, {
      from: 'shareSpotMap',
    });
  };

  // useEffect(() => {
  //   balloonEvent();
  //   setZoom(18);
  // }, []);

  useFocusEffect(
    useCallback(() => {
      if (paramsLocation) {
        setTab(paramsId);
        setInitCenter(paramsLocation);
        setModalVisible(true);
        bottomSheetRef.current?.snapToIndex(1);
      }

      if (paramsId === undefined) {
        setModalVisible(false);
      }

      refetch();
    }, [paramsLocation, paramsId, refetch, setInitCenter]),
  );

  useFocusEffect(
    useCallback(() => {
      balloonEvent();
      setZoom(18);
    }, []),
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

      {!isSuccess ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
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
              from={from}
            />
          </LocationButtonWrap>
          <ListButtonWrap>
            <ListButton
              onPress={() => {
                setTab();
                navigation.navigate(ShareSpotListPage);
              }}>
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
              location={{bottom: '0px', left: '0px'}}
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
              minZoomLevel={6}
              maxZoomLevel={20}
              onMapClick={() => bottomSheetDown()}
              onTouch={() => {
                if (Platform.OS === 'android') setMove(true);
              }}
              scaleBar={false}
              zoomControl={false}
              center={{...initCenter, zoom: zoom}}
              style={{width: '100%', height: '100%'}}
              onCameraChange={handleCameraChange}>
              {groupList?.pages?.map(v =>
                v?.items?.map(el => {
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
                      coordinate={center}
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

      {modalVisible && isSuccess && (
        <BottomSheetSpot
          setBottomModal={setBottomModal}
          snap={snap}
          setInitCenter={setInitCenter}
          setSnap={setSnap}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          bottomSheetRef={bottomSheetRef}
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
      />
      <BottomModal
        modalVisible={bottomModal}
        setModalVisible={setBottomModal}
        title={`공유스팟은 최대 2개만 가질 수 있어요`}
        description={`기존 스팟을 '스팟관리'에서 탈퇴해야 해요.${`\n`}스팟 관리로 이동 하시겠어요?`}
        buttonTitle1={'아니요'}
        buttonType1="grey7"
        buttonTitle2={'이동'}
        buttonType2="yellow"
        onPressEvent1={closeModal}
        onPressEvent2={() => goTospotManagePage()}
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
  left: 30px;
  bottom: 130px;
`;
