import {useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
  AnimateMarker,
} from 'react-native-nmap';
import {createAnimatableComponent} from 'react-native-animatable';
import {useGetAddress, useGetRoadAddress} from '../../hook/useMap';
import styled from 'styled-components';
import Location from './Location';
import Typography from '../../components/Typography';

const AnimatableMarker = createAnimatableComponent(Marker);
// latitude : 위도 (y) ,longitude :경도 (x)
export const PAGE_NAME = 'MAP';
const Test = () => {
  const markerRef = useRef(null);
  const [showAddress, setShowAddress] = useState(false);
  const [center, setCenter] = useState({
    latitude: 37.505188,
    longitude: 127.045862,
  });
  const [zoomLevel, setZoomLevel] = useState(18);

  //console.log(center, 'center');
  const {data: roadAddress, refetch: roadAddressRefetch} = useGetRoadAddress(
    center.longitude,
    center.latitude,
  );
  const {data: address, refetch: addressRefetch} = useGetAddress(roadAddress);

  const changAddress = () => {
    setShowAddress(prev => !prev);
  };
  const handleCameraChange = event => {
    const zoom = event.zoom;

    const newCenter = {latitude: event.latitude, longitude: event.longitude};
    setCenter(newCenter);
    setZoomLevel(zoom);
    console.log(newCenter, '좌표');
    // if (markerRef.current) {
    //   //console.log(markerRef.current, 'dkdkdkdk');
    //   markerRef.current.transitionTo(
    //     {
    //       latitude: newCoordinate.latitude,
    //       longitude: newCoordinate.longitude,
    //     },
    //     5000,
    //   );
    // }
  };

  useEffect(() => {
    roadAddressRefetch();
    addressRefetch();
  }, [center]);

  return (
    <Wrap>
      <View style={{height: 100}}>
        <Location />
      </View>
      <MapView>
        <NaverMapView
          minZoomLevel={17}
          center={{...center, zoom: zoomLevel}}
          style={{width: '100%', height: '100%'}}
          //onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
          onCameraChange={handleCameraChange}

          //onMapClick={e => console.log('onMapClick', JSON.stringify(e))}
        >
          {/* <AnimatableMarker ref={markerRef} coordinate={center} /> */}

          <Marker
            coordinate={center}
            onClick={() => console.log('onClick! p0')}
            width={45}
            height={57}
            image={require('./marker.png')}
          />

          <Circle
            coordinate={center}
            color={'rgba(90,30,255,0.1)'}
            radius={10}
            onClick={() => console.log('onClick! circle')}
          />
        </NaverMapView>
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
