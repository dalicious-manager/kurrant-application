import {Alert, Platform} from 'react-native';
import {check, RESULTS, PERMISSIONS, request} from 'react-native-permissions';

const PLATFORM_PHOTO_LIBRARY_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const REQUEST_PERMISSION_TYPE = {
  photoLibrary: PLATFORM_PHOTO_LIBRARY_PERMISSIONS,
};

const PERMISSION_TYPE = {
  photoLibrary: 'photoLibrary',
};

class AppPermission {
  checkPhotoLibraryPermissionIos = async type => {
    // if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;
    // const platformPermissions =
    //   Platform.OS === 'ios'
    //     ? PERMISSIONS.IOS.CAMERA
    //     : PERMISSIONS.ANDROID.CAMERA;
    // console.log('플렛폼 퍼미션 ' + platformPermissions);

    console.log(' 포토라이브러리 : ' + PERMISSIONS.IOS.PHOTO_LIBRARY);
    console.log('AppPermission checkPermission type: ', type);
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    console.log('AppPermission checkPermission permissions: ', permissions);
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      console.log('AppPermission checkPermission result: ', result);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          return true;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
      //   return this.requestPermission(permissions); // request permission
    } catch (error) {
      console.log('퍼미션 에러뜸');
      console.log(error);
      return false;
    }
  };

  requestPermission = async permissions => {
    console.log('AppPermission requestPermission permissions: ', permissions);
    try {
      const result = await request(permissions);
      console.log('AppPermission requestPermission result: ', result);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log(`ios requestPermission에러 예요!!`, error);
      return false;
    }
  };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
