import {useEffect, useState} from 'react';
import {Dimensions, Pressable, View} from 'react-native';
import NaverMapView from 'react-native-nmap';
import {useGetAddress, useGetRoadAddress} from '../../hook/useMap';
import styled from 'styled-components';
import Location from './Location';
import Typography from '../../components/Typography';
import FastImage from 'react-native-fast-image';
import Toast from '../../components/Toast';
import ArrowIcon from '../../assets/icons/Map/changeArrow.svg';
import Button from '../../components/Button';
import FindIcon from '../../assets/icons/Map/find.svg';
import {useNavigation} from '@react-navigation/native';
import {PAGE_NAME as MapSearchResult} from './SearchResult';
import {PAGE_NAME as MySpotDetailPage} from '../Spots/mySpot/DetailAddress';
import Info from './components/Info';
import {useAtom} from 'jotai';
import {userLocationAtom} from '../../utils/store';

const WIDTH = Dimensions.get('screen').width;

// latitude : 위도 (y) ,longitude :경도 (x)
export const PAGE_NAME = 'MAP';
const MySpotMap = () => {
  const toast = Toast();
  const navigation = useNavigation();
  const [tab, setTab] = useState(false);
  const [show, setShow] = useState(false);
  const [move, setMove] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [center, setCenter] = useState();
  const [initCenter, setInitCenter] = useAtom(userLocationAtom); // 기초 좌표 강남역

  const {data: roadAddress, refetch: roadAddressRefetch} = useGetRoadAddress(
    center ? center?.longitude : initCenter.longitude,
    center ? center?.latitude : initCenter.latitude,
  );
  const {data: address, refetch: addressRefetch} = useGetAddress(roadAddress);

  const changAddress = () => {
    setShowAddress(prev => !prev);
  };

  const handleCameraChange = event => {
    const newCenter = {latitude: event.latitude, longitude: event.longitude};
    setCenter(newCenter);
    setMove(false);
  };

  useEffect(() => {
    roadAddressRefetch();
  }, [center]);
  useEffect(() => {
    addressRefetch();
  }, [roadAddress]);

  return (
    <Wrap>
      <Pressable
        style={{position: 'relative', marginTop: 8}}
        onPress={() => {
          navigation.navigate(MapSearchResult);
        }}>
        <Icon />
        <Search>
          <PlaceHolderText>지번, 도로명, 건물명으로 검색</PlaceHolderText>
        </Search>
      </Pressable>
      <View>
        <Location
          setInitCenter={setInitCenter}
          setShow={setShow}
          toast={toast}
        />
      </View>

      <MapView>
        {/* 탭 */}
        <InfoView tab={tab}>
          <Info
            onPressEvent={() => {
              setTab(true);
            }}
          />
        </InfoView>
        <NaverMapView
          onTouch={() => {
            setMove(true);
          }}
          scaleBar={false}
          zoomControl={false}
          center={{...initCenter, zoom: 18}}
          style={{width: '100%', height: '100%'}}
          onCameraChange={handleCameraChange}></NaverMapView>
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            zIndex: 1,
            top: 208 - 47,
          }}>
          <FastImage
            source={
              move ? require('./icons/pick.png') : require('./icons/marker.png')
            }
            style={{
              width: 37,
              height: 47,
              borderRadius: 7,
            }}
          />
        </View>
        <CircleView markerColor={move} />
      </MapView>

      <AddressView>
        {showAddress ? (
          <AddressText>{address}</AddressText>
        ) : (
          <AddressText>{roadAddress}</AddressText>
        )}
        <ChangeAddressWrap onPress={changAddress} move={move}>
          <Arrow move={move} />
          {showAddress ? (
            <ChangeAddressText move={move}>도로명으로 보기</ChangeAddressText>
          ) : (
            <ChangeAddressText move={move}>지번으로 보기</ChangeAddressText>
          )}
        </ChangeAddressWrap>
      </AddressView>
      <ButtonWrap>
        <Button
          onPressEvent={() =>
            navigation.navigate(MySpotDetailPage, {
              address: address,
              roadAddress: roadAddress,
              showAddress: showAddress,
              center: center,
            })
          }
          label="이 위치로 주소 설정"
          disabled={move}
          type={move ? 'map' : 'yellow'}
        />
      </ButtonWrap>

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
  height: 416px;
  position: relative;
`;

const Wrap = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;

const AddressView = styled.View`
  padding: 24px;
`;
const AddressText = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const CircleView = styled.View`
  background-color: ${({markerColor}) =>
    markerColor ? 'rgba(255, 30, 30, 0.1)' : ' rgba(90, 30, 255, 0.1)'};

  width: 20px;
  height: 20px;
  border-radius: 50px;
  position: absolute;
  //z-index: 999;
  top: 196px;
  left: ${WIDTH / 2 - 8}px;
`;

const ChangeAddressWrap = styled.Pressable`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme, move}) =>
    move ? theme.colors.grey[7] : theme.colors.grey[8]};

  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

const ChangeAddressText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme, move}) =>
    move ? theme.colors.grey[0] : theme.colors.grey[2]};
`;

const Arrow = styled(ArrowIcon)`
  margin-right: 8px;
  color: ${({move, theme}) =>
    move ? theme.colors.grey[0] : theme.colors.grey[2]};
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 35px;
  padding: 0px 20px;
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
  z-index: ${({tab}) => (tab ? 0 : 999)};
`;
