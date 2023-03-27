import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import styled from 'styled-components';
import Typography from '../Typography';

const Component = ({modalVisible, setModalVisible, data}) => {
  console.log('모달비지블');
  console.log(modalVisible);

  // <br>지우기

  const replaced = data.content.replace('<br>', '');

  return (
    // <View style={styles.centeredView}>

    // </View>
    <CenteredView>
      <Modal transparent={true} visible={modalVisible[data.id.toString()]}>
        <CenteredView>
          <ModalView>
            <TitleText>{`${data.title}`}</TitleText>

            {/* <ContentText>{`${data.content}`}</ContentText> */}
            <ContentText>{`${replaced}`}</ContentText>

            <MessageReadPressable
              onPress={() => {
                const yes = {};

                yes[data.id.toString()] = false;

                setModalVisible(yes);
              }}>
              <ModalText>일주일간 보지 않기x</ModalText>
            </MessageReadPressable>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default Component;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;
const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  /* border-radius: 20px; */
  padding: 35px;
  width: 70%;
  height: 70%;
  position: relative;

  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 12px;
`;

const ContentText = styled.Text`
  font-size: 10px;
`;

const MessageReadPressable = styled.Pressable`
  position: absolute;
  bottom: 5px;
  right: 10px;
`;

const ModalText = styled.Text`
  font-size: 12px;
`;
