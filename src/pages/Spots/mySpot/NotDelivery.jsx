import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styled from 'styled-components';

import {NotDeliveryIcon, SpotOpen} from '../../../assets';
import Close from '../../../assets/icons/Map/close20.svg';
import useUserInfo from '../../../biz/useUserInfo/hook';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import {useSetAlramSetting} from '../../../hook/useAlram';
import {PAGE_NAME as MembershipPage} from '../../../pages/Membership/MembershipIntro';
import {SCREEN_NAME} from '../../../screens/Main/Bnb';
import {height} from '../../../theme';
import {PAGE_NAME as CompletePage} from '../components/Complete';
import {
  notDeliveryAlarm,
  notDeliveryNoAlarm,
  notDeliveryNoAlarmButton,
} from '../components/data';
import {PAGE_NAME as SpotTypePage} from '../SpotType';

export const PAGE_NAME = 'MY_SPOT_NOT_DELIVERY';
const NotDelivery = ({route}) => {
  const navigation = useNavigation();
  const type = route?.params?.isExist;
  const isAlarm = route?.params?.isAlarm;
  const {isUserInfo} = useUserInfo();
  const spot = isUserInfo?.spotId;

  const {mutateAsync: setAlram} = useSetAlramSetting();

  const buttonType = !type
    ? 'noDelivery'
    : spot === null
    ? 'noSpot'
    : spot !== null && isUserInfo.isMembership
    ? 'alramMembership'
    : spot !== null && !isUserInfo.isMembership && 'alramNoMembership';
  console.log(buttonType);
  const NoAlarm = () => {
    if (spot !== null) {
      navigation.navigate(CompletePage, {
        type: isUserInfo?.isMembership
          ? 'noAlarmUsedMembership'
          : 'noAlarmNotUsedMembership',
      });
    } else {
      navigation.navigate(CompletePage, {
        type: 'noAlramNoSpot',
      });
    }
  };

  const goHome = () => {
    navigation.navigate(SCREEN_NAME);
  };

  const goMembershipPage = () => {
    navigation.navigate(MembershipPage, {
      isFounders: isUserInfo?.leftFoundersNumber > 0,
    });
  };

  const goMembershipInfoPage = () => {
    navigation.navigate(CompletePage, {
      type: 'noSpot',
    });
  };
  const settingAlarm = async () => {
    await setAlram({
      code: 4001,
      isActive: true,
    });

    if (spot !== null) {
      navigation.navigate(CompletePage, {
        type: isUserInfo?.isMembership ? 'usedMembership' : 'notUsedMembership',
      });
    } else {
      navigation.navigate(CompletePage, {
        type: 'noDeliveryNoSpot',
      });
    }
  };
  return (
    <Wrap>
      <CloseButton onPress={goHome}>
        <Close />
      </CloseButton>
      <Contents>
        <Title>아직 배송 가능 지역이 아니에요</Title>
        {/* 아래 내용 없앨수도 */}
        {/* {buttonType !== 'noSpot' && (
          <Title2>
            알려 주신 곳으로{'\n'}
            {isUserInfo?.name}님의 스팟 개설에 최선을 다할게요
          </Title2>
        )} */}
        {buttonType === 'alramMembership' ? (
          <Image source={SpotOpen} style={{width: 339, height: 215}} />
        ) : (
          <Image source={NotDeliveryIcon} style={{width: 162, height: 149}} />
        )}

        {notDeliveryNoAlarm(buttonType)}
      </Contents>
      <ButtonWrap>
        <Button
          label={notDeliveryNoAlarmButton(buttonType)}
          onPressEvent={() => {
            if (buttonType === 'noDelivery') {
              settingAlarm();
            }
            if (buttonType === 'alramMembership') {
              goHome();
            }

            if (buttonType === 'alramNoMembership') {
              goMembershipPage();
            }
            if (buttonType === 'noSpot') {
              navigation.navigate(SpotTypePage);
            }
          }}
        />
        {buttonType !== 'alramMembership' && (
          <Pressable
            onPress={() => {
              if (buttonType === 'alramNoMembership') {
                navigation.navigate(SCREEN_NAME);
              }
              if (buttonType === 'noDelivery') {
                NoAlarm();
              }
              if (buttonType === 'noSpot') {
                goMembershipInfoPage();
              }
            }}>
            <ButtonText>괜찮아요</ButtonText>
          </Pressable>
        )}
      </ButtonWrap>
    </Wrap>
  );
};

export default NotDelivery;

const Wrap = styled.View`
  //justify-content: center;
  background-color: white;
  flex: 1;
`;

const Title = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 24px;
`;

const Contents = styled.View`
  align-items: center;
  margin-top: ${height * 204}px;
`;

const ButtonText = styled(Typography).attrs({text: 'BottomButtonR'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-top: 21px;
`;

const ButtonWrap = styled.View`
  margin: 0px 20px;
  align-items: center;
  position: absolute;
  bottom: 51px;
`;

const CloseButton = styled.Pressable`
  width: 24px;
  height: 24px;

  align-items: center;
  justify-content: center;
  position: absolute;
  left: 24px;
  top: 52px;
`;

const Title2 = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  margin-bottom: 24px;
  text-align: center;
`;
