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

    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.BLOCKED:
          break;
      }
      //   return this.requestPermission(permissions); // request permission
    } catch (error) {
      return false;
    }
  };

  requestPermission = async permissions => {
    try {
      const result = await request(permissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
