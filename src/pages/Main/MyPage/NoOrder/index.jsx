import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../components/Typography';

const Component = ({isArrayEmpty, message}) => {
  console.log('되고있어 빨리확인해');
  return (
    <NoOrderText isArrayEmpty={isArrayEmpty}>{message}</NoOrderText>
    // <>
    //   <Container>
    //     <Text>sldkfjslkdfj</Text>

    //   </Container>
    // </>
  );
};

export default Component;

const Container = styled.View`
  /* flex: 1; */
  background-color: bisque;
`;

const NoOrderText = styled(Typography).attrs({text: 'Body05R'})`
  margin: auto;

  ${({isArrayEmpty}) => {
    if (isArrayEmpty) {
      return `margin-top: 80%`;
    }
  }}

  color: ${props => props.theme.colors.grey[3]};
`;
