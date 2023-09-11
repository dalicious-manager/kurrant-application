import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {Dimensions, ScrollView} from 'react-native';
import HTML, {RenderHTML, defaultSystemFonts} from 'react-native-render-html';
import styled, {useTheme} from 'styled-components';

import {getStorage, setStorage} from '../../utils/asyncStorage';
import {removeItemFromStorage} from '../../utils/asyncStorage';
import Typography from '../Typography';

const Component = ({modalVisible, data, setModalVisible}) => {
  const systemFonts = [...defaultSystemFonts, 'Pretendard'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const source = {
    html: `<div style="padding-left:24px; padding-right:24px; "> 
        ${data[currentIndex].content}
        </div>`,
  };

  const tagsStyles = {
    img: {
      width: 280,
      marginVertical: 0,
      marginHorizontal: 0,
    },
    p: {
      margin: 0,
      padding: 0,
    },
  };

  const handleMessageRead = async () => {
    const clickedDates =
      JSON.parse(await getStorage('announcementsClickedOneDate')) || [];

    clickedDates.push({id: data[currentIndex].id, date: Date.now()});

    await setStorage(
      'announcementsClickedOneDate',
      JSON.stringify(clickedDates),
    );

    if (currentIndex < data?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setModalVisible(false);
    }
  };

  const confirmPress = () => {
    if (currentIndex < data?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setModalVisible(false);
    }
  };

  return (
    <CenteredView>
      <Modal transparent={true} visible={modalVisible}>
        <CenteredView>
          <ModalView>
            <MessageReadPressable
              onPress={() => {
                handleMessageRead();
              }}>
              <ModalText>다시 보지 않기 x</ModalText>
            </MessageReadPressable>

            <TitleView>
              <TitleText>{data[currentIndex].title}</TitleText>

              <DateText>{data[currentIndex].updated}</DateText>
            </TitleView>

            <ContenContainerScrollView>
              {
                <HTML
                  contentWidth={Dimensions.get('window').width}
                  source={source}
                  systemFonts={systemFonts}
                  tagsStyles={tagsStyles}
                />
              }

              <Filler />
            </ContenContainerScrollView>
            <ConfirmPressable onPress={confirmPress}>
              <ConfirmText>확인</ConfirmText>
            </ConfirmPressable>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default React.memo(Component);

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
  //padding: 10px;
  padding-top: 20px;
  padding-bottom: 24px;

  width: 82%;
  height: 71%;
  position: relative;

  align-items: center;
  border-radius: 10px;
`;

const TitleView = styled.View`
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;
  padding-bottom: 24px;
  position: relative;
  top: 0;
  /* border: 1px solid black; */
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  border-bottom-width: 1px;
  margin-bottom: 22px;
`;

const TitleText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${props => props.theme.colors.grey[2]};
  margin-bottom: 6px;
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
  top: -25px;
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
  width: 100%;
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
  bottom: 16px;
`;

const ConfirmText = styled(Typography).attrs({text: 'Button09SB'})`
  color: white;
`;

// const source = {
//   html: `<div style='padding-left:24px; padding-right:20px; '>
//        <div style="margin:0; padding: 0 ; width:100%; font-weight: 600; fontFamily:'Pretendard-SemiBold'; font-size:20px; line-height:26px; color:${themeApp.colors.grey[2]}">${data.title}</div>
//        <div style="margin:0; padding: 0 ; margin-top:4px; font-weight: 400; fontFamily:'Pretendard-Regular'; font-size:13px; line-height:19px; color:${themeApp.colors.grey[4]}">${data.updated}</div>
//       <div style="width:100%; height:1px; margin:24px 0px; background-color:${themeApp.colors.grey[8]}"></div>
//       ${data.content}
//       </div>`,
// };
