import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {useTheme} from 'styled-components/native';
import Button from '~components/Button';
import Image from '~components/Image';
import Typography from '~components/Typography';

import useUserInfo from '../../../../biz/useUserInfo';
import {SCREEN_NAME as BnbScreenName} from '../../../../screens/Main/Bnb';
import {PAGE_NAME as MainPageName} from '../../../Main/Bnb/Home';
import {PAGE_NAME as MoreMainPageName} from '../../../Main/Bnb/More';
import {PAGE_NAME as MembershipInfoPage} from '../../../Membership/MembershipInfo';

import {MembershipJoinComplateImage} from '~assets';

export const PAGE_NAME = 'P__MEMBERSHIP__JOIN_COMPLATE';
const screenHeight = Dimensions.get('screen').height;
const Pages = () => {
  const themeApp = useTheme();
  const {userInfo, isUserInfo} = useUserInfo();
  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      await userInfo();
    };
    getUser();
  }, []);
  return (
    <Conotainer>
      <FastImage
        style={{
          height: (screenHeight / 100) * 26,
          paddingRight: 100,
          paddingLeft: 100,
        }}
        source={MembershipJoinComplateImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Title textColor={themeApp.colors.grey[2]}>
        {isUserInfo?.name}님, 축하드려요!
      </Title>
      <CaptionText textColor={themeApp.colors.grey[4]}>
        멤버십 가입이 완료되었어요.{'\n'}이제 다양한 혜택을 누릴 수 있어요.
      </CaptionText>
      <ButtonContainer>
        <Button
          type="yellow"
          label={'확인'}
          onPressEvent={async () => {
            const resetAction = StackActions.pop(2);
            navigation.dispatch(resetAction);
            // navigations.navigate(BnbScreenName,{screen:MoreMainPageName})
            // navigations.reset({
            //     index: 0,
            //     routes: [
            //       {
            //         name: BnbScreenName,
            //         screen:MoreMainPageName
            //       },
            //     ],
            //   })
          }}
        />
      </ButtonContainer>
    </Conotainer>
  );
};

export default Pages;

const Conotainer = styled.View`
  background-color: white;
  flex: 1;
  align-items: center;
  padding-top: 100px;
`;
const Title = styled(Typography).attrs({text: 'LargeTitle'})`
  margin-top: 10px;
  text-align: center;
`;

const CaptionText = styled(Typography).attrs({text: 'Body05R'})`
  margin-top: 10px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 22px;
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;
const ImageBox = styled.View`
  padding-left: 100px;
  padding-right: 100px;
  background-color: red;
`;
