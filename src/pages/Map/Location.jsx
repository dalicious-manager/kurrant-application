import React, {useEffect, useState} from 'react';
import {
  Linking,
  NativeModules,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Typography from '../../components/Typography';
import Geolocation from 'react-native-geolocation-service';
import styled from 'styled-components';

const Location = ({setInitCenter, setShow, toast}) => {
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
        console.log('Location permission denied.');
      }
    } catch (error) {
      console.log('Error requesting location permission: ', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setInitCenter({latitude: latitude, longitude: longitude});
      },
      error => {
        console.error(error.code, error.message, '에러');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
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

  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     requestLocationIosPermission();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (Platform.OS === 'android') requestLocationAndroidPermission();
  // }, []);

  return (
    <Wrap onPress={userLocation}>
      <LocationText>현재 위치로 설정</LocationText>
    </Wrap>
  );
};

export default Location;

const Wrap = styled.Pressable`
  width: 100%;
  height: 56px;
  padding: 17px 52px;
`;

const LocationText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
