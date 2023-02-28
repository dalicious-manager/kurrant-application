import {useNavigation} from '@react-navigation/native';
import React from 'react';

import styled, {useTheme} from 'styled-components/native';

import ArrowRightIcon from '~assets/icons/Arrow/arrowRight.svg';

import Typography from '../../../../../../components/Typography';

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {boolean} props.isArrow
 * @returns
 */

const Component = ({
  title = '',
  isVersion,
  isArrow = true,
  description,
  effect,
  routeName,
  params,
  latestVersion,
  currentVersion,
}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();

  return (
    <TitleContainer
      onPress={() =>
        routeName && params
          ? navigation.navigate(routeName, {
              ...params,
            })
          : navigation.navigate(routeName)
      }>
      <TitleBox>
        <Title text={'Body05SB'} textColor={themeApp.colors.grey[2]}>
          {title}
        </Title>
        {isVersion && (
          <VersionInfo textColor={themeApp.colors.grey[4]}>
            {currentVersion}
          </VersionInfo>
        )}
      </TitleBox>
      <TailBox>
        <TailTextBox>
          {description && <Description>{description}</Description>}
          {effect && effect}
        </TailTextBox>
        {isVersion && latestVersion && (
          <Description textColor={themeApp.colors.grey[4]}>
            최신버전
          </Description>
        )}
        {isArrow && <ArrowIcon />}
      </TailBox>
    </TitleContainer>
  );
};

export default Component;

const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Title = styled(Typography)``;
const VersionInfo = styled(Typography)`
  margin-left: 6px;
`;
const ArrowIcon = styled(ArrowRightIcon)`
  color: ${props => props.theme.colors.grey[5]};
`;
const TitleContainer = styled.Pressable`
  padding: 0px 17px;
  height: 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Description = styled(Typography)``;
const TailTextBox = styled.View`
  flex-direction: row;
  margin-right: 10px;
`;
const TailBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
