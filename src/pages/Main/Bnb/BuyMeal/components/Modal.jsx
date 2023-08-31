import {useNavigation} from '@react-navigation/native';
import {useAtomValue} from 'jotai';
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import styled from 'styled-components';
import BottomModal from '~components/BottomModal';

import CloseIcon from '../../../../../assets/icons/BuyMeal/close.svg';
import AIicon from '../../../../../assets/icons/BuyMeal/modalAI.svg';
import XIcon from '../../../../../assets/icons/BuyMeal/modalX.svg';
import Typography from '../../../../../components/Typography';
import {
  useGetPrivateMembership,
  useGetUserInfo,
} from '../../../../../hook/useUserInfo';
import {getStorage, setStorage} from '../../../../../utils/asyncStorage';
import {formattedDate} from '../../../../../utils/dateFormatter';
import {PAGE_NAME as MembershipIntro} from '../../../../Membership/MembershipIntro';

const Modal = ({hideModal, setHideModal, setModalVisible2}) => {
  const navigation = useNavigation();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  // const [hideModal, setHideModal] = useState(true);
  const {data: isPrivateMembership, refetch: privateMembershipRefetch} =
    useGetPrivateMembership();
  // const [modalVisible2, setModalVisible2] = useState(false);
  const today = new Date();
  const now = new Date();
  const oneMonthLater = new Date(now.setMonth(now.getMonth() + 1));

  const hidePress = async () => {
    await setStorage('onMonthLater', formattedDate(oneMonthLater));
    setHideModal(false);
  };

  const closePress = () => {
    setHideModal(false);
  };

  useEffect(() => {
    const day = async () => {
      const getLaterDate = await getStorage('onMonthLater');

      const popup = getLaterDate === formattedDate(today);
      if (getLaterDate === null || popup) {
        setHideModal(true);
      } else {
        setHideModal(false);
      }
    };
    day();
  }, []);
  return (
    <>
      {hideModal && (
        <Wrapper>
          <Wrap>
            <CloseButtonWrap>
              <CloseButton
                onPress={() => {
                  closePress();
                }}>
                <XIcon />
              </CloseButton>
            </CloseButtonWrap>
            <TitleWrap>
              <AIIcon />
              <Title>AI 메뉴 추천 받기</Title>
            </TitleWrap>
            <ContentsWrap>
              <ContentsText>
                멤버십 가입하고 AI에게 메뉴 추천을 받아보세요!
              </ContentsText>
              <ContentsText>
                구매이력이 쌓이면 더 정확한 추천을 받을 수 있어요
              </ContentsText>
              <MembershipButton
                onPress={() => {
                  if (isPrivateMembership?.data) {
                    console.log('tests');
                    setModalVisible2(true);
                  } else {
                    navigation.navigate(MembershipIntro, {
                      isFounders: isUserInfo?.leftFoundersNumber > 0,
                    });
                  }
                }}>
                <ButtonText>멤버십 가입하기</ButtonText>
              </MembershipButton>
            </ContentsWrap>
          </Wrap>
          <HideButtonWrap
            onPress={() => {
              hidePress();
            }}>
            <HideButton>
              <HideButtonText>한달간 보지 않기</HideButtonText>
              <CloseIcon />
            </HideButton>
          </HideButtonWrap>
        </Wrapper>
      )}
    </>
  );
};

export default Modal;

const Wrapper = styled.View`
  margin: 0px 24px;
`;
const Wrap = styled.View`
  background-color: #f5f2ff;
  border-radius: 7px;
  padding: 12px 24px 28px 24px;
`;
const AIIcon = styled(AIicon)`
  margin-bottom: 10px;
  opacity: 0.6;
`;
const Title = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-left: 7px;
  align-items: center;
  padding-top: 4px;
`;

const TitleWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  position: relative;
  margin-top: -14px;
`;

const ContentsWrap = styled.View`
  align-items: center;
  margin-top: 6px;
`;
const ContentsText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[3]};
`;

const MembershipButton = styled.Pressable`
  background-color: ${({theme}) => theme.colors.purple[500]};
  padding: 3.5px 12px;
  border-radius: 999px;
  margin-top: 16px;
`;

const ButtonText = styled(Typography).attrs({text: 'Button09SB'})`
  color: #ffffff;
`;

const CloseButton = styled.Pressable`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const CloseButtonWrap = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: -12px;
`;

const HideButtonWrap = styled.Pressable`
  flex-direction: row;
  justify-content: center;
`;
const HideButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;

  align-items: center;
  margin-top: 8px;
`;

const HideButtonText = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-right: 4px;
`;
