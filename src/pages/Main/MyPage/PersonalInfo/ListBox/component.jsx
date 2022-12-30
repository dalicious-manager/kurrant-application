import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {View} from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import ArrowRightIcon from "~assets/icons/Arrow/arrowRight.svg";
import Switch from '~components/Switch';
import Typography from '~components/Typography';

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {boolean} props.isArrow
 * @param {boolean} props.Toogle.isToggle
 * @param {boolean} props.Toogle.ToggleName
 * @param {boolean} props.Toogle.ToggleAgree
 * @param {string} props.routeName
 * @returns 
 */

const Component = ({
  title='',
  isVersion,
  isArrow = true,
  toggle={
    isToggle:false,
    toggleName:'',
    toggleEvent:()=>console.log("스위치가 변경 되었습니다.")
  },
  toggleAgree=false,
  description,
  effect,
  routeName,
}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  return (
    <TitleContainer onPress ={()=> routeName && navigation.navigate(routeName)}>
      <TitleBox>
        <Title text={'Body05SB'} textColor={themeApp.colors.grey[2]}>{title}</Title>
        {isVersion &&<VersionInfo textColor={themeApp.colors.grey[4]}>1.0.0</VersionInfo> }
      </TitleBox>
      <TailBox>
        <TailTextBox>
          {description && <Description text={'Button10R'} textColor={themeApp.colors.grey[4]}>{description}</Description>}
          {effect && effect}
        </TailTextBox>
        {isVersion &&<Description text={'Button10R'} textColor={themeApp.colors.grey[4]}>최신버전</Description> }
        {isArrow && <ArrowIcon />}
        {toggle.isToggle && <Switch name={toggle.toggleName} size={'md'} agree={toggleAgree}  toggleEvent={toggle.toggleEvent}/>}
      </TailBox>
    </TitleContainer>
  )
};
 
export default Component;

const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
`
const Title = styled(Typography)`
  
`
const VersionInfo = styled(Typography)`
  margin-left: 6px;
`
const ArrowIcon = styled(ArrowRightIcon)`
  color:${props => props.theme.colors.grey[5]};
`
const TitleContainer = styled.Pressable`
  padding:0px 20px 0px 24px;
  height: 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Description = styled(Typography)`
`
const TailTextBox = styled.View`
  flex-direction: row;
 margin-right: 10px;
`
const TailBox = styled.View`
  flex-direction: row;
  align-items: center;
`
