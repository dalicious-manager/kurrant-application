import React, {useEffect, useRef, useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components';
import useWrittenReview from '../biz/useReview/useWrittenReview/hook';
import Button from '../components/Button';
// import Modal from '../components/Modal';
import RateStars from '../components/RateStars';
import RefTextInput from '../components/RefTextInput';
import ReviewPopup from '../pages/Main/MyPage/Review/Popup';
import InputYo from './InputYo';

import ModalSample from './ModalSample';
import ModalSample2 from './ModalSample2';
import SseTestOnSpring from './SseSample';

import Modal from '../components/UseModal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ModalSample3 from './ModalSample3';
import ModalSample4 from './ModalSample4';

export const PAGE_NAME = 'P_JAESIN';

const Pages = () => {
  const [sseTestOpen, setSseTestOpen] = useState(false);

  const emailRef = useRef(null);

  const {ModalWrapper, close, open} = Modal();

  const form = useForm({
    mode: 'all',
  });
  // const {
  //   // handleSubmit,
  //   formState: {errors, dirtyFields},
  // } = useFormContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  useEffect(() => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible2(true);
    }, 500);
  }, [setModalVisible2]);

  return (
    <Container>
      <Text>hi</Text>
      {/* <Modal />
      <ModalSample />
      <ModalSample2 />

      <ReviewPopup /> */}

      {/* <ModalSample2 /> */}

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible2(true)}>
        <Text style={styles.textStyle}>Show Modal2</Text>
      </Pressable>

      <ModalSample3
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ModalSample4
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
      />

      {/* <ModalWrapper title={'모달임'} content={<Text>하이</Text>} /> */}

      {sseTestOpen && <SseTestOnSpring />}

      <Button
        label="sse test"
        onPressEvent={() => {
          setSseTestOpen(!sseTestOpen);
        }}
      />
      <FormProvider {...form}></FormProvider>

      <InputYo />

      <RateStars ratingInput={4} width="300px" margin="2px" />
      <RateStars ratingInput={0} width="300px" margin="2px" />
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Pages;

const Container = styled.View`
  background-color: #ffffff;
  height: 100%;
`;
