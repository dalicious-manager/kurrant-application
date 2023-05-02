import {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  Text,
  View,
  PanResponder,
} from 'react-native';
import NaverMapView from 'react-native-nmap';
import {createAnimatableComponent} from 'react-native-animatable'; // 라이브러리 삭제 해야함
import {useGetAddress, useGetRoadAddress} from '../../hook/useMap';
import styled from 'styled-components';
import Location from './Location';
import Typography from '../../components/Typography';
import FastImage from 'react-native-fast-image';

const WIDTH = Dimensions.get('screen').width;

// latitude : 위도 (y) ,longitude :경도 (x)
export const PAGE_NAME = 'MAP';
const Test = () => {
  const [markerColor, setMarkerColor] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [center, setCenter] = useState();
  const [initCenter, setInitCenter] = useState({
    latitude: 37.505188,
    longitude: 127.045862,
  });

  const {data: roadAddress, refetch: roadAddressRefetch} = useGetRoadAddress(
    center ? center?.longitude : initCenter.longitude,
    center ? center?.latitude : initCenter.latitude,
  );
  const {data: address, refetch: addressRefetch} = useGetAddress(roadAddress);

  const changAddress = () => {
    setShowAddress(prev => !prev);
  };

  const mapRef = useRef(null);

  // 지도 이동할때 마커 변경
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: () => {
        setMarkerColor(true);
      },
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
    <Wrap {...panResponder.panHandlers}>
      {/* <View style={{height: 100}}>
        <Location />
      </View> */}
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
      <MapView>
        <NaverMapView
          ref={mapRef}
          center={{...initCenter, zoom: 19}}
          style={{width: '100%', height: '100%'}}
          onCameraChange={handleCameraChange}
        />
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
    </Wrap>
  );
};

export default Test;

const MapView = styled.View`
  height: 416px;
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
  background-color: rgba(90, 30, 255, 0.1);

  width: 83px;
  height: 83px;
  border-radius: 50px;
  position: absolute;
  z-index: 999;
  top: 150px;
  left: ${WIDTH / 2 - 40}px;
`;
