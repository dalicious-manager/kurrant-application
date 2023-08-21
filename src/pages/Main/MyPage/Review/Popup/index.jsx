import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import styled from 'styled-components/native';

import XVector from '../../../../../assets/icons/XVector.svg';
import Typography from '../../../../../components/Typography';
// import XVector from '../../../../../assets/icons/Vector.svg';

export const PAGE_NAME = '';

const Pages = ({setPopupShow}) => {
  return (
    <Wrap onPress={() => setPopupShow(false)}>
      <TouchableWithoutFeedback style={{width: '100%', height: '100%'}}>
        <Container>
          <Typography>
            리뷰 작성/수정은 식사일/배송일로부터
            {'\n'}5일 이내에 가능합니다.
          </Typography>

          <ClosePopup
            onPress={() => {
              setPopupShow(false);
            }}>
            <XVector />
          </ClosePopup>
        </Container>
      </TouchableWithoutFeedback>
    </Wrap>
  );
};

export default Pages;
const Wrap = styled.Pressable`
  /* background-color: #000000b2; */
  position: absolute;
  z-index: 1;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
`;
const Container = styled.View`
  align-self: center;
  justify-content: center;
  background-color: white;
  margin-top: 166px;
  /* width: 95%; */
  width: 311px;
  height: 62px;

  padding: 0 5%;
  border-radius: 7px;

  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
`;

const ClosePopup = styled.Pressable`
  position: absolute;
  top: 26%;
  right: 7%;
`;

const Typograph = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
