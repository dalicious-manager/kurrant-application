import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Dimensions, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {useTheme} from 'styled-components/native';
import PlusIcon from '~assets/icons/Map/plus.svg';
import MealIcon from '~assets/icons/Spot/meal.svg';
import UserIcon from '~assets/icons/Spot/user.svg';
import Toast from '~components/Toast';
import Typography from '~components/Typography';
import {diningTypeString} from '~utils/diningType';

import {useGetShareSpotDetail} from '../../../../hook/useShareSpot';
import {useGroupSpotDetail} from '../../../../hook/useSpot';

import {SharePickSpot, PickGrey, TimeIcon, Card, DeliverySpot} from '~assets';
const WIDTH = Dimensions.get('screen').width;
export const PAGE_NAME = 'P__GROUP__MANAGE__SPOT_DETAIL';
const Pages = ({route}) => {
  const toast = Toast();
  const themeApp = useTheme();
  const clientId = route?.params?.clientId;
  const {data: detailData, refetch: detailDataRefech} =
    useGroupSpotDetail(clientId);
  const navigation = useNavigation();
  const diningType = [1, 2, 3];
  useEffect(() => {
    console.log(detailData?.data, 'clientId');
  }, [detailData?.data]);
  const goToApplyPage = from => {};
  return (
    <Wrap>
      <Contents>
        <Title>{detailData?.data?.clientName}</Title>
        <ScrollView
          style={{marginTop: 24, paddingBottom: 200}}
          showsVerticalScrollIndicator={false}>
          <Address>
            <Image source={PickGrey} style={{width: 20, height: 20}} />
            <View style={{marginLeft: 16}}>
              <Name>
                <Body06RText>{detailData?.data?.address}</Body06RText>
              </Name>
              {/* <Body06RText style={{color: '#BDBAC1'}}>
                {detailData?.data?.jibun}
              </Body06RText> */}
            </View>
          </Address>
          <Border />
          <DiningTypeWrap>
            <MealIcon width={20} height={20} />
            {diningType.map(v => (
              <DiningTypeText
                key={v}
                type={detailData?.data?.mealTypeInfoList
                  .map(meal => meal.diningType)
                  .includes(v)}
                value={v}>
                {diningTypeString(v)}
                {v !== 3 && <DiningTypeDisabledText>・</DiningTypeDisabledText>}
              </DiningTypeText>
            ))}

            <Body06RText>운영중</Body06RText>
          </DiningTypeWrap>

          <Border />
          <DeliveryWrap>
            <Delivery>
              <Image source={DeliverySpot} style={{width: 20, height: 20}} />
              <Body06RText style={{marginLeft: 16}}>배송 시간</Body06RText>
            </Delivery>
            <ApplyButton onPress={() => goToApplyPage('time')}>
              <PlusIcon />
              <ApplyText>시간 추가 신청</ApplyText>
            </ApplyButton>
          </DeliveryWrap>
          <InnerView>
            {detailData?.data?.breakfastDeliveryTime !== null && (
              <DetailSpotWrap>
                <DiningType style={{marginRight: 8}}>아침 )</DiningType>
                <VerticalBorder />
                {detailData?.data?.breakfastDeliveryTime?.map(el => {
                  const lastTime =
                    detailData?.data?.breakfastDeliveryTime[
                      detailData?.data?.breakfastDeliveryTime?.length - 1
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
            {detailData?.data?.lunchDeliveryTime !== null && (
              <DetailSpotWrap>
                <DiningType style={{marginRight: 8}}>점심 )</DiningType>

                {detailData?.data?.lunchDeliveryTime?.map(el => {
                  const lastTime =
                    detailData?.data?.lunchDeliveryTime[
                      detailData?.data?.lunchDeliveryTime?.length - 1
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
            {detailData?.data?.dinnerDeliveryTime !== null && (
              <DetailSpotWrap>
                <DiningType style={{marginRight: 8}}>저녁 )</DiningType>
                <VerticalBorder />
                {detailData?.data?.dinnerDeliveryTime?.map(el => {
                  const lastTime =
                    detailData?.data?.dinnerDeliveryTime[
                      detailData?.data?.dinnerDeliveryTime?.length - 1
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
          {/* <InnerView>
            {detailData?.data?.spotDetailDtos.map((el, idx) => {
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
          </InnerView> */}
          <Border />
          <UserViewWrap>
            <UserIcon width={20} height={20} />
            <Body06RText style={{marginLeft: 16}}>
              {detailData?.data?.userCount}명
            </Body06RText>
          </UserViewWrap>
        </ScrollView>
      </Contents>
    </Wrap>
  );
};

export default Pages;

const Wrap = styled.View`
  background-color: ${({theme}) => theme.colors.grey[0]};
  flex: 1;
  //align-items: center;
  width: ${WIDTH}px;
`;

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
  margin-left: 12px;
  margin-right: ${({value}) => (value === 3 ? '8px' : '0px')};
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
