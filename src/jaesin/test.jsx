import React, {useRef, useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import Button from '../components/Button';
import Modal from '../components/Modal';
import RateStars from '../components/RateStars';
import RefTextInput from '../components/RefTextInput';
import ReviewPopup from '../pages/Main/MyPage/Review/Popup';
import InputYo from './Input';
import ModalSample from './ModalSample';
import ModalSample2 from './ModalSample2';
import SseTestOnSpring from './SseSample';

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
      <FormProvider {...form}>
        <RefTextInput
          name="email"
          label="가입한 이메일 주소"
          ref={emailRef}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => {
            console.log('refTextInput');
          }}
          defaultValue={'hi'}
          // blurOnSubmit={false}
          rules={{
            required: '필수 입력 항목 입니다.',
            minLength: {
              value: 8,
              message: '8글자 이상 입력',
            },
            maxLength: {
              value: 31,
              message: '32글자 이하 입력',
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/,
              message: '비밀번호 형식에 맞지 않습니다.',
            },
          }}
        />
      </FormProvider>

      <Button
        type="yellow"
        label="로그인"
        // disabled={!isValidation}
        // onPressEvent={handleSubmit(onSubmit)}
      />

      <InputYo />

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
