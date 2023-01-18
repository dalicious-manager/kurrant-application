import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../../../../../components/Typography';

export const pathFind = 'yo';

const Component = isArrayEmpty => {
  console.log('noorder');
  const screenHeight = Dimensions.get('screen').height;
  console.log(screenHeight);
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
    const screenHeight = Dimensions.get('screen').height;

    if (isArrayEmpty) {
      return `margin-top: 80%`;
    }
  }}

  color: ${props => props.theme.colors.grey[3]};
`;
