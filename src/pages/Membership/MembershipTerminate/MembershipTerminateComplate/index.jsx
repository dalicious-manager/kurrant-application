import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {useTheme} from 'styled-components/native';
import Button from '~components/Button';
import Image from '~components/Image';
import Typography from '~components/Typography';

import useUserInfo from '../../../../biz/useUserInfo';
import {PAGE_NAME as LoginPage} from '../../../Main/Login/Login';

import {Terminate} from '~assets';
export const PAGE_NAME = 'P__MEMBERSHIP__TERMINATE_COMPLATE';

const Pages = () => {
  const {userInfo, isUserInfo} = useUserInfo();
  const themeApp = useTheme();
  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      await userInfo();
    };
    getUser();
  }, []);
  return (
    <Conotainer>
      <ContentWrapper>
        <ImageWrap>
          <Image
            imagePath={Terminate}
            // scale={0.33}
            styles={`
          
          width: 100%;
          height: 100%;
          `}
          />
        </ImageWrap>

        <Title textColor={themeApp.colors.grey[2]}>
          {isUserInfo?.name}님,{'\n'}멤버십이 해지 됐어요.
        </Title>
        <CaptionText textColor={themeApp.colors.grey[4]}>
          그동안 커런트밀 정기구독 서비스를 이용해{'\n'}주셔서 감사해요. 다음에
          또 만나요!
        </CaptionText>
      </ContentWrapper>

      <ButtonContainer>
        <Button
          type="yellow"
          label={'확인'}
          onPressEvent={() => {
            navigation.popToTop();
            // navigation.navigate(LoginPage);
            // navigation.reset({
            //     index: 0,
            //     routes: [
            //       {
            //         name: SCREEN_NAME,
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
  /* justify-content: center; */
  padding-top: 140px;
`;

const ContentWrapper = styled.View``;

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

const ImageWrap = styled.View`
  width: 180px;
  height: 180px;
  margin: auto;
`;
