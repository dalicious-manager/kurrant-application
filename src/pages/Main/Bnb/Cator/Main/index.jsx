import React from 'react';
// import {SafeAreaView, Text, View} from 'react-native';
import styled from 'styled-components/native';
import Typography from '../../../../../components/Typography';

export const PAGE_NAME = 'P_MAIN__BNB__CATOR';

const Pages = () => {
  return (
    <SafeAreaContainer>
      <Container>
        <ImageWrap>{/* <CaterImage source={require('../~~')} /> */}</ImageWrap>

        <MetadataWrap></MetadataWrap>
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
`;

const Container = styled.View`
  align-items: center;
`;

const ImageWrap = styled.View``;

const CaterImage = styled.Image``;

// const CaterImage = styled.

const MetadataWrap = styled.View``;

const ToastMessageLarge = styled(Typography).attrs({text: 'Body06R'})`
  overflow: hidden;
  color: ${({theme}) => theme.colors.neutral[0]};
`;

const LargeTitle = styled(Typography).attrs({text: 'Body06R'})`
  overflow: hidden;
  color: ${({theme}) => theme.colors.neutral[0]};
`;

const Body05R = styled(Typography).attrs({text: 'Body06R'})`
  overflow: hidden;
  color: ${({theme}) => theme.colors.neutral[0]};
`;

// const UrlPressable = styled.pressable``;

// const
