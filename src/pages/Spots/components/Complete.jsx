import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styled from 'styled-components';

import {
  alramButtonText,
  alramDscText,
  alramImage,
  alramTitleText,
  subButtonText,
} from './data';
import Close from '../../../assets/icons/Map/close20.svg';
import {isUserInfoAtom} from '../../../biz/useUserInfo/store';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import {PAGE_NAME as MembershipIntroPageName} from '../../../pages/Membership/MembershipIntro';
import {SCREEN_NAME} from '../../../screens/Main/Bnb';
import {height} from '../../../theme';
import {PAGE_NAME as BuyMealPageName} from '../../Main/Bnb/BuyMeal/Main';
export const PAGE_NAME = 'COMPLETE_PAGE';
const Complete = ({route}) => {
  const navigation = useNavigation();
  const [isUserInfo] = useAtom(isUserInfoAtom);
  const type = route?.params?.type;
  console.log(type);
  const nextUseButton = () => {
    navigation.navigate(SCREEN_NAME);
  };

  const buyMealButton = () => {
    navigation.navigate(BuyMealPageName);
  };
  const membershipButton = () => {
    navigation.navigate(MembershipIntroPageName, {
      isFounders: isUserInfo?.leftFoundersNumber > 0,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CloseButton onPress={nextUseButton}>
        <Close />
      </CloseButton>
      <Wrap showsVerticalScrollIndicator={false}>
        <Contents>
          <Title>{alramTitleText(type)}</Title>
          <Image source={alramImage(type)} />
          <Desc>
            {type === 'usedMembership' && isUserInfo?.name}
            {alramDscText(type)}
          </Desc>
        </Contents>
      </Wrap>
      <ButtonWrap>
        <Button
          icon={type === 'mySpotCompleteMembership' && 'plus'}
          label={alramButtonText(type)}
          onPressEvent={() => {
            if (
              type === 'mySpotCompleteNotMembership' ||
              type === 'noAlarmNotUsedMembership' ||
              type === 'notUsedMembership'
            ) {
              membershipButton();
            }
            if (type === 'noAlarmUsedMembership') {
              nextUseButton();
            }
            if (type === 'mySpotCompleteMembership') {
              buyMealButton();
            }
          }}
        />
        <Pressable onPress={nextUseButton}>
          <ButtonText>{subButtonText(type)}</ButtonText>
        </Pressable>
      </ButtonWrap>
    </View>
  );
};

export default Complete;

const Wrap = styled.ScrollView`
  background-color: white;
  position: relative;
  margin-bottom: 120px;
`;

const Title = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  text-align: center;
  margin-bottom: 24px;
`;
const Desc = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[4]};
  text-align: center;
  margin-top: 24px;
`;

const Contents = styled.View`
  align-items: center;
  margin-top: ${height * 204}px;
  padding-bottom: 50px;
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

  z-index: 1;
`;