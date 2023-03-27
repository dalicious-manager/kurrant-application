import React, {useState} from 'react';
import {Modal, Text, View, Pressable} from 'react-native';

import styled from 'styled-components';

import QuestionCircleMonoIcon from '../assets/icons/QuestionCircleMono.svg';

const ModalSample2 = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        // transparent={false}
        transparent={false}
        visible={modalVisible}
        presentationStyle={'truecreen'}>
        <View>
          <BackgroundView>
            <ContainerView>
              <Text>yoyoyo</Text>
              <ModalClose onPress={() => setModalVisible(!modalVisible)}>
                <Text>click to close</Text>
              </ModalClose>
            </ContainerView>
          </BackgroundView>
        </View>
      </Modal>
      <QuestionCircleMonoIcon onPress={() => setModalVisible(!modalVisible)} />
    </View>
  );
};

export default ModalSample2;

const BackgroundView = styled.View`
  position: relative;
  top: 300px;

  height: 50%;
  /* background-color: transparent; */
  background-color: blue;
  border: 1px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerView = styled.View`
  width: 80%;
  height: 120px;
  border: 1px solid black;
`;

const ModalClose = styled.Pressable`
  width: 60px;
  height: 30px;
`;
