import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, {useTheme} from 'styled-components/native';
import PlusIcon from '~assets/icons/Map/plus.svg';
import EditIcon from '~assets/icons/Spot/edit.svg';
import MealIcon from '~assets/icons/Spot/meal.svg';
import PhoneIcon from '~assets/icons/Spot/phone.svg';
import UserIcon from '~assets/icons/Spot/user.svg';
import Toast from '~components/Toast';
import Typography from '~components/Typography';
import {diningTypeString} from '~utils/diningType';

import DeliveryTable from './components/DeliveryTable';
import {PAGE_NAME as SelectSpotPageName} from '..';
import useGroupSpots from '../../../../biz/useGroupSpots/hook';
import {
  useGroupSpotDetail,
  useGroupSpotList,
  useGroupSpotManageDetail,
  useUpdateMySpotInfo,
} from '../../../../hook/useSpot';
import {setStorage} from '../../../../utils/asyncStorage';
import {PAGE_NAME as ApplySpotPage} from '../../../Spots/shareSpot/ApplySpot';
import {PAGE_NAME as SpotTypePage} from '../../../Spots/SpotType';
import {PAGE_NAME as UpdateSpotPageName} from '../UpdateSpot';

import {PickGrey, TimeIcon, DeliverySpot} from '~assets';
const WIDTH = Dimensions.get('screen').width;

// const detailData = {
//   id: '0b24e5e2-2eab-4bba-9042-fafa1f7fff6a',
//   statusCode: 200,
//   message: '스팟 상세 조회에 성공하셨습니다.',
//   data: {
//     id: 136,
//     name: '달리셔스(카페)',
//     address: '서울특별시 강남구 테헤란로51길 21 3F 달리셔스 (역삼동 704-48)',
//     phone: '01036435850',
//     userCount: 58,
//     diningTypes: [2],
//     mealInfos: [
//       {
//         diningType: 1,
//         lastOrderTime: '0일전 06:00',
//         membershipBenefitTime: '0일전 06:00',
//         deliveryTimes: ['06:30', '07:00', '08:00'],
//       },
//       {
//         diningType: 2,
//         lastOrderTime: '0일전 21:00',
//         membershipBenefitTime: '0일전 21:00',
//         deliveryTimes: ['23:30', '24:00', '01:00'],
//       },
//     ],
//     spots: [
//       {
//         spotId: 138,
//         spotName: '알렉산더',
//         isRestriction: null,
//       },
//     ],
//   },
//   error: null,
// };

