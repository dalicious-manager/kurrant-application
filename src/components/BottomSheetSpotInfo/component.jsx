import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Shadow} from 'react-native-shadow-2';
import styled, {useTheme} from 'styled-components/native';

import {
  SharePickSpot,
  PickGrey,
  TimeIcon,
  Card,
  DeliverySpot,
} from '../../assets';
import PlusIcon from '../../assets/icons/Map/plus.svg';
import MealIcon from '../../assets/icons/Spot/meal.svg';
import UserIcon from '../../assets/icons/Spot/user.svg';
import useGroupSpots from '../../biz/useGroupSpots/hook';
import {
  useGetShareSpotDetail,
  useSelectShareSpot,
} from '../../hook/useShareSpot';
import {useGroupSpotList} from '../../hook/useSpot';
import {PAGE_NAME as ApplySpotPage} from '../../pages/Spots/shareSpot/ApplySpot';
import {SCREEN_NAME} from '../../screens/Main/Bnb';
import {SCREEN_NAME as HomeMainPageName} from '../../screens/Main/Bnb';
import {diningTypeString} from '../../utils/diningType';
import Button from '../Button';
import Typography from '../Typography';

const Component = props => {
  const {
    setModalVisible,
    snap,
    setSnap,
    bottomSheetRef,
    data,
    setInitCenter,
    setBottomModal,
  } = props;

  const navigation = useNavigation();
  const {data: detailData, refetch: detailDataRefech} = useGetShareSpotDetail(
    data[0]?.id,
  );

  const {data: isUserGroupSpotCheck} = useGroupSpotList();
  const {mutateAsync: selectSpot} = useSelectShareSpot();

  const detail = detailData?.data;

  const snapPoints = useMemo(() => ['6%', '30%', '90%'], []);

  const handleSheetChanges = useCallback(index => {
    setSnap(index);
  }, []);

  const detailButton = () => {
    bottomSheetRef.current?.snapToIndex(2);
  };
  const diningType = [1, 2, 3];

  const onSelectButton = async () => {
    if (isUserGroupSpotCheck?.data?.shareSpotCount === 2) {
      setModalVisible(false);
      setBottomModal(true);
    } else {
      const body = {
        id: data[0].id,
      };
      await selectSpot(body);
      // await userGroupSpotCheck();

      navigation.navigate(HomeMainPageName);
    }
  };

  const goToApplyPage = from => {
    navigation.navigate(ApplySpotPage, {
      center: {
        latitude: Number(data[0].latitude),
        longitude: Number(data[0].longitude),
      },
      roadAddress: data[0].address,
      groupId: data[0].id,
      name: data[0].name,
      from: from,
    });
  };

  useEffect(() => {
    detailDataRefech();
  }, [detailDataRefech, data]);
  return (
    <BottomSheet
      style={styles.container}
      handleStyle={{height: 20}}
      handleIndicatorStyle={{
        backgroundColor: '#E4E3E7',
        width: 40,
        height: 4,
      }}
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      {(snap === 0 || snap === 1) && (
        <Contents>
          <SpotNameText>{data[0]?.name}</SpotNameText>
          <SpotPickWrap
            onPress={() => {
              setInitCenter({
                latitude: Number(data[0].latitude),
                longitude: Number(data[0].longitude),
              });
            }}>
            <Image source={SharePickSpot} style={{width: 20, height: 24}} />
          </SpotPickWrap>
          <DiningTypeWrap>
            <MealIcon />
            {diningType.map(v => (
              <DiningTypeText
                key={v}
                type={data[0]?.diningType.includes(v)}
                value={v}>
                {diningTypeString(v)}
                {v !== 3 && <DiningTypeDisabledText>・</DiningTypeDisabledText>}
              </DiningTypeText>
            ))}
            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>
          <UserViewWrap>
            <UserIcon />
            <Body06RText style={{marginLeft: 12}}>
              {data[0]?.userCount}명
            </Body06RText>
          </UserViewWrap>
          <Button
            label="상세보기"
            type="white2"
            onPressEvent={() => detailButton()}
          />
        </Contents>
      )}
      {snap === 2 && (
        <Content>
          <Contents>
            <Title>{detail?.name}</Title>
            <ScrollView
              style={{marginTop: 24, paddingBottom: 200}}
              showsVerticalScrollIndicator={false}>
              <Address>
                <Image source={PickGrey} style={{width: 20, height: 20}} />
                <View style={{marginLeft: 16}}>
                  <Name>
                    <Body06RText>{detail?.address}</Body06RText>
                  </Name>
                  <Body06RText style={{color: '#BDBAC1'}}>
                    {detail?.jibun}
                  </Body06RText>
                </View>
              </Address>
              <Border />
              <DiningTypeWrap snap={snap}>
                <MealIcon width={20} height={20} />
                {diningType.map(v => (
                  <DiningTypeText
                    key={v}
                    type={detail?.diningTypes.includes(v)}
                    value={v}>
                    {diningTypeString(v)}
                    {v !== 3 && (
                      <DiningTypeDisabledText>・</DiningTypeDisabledText>
                    )}
                  </DiningTypeText>
                ))}

                <Body06RText>운영중</Body06RText>
              </DiningTypeWrap>

              <Border />
              <DeliveryWrap>
                <Delivery>
                  <Image
                    source={DeliverySpot}
                    style={{width: 20, height: 20}}
                  />
                  <Body06RText style={{marginLeft: 16}}>배송 시간</Body06RText>
                </Delivery>
                <ApplyButton onPress={() => goToApplyPage('time')}>
                  <PlusIcon />
                  <ApplyText>시간 추가 신청</ApplyText>
                </ApplyButton>
              </DeliveryWrap>
              <InnerView>
                {detail?.breakfastDeliveryTime !== null && (
                  <DetailSpotWrap>
                    <DiningType style={{marginRight: 8}}>아침 )</DiningType>
                    <VerticalBorder />
                    {detail?.breakfastDeliveryTime?.map(el => {
                      const lastTime =
                        detail?.breakfastDeliveryTime[
                          detail?.breakfastDeliveryTime?.length - 1
                        ];

                      return (
                        <React.Fragment key={el}>
                          <TimeText>{el}</TimeText>
                          {lastTime !== el && <VerticalBorder />}
                        </React.Fragment>
                      );
                    })}
                  </DetailSpotWrap>
                )}
                {detail?.lunchDeliveryTime !== null && (
                  <DetailSpotWrap>
                    <DiningType style={{marginRight: 8}}>점심 )</DiningType>

                    {detail?.lunchDeliveryTime?.map(el => {
                      const lastTime =
                        detail?.lunchDeliveryTime[
                          detail?.lunchDeliveryTime?.length - 1
                        ];

                      return (
                        <React.Fragment key={el}>
                          <TimeText>{el}</TimeText>
                          {lastTime !== el && <VerticalBorder />}
                        </React.Fragment>
                      );
                    })}
                  </DetailSpotWrap>
                )}
                {detail?.dinnerDeliveryTime !== null && (
                  <DetailSpotWrap>
                    <DiningType style={{marginRight: 8}}>저녁 )</DiningType>
                    <VerticalBorder />
                    {detail?.dinnerDeliveryTime?.map(el => {
                      const lastTime =
                        detail?.dinnerDeliveryTime[
                          detail?.dinnerDeliveryTime?.length - 1
                        ];
                      return (
                        <React.Fragment key={el}>
                          <TimeText>{el}</TimeText>
                          {lastTime !== el && <VerticalBorder />}
                        </React.Fragment>
                      );
                    })}
                  </DetailSpotWrap>
                )}
              </InnerView>
              <Border />
              <DeliveryWrap>
                <Delivery>
                  <Image source={TimeIcon} style={{width: 20, height: 20}} />
                  <Body06RText style={{marginLeft: 16}}>배송 스팟</Body06RText>
                </Delivery>
                <ApplyButton onPress={() => goToApplyPage('spot')}>
                  <PlusIcon />
                  <ApplyText>스팟 추가 신청</ApplyText>
                </ApplyButton>
              </DeliveryWrap>
              <InnerView>
                {detail?.spotDetailDtos.map((el, idx) => {
                  return (
                    <DetailSpotWrap key={el.name}>
                      <DetailSpotName>{el.name}</DetailSpotName>
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
              <Border />
              <UserViewWrap snap={snap}>
                <UserIcon width={20} height={20} />
                <Body06RText style={{marginLeft: 16}}>
                  {detail?.userCount}명
                </Body06RText>
              </UserViewWrap>
            </ScrollView>
          </Contents>
          <ButtonWrap
            colors={[
              'rgba(255, 255, 255, 0.0)',
              'rgba(255, 255, 255, 0.0)',
              'rgba(255, 255, 255, 0.0)',
              'rgba(255, 255, 255, 0.5)',
              'rgba(255, 255, 255, 0.7)',
              'rgba(255, 255, 255, 0.9)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
            ]}
            useAngle={true}
            angle={180}>
            <Button label="이 스팟 사용하기" onPressEvent={onSelectButton} />
          </ButtonWrap>
        </Content>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});

export default Component;
const Contents = styled.View`
  padding: 12px 24px 35px 24px;
  position: relative;
`;
const Content = styled.View`
  // padding: 12px 24px 35px 24px;
  position: relative;
  flex: 1;
`;

const SpotNameText = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 8px;
`;

const DiningTypeText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme, type}) =>
    type ? theme.colors.blue[500] : theme.colors.grey[6]};
  //margin-left: ${({snap}) => (snap === 2 ? '16px' : '12px')};
  //margin-right: 8px;
  margin-left: ${({value, snap}) =>
    value === 1 && snap !== 2 ? '12px' : '0px'};
  margin-right: ${({value}) => (value === 3 ? '8px' : '0px')};
`;

const DiningTypeWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({snap}) => (snap === 2 ? '0px' : '8px')};
`;

const UserViewWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({snap}) => (snap === 2 ? '0px' : '16px')};
`;

const Body06RText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const Title = styled(Typography).attrs({text: 'Title03R'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const SpotPickWrap = styled.Pressable`
  width: 48px;
  height: 48px;

  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 24px;
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
const TimeText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[3]};
  margin-right: 8px;
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

const Label = styled.Pressable`
  background-color: ${({theme}) => theme.colors.grey[8]};
  border-radius: 4px;
  padding: 3px 8px;
  align-self: flex-start;
  margin-right: 8px;
`;

const DiningType = styled(Typography).attrs({text: 'SmallLabel'})`
  color: ${({theme}) => theme.colors.grey[2]};
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
  padding: 16px 0px 0px 36px;
`;

const DetailSpotTimeWrap = styled.View`
  margin-bottom: ${({last}) => (last ? '150px' : '24px')};
`;

const ButtonWrap = styled(LinearGradient)`
  position: absolute;
  padding: 0px 20px;
  height: 100px;
  bottom: 0px;
  width: 100%;
  justify-content: flex-start;
`;

const TimeWrap = styled(LinearGradient)``;
const DiningTypeDisabledText = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[6]};
  margin-left: 12px;
  margin-right: 8px;
`;

const Name = styled.View`
  word-break: break-all;

  padding-right: 24px;
`;

const AddressWrap = styled.View``;
