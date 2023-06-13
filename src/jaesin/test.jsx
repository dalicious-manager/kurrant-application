import React, {useEffect, useRef, useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {Text, View} from 'react-native';
import styled from 'styled-components';
// import useWrittenReview from '../biz/useReview/useWrittenReview/hook';
import Button from '../components/Button';

// import Modal from '../components/Modal';
// import RateStars from '../components/RateStars';
// import RefTextInput from '../components/RefTextInput';
// import ReviewPopup from '../pages/Main/MyPage/Review/Popup';
// import InputYo from './InputYo';

// import ModalSample from './ModalSample';
// import ModalSample2 from './ModalSample2';

export const PAGE_NAME = 'P_JAESIN';

const Pages = () => {
  const [sseTestOpen, setSseTestOpen] = useState(false);

  const emailRef = useRef(null);

  const form = useForm({
    mode: 'all',
  });
  // const {
  //   // handleSubmit,
  //   formState: {errors, dirtyFields},
  // } = useFormContext();

  // const {eventSourceMsg} = useSse();

  // useEffect(() => {
  //   console.log(eventSourceMsg);
  // }, [eventSourceMsg]);

  return (
    <Container>
      <Text>hi</Text>
      {/* <Modal />
      <ModalSample />
      <ModalSample2 />

      <ReviewPopup /> */}

      {/* {sseTestOpen && <SseTestOnSpring />} */}

      <Button
        label="sse test"
        onPressEvent={() => {
          setSseTestOpen(!sseTestOpen);
        }}
      />
      {/* <FormProvider {...form}></FormProvider> */}

      {/* <InputYo /> */}

      {/* <RateStars ratingInput={4} width="300px" margin="2px" />
      <RateStars ratingInput={0} width="300px" margin="2px" /> */}
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  background-color: #ffffff;
  height: 100%;
`;
