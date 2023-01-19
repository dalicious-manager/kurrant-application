import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import Modal from '../components/Modal';
import ReviewPopup from '../pages/Main/MyPage/Review/Popup';
import ModalSample from './ModalSample';
import ModalSample2 from './ModalSample2';

export const PAGE_NAME = 'P_JAESIN';

const Pages = () => {
  return (
    <Container>
      <Text>hi</Text>
      <Modal />
      <ModalSample />
      <ModalSample2 />

      <ReviewPopup />
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  background-color: aqua;
  height: 100%;
`;
