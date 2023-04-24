import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../components/Typography';

const Component = ({isArrayEmpty, message}) => {
  return <NoOrderText isArrayEmpty={isArrayEmpty}>{message}</NoOrderText>;
};

export default Component;

const NoOrderText = styled(Typography).attrs({text: 'Body05R'})`
  margin: auto;

  ${({isArrayEmpty}) => {
    if (isArrayEmpty) {
      return `margin-top: 90%`;
    }
  }}

  color: ${props => props.theme.colors.grey[5]};
`;
