import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../../components/Typography';

const Component = isArrayEmpty => {
  return (
    <NoOrderText isArrayEmpty={isArrayEmpty}>
      주문 후 리뷰를 작성해 보세요.
    </NoOrderText>
  );
};

export default Component;

const NoOrderText = styled(Typography).attrs({text: 'Body05R'})`
  margin: auto;

  ${({isArrayEmpty}) => {
    if (isArrayEmpty) {
      return `margin-top: 80%`;
    }
  }}

  color: ${props => props.theme.colors.grey[3]};
`;
