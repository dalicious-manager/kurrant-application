import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import Button from '../components/Button';
import Modal from '../components/Modal';
import RateStars from '../components/RateStars';
import ReviewPopup from '../pages/Main/MyPage/Review/Popup';
import ModalSample from './ModalSample';
import ModalSample2 from './ModalSample2';
import SseTestOnSpring from './SseSample';

export const PAGE_NAME = 'P_JAESIN';

const Pages = () => {
  const [sseTestOpen, setSseTestOpen] = useState(false);

  return (
    <Container>
      <Text>hi</Text>
      {/* <Modal />
      <ModalSample />
      <ModalSample2 />

      <ReviewPopup /> */}

      {sseTestOpen && <SseTestOnSpring />}

      <Button
        onPressEvent={() => {
          setSseTestOpen(!sseTestOpen);
        }}
      />
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
