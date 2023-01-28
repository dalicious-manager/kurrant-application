import React from 'react';
// import {SafeAreaView, Text, View} from 'react-native';
import styled, {css} from 'styled-components/native';
import Typography from '../../../../../components/Typography';

import CsIcon from '../../../../../assets/icons/Home/cs.svg';

import {SafeAreaView} from 'react-native';

import {Linking} from 'react-native';

export const PAGE_NAME = 'P_MAIN__BNB__CATOR';

const Pages = () => {
  const url = 'https://kurrant.co/catering-home-view';

  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`해당 URL에 접속할 수 없습니다: ${url}`);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <SafeAreaContainer>
        <CsPressable>
          <CsIcon />
        </CsPressable>
        <Container>
          <ImageYo
            source={require('../../../../../assets/images/caterImgPng.png')}
            resizeMode="contain"
          />

          <MetadataWrap>
            <LargeTitle>케이터링 신청하기</LargeTitle>
            <TypoBody05R>아래의 링크를 누르면 </TypoBody05R>
            <TypoBody05R>
              케이터링 안내 및 신청 페이지로 이동합니다{' '}
            </TypoBody05R>
            <BlueWrap onPress={() => handlePress()}>
              <LinkBody05R>https://kurrant.co/catering-home-view</LinkBody05R>
            </BlueWrap>

            <TypoCaptionR>
              현재 케이터링 신청은 홈페이지에서만 가능해요.
            </TypoCaptionR>
          </MetadataWrap>
        </Container>
      </SafeAreaContainer>
    </SafeAreaView>
  );
};

export default Pages;

{
  /* <BackgroundImageBox source={LogoBackground} resizeMode="cover"/> */
}
// export const LogoBackground = require('../assets/images/loginBackground.png');

const SafeAreaContainer = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: relative;
`;

const Container = styled.View`
  align-items: center;

  width: 100%;

  /* border: 1px solid black; */
`;

// 상단 header 는 걍

const CsPressable = styled.Pressable`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const ImageYo = styled.Image`
  width: 220px;
  height: 180px;
`;

const MetadataWrap = styled.View`
  align-items: center;
  width: 100%;
`;

const LargeTitle = styled(Typography).attrs({text: 'LargeTitle'})`
  color: ${({theme}) => theme.colors.grey[2]};
  margin-bottom: 10px;
`;

const TypoBody05R = styled(Typography).attrs({text: 'Body06R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;
const BlueWrap = styled.Pressable`
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.blue[100]};
  height: 54px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 6px 0;
  margin-top: 12px;

  ${() => {
    const calculatedWidth = (324 / 375) * 100;

    return `width: ${calculatedWidth}%`;
  }}
`;

const LinkBody05R = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.blue[500]};
`;
const TypoCaptionR = styled(Typography).attrs({text: ' CaptionR'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;
