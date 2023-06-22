import {useNavigation} from '@react-navigation/native';
import {useAtomValue} from 'jotai';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Dimensions, Pressable, ScrollView, View} from 'react-native';
import styled from 'styled-components';

import Arrow from '../../../../assets/icons/Group/arrowWhite.svg';
import Close from '../../../../assets/icons/Group/close.svg';
import Pen from '../../../../assets/icons/Group/pen.svg';
import useGroupSpots from '../../../../biz/useGroupSpots/hook';
import BottomSheetSpot from '../../../../components/BottomSheetSpot';
import Button from '../../../../components/Button';
import TextButton from '../../../../components/TextButton';
import Toast from '../../../../components/Toast';
import Typography from '../../../../components/Typography';
import {useGroupSpotList} from '../../../../hook/useSpot';
import {useGetUserInfo} from '../../../../hook/useUserInfo';
import {SCREEN_NAME} from '../../../../screens/Main/Bnb';
import {setStorage} from '../../../../utils/asyncStorage';
import withCommas from '../../../../utils/withCommas';
import {PAGE_NAME as SpotTypePage} from '../../../Spots/SpotType';
import {PAGE_NAME as ApartRegisterSpotPageName} from '../../GroupApartment/SearchApartment/AddApartment/DetailAddress';
import {PAGE_NAME as ApartModifyAddressHoPageName} from '../../GroupApartment/SearchApartment/AddApartment/DetailHo';
import {PAGE_NAME as CreateGroupPageName} from '../../GroupCreate';
import {PAGE_NAME as SelectSpotPageName} from '../../GroupManage';
const WIDTH = Dimensions.get('screen').width;
export const PAGE_NAME = 'P__GROUP__MANAGE__DETAIL';
const Pages = ({route}) => {
  const toast = Toast();
  const from = route?.params?.from;
  const navigation = useNavigation();
  const {
    groupSpotDetail,
    isDetailSpot,
    userGroupSpotCheck,
    // isUserGroupSpotCheck,
    userWithdrawGroup,
    userSpotRegister,
  } = useGroupSpots();
  const {data: isUserGroupSpotCheck, refetch: groupRefetch} =
    useGroupSpotList();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState();
  //const [groupState,setGroupState] = useState();
  const modalOpen = () => {
    setModalVisible(true);
  };
  const supportPrice = isDetailSpot?.mealTypeInfoList?.map(
    el => el.supportPrice,
  );

  const groupId = isUserInfo?.groupId;
  const spotId = isUserInfo?.spotId;
  const spotType = isUserInfo?.spotType;

  const myGroupList =
    isUserGroupSpotCheck?.data?.spotListResponseDtoList?.filter(
      el => el.clientId !== groupId,
    );

  const cutName = isDetailSpot?.address?.includes(null);
  const useName = cutName
    ? isDetailSpot?.address?.split('null')[0]
    : isDetailSpot?.address;

  const anotherSpot = async id => {
    try {
      const res = await userSpotRegister({id: id});
      if (res.data === null) {
        navigation.navigate(ApartRegisterSpotPageName, {id: id});
      } else {
        toast.toastEvent();
        await groupSpotDetail(id);
      }
    } catch (error) {
      Alert.alert('유저 스팟 가입', error?.toString()?.replace('error: ', ''));
    }
  };

  const withdrawPress = () => {
    Alert.alert(
      '스팟 탈퇴',
      '이 스팟의 모든 상세스팟에서 로그아웃됩니다.\n정말 탈퇴하시겠어요?',

      [
        {
          text: '취소',
          onPress: () => {},
        },
        {
          text: '스팟 탈퇴',
          onPress: async () => {
            try {
              const res = await userWithdrawGroup({
                id: groupId,
              });
              await setStorage('spotStatus', res.data.toString());

              if (myGroupList.length === 0) {
                navigation.navigate(SpotTypePage);
              } else {
                navigation.navigate(SelectSpotPageName);
              }
            } catch (err) {
              Alert.alert('스팟 탈퇴', err?.toString()?.replace('error: ', ''));
            }
          },
          style: 'destructive',
        },
      ],
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          // onPress={() => {
          //   navigation.reset({
          //     index: 0,
          //     routes: [
          //       {
          //         name: SCREEN_NAME,
          //       },
          //     ],
          //   });
          // }}
          style={{width: 40, height: 20}}>
          {/* <CloseIcon /> */}
        </Pressable>
      ),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function LoadGroupDetail() {
      try {
        await groupSpotDetail(spotId);
      } catch (err) {
        // Alert.alert('상세 그룹 정보', err?.toString()?.replace('error: ', ''));
      }
    }
    if (spotId) LoadGroupDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotId]);

  useEffect(() => {
    if (from === 'shareSpotMap') {
      setModalVisible(true);
    }
  }, [from]);

  return (
    // <SafeView>
    <Wrap>
      <TitleWrap>
        <SpotSelect>스팟 선택</SpotSelect>
      </TitleWrap>
      <SpotView onPress={modalOpen}>
        <SpotName>{isDetailSpot?.spotName}</SpotName>
        <Arrow />
      </SpotView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContentView>
          <TextView>
            <Title>배송지</Title>
            <ContentText>{useName}</ContentText>
          </TextView>
          {/* {isDetailSpot?.ho !== null && (
            <TextView>
              <Title>세부 주소</Title>
              <HoView
                onPress={() => {
                  navigation.navigate(ApartModifyAddressHoPageName, {
                    id: spotId,
                  });
                }}>
                <ContentText>{isDetailSpot?.ho}호</ContentText>
                <PenIcon />
              </HoView>
            </TextView>
          )} */}
          <TextView>
            <Title>멤버십 할인 마감 / 주문 마감 / 배송 시간</Title>
            {isDetailSpot?.mealTypeInfoList?.map((el, idx) => {
              const diningType =
                el.diningType === 1
                  ? '아침'
                  : el.diningType === 2
                  ? '점심'
                  : '저녁';
              return (
                <ContentText key={idx}>
                  {diningType} 식사 {'\n'}({el.membershipBenefitTime} /{' '}
                  {el.lastOrderTime} / 당일{el.deliveryTime})
                </ContentText>
              );
            })}
          </TextView>
          {supportPrice?.[0] !== null && (
            <TextView>
              <Title>식사 지원금</Title>
              {isDetailSpot?.mealTypeInfoList?.map((el, idx) => {
                const diningType =
                  el.diningType === 1
                    ? '아침'
                    : el.diningType === 2
                    ? '점심'
                    : '저녁';
                return (
                  <ContentText key={idx}>
                    {diningType} 식사 ({withCommas(el.supportPrice)}원)
                  </ContentText>
                );
              })}
            </TextView>
          )}
          <TextView>
            <Title>스팟명</Title>
            <ContentText>{isDetailSpot?.clientName}</ContentText>
            <Withdraw>
              <TextButton
                size="label13R"
                type="grey5"
                label="스팟 탈퇴"
                onPressEvent={() => {
                  withdrawPress();
                }}
              />
            </Withdraw>
          </TextView>
        </ContentView>
      </ScrollView>

      <BottomSheetSpot
        userSpotId={spotId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="스팟 선택"
        data={isUserGroupSpotCheck?.data?.spotListResponseDtoList}
        selected={selected}
        setSelected={setSelected}
        onPressEvent={id => {
          anotherSpot(id);
        }}
      />

      <toast.ToastWrap message={'스팟이 설정됐어요'} icon={'checked'} />
      <BottomContainer>
        <ButtonBox>
          <Button
            label="확인"
            onPressEvent={() => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAME,
                  },
                ],
              });
            }}
          />
        </ButtonBox>
        <AddSpotWrap onPress={() => navigation.navigate(SpotTypePage)}>
          <AddSpotText>다른 스팟 신청/추가</AddSpotText>
        </AddSpotWrap>
      </BottomContainer>
    </Wrap>
    // </SafeView>
  );
};

export default Pages;

const SafeView = styled.SafeAreaView`
  flex: 1;
`;
const Wrap = styled.View`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
  padding: 0px 24px;
  //align-items: center;
  width: ${WIDTH}px;
`;

const TitleWrap = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const SpotView = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${({theme}) => theme.colors.grey[2]};
  border-radius: 14px;
  width: 100%;
  margin-bottom: 16px;
`;

const ContentView = styled.View`
  width: 100%;
  padding: 24px 24px 0px 24px;
  background-color: white;
  border-radius: 14px;
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  position: relative;
  margin-bottom: 48px;
`;

const TextView = styled.View`
  margin-bottom: 20px;
`;

const AddSpotWrap = styled.Pressable`
  margin-top: 24px;
`;

const Withdraw = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const ButtonBox = styled.View``;
const SpotSelect = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 24px;
  margin-top: 40px;
`;
const BottomContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  margin-bottom: 56px;
`;
const SpotName = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[0]};
`;

const Title = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const ContentText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[1]};
`;

const AddSpotText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[3]};
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors.grey[3]};
`;

const HoView = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const PenIcon = styled(Pen)`
  margin-left: 4px;
`;

const CloseIcon = styled(Close)`
  margin-left: 10px;
`;
