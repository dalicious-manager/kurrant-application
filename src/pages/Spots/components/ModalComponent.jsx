import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Modal, Pressable, Image} from 'react-native';
import styled from 'styled-components';

import {
  modalDscText,
  modalImage,
  modalTitleDscText,
  modalTitleText,
} from './data';
import {CloseButton} from '../../../assets';
import QuestionIcon from '../../../assets/icons/Map/question.svg';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import {PAGE_NAME as MySpotMapPage} from '../../Map/MySpotMap';
import {PAGE_NAME as ShareSpotMapPage} from '../../Map/ShareSpotMap';
import {PAGE_NAME as PriveSpot} from '../privateSpot/PrivateInfo';

const ModalComponent = ({title, myspotButton}) => {
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();

  const useButton = () => {
    if (title === 1) {
      myspotButton();
      // navigation.navigate(MySpotMapPage);
      setModal(false);
    }
    if (title === 2) {
      navigation.navigate(ShareSpotMapPage);
      setModal(false);
    }
    if (title === 3) {
      navigation.navigate(PriveSpot);
      setModal(false);
    }
  };
  return (
    <View>
      <Modal presentationStyle={'fullScreen'} visible={modal}>
        <ModalWrap>
          <ModalContentWrap>
            <CloseWrap onPress={() => setModal(!modal)}>
              <Image source={CloseButton} style={{width: 24, height: 24}} />
            </CloseWrap>
            <InnerWrap>
              <Title>{modalTitleText(title)}</Title>
              <TitleDscText>{modalTitleDscText(title)}</TitleDscText>
              <Image
                source={modalImage(title)}
                style={{width: 128, height: 100}}
              />
              <DscText>{modalDscText(title)}</DscText>
            </InnerWrap>
            <ButtonWrap>
              <Button
                label="사용할게요"
                text="Button09SB"
                onPressEvent={useButton}
              />
              <Pressable onPress={() => setModal(!modal)}>
                <CloseText>닫기</CloseText>
              </Pressable>
            </ButtonWrap>
          </ModalContentWrap>
        </ModalWrap>
      </Modal>
      <MoreButton onPress={() => setModal(true)}>
        <MoreText>더 알아보기</MoreText>
        <QuestionIcon />
      </MoreButton>
    </View>
  );
};

export default ModalComponent;

const ModalContentWrap = styled.View`
  background-color: white;
  border-radius: 14px;
  height: 522px;
`;

const ModalWrap = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0px 28px;
  justify-content: center;
  flex: 1;
`;

const MoreText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  padding-right: 2px;
`;
const MoreButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
  align-self: flex-end;
`;

const Title = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;
const TitleDscText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  text-align: center;
  margin-top: 8px;
  margin-bottom: 24px;
`;

const DscText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  text-align: center;
  margin-top: 24px;
`;

const InnerWrap = styled.View`
  align-items: center;
  padding-top: 56px;
`;

const ButtonWrap = styled.View`
  position: absolute;
  bottom: 27px;
  margin: 0px 28px;
`;

const CloseText = styled(Typography).attrs({text: 'Button09R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  text-align: center;
  margin-top: 14px;
`;

const CloseWrap = styled.Pressable`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
`;
