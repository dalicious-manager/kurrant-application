import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import Card from './Card';

export const PAGE_NAME = 'P_MAIN__MYPAGE__WRITTENREVIEW';

const Pages = () => {
  return (
    <Container>
      <Text>hihihihihihi</Text>

      <Card />
      <Card />
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 25px;
  background-color: #ffffff;
`;
