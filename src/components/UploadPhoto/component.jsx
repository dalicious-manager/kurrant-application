import React from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components';

const Component = ({photosArray, setPhotosArray}) => {
  const widthNum = 80;
  const widthUnit = 'px';
  const heightNum = 80;
  const heightUnit = 'px';
  const marginNum = 16;
  const marginUnit = 'px';

  const ShowPicker = async () => {
    //launchImageLibrary : 사용자 앨범 접근
    // const grantedStorage = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAM_STORAGE,
    //   {
    //     title: 'App Camera Permission',
    //     message: 'App needs access to your camera',
    //     buttonNeutral: 'Ask Me Later',
    //     buttonNegative: 'Cancel',
    //     buttonPositive: 'Ok',
    //   },
    // );

    if (photosArray.length >= 6) {
      Alert.alert('사진 업로드는 6장까지만 가능합니다');
      return;
    }

    launchImageLibrary({}, res => {
      if (!res) {
        return;
      }

      if (res.didCancel) {
        console.log('사진 업로드를 취소하셨습니다');
        return;
      }

      if (!res.assets[0]) {
        console.log('사실상 존재하지 않는 이미지파일입니다 ');
        return;
      }
      const formdata = new FormData();
      formdata.append('file', res.assets[0].uri);

      const fileSize = res.assets[0].fileSize;
      console.log('파일 사이즈');
      console.log(fileSize);
      if (fileSize > 4900 * 1000) {
        Alert.alert('용량초과', '사진은 5MB이하 크리고 업로드해주세요', [
          {
            text: '확인',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
        ]);
      } else {
        // 같은 사진일때 구분해줘야함
        // 원래 있던 파일이면 (1)(2)를 추가해준다

        //  이름이 같을때 안 같을 떄? 구분

        // const photosNameArray = photosArray.map((v) => {
        //   return v.fileName

        // })

        // const photosNameSet = new Set(photosNameArray)

        // console.log('여기 들어옴 0');
        // console.log(res.assets[0].fileName);

        // if (photosArray.map(v => v.fileName).includes(res.assets[0].fileName)) {
        //   console.log('여기 들어옴 1');

        //   let k = 1;

        //   const myString = res.assets[0].fileName;
        //   const myArray = myString.split(/\./);

        //   while (
        //     photosArray.map(v => v.fileName).includes(res.assets[0].fileName)
        //   ) {
        //     // 이름뒤에 정수를 넣어준다

        //     myArray.splice(myArray.length - 2, 0, `(${k})`);

        //     k++;
        //   }
        //   const result = myArray.join('');
        //   console.log('여기 결과 2');
        //   console.log(result);
        // }

        setPhotosArray(
          [
            ...photosArray,
            {
              id: Date.now(),
              uri: res.assets[0].uri,
              fileName: res.assets[0].fileName,
            },
          ].reverse(),
          // [...photosArray, {id: Date.now(), uri: res.assets[0]}].reverse(),
        );
      }
    });
  };

  return (
    <>
      <UploadPhotoPressable
        onPress={ShowPicker}
        widthNum={widthNum}
        widthUnit={widthUnit}
        heightUnit={heightUnit}
        heightNum={heightNum}>
        <CrossVerticalAxis
          widthNum={widthNum}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          heightNum={heightNum}
          style={{
            transform: [{translateX: -0}],
          }}
        />
        <CrossHorizontalAxis
          widthNum={widthNum}
          widthUnit={widthUnit}
          heightUnit={heightUnit}
          heightNum={heightNum}
          style={{
            transform: [{translateY: -0}],
          }}
        />
      </UploadPhotoPressable>
    </>
  );
};

export default Component;

const UploadPhotoPressable = styled.Pressable`
  width: 80px;
  height: 80px;
  border-radius: 7px;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  background-color: ${props => props.theme.colors.grey[8]};
`;

const CrossVerticalAxis = styled.View`
  position: absolute;

  width: 2px;
  height: ${(heightNum, heightUnit) => {
    const length = (80 * 18) / 80;

    return `${length}${`px`};`;
  }};

  border: 1px solid ${props => props.theme.colors.grey[1]};
  background-color: ${props => props.theme.colors.grey[1]};
`;
const CrossHorizontalAxis = styled.View`
  position: absolute;
  width: ${() => {
    const length = (80 * 18) / 80;
    return `${length}px;`;
  }};
  height: 2px;
  border: 1px solid ${props => props.theme.colors.grey[1]};
  background-color: ${props => props.theme.colors.grey[1]};
`;
