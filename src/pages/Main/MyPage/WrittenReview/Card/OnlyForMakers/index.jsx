import React from 'react';

import styled from 'styled-components';
import {GreyLockerIcon} from '../../../../../../components/Icon';

import Typography from '../../../../../../components/Typography';

const Component = () => {
  return (
    <Container>
      <GreyLockerIcon />

      <OnlyForMakersText>메이커스에게만 보이는 리뷰에요.</OnlyForMakersText>
    </Container>
  );
};

export default Component;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const OnlyForMakersText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${props => props.theme.colors.grey[5]};
  margin-left: 6px;
`;
