import React, { useState,useRef, useEffect,  } from 'react';
import { View, Text,TextInput, TouchableWithoutFeedback, Dimensions, Pressable} from 'react-native';
import styled from 'styled-components';

import MinusIcon from '../../assets/icons/MealDetail/minus.svg';
import PlusIcon from '../../assets/icons/MealDetail/plus.svg';

/**
 * @param {} props
 * @param {} props.size
 * @param {} props.type

 * @returns
 */
 const screenWidth = Dimensions.get('window').width;

const Component = ({
  increasePress,
  decreasePress,
  onPressEvent,
  count
}) => {
  
  return (
    <View>
      <InnerView>
        <PressableView onPress={decreasePress}>
          <MinusIcon />
        </PressableView>
          <Text onPress={onPressEvent}>
              {count}
          </Text>
          <PressableView onPress={increasePress}>
            <PlusIcon />
          </PressableView>
      </InnerView>
    </View>
  )
}; 
// onPress={() => {bodyRef.current.focus(); testPress()}}
export default Component;

const KeypadInput= styled.View`
  height:50px;
  flex-direction:row;
  background-color:${props => props.theme.colors.yellow[500]};
  justify-content:space-between;
  align-items:center;
  opacity: ${props => props.focus ? 1: 0 };  
`;

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