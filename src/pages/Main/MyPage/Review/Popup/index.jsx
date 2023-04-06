import React from 'react';
import {Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components';

import XVector from '../../../../../assets/icons/XVector.svg';
import Typography from '../../../../../components/Typography';
// import XVector from '../../../../../assets/icons/Vector.svg';

export const PAGE_NAME = '';

const Pages = ({setPopupShow}) => {
  return (
    <Container>
      <Typograph>
        리뷰 작성/수정은 식사일/배송일로부터
        {'\n'}5일 이내에 가능합니다.
      </Typograph>

      <ClosePopup
        onPress={() => {
          setPopupShow(false);
        }}>
        <XVector />
      </ClosePopup>
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  position: absolute;
  top: 8%;
  align-self: center;
  justify-content: center;
  background-color: white;

  width: 95%;
  height: 62px;

  padding: 0 5%;
  border-radius: 7px;
  z-index: 1;

  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.1);
`;

const ClosePopup = styled.Pressable`
  position: absolute;
  top: 26%;
  right: 7%;
`;

const Typograph = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
