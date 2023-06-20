/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import {MembershipBadge} from '~components/Icon';
import Typography from '~components/Typography';

import {MembershipJoin, NewMembers} from '../../../../../../assets';
import {ArrowRightBoxIcon} from '../../../../../../components/Icon';
import {useGetUserInfo} from '../../../../../../hook/useUserInfo';
import withCommas from '../../../../../../utils/withCommas';
import {PAGE_NAME as MembershipInfoPageName} from '../../../../../Membership/MembershipInfo';
import {PAGE_NAME as MembershipIntroPageName} from '../../../../../Membership/MembershipIntro';

/**
 * @param {object} props
 * @param {number} props.point
 * @returns
 */

const Component = ({point, isMembership, membershipPeriod = 0}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const {
    data: {data: isUserInfo},
  } = useGetUserInfo();
  return (
    <>
      {!isMembership ? (
        <MembershipJoinPage
          onPress={() =>
            navigation.navigate(MembershipIntroPageName, {
              isFounders: isUserInfo?.leftFoundersNumber > 0,
            })
          }>
          {!(isUserInfo?.leftFoundersNumber > 0) ? (
            <MembershipBox source={MembershipJoin} resizeMode={'stretch'}>
              <MembershipText
                text={'Body05SB'}
                textColor={themeApp.colors.neutral[0]}>
                멤버십 가입하고
                <MembershipEffectText
                  text={'Body05SB'}
                  textColor={themeApp.colors.yellow[500]}>
                  20%할인
                </MembershipEffectText>
                받기
              </MembershipText>
            </MembershipBox>
          ) : (
            <MembershipBox source={NewMembers} resizeMode={'contain'}>
              <MembershipText
                text={'Body05SB'}
                textColor={themeApp.colors.neutral[0]}>
                {/* 멤버십 가입하고  */}
                <MembershipEffectText
                  text={'Body05SB'}
                  textColor={themeApp.colors.yellow[500]}>
                  {/* 20%할인 */}
                </MembershipEffectText>
                {/* 받기/ */}
              </MembershipText>
            </MembershipBox>
          )}
        </MembershipJoinPage>
      ) : (
        <Container onPress={() => navigation.navigate(MembershipInfoPageName)}>
          <TitleBox>
            <MembershipBadge style={{marginRight: 8}} />
            <Title text={'Body05SB'} textColor={themeApp.colors.grey[2]}>
              멤버십
            </Title>
          </TitleBox>
          <TailBox>
            {membershipPeriod > 0 && (
              <PointText text={'Body06R'} textColor={themeApp.colors.grey[2]}>
                {membershipPeriod || 0}일째 이용중
              </PointText>
            )}
            <ArrowRightBoxIcon
              style={{width: 24, height: 24}}
              size={36}
              color={themeApp.colors.grey[4]}
            />
          </TailBox>
        </Container>
      )}
    </>
  );
};

export default Component;

const Title = styled(Typography)``;
const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  height: 56px;
`;
const Container = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.colors.grey[8]};
  border-top-color: ${({theme}) => theme.colors.grey[8]};
  border-radius: 7px;
  box-sizing: border-box;
  padding-left: 16px;
  border-top-width: 1px;
  margin-left: 24px;
  margin-right: 24px;
`;
const PointText = styled(Typography)`
  margin: 0px 4px;
`;
const PointNumberText = styled(Typography)``;
const MembershipJoinPage = styled.Pressable``;
const MembershipBox = styled.ImageBackground`
  margin-bottom: 7px;
  margin-left: 24px;
  margin-right: 24px;
`;
const MembershipText = styled(Typography)`
  z-index: 1;
  padding: 23px 20px;
`;
const MembershipEffectText = styled(Typography)``;
const TailBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
`;
