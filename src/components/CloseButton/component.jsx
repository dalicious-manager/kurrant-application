import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {BackHandler, NativeModules, Platform , View} from 'react-native'
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import CloseIcon from '../../assets/icons/Group/close.svg';

/**
 *
 * @param {object} props
 * @param {number[]} margin index 0 : margin-left, index 1 : margin-right
 * @returns
 */
const Component = ({ margin = [0, 0] }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleBackPress = () => {
    if(navigation.canGoBack()){      
      navigation.goBack();
    }else{
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
      } 
    }
  };


  return (
    <Wrpaper margin={margin} onPress={handleBackPress}>
      
        <CloseIcon/>
      
    </Wrpaper>
  );
};

const Wrpaper = styled.TouchableOpacity`

  margin-left: ${({ margin }) => margin[0]}px;
  margin-right: ${({ margin }) => margin[1]}px;
`;

export default Component;
