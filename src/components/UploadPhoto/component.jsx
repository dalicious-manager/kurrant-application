import React from 'react';

import styled from 'styled-components';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';

const Component = ({photosArray, setPhotosArray}) => {
  const widthNum = 80;
  const widthUnit = 'px';
  const heightNum = 80;
  const heightUnit = 'px';
  const marginNum = 16;
  const marginUnit = 'px';

  const ShowPicker = () => {
    //launchImageLibrary : 사용자 앨범 접근

    if (photosArray.length >= 5) {
      Alert.alert('사진 업로드는 5장까지만 가능합니다');
      return;
    }

    launchImageLibrary({}, res => {
      const formdata = new FormData();
      formdata.append('file', res.assets[0].uri);

      setPhotosArray([
        ...photosArray,
        {id: Date.now(), uri: res.assets[0].uri},
      ]);
      // setPhotosArray([...photosArray, res.assets[0].uri]);
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
  /* width: ${(widthNum, widthUnit) => `${widthNum}${widthUnit}`};
  height: ${(heightNum, heightUnit) => `${heightNum}${heightUnit}`}; */
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
