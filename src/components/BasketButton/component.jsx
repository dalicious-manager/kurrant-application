import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';

import CartIcon from '../../assets/icons/BuyMeal/cart.svg';
import {PAGE_NAME as MealCartPageName} from '../../pages/Main/Bnb/MealCart/Main';

// /**
//  *
//  * @param {object} props
//  * @param {string} color
//  * @param {number[]} margin index 0 : margin-left, index 1 : margin-right
//  * @returns
//  */

const Component = () => {
  const navigation = useNavigation();

    return(
        <Pressable onPress={()=>{navigation.navigate(MealCartPageName)}}>
            <CartIcon/>
        </Pressable>
    )
}

export default Component;