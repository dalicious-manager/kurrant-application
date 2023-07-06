import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {View, Image, Alert, Pressable, Text} from 'react-native';
import {useQueryClient} from 'react-query';
import styled from 'styled-components';
import Toast from '~components/Toast';

import ModalComponent from './components/ModalComponent';
import {MySpot, ShareSpot, PrivateSpot} from '../../assets';
import useGroupSpots from '../../biz/useGroupSpots/hook';
import BottomModal from '../../components/BottomModal';
import Typography from '../../components/Typography';
import {
  useDeleteApplyMySpot,
  useGetPrivateSpots,
  useGroupSpotList,
} from '../../hook/useSpot';
import {useGetUserInfo} from '../../hook/useUserInfo';
import {SCREEN_NAME} from '../../screens/Main/Bnb';
import {PAGE_NAME as GroupManagePageName} from '../Group/GroupManage/SpotManagePage';
import {PAGE_NAME as MySpotMap} from '../Map/MySpotMap';
import {PAGE_NAME as ShareSpotMap} from '../Map/ShareSpotMap';
import {PAGE_NAME as PrivateInfo} from '../Spots/privateSpot/PrivateInfo';
import {PAGE_NAME as SpotGuidePage} from '../Spots/spotGuide/SpotGuide';

export const PAGE_NAME = 'SPOT_TYPE';
const SpotType = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const toast = Toast();
  const {mutateAsync: deleteBtn} = useDeleteApplyMySpot();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  // const {userGroupSpotCheck, isUserGroupSpotCheck} = useGroupSpots();
  const {data: isUserGroupSpotCheck, refetch: groupRefetch} =
    useGroupSpotList();
  const alreadyRegister = isUserInfo?.requestedMySpotDto?.isRequested;
  const myspotAddress = isUserInfo?.requestedMySpotDto?.address;
  const address = myspotAddress?.includes(null)
    ? myspotAddress.split('null')[0]
    : myspotAddress;

  const closeModal = () => {
    setModalVisible(false);
    setModalVisible2(false);
  };

  const myspotButton = () => {
    if (isUserGroupSpotCheck?.data?.mySpotCount === 1) {
      setModalVisible(true);
    } else if (
      (isUserGroupSpotCheck?.data?.mySpotCount > 0 && alreadyRegister) ||
      alreadyRegister
    ) {
      setModalVisible2(true);
    } else {
      navigation.navigate(MySpotMap);
    }
  };

  const goTospotManagePage = () => {
    setModalVisible(false);
    queryClient.invalidateQueries('groupSpotDetail');
    navigation.navigate(GroupManagePageName);
  };

  const alreadyRegisterMySpot = async () => {
    setModalVisible2(false);
    navigation.navigate(MySpotMap);
  };

  const nextButton = () => {
    if (isUserGroupSpotCheck?.data?.spotListResponseDtoList?.length > 0) {
      navigation.navigate(SCREEN_NAME);
    } else {
      navigation.navigate(SpotGuidePage);
    }
  };

  return (
    <Wrap showsVerticalScrollIndicator={false}>
      <ContentsWrap>
        <View>
          <View>
            <HeaderTitle>배송 받을 방법을{`\n`}선택해 주세요</HeaderTitle>

            <HeaderDscText>
              찾고 계신 스팟 타입은 무엇인가요?{`\n`}여러 개의 스팟 등록이
              가능해요.
            </HeaderDscText>
          </View>

          <BoxWrap>
            <Box onPress={() => myspotButton()}>
              <ImageWrap>
                <Image source={MySpot} style={{width: 70, height: 60}} />
                <ImageDscText>
                  <UsedSpotCountDsc>
                    {isUserGroupSpotCheck?.data?.mySpotCount}
                  </UsedSpotCountDsc>
                  /1 이용중
                </ImageDscText>
              </ImageWrap>
              <TextWrap>
                <Title>마이스팟</Title>
                <Contents>문 앞으로 개인배송{`\n`}받고 싶어요</Contents>
              </TextWrap>
            </Box>
            <ModalComponent title={1} myspotButton={myspotButton} />
          </BoxWrap>
          <BoxWrap>
            <Box onPress={() => navigation.navigate(ShareSpotMap)}>
              <ImageWrap>
                <Image source={ShareSpot} style={{width: 70, height: 60}} />
                <ImageDscText>
                  <UsedSpotCountDsc>
                    {isUserGroupSpotCheck?.data?.shareSpotCount}
                  </UsedSpotCountDsc>
                  /2 이용중
                </ImageDscText>
              </ImageWrap>

              <TextWrap>
                <Title>공유 스팟</Title>
                <Contents>가까운 공유 배송 장소에서{`\n`}가져갈게요</Contents>
              </TextWrap>
            </Box>
            <ModalComponent title={2} />
          </BoxWrap>
          <BoxWrap>
            <Box
              onPress={() =>
                navigation.navigate(PrivateInfo, {
                  list: isUserGroupSpotCheck?.data?.spotListResponseDtoList
                    ?.length,
                })
              }
              style={{paddingLeft: 52}}>
              <ImageWrap>
                <Image source={PrivateSpot} style={{width: 60, height: 60}} />
                <ImageDscText style={{paddingLeft: 0}}>
                  <UsedSpotCountDsc>
                    {isUserGroupSpotCheck?.data?.privateCount}
                  </UsedSpotCountDsc>
                  {`\u00A0`}이용중
                </ImageDscText>
              </ImageWrap>

              <TextWrap>
                <Title>프라이빗 스팟</Title>
                <Contents>
                  특정 단체 내 사람들끼리{`\n`}함께 배송받을래요
                </Contents>
              </TextWrap>
            </Box>
            <ModalComponent title={3} />
          </BoxWrap>
          {show && (
            <toast.ToastWrap
              message={`설정>권한 에서 '정확한 위치' 접근 권한을 허용해 주세요`}
              isHeader={false}
            />
          )}
          <Pressable onPress={nextButton}>
            <NextText>다음에 설정하기</NextText>
          </Pressable>
        </View>
      </ContentsWrap>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={`마이스팟은 최대 1개만 가질 수 있어요`}
        description={`기존 스팟을 '스팟관리'에서 탈퇴해야 해요.${`\n`}스팟 관리로 이동 하시겠어요?`}
        buttonTitle1={'아니요'}
        buttonType1="grey7"
        buttonTitle2={'이동'}
        buttonType2="yellow"
        onPressEvent1={closeModal}
        onPressEvent2={goTospotManagePage}
      />
      <BottomModal
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        title={`${address}`}
        description={`마이스팟은 최대 1개만 가질 수 있어요.${`\n`}신청하셨던 스팟의 주소를 변경하시겠어요?`}
        buttonTitle1={'아니요'}
        buttonType1="grey7"
        buttonTitle2={'예'}
        buttonType2="yellow"
        onPressEvent1={closeModal}
        onPressEvent2={alreadyRegisterMySpot}
      />
    </Wrap>
  );
};

export default SpotType;

const Wrap = styled.View`
  flex: 1;
  height: 100%;
  padding: 0px 24px 0px 24px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const BoxWrap = styled.View`
  margin-bottom: 24px;
`;
const Box = styled.Pressable`
  background-color: white;
  padding: 24px 28px 24px 42px;
  border-radius: 14px;
  flex-direction: row;
  align-items: flex-end;
`;

const Title = styled(Typography).attrs({text: 'Title03SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Contents = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-top: 8px;
`;

const TextWrap = styled.View`
  padding-left: 24px;
`;

const HeaderTitle = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const HeaderDscText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 16px;
  margin-top: 8px;
`;

const NextText = styled(Typography).attrs({text: 'BottomButtonR'})`
  color: ${({theme}) => theme.colors.grey[5]};
  text-align: center;
`;

const ImageWrap = styled.View``;

const ImageDscText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.grey[3]};
  margin-top: 8px;
  padding-left: 6px;
`;

const UsedSpotCountDsc = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;

const ContentsWrap = styled.ScrollView`
  flex: 1;
`;
