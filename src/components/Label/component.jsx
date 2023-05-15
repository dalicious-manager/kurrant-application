import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styled from 'styled-components';

import {getLabelColor, getLabelSizeStyle, getLabelWrapColor} from './style';
/**
 * @param {object} props
 * @param {'labelM' | 'labelS' } props.size M:28px S:18px
 * @param {'grey2' | 'grey8' | 'red' | 'blue' | 'green' | 'outline' | 'vegan'  | soldOut} props.type
 * @param {function} props.onPressEvent
 * @returns
 */

const Component = ({label = '텍스트', type = 'red', size = 'labelS'}) => {
  return (
    <Wrap type={type}>
      <Label type={type} size={size}>
        {label}
      </Label>
    </Wrap>
  );
};

export default Component;

const Label = styled.Text`
  ${({type}) => getLabelColor(type)};
  ${({size}) => getLabelSizeStyle(size)};
`;

const Wrap = styled.View`
  ${({type}) => getLabelWrapColor(type)};
  border-radius: 4px;
  padding: 2px 4px;
  align-self: flex-start;
`;
