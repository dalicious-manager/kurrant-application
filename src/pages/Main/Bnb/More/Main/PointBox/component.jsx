/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import {PointBadge} from '~components/Icon';
import Typography from '~components/Typography';

import {ArrowRightBoxIcon} from '../../../../../../components/Icon';
import withCommas from '../../../../../../utils/withCommas';
import {PointMainPageName} from '../../../../../Main/MyPage/Point';
/**
 * @param {object} props
 * @param {number} props.point
 * @returns
 */

const Component = ({point}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate(PointMainPageName)}>
      <TitleBox>
        <PointBadge style={{marginRight: 8}} />
        <Title text={'Body05SB'} textColor={themeApp.colors.grey[2]}>
          적립포인트
        </Title>
      </TitleBox>
      <TailBox>
        <PointNumberText text={'Body05SB'} textColor={themeApp.colors.grey[2]}>
          {withCommas(point || 0)}
        </PointNumberText>
        <PointText text={'Body05R'} textColor={themeApp.colors.grey[2]}>
          P
        </PointText>
        <ArrowRightBoxIcon
          style={{width: 24, height: 24}}
          size={36}
          color={themeApp.colors.grey[4]}
        />
      </TailBox>
    </Container>
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
  margin-top: 12px;
`;
const PointText = styled(Typography)`
  margin: 0px 4px;
`;
const PointNumberText = styled(Typography)``;

const TailBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
`;
