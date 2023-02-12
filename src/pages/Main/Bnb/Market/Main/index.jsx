import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import styled, {css} from 'styled-components/native';
import Typography from '../../../../../components/Typography';

import CsIcon from '../../../../../assets/icons/Home/cs.svg';

export const PAGE_NAME = 'P_MAIN__BNB__MARKET';

const Pages = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <SafeAreaContainer>
        <Container>
          <ImageYo
            source={require('../../../../../assets/images/hourglass.png')}
            resizeMode="contain"
          />

          <MetadataWrap>
            <LargeTitle>마켓은 서비스 준비중이에요.</LargeTitle>
            <TypoBody05R>
              빠른 시일 내에 이용할 수 있도록 노력할게요.{' '}
            </TypoBody05R>
          </MetadataWrap>
        </Container>
      </SafeAreaContainer>
    </SafeAreaView>
  );
};

export default Pages;

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

const ImageYo = styled.Image`
  width: 260px;
  height: 200px;
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
