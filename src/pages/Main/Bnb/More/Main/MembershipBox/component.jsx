/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { MembershipBadge } from '~components/Icon';
import Typography from '~components/Typography';

import { MembershipJoin } from '../../../../../../assets';
import { ArrowRightBoxIcon } from '../../../../../../components/Icon';
import withCommas from '../../../../../../utils/withCommas';



/**
 * @param {object} props
 * @param {number} props.point
 * @returns 
 */

const Component = ({point,isMembership}) => {
  const themeApp = useTheme();
  return (
    <>
    {!isMembership ? <MembershipBox source={MembershipJoin} resizeMode={'stretch'}>
            <MembershipText text={'Body05SB'} textColor={themeApp.colors.neutral[0]}>멤버십 가입하고 
            <MembershipEffectText text={'Body05SB'} textColor={themeApp.colors.yellow[500]}> 20%할인</MembershipEffectText> 받기</MembershipText>            
          </MembershipBox>
          :
          <Container>
    <TitleBox>
      <MembershipBadge style={{marginRight:8}}/>
      <Title text={'Body05SB'} textColor={themeApp.colors.grey[2]}>멤버십</Title>
    </TitleBox>
    <TailBox>
      <PointText text={'Body06R'} textColor={themeApp.colors.grey[2]}>N개월째 이용중</PointText>
      <ArrowRightBoxIcon style={{width:24,height:24}} size={36} color={themeApp.colors.grey[4]}/>
    </TailBox>
  </Container>}
    </>
   
  )
};
 
export default Component;

const Title = styled(Typography)`
  
`
const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  height: 56px;
`
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme})=>theme.colors.grey[8]};
  border-top-color: ${({theme})=>theme.colors.grey[8]};
  border-radius: 7px;
  box-sizing: border-box;
  padding-left: 16px;
  border-top-width: 1px;
  margin-left: 24px;
  margin-right: 24px;
`
const PointText = styled(Typography)`
  margin: 0px 4px;
`
const PointNumberText = styled(Typography)`

`

const MembershipBox = styled.ImageBackground`
  margin-bottom: 7px;
  margin-left: 24px;
  margin-right: 24px;
`
const MembershipText = styled(Typography)`
  z-index: 1;
  padding: 23px 20px;
`
const MembershipEffectText = styled(Typography)`

`
const TailBox =styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
`