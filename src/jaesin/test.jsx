import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import Modal from '../components/Modal';
import RateStars from '../components/RateStars';
import ReviewPopup from '../pages/Main/MyPage/Review/Popup';
import ModalSample from './ModalSample';
import ModalSample2 from './ModalSample2';

export const PAGE_NAME = 'P_JAESIN';

const Pages = () => {
  return (
    <Container>
      <Text>hi</Text>
      {/* <Modal />
      <ModalSample />
      <ModalSample2 />

      <ReviewPopup /> */}

      <RateStars ratingInput={4} width="300px" margin="2px" />
      <RateStars ratingInput={0} width="300px" margin="2px" />
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  background-color: #ffffff;
  height: 100%;
`;
