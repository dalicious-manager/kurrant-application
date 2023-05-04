import {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  Text,
  View,
  PanResponder,
  Animated,
} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {useGetAddress, useGetRoadAddress} from '../../hook/useMap';
import styled from 'styled-components';
import Location from './Location';
import Typography from '../../components/Typography';
import FastImage from 'react-native-fast-image';
import Toast from '../../components/Toast';

const WIDTH = Dimensions.get('screen').width;

// latitude : 위도 (y) ,longitude :경도 (x)
export const PAGE_NAME = 'MAP';
const Test = () => {
  const mapRef = useRef(null);

  const toast = Toast();

  const [show, setShow] = useState(false);
  const [markerColor, setMarkerColor] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [center, setCenter] = useState();
  const [initCenter, setInitCenter] = useState({
    latitude: 37.49703,
    longitude: 127.028191,
  });

  const {data: roadAddress, refetch: roadAddressRefetch} = useGetRoadAddress(
    center ? center?.longitude : initCenter.longitude,
    center ? center?.latitude : initCenter.latitude,
  );
  const {data: address, refetch: addressRefetch} = useGetAddress(roadAddress);

  const changAddress = () => {
    setShowAddress(prev => !prev);
  };

  // 지도 이동할때 마커 변경 안드 안됨 다시 보ㅓㅏ야해
  const panResponder = useRef(
    PanResponder.create({
      // 화면 터치 감지
      onMoveShouldSetPanResponderCapture: () => true,

      // 화면을 터치하고 이동할 때
      onPanResponderMove: () => {
        if (Platform.OS === 'android') {
          console.log('aa');
        }
        setMarkerColor(true);
      },
      // 화면을 터치하고 손 뗄 때
      onPanResponderRelease: () => {
        setMarkerColor(false);
      },
    }),
  ).current;

  const handleCameraChange = event => {
    const newCenter = {latitude: event.latitude, longitude: event.longitude};
    setCenter(newCenter);
  };

  useEffect(() => {
    roadAddressRefetch();
  }, [center]);
  useEffect(() => {
    addressRefetch();
  }, [roadAddress]);

  return (
    <Wrap>
      <View>
        <Location
          setInitCenter={setInitCenter}
          setShow={setShow}
          toast={toast}
        />
      </View>

      <MapView {...panResponder.panHandlers}>
        <NaverMapView
          ref={mapRef}
          center={{...initCenter, zoom: 18}}
          style={{width: '100%', height: '100%'}}
          onCameraChange={handleCameraChange}
          scaleBar={false}
          zoomControl={false}
        />
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            zIndex: 1,
            top: 208 - 47,
          }}>
          {markerColor ? (
            <FastImage
              source={require('./pick.png')}
              style={{
                width: 37,
                height: 47,
                borderRadius: 7,
              }}
            />
          ) : (
            <FastImage
              source={require('./marker.png')}
              style={{
                width: 37,
                height: 47,
                borderRadius: 7,
              }}
            />
          )}
        </View>
        <CircleView markerColor={markerColor} />
      </MapView>

      <AddressView>
        {showAddress ? (
          <AddressText>{address}</AddressText>
        ) : (
          <AddressText>{roadAddress}</AddressText>
        )}
      </AddressView>
      <Pressable onPress={changAddress}>
        {showAddress ? (
          <Text>도로명 주소로 보기</Text>
        ) : (
          <Text>지번주소로 보기</Text>
        )}
      </Pressable>
      {show && (
        <toast.ToastWrap
          message={`설정>권한 에서 '정확한 위치' 접근 권한을 허용해 주세요`}
          isHeader={false}
        />
      )}
    </Wrap>
  );
};

export default Test;

const MapView = styled.View`
  height: 416px;
  position: relative;
`;

const Wrap = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;

const MarkerView = styled.View`
  background-color: gold;
  position: absolute;
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
