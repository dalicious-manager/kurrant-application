import React, {useEffect} from 'react';
import {Linking, Platform, PermissionsAndroid, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components';

import Icon from '../../assets/icons/Map/locationCircle.svg';
import Typography from '../../components/Typography';

const Location = ({setInitCenter, setMyLocation, setShow, toast, from}) => {
  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:root');
    }
  };
  const userLocation = () => {
    if (Platform.OS === 'ios') {
      requestLocationIosPermission();
    } else {
      requestLocationAndroidPermission();
    }
  };
  const requestLocationIosPermission = async () => {
    try {
      const granted = await Geolocation.requestAuthorization('whenInUse');
      if (granted === 'granted') {
        getLocation();
      } else {
        Alert.alert('커런트', '위치 사용을 위해 접근 권한을 허용해 주세요', [
          {
            text: '취소',
          },
          {
            text: '확인',
            onPress: () => {
              openAppSettings();
            },
          },
        ]);
        // console.log('Location permission denied.');
      }
    } catch (error) {
      console.log('Error requesting location permission: ', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        //console.log(latitude, longitude, 'sffssf');
        setInitCenter({latitude: latitude, longitude: longitude});
        if (setMyLocation)
          setMyLocation({latitude: latitude, longitude: longitude});
      },
      error => {
        console.error(error.code, error.message, '에러');
      },
      {enableHighAccuracy: true, timeout: 1500, maximumAge: 1000},
    );
  };

  const requestLocationAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '커런트',
          message: `'정확한 위치' 접근 권한을 허용해 주세요`,
          buttonNeutral: '다음에 다시 묻기',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          const {latitude, longitude} = position.coords;
          setInitCenter({
            latitude: latitude,
            longitude: longitude,
          });
          if (setMyLocation)
            setMyLocation({latitude: latitude, longitude: longitude});
        });
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        setShow(true);
        toast.toastEvent();
        setTimeout(() => {
          setShow(false);
        }, 3000);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (from !== 'manage') {
      if (Platform.OS === 'ios') {
        requestLocationIosPermission();
      } else {
        requestLocationAndroidPermission();
      }
    }
  }, [from]);

  return (
    <Wrap onPress={userLocation}>
      <Shadow style={{borderRadius: 50}} distance={5}>
        <LocationIcon>
          <Icon />
        </LocationIcon>
      </Shadow>
    </Wrap>
  );
};

export default Location;

const Wrap = styled.Pressable`
  /* width: 100%;
  height: 56px;
  padding: 17px 24px 17px 33px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white; */
`;

const LocationText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const LocationIcon = styled.View`
  background-color: white;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
`;
