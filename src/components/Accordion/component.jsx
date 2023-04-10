import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import styled from 'styled-components';

import ArrowDown from '../../assets/icons/Arrow/arrowDown.svg';

export const hoho = 'hoho';

const Component = ({title, bodyText}) => {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <Pressable onPress={() => setShow(!show)}>
        <View>
          <Text>{title}</Text>
        </View>
        <ArrowDown />
      </Pressable>
      {show && (
        <View>
          <Text>{bodyText}</Text>
        </View>
      )}
    </Container>
  );
};

export default Component;

const Container = styled.View`
  width: 100%;
  overflow: hidden;
`;
