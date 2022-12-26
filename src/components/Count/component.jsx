import { atom, useAtom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import React, { useState,useRef, useEffect,  } from 'react';
import { View, Text,TextInput, TouchableWithoutFeedback, Dimensions, Pressable} from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import styled from 'styled-components';

import Minus from '../../assets/icons/MealDetail/minus.svg';
import PlusIcon from '../../assets/icons/MealDetail/plus.svg';
import useShoppingBasket from '../../biz/useShoppingBasket/hook';
import { isQuantityAtom } from '../../biz/useShoppingBasket/store';

/**
 * @param {} props
 * @param {} props.size
 * @param {} props.type

 * @returns
 */


const Component = ({
  increasePress,
  decreasePress,
  onPressEvent,
  count,
  quantity,
  detail,
  cart,
  id,
  addHandle,
  substractHandle
}) => {
  
  return (
    <>
      {detail && <View>
        <InnerView>
          <PressableView onPress={decreasePress}>
            <MinusIcon/>
          </PressableView>
            <Text onPress={onPressEvent}>
                {count}
            </Text>
            <PressableView onPress={increasePress}>
              <PlusIcon />
            </PressableView>
        </InnerView>
      </View>}


      {cart && <View>
        <InnerView>
          <PressableView onPress={()=>substractHandle(id)}>
            <MinusIcon disabled={quantity}/>
          </PressableView>
          <Pressable onPress={onPressEvent}>
            <Text>
              {quantity}
            </Text>
          </Pressable>
            <PressableView onPress={()=>addHandle(id)}>
              <PlusIcon />
            </PressableView>
        </InnerView>
      </View>}
    </>
  )
}; 
// onPress={() => {bodyRef.current.focus(); testPress()}}
export default Component;
const InnerView = styled.View`
flex-direction:row;
align-items:center;
justify-content:space-around;
width:98px;
height:38px;
background-color:${props => props.theme.colors.grey[0]};
border:1px solid ${props => props.theme.colors.grey[6]};
border-radius:7px;
`;

export const PressableView = styled.Pressable`
padding:5px;
height:100%;
justify-content:center;

`;

const MinusIcon = styled(Minus)`
color:${({disabled,theme}) => disabled === 1 ? theme.colors.grey[6]: theme.colors.grey[2]}
`;