import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import styled from 'styled-components';
import BottomModal from '~components/BottomModal';

import {
  alramButtonText,
  alramDscText,
  alramImage,
  alramTitleText,
  subButtonText,
} from './data';
import Close from '../../../assets/icons/Map/close20.svg';
import useGroupSpots from '../../../biz/useGroupSpots/hook';
import {isUserInfoAtom} from '../../../biz/useUserInfo/store';
import {alarmSetting} from '../../../biz/useUserMe/Fetch';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import {useGroupSpotList} from '../../../hook/useSpot';
import {
  useGetPrivateMembership,
  useGetUserInfo,
} from '../../../hook/useUserInfo';
import {PAGE_NAME as MembershipIntroPageName} from '../../../pages/Membership/MembershipIntro';
import {SCREEN_NAME} from '../../../screens/Main/Bnb';
import {height} from '../../../theme';
import {PAGE_NAME as BuyMealPageName} from '../../Main/Bnb/BuyMeal/Main';
import {PAGE_NAME as SpotTypePage} from '../SpotType';

export const PAGE_NAME = 'COMPLETE_PAGE';
const Complete = ({route}) => {
  const navigation = useNavigation();
  const {data: isPrivateMembership, refetch: privateMembershipRefetch} =
    useGetPrivateMembership();
  const [modalVisibleMembership, setModalVisibleMembership] = useState(false);
  // const {isUserGroupSpotCheck} = useGroupSpots();
  const {data: isUserGroupSpotCheck} = useGroupSpotList();
  const noHasSpots =
    isUserGroupSpotCheck?.data?.spotListResponseDtoList?.length === 0;

  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  const type = route?.params?.type;

  const nextUseButton = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: SCREEN_NAME,
        },
      ],
    });
    // navigation.navigate(SCREEN_NAME);
  };

  const buyMealButton = () => {
    navigation.navigate(BuyMealPageName);
  };
  const membershipButton = () => {
    if (isPrivateMembership?.data) {
      setModalVisibleMembership(true);
    } else {
      navigation.navigate(MembershipIntroPageName, {
        isFounders: isUserInfo?.leftFoundersNumber > 0,
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {!(
        type === 'noAlramNoSpot' ||
        type === 'noDeliveryNoSpot' ||
        (type === 'sharSpotAppication' && noHasSpots)
      ) && (
        <CloseButton onPress={nextUseButton}>
          <Close />
        </CloseButton>
      )}
      <Wrap showsVerticalScrollIndicator={false}>
        <Contents>
          <Title>{alramTitleText(type)}</Title>
          {alramImage(type)}
          <Desc>
            {type === 'usedMembership' && isUserInfo?.name}
            {alramDscText(type)}
          </Desc>
        </Contents>
      </Wrap>
      <ButtonWrap>
        <Button
          // icon={type === 'mySpotCompleteMembership' && 'plus'}
          label={alramButtonText(type)}
          onPressEvent={() => {
            if (
              type === 'mySpotCompleteNotMembership' ||
              type === 'noAlarmNotUsedMembership' ||
              type === 'notUsedMembership' ||
              type === 'noSpot'
            ) {
              membershipButton();
            }
            if (
              type === 'noAlarmUsedMembership' ||
              type === 'mySpotCompleteMembership' ||
              type === 'usedMembership'
            ) {
              nextUseButton();
            }
            // if (type === 'mySpotCompleteMembership') {
            //   buyMealButton();
            // }
            if (
              type === 'noDeliveryNoSpot' ||
              type === 'sharSpotAppication' ||
              type === 'noAlramNoSpot'
            ) {
              navigation.navigate(SpotTypePage);
            }
          }}
        />
        <Pressable onPress={nextUseButton}>
          <ButtonText>
            {!(type === 'sharSpotAppication' && noHasSpots) &&
              subButtonText(type)}
          </ButtonText>
        </Pressable>
      </ButtonWrap>
      <BottomModal
        modalVisible={modalVisibleMembership}
        setModalVisible={setModalVisibleMembership}
        title={`기업멤버십에 가입되어 있어요.`}
        description={
          '이미 멤버십 혜택이 적용 중이에요.\n개인멤버십 가입을 추가로 진행 할까요?'
        }
        buttonTitle1={'취소'}
        buttonType1="grey7"
        buttonTitle2={'확인'}
        buttonType2="grey2"
        onPressEvent1={() => setModalVisibleMembership(false)}
        onPressEvent2={() => {
          navigation.navigate(MembershipIntroPageName, {
            isFounders: isUserInfo?.leftFoundersNumber > 0,
          });
        }}
      />
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
