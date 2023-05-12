import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {BackHandler, Alert, Platform, View} from 'react-native';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

import CloseIcon from '../../assets/icons/Group/close.svg';
import {isCancelSpotAtom} from '../../biz/useGroupSpots/store';

/**
 *
 * @param {object} props
 * @param {number[]} margin index 0 : margin-left, index 1 : margin-right
 * @returns
 */
const Component = ({margin = [0, 0], isSpot = false}) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [isCancelSpot, setIsCancelSpot] = useAtom(isCancelSpotAtom);
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      if (isSpot) {
        Alert.alert(
          '스팟 선택',
          '스팟을 등록하지 않으면, 서비스 이용을 하실 수 없습니다.\n그래도 스팟 등록을 다음이 하시겠습니까?',
          [
            {
              text: '취소',
              onPress: async () => {},
              style: 'destructive',
            },
            {
              text: '확인',
              onPress: () => {
                setIsCancelSpot(true);
                navigation.goBack();
              },
            },
          ],
        );
        }else{
          navigation.goBack();
        }
    } else {
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
      } else {
        navigation.goBack();
      }
    }
  };

  return (
    <Wrpaper margin={margin} onPress={handleBackPress}>
      <CloseIcon />
    </Wrpaper>
  );
};

const Wrpaper = styled.TouchableOpacity`
  margin-left: ${({margin}) => margin[0]}px;
  margin-right: ${({margin}) => margin[1]}px;
`;

export default Component;
