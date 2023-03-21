import React from 'react';
import {Dimensions} from 'react-native';

import styled from 'styled-components';
import Typography from '../../../../../components/Typography';

const Component = ({}) => {
  // const phoneWidth =

  return (
    <Container>
      <BannerText>모든 리뷰 작성시 최대 500P</BannerText>
    </Container>
  );
};

export default Component;

const Container = styled.View`
  /* width: 100%; */
  width: ${() => Dimensions.get('screen').width};
  justify-content: center;
  align-items: center;
  position: relative;
  left: -24px;

  height: 56px;
  background-color: ${props => props.theme.colors.blue[100]};

  margin-bottom: 12px;
`;

const BannerText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${props => props.theme.colors.blue[500]};
`;
