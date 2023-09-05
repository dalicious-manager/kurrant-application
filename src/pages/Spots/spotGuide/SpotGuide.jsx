import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Platform} from 'react-native';
import styled from 'styled-components';

import {GuideSpot} from '../../../assets';
import Button from '../../../components/Button';
import {height} from '../../../theme';
import {PAGE_NAME as SpotTypePage} from '../SpotType';

export const PAGE_NAME = 'SPOT_GUIDE_PAGE';
const SpotGuide = () => {
  const navigation = useNavigation();

  const goToPage = () => {
    navigation.navigate(SpotTypePage);
  };

  return (
    <Wrap>
      {/* <ImageWrap> */}
      <ContentWrap>
        <Image source={GuideSpot} style={{width: 229, height: 434}} />
        {/* </ImageWrap> */}
      </ContentWrap>
      <ButtonWrap Platform={Platform}>
        <Button label="스팟 설정하기" onPressEvent={goToPage} />
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
  bottom: ${({Platform}) => (Platform === 'ios' ? height * 94 : height * 90)}px;
`;

const ContentWrap = styled.View`
  margin-top: ${height * 100}px;
`;
