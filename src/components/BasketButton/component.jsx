import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, Pressable} from 'react-native';
import styled from 'styled-components';

import CartIcon from '../../assets/icons/BuyMeal/cart.svg';
import useAuth from '../../biz/useAuth';
import {PAGE_NAME as MealCartPageName} from '../../pages/Main/Bnb/MealCart/Main';
import {PAGE_NAME as LoginPageName} from '../../pages/Main/Login/Login';
/**
 *
 * @param {object} props
 * @param {string} color
 * @param {number[]} margin index 0 : margin-left, index 1 : margin-right
 * @returns
 */

const Component = ({color, margin = [0, 0]}) => {
  const navigation = useNavigation();
  const {
    readableAtom: {userRole},
  } = useAuth();
  const goCart = () => {
    if (userRole === 'ROLE_GUEST') {
      return Alert.alert(
        '로그인이 필요합니다',
        '해당 기능은 로그인 이후 사용할수 있습니다.',
        [
          {
            text: '취소',
            onPress: () => {},
          },
          {
            text: '확인',
            onPress: async () => {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: LoginPageName,
                  },
                ],
              });
            },
            style: 'destructive',
          },
        ],
      );
    }
    navigation.navigate(MealCartPageName);
  };

  return (
    <Wrpaper margin={margin} onPress={goCart} activeOpacity={1}>
      <CartIcon color={color || '#343337'} />
    </Wrpaper>
  );
};

export default Component;

const Wrpaper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 40px;
  height: 30px;
  justify-content: flex-end;
  margin-left: ${({margin}) => margin[0]}px;
  margin-right: ${({margin}) => margin[1]}px;
`;
