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
 * @returns
 */

const Component = ({color}) => {
  const navigation = useNavigation();

    return(
        <Pressable onPress={()=>{navigation.navigate(MealCartPageName)}}>
            <CartIcon color={color || '#343337'}/>
        </Pressable>
    )
}

export default Component;
