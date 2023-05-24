import React from 'react';
import {View, Pressable} from 'react-native';
import styled from 'styled-components';

import Minus from '../../assets/icons/MealDetail/minus.svg';
import Plus from '../../assets/icons/MealDetail/plus.svg';
import Typography from '../Typography';

const Component = ({
  increasePress,
  decreasePress,
  onPressEvent,
  count,
  quantity,
  id,
  status,
  capacity,
}) => {
  return (
    <View>
      <InnerView>
        <PressableView
          onPress={() => decreasePress(id)}
          disabled={
            count === 1 || status === 0 || status === 2 || quantity === 0
          }>
          <MinusIcon disabled={count} status={status} disable={quantity} />
        </PressableView>
        <Pressable onPress={onPressEvent}>
          <CountText status={status} capacity={capacity} count={count}>
            {count}
            {quantity}
          </CountText>
        </Pressable>
        <PressableView
          onPress={() => increasePress(id)}
          disabled={status === 0 || status === 2}>
          <PlusIcon status={status} />
        </PressableView>
      </InnerView>
    </View>
  );
};

export default Component;
const InnerView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 98px;
  height: 38px;
  background-color: ${props => props.theme.colors.grey[0]};
  border: 1px solid ${props => props.theme.colors.grey[6]};
  border-radius: 7px;
`;

export const PressableView = styled.Pressable`
  padding: 5px;
  height: 100%;
  justify-content: center;
`;

const MinusIcon = styled(Minus)`
  color: ${({disabled, theme, status, disable}) =>
    disabled === 1
      ? theme.colors.grey[6]
      : status === 0 || disable === 0 || status === 2
      ? theme.colors.grey[6]
      : theme.colors.grey[2]};
`;

const PlusIcon = styled(Plus)`
  color: ${({disabled, theme, status}) =>
    disabled === 1
      ? theme.colors.grey[6]
      : status === 0 || status === 2
      ? theme.colors.grey[6]
      : theme.colors.grey[2]};
`;

const CountText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme, status, capacity, count}) =>
    status === 0 || status === 2
      ? theme.colors.grey[6]
      : capacity < count
      ? theme.colors.red[500]
      : theme.colors.grey[2]};
`;
