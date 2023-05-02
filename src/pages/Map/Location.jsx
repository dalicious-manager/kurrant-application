import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const Location = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  // const requestLocationPermission = async () => {
  //   let permissionCheck;
  //   if (Platform.OS === 'ios') {
  //     permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //     if (permissionCheck !== RESULTS.GRANTED) {
  //       permissionCheck = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //     }
  //   } else if (Platform.OS === 'android') {
  //     permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //     if (permissionCheck !== RESULTS.GRANTED) {
  //       permissionCheck = await request(
  //         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //       );
  //     }
  //   }

  //   if (permissionCheck === RESULTS.GRANTED) {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         setLocation(position.coords);
  //       },
  //       error => {
  //         setErrorMsg(error.message);
  //       },
  //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //     );
  //   }
  // };

  return (
    <View>
      <Text>Current Location:</Text>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        location && (
          <>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>
          </>
        )
      )}
      <Button title="Refresh" />
    </View>
  );
};
//onPress={() => requestLocationPermission()}
export default Location;
