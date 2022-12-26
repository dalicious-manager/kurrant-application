import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components';

import CartIcon from '../../assets/icons/BuyMeal/cart.svg';
import {PAGE_NAME as MealCartPageName} from '../../pages/Main/Bnb/MealCart/Main';

/**
 *
 * @param {object} props
 * @param {string} color
 * @param {number[]} margin index 0 : margin-left, index 1 : margin-right
 * @returns
 */

const Component = ({color , margin = [0,0]}) => {
  const navigation = useNavigation();

    return(
        <Wrpaper margin={margin} onPress={()=>{navigation.navigate(MealCartPageName)}} activeOpacity={1}>
            <CartIcon color={color || '#343337'}/>
        </Wrpaper>
    )
}

export default Component;

const Wrpaper = styled.TouchableOpacity`
  margin-left: ${({ margin }) => margin[0]}px;
  margin-right: ${({ margin }) => margin[1]}px;
`;