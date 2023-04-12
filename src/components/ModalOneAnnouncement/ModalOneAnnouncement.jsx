import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import styled, {useTheme} from 'styled-components';
import Typography from '../Typography';

import HTML, {defaultSystemFonts} from 'react-native-render-html';

import {Dimensions, ScrollView} from 'react-native';
import {setStorage} from '../../utils/asyncStorage';
import {removeItemFromStorage} from '../../utils/asyncStorage';

const Component = ({modalVisible, data, setModalVisible}) => {
  const themeApp = useTheme();

  useEffect(() => {
    console.log('모달은 떴어용');
  }, []);

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

  // console.log(data.content);
  console.log(data.title);
  console.log(data.updated);

  const handleMessageRead = async () => {
    // 1. 클릭하면 localstorage에 클릭한 날짜 저장
    // 기존거 지우고 새로운거 올리기
    await removeItemFromStorage('announcementsClickedOneDate');

    const checkedTimeObject = {};
    checkedTimeObject[data.id.toString()] = Date.now();

    await setStorage(
      'announcementsClickedOneDate',
      JSON.stringify(checkedTimeObject),
    );

    // 2. modalVisible
    setModalVisible(false);
  };

  useEffect(() => {
    return () => {
      console.log('컴포넌트 없어짐' + data.id);
    };
  }, []);

  return (
    <CenteredView>
      <Modal transparent={true} visible={modalVisible}>
        <CenteredView>
          <ModalView>
            <MessageReadPressable
              onPress={() => {
                handleMessageRead();
              }}>
              <ModalText>일주일간 보지 않기 x</ModalText>
            </MessageReadPressable>

            <TitleView>
              <TitleText>{data.title}</TitleText>

              <DateText>{data.updated}</DateText>
            </TitleView>

            <ContenContainerScrollView>
              <HTML
                contentWidth={Dimensions.get('window').width}
                source={source}
                systemFonts={systemFonts}
              />
              <Filler></Filler>
            </ContenContainerScrollView>
            <ConfirmPressable
              onPress={() => {
                setModalVisible(false);
              }}>
              <ConfirmText>확인</ConfirmText>
            </ConfirmPressable>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default Component;

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* margin-top: 22px; */

  background-color: 'rgba(0,0,0,0.7)';
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
  border-radius: 10px;
`;

const TitleView = styled.View`
  border-radius: 10px 10px 0 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  top: 0;
`;

const TitleText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${props => props.theme.colors.grey[2]};
`;
const DateText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${props => props.theme.colors.grey[4]};
`;

const ContentText = styled.Text`
  font-size: 10px;
`;

const Filler = styled.View`
  width: 100%;
  height: 70px;
`;

const MessageReadPressable = styled.Pressable`
  position: absolute;
  top: -24px;
  right: 2px;
  /* bottom: 5px;
  right: 10px; */
`;

const ModalText = styled.Text`
  font-size: 14px;
  color: white;
`;

const ContenContainerScrollView = styled(ScrollView)`
  padding-bottom: 24px;
  position: relative;
`;

const ConfirmPressable = styled.Pressable`
  width: 263px;
  height: 50px;
  background-color: ${props => props.theme.colors.grey[2]};
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  position: absolute;
  bottom: 10px;
`;

const ConfirmText = styled(Typography).attrs({text: 'Button09SB'})`
  color: white;
`;