export const PAGE_NAME = 'P__GROUP__MANAGE__SPOT_DETAIL';
const Pages = ({route}) => {
  const groupId = route?.params?.groupId;
  const groupType = route?.params?.groupType;
  const themeApp = useTheme();
  const {userWithdrawGroup} = useGroupSpots();
  const {data: isUserGroupSpotCheck} = useGroupSpotList();

  const myGroupList =
    isUserGroupSpotCheck?.data?.spotListResponseDtoList?.filter(
      el => el.clientId !== groupId,
    );
  const {data: detailData, refetch: detailDataRefech} =
    useGroupSpotManageDetail(groupId);

  const navigation = useNavigation();
  const diningType = [1, 2, 3];
  const goToApplyPage = from => {
    navigation.navigate(ApplySpotPage, {
      center: {
        latitude: Number(detailData?.data?.latitude),
        longitude: Number(detailData?.data?.longitude),
      },
      roadAddress: detailData?.data?.address,
      groupId: detailData?.data?.id,
      name: detailData?.data?.name,
      from: 'manage',
    });
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
                navigation.goBack();
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
  const handleChangeName = async type => {
    if (type === 'name') {
      navigation.navigate(UpdateSpotPageName, {
        groupId: groupId,
        name: detailData?.data?.name,
        address: detailData?.data?.address,
        type: type,
      });
    }
    if (type === 'phone') {
      navigation.navigate(UpdateSpotPageName, {
        groupId: groupId,
        name: detailData?.data?.name,
        address: detailData?.data?.address,
        type: type,
      });
    }
  };
  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        if (groupId) detailDataRefech();
      }
    }, [navigation, groupId, detailDataRefech]),
  );

  return (
    <Wrap>
      <Contents>
        {groupType === '마이스팟' ? (
          <Pressable
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => handleChangeName('name')}>
            <Title>{detailData?.data?.name}</Title>
            <EditIcon style={{marginLeft: 8}} width={16} height={16} />
          </Pressable>
        ) : (
          <Title>{detailData?.data?.name}</Title>
        )}
        <ScrollView
          style={{marginTop: 24, paddingBottom: 200}}
          showsVerticalScrollIndicator={false}>
          <Address>
            <Image source={PickGrey} style={{width: 20, height: 20}} />
            <View style={{marginLeft: 16}}>
              <Name>
                <Body06RText>{detailData?.data?.address}</Body06RText>
              </Name>
            </View>
          </Address>
          <Border />
          <DiningTypeWrap>
            <MealIcon width={20} height={20} />
            <DiningTypeBox>
              {diningType.map(v => (
                <DiningTypeText
                  key={v}
                  type={detailData?.data?.diningTypes.includes(v)}
                  value={v}>
                  {diningTypeString(v)}
                  {v !== 3 && (
                    <DiningTypeDisabledText>・</DiningTypeDisabledText>
                  )}
                </DiningTypeText>
              ))}
            </DiningTypeBox>
            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>
          <Border />
          {groupType === '공유스팟' && detailData?.data?.userCount && (
            <>
              <UserViewWrap>
                <UserIcon width={20} height={20} />
                <Body06RText style={{marginLeft: 16}}>
                  {detailData?.data?.userCount}명
                </Body06RText>
              </UserViewWrap>
              <Border />
            </>
          )}

          {groupType === '마이스팟' && detailData?.data?.phone && (
            <Pressable onPress={() => handleChangeName('phone')}>
              <UserViewWrap>
                <PhoneIcon width={20} height={20} />
                <Body06RText style={{marginLeft: 16}}>
                  {detailData?.data?.phone}
                </Body06RText>
                <EditIcon style={{marginLeft: 8}} width={16} height={16} />
              </UserViewWrap>
              <Border />
            </Pressable>
          )}
          <DeliveryWrap>
            <Delivery>
              <Image source={TimeIcon} style={{width: 20, height: 20}} />
              <Body06RText style={{marginLeft: 16}}>
                배송/주문마감 시간
              </Body06RText>
            </Delivery>
            {groupType === '공유스팟' && (
              <ApplyButton onPress={() => goToApplyPage('time')}>
                <PlusIcon />
                <ApplyText>시간 추가 신청</ApplyText>
              </ApplyButton>
            )}
          </DeliveryWrap>
          <InnerView>
            <Typography
              style={{marginBottom: 16}}
              text="Body06R"
              textColor={themeApp.colors.red[500]}>
              상품마다 주문마감시간이 다를 수 있습니다.
            </Typography>
            <DeliveryTable mealInfo={detailData?.data?.mealInfos} />
          </InnerView>
          <Border />
          {groupType !== '마이스팟' && (
            <>
              <DeliveryWrap>
                <Delivery>
                  <Image
                    source={DeliverySpot}
                    style={{width: 20, height: 20}}
                  />

                  <Body06RText style={{marginLeft: 16}}>
                    배송 스팟 리스트
                  </Body06RText>
                </Delivery>
                {groupType === '공유스팟' && (
                  <ApplyButton onPress={() => goToApplyPage('spot')}>
                    <PlusIcon />
                    <ApplyText>스팟 추가 신청</ApplyText>
                  </ApplyButton>
                )}
              </DeliveryWrap>

              <InnerView>
                {detailData?.data?.spots?.length > 0 &&
                  detailData?.data?.spots.map(el => {
                    return (
                      <DetailSpotWrap key={el.spotName}>
                        <DetailSpotName>{el.spotName}</DetailSpotName>
                        {el.isRestriction && (
                          <CardBoolean>
                            <VerticalBorder />
                            <NeedCardText>외부인 출입 제한</NeedCardText>
                          </CardBoolean>
                        )}
                      </DetailSpotWrap>
                    );
                  })}
              </InnerView>
            </>
          )}
        </ScrollView>
        <AddSpotWrap onPress={withdrawPress}>
          <AddSpotText>스팟 탈퇴</AddSpotText>
        </AddSpotWrap>
      </Contents>
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.View`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
  padding-bottom: 126px;
  //align-items: center;
  width: ${WIDTH}px;
`;

const Contents = styled.View`
  padding: 12px 24px 35px 24px;
  position: relative;
`;

const DiningTypeText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, type}) =>
    type ? theme.colors.blue[500] : theme.colors.grey[6]};
`;

const DiningTypeBox = styled.View`
  flex-direction: row;
  margin-left: 12px;
  margin-right: 8px;
`;
const DiningTypeWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserViewWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Body06RText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).attrs({text: 'Title03R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Border = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.grey[8]};
  margin: 16px 0px;
`;

const Address = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const DeliveryWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Delivery = styled.View`
  flex-direction: row;
`;

const ApplyText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-left: 4px;
`;

const ApplyButton = styled.Pressable`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
`;

const VerticalBorder = styled.View`
  width: 1px;
  height: 10px;
  background-color: ${({theme}) => theme.colors.grey[7]};
  margin-right: 8px;
`;

const DetailSpotName = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const NeedCardText = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.blue[500]};

  text-align: center;
`;

const CardBoolean = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

const DetailSpotWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const InnerView = styled.View`
  padding: 0px 0px 0px 36px;
`;

const DiningTypeDisabledText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[6]};
  margin-left: 12px;
  margin-right: 8px;
`;

const Name = styled.View`
  word-break: break-all;

  padding-right: 24px;
`;

const AddSpotWrap = styled.Pressable`
  justify-self: center;
  align-self: center;
  padding-top: 24px;
`;
const AddSpotText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[3]};
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors.grey[3]};
`;
