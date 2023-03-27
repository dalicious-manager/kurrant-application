import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import styled, {useTheme} from 'styled-components';
import Typography from '../Typography';

import HTML, {defaultSystemFonts} from 'react-native-render-html';

import {Dimensions, ScrollView} from 'react-native';
import {setStorage} from '../../utils/asyncStorage';

const Component = ({modalVisible, setModalVisible, data}) => {
  const themeApp = useTheme();

  // // <br>지우기

  // const replaced = data.content.replace('<br>', '');

  const systemFonts = [
    ...defaultSystemFonts,
    'Pretendard-Regular',
    'Pretendard-SemiBold',
  ];

  const source = {
    html: `<div style='padding-left:24px; padding-right:20px; '> 
        <div style="margin:0; padding: 0 ; width:100%; font-weight: 600; fontFamily:'Pretendard-SemiBold'; font-size:20px; line-height:26px; color:${themeApp.colors.grey[2]}">${data.title}</div>
        <div style="margin:0; padding: 0 ; margin-top:4px; font-weight: 400; fontFamily:'Pretendard-Regular'; font-size:13px; line-height:19px; color:${themeApp.colors.grey[4]}">${data.updated}</div>
        <div style="width:100%; height:1px; margin:24px 0px; background-color:${themeApp.colors.grey[8]}"></div>
        ${data.content}
        </div>`,
  };

  //

  const handleMessageRead = () => {
    const modalStatus = {};

    modalStatus[data.id.toString()] = false;

    setModalVisible(modalStatus);
  };

  console.log('모달 비지블~~~');
  console.log(modalVisible);

  return (
    <CenteredView>
      <Modal transparent={true} visible={!modalVisible[data.id.toString()]}>
        <CenteredView>
          <ModalView>
            {/* <TitleText>{`${data.title}`}</TitleText> */}

            {/* <ContentText>{`${data.content}`}</ContentText> */}
            {/* <ContentText>{`${replaced}`}</ContentText> */}
            <ContenContainer>
              <HTML
                contentWidth={Dimensions.get('window').width}
                source={source}
                systemFonts={systemFonts}
              />
            </ContenContainer>

            <MessageReadPressable
              onPress={() => {
                handleMessageRead();
              }}>
              <ModalText>일주일간 보지 않기 x</ModalText>
            </MessageReadPressable>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default Component;

const ContenContainer = styled(ScrollView)`
  padding-bottom: 24px;
`;

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
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 24px;

  width: 80%;
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
  font-size: 14px;
`;
