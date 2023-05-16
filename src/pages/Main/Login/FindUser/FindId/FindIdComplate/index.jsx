/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import {useTheme} from 'styled-components/native';

import Typography from '~components/Typography';
import {formattedDate} from '~utils/dateFormatter';

import useAuth from '../../../../../../biz/useAuth';
import {SocialIcons} from '../../../../../../components/Icon';
import {PAGE_NAME as EmailLoginPageName} from '../../../EmailLogin';
import {PAGE_NAME as LoginPageName} from '../../../Login';
import snsLogin from '../../../../../../utils/snsLogin';

export const PAGE_NAME = 'P_FIND_ID_COMPLATE';

const Pages = ({route}) => {
  const {phone} = route.params;
  const [userId, setUserId] = useState({
    email: '',
    connectedSns: [],
    recentLoginDateTime: '',
  });
  const themeApp = useTheme();
  const navigation = useNavigation();
  const {appleLogin,facebookLogin,googleLogin,kakaoLogin,naverLogin} = snsLogin()
  const {findEmail} = useAuth();
  const getUserId = async () => {
    const userEmail = await findEmail({phone: phone});

    setUserId(userEmail.data);
  };

  useEffect(() => {
    if (userId.email === '') {
      getUserId();
    }
  }, []);

  useEffect(() => {
    console.log('여기 맞ㄱ음');
    console.log(userId);
  }, [userId]);

  const showSocialTitleIntoKr = socialName => {
    switch (socialName) {
      case 'GENERAL':
        return <GeneralIcon size={size} color={color} />;
      case 'KAKAO':
        return '카카오';
      case 'APPLE':
        return '애플';
      case 'FACEBOOK':
        return '페이스북';
      case 'GOOGLE':
        return '구글';
      case 'NAVER':
        return '네이버';
      default:
        break;
    }
  };

  return (
    <Conotainer>
      <Title textColor={themeApp.colors.grey[2]}>
        입력하신 정보로{'\n'}찾은 계정 정보예요.
      </Title>
      <LoginContainer>
        {userId.connectedSns.length > 0 &&
          userId.connectedSns.map((emailInfo, i) => {
            const onPressEvent = async() => {
              if (emailInfo.provider === 'GENERAL') {
                navigation.reset({
                  index: 1,
                  routes: [
                    {
                      name: LoginPageName,
                    },
                    {
                      name: EmailLoginPageName,
                      params: {
                        userId: emailInfo.email,
                      },
                    },
                  ],
                });
              }else if(emailInfo.provider === 'KAKAO'){
               await kakaoLogin()
              }else if(emailInfo.provider === 'APPLE'){
                await appleLogin()
              }else if(emailInfo.provider === 'FACEBOOK'){
                await facebookLogin()
              }else if(emailInfo.provider === 'GOOGLE'){
                await googleLogin()
              }else if(emailInfo.provider === 'NAVER'){
                await naverLogin()
              }
            };
            return (
              <LoginBox key={i}>
                {emailInfo.provider === 'GENERAL' ? (
                  <InfoBox>
                    <SocialIcons social={emailInfo.provider} />
                    <EmailText text={'Body05SB'}>{emailInfo.email}</EmailText>
                  </InfoBox>
                ) : (
                  <SocialLoginView>
                    <SocialIcons social={emailInfo.provider} />
                    <SmallView>
                      <SocialText>
                        {showSocialTitleIntoKr(emailInfo.provider)}
                      </SocialText>
                      <SocialEmailText text={'Body05SB'}>
                        {emailInfo.email}
                      </SocialEmailText>
                    </SmallView>
                  </SocialLoginView>
                )}

                <LoginButton onPress={onPressEvent}>
                  <LoginBoxText textColor={themeApp.colors.neutral[0]}>
                    로그인
                  </LoginBoxText>
                </LoginButton>
              </LoginBox>
            );
          })}
      </LoginContainer>
      <DateBox>
        <CaptionText>
          {formattedDate(userId.recentLoginDateTime, '년월일')} 마지막 로그인
        </CaptionText>
      </DateBox>
    </Conotainer>
  );
};

export default Pages;

const Conotainer = styled.View`
  background-color: white;
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 40px;
`;

const Title = styled(Typography).attrs({text: 'LargeTitle'})`
  margin-top: 10px;
  text-align: left;
`;

const LoginBox = styled.View`
  padding: 8px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const LoginButton = styled.Pressable`
  background-color: ${({theme}) => theme.colors.grey[2]};
  border-radius: 30px;
  overflow: hidden;
`;
const LoginBoxText = styled(Typography).attrs({text: 'Button10SB'})`
  text-align: center;
  padding: 6.5px 16px;
`;

const EmailText = styled(Typography)`
  text-align: center;
  padding-left: 11px;
`;
const CaptionText = styled(Typography).attrs({text: 'CaptionR'})`
  text-align: center;
  color: ${({theme}) => theme.colors.grey[4]};
`;

const LoginContainer = styled.View`
  margin-top: 24px;
`;

const DateBox = styled.View`
  position: absolute;
  bottom: 35px;
  justify-content: center;
  align-items: center;
  left: 24px;
  width: 100%;
  margin-bottom: 8px;
`;

const SocialLoginView = styled.View`
  flex: 1;

  display: flex;
  flex-direction: row;
`;
const SmallView = styled.View``;

const SocialText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
  padding-left: 11px;
`;
const SocialEmailText = styled(Typography).attrs({text: ' Body06R'})`
  color: ${({theme}) => theme.colors.grey[5]};
  padding-left: 11px;
`;
