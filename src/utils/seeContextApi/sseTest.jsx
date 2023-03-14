import React, {useRef, useState} from 'react';

import {Text, View} from 'react-native';
import styled from 'styled-components';
import {sendDone} from '../utils/seeContextApi/restApis/getRestApis';
import {useSseContext} from '../utils/seeContextApi/sseContext';

export const PAGE_NAME = 'P_JAESIN';
export const pathfind = 'yo';

const Pages = () => {
  //   const [sseTestOpen, setSseTestOpen] = useState(false);

  //   const emailRef = useRef(null);

  //   const form = useForm({
  //     mode: 'all',
  //   });
  // const {
  //   // handleSubmit,
  //   formState: {errors, dirtyFields},
  // } = useFormContext();

  const highestContext = useSseContext();

  console.log(highestContext);

  const handlePress = () => {
    sendDone(5);
  };

  return (
    <Container>
      <Text>hi</Text>

      <ButtonPress onPress={handlePress}>
        <Text>끄기</Text>
      </ButtonPress>
      {/* <Modal />
      <ModalSample />
      <ModalSample2 />

      <ReviewPopup /> */}

      {/* {sseTestOpen && <SseTestOnSpring />} */}

      {/* <Button
        label="sse test"
        onPressEvent={() => {
          setSseTestOpen(!sseTestOpen);
        }}
      /> */}
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

const ButtonPress = styled.Pressable`
  width: 60px;
  height: 40px;
  background-color: red;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`;
