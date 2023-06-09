import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import styled from 'styled-components';

import {PAGE_NAME as InviteSpotPage} from './InviteSpot';
import {GuideSpot} from '../../../assets';
import Button from '../../../components/Button';
import {height} from '../../../theme';

export const PAGE_NAME = 'SPOT_GUIDE_PAGE';
const SpotGuide = () => {
  const navigation = useNavigation();
  return (
    <Wrap>
      <ImageWrap>
        <Image source={GuideSpot} style={{width: 229, height: 434}} />
      </ImageWrap>
      <ButtonWrap>
        <Button
          label="스팟 설정하기"
          onPressEvent={() => navigation.navigate(InviteSpotPage)}
        />
      </ButtonWrap>
    </Wrap>
  );
};

export default SpotGuide;

const Wrap = styled.SafeAreaView`
  background-color: white;
  align-items: center;
  flex: 1;
`;

const ButtonWrap = styled.View`
  margin: 0px 24px;
  position: absolute;
  bottom: ${height * 94}px;
`;

const ImageWrap = styled.View`
  align-items: center;
  position: absolute;
  bottom: ${height * 246}px;
`;
