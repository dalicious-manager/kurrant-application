import React from 'react';
// import {SafeAreaView, Text, View} from 'react-native';
import styled from 'styled-components/native';
import Typography from '../../../../../components/Typography';
// import LogoImageSvg from '../../../../assets/icons/Logo.svg'
// import CaterImgSvg from '../../../../assets/icons/CaterImg.svg';
import CaterImgSvg from '../../../../../assets/icons/CaterImg.svg';
import ImageComponent from '../../../../../components/Image/component';

export const PAGE_NAME = 'P_MAIN__BNB__CATOR';

const Pages = () => {
  return (
    <SafeAreaContainer>
      <Container>
        <ImageYo
          source={require('../../../../../assets/images/caterImgPng.png')}
          resizeMode="contain"
        />

        <MetadataWrap>
          <LargeTitle>케이터링 신청하기</LargeTitle>
          <TypoBody05R>아래의 링크를 누르면 </TypoBody05R>
          <TypoBody05R>케이터링 안내 및 신청 페이지로 이동합니다 </TypoBody05R>
          <BlueWrap>
            <LinkBody05R>https://kurrant.co/catering-home-view</LinkBody05R>
          </BlueWrap>

          <TypoCaptionR>
            현재 케이터링 신청은 홈페이지에서만 가능해요.
          </TypoCaptionR>
        </MetadataWrap>
      </Container>
    </SafeAreaContainer>
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
`;

const Container = styled.View`
  align-items: center;
  width: 100%;
`;

const ImageYo = styled.Image`
  width: 200px;
  height: 160px;
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
const BlueWrap = styled.View`
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
