import { atom, useAtom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import React, { useState,useRef, useEffect,  } from 'react';
import { View, Text,TextInput, TouchableWithoutFeedback, Dimensions, Pressable} from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import styled from 'styled-components';

import Minus from '../../assets/icons/MealDetail/minus.svg';
import Plus from '../../assets/icons/MealDetail/plus.svg';
import useShoppingBasket from '../../biz/useShoppingBasket/hook';
import { isQuantityAtom } from '../../biz/useShoppingBasket/store';
import Typography from '../Typography';

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
  soldOut,
  id,
  addHandle,
  substractHandle,
  status
}) => {
  
  return (
    <>
      {(detail || soldOut) && <View>
        <InnerView>
          <PressableView onPress={decreasePress} disabled={count === 1 && true}>
            <MinusIcon/>
          </PressableView>
            <CountText onPress={onPressEvent}>
                {count}
            </CountText>
            <PressableView onPress={increasePress}>
              <PlusIcon />
            </PressableView>
        </InnerView>
      </View>}


      {cart && <View>
        <InnerView>
          <PressableView onPress={()=>substractHandle(id)} disabled={quantity === 1 && true || status === 0}>
            <MinusIcon disabled={quantity} status={status}/>
          </PressableView>
          <Pressable onPress={onPressEvent}>
            <CountText status={status}>
              {quantity}
            </CountText>
          </Pressable>
            <PressableView onPress={()=>addHandle(id)} disabled={status === 0 && true}>
              <PlusIcon status={status}/>
            </PressableView>
        </InnerView>
      </View>}

      {/* {soldOut && <View>
        <InnerView>
          <PressableView onPress={()=>console.log('11')} >
            <MinusIcon />
          </PressableView>
          <Pressable onPress={onPressEvent}>
            <CountText>
              0
            </CountText>
          </Pressable>
            <PressableView onPress={()=>console.log('2')} >
              <PlusIcon />
            </PressableView>
        </InnerView>
      </View>} */}
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
color:${({disabled,theme,status}) => disabled === 1 ? theme.colors.grey[6]: status === 0 ? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const PlusIcon = styled(Plus)`
color:${({disabled,theme,status}) => disabled === 1 ? theme.colors.grey[6]: status === 0 ? theme.colors.grey[6] : theme.colors.grey[2]};
`;

const CountText = styled(Typography).attrs({text:'Body05SB'})`
color:${({theme,status}) => status === 0 ? theme.colors.grey[6] : theme.colors.grey[2]};
`;