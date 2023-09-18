import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Linking, Platform, Pressable} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import ArrowRightIcon from '~assets/icons/Arrow/arrowRight.svg';

import Typography from '../../../../../../components/Typography';
import SseRedDot from '../../../../../../utils/sse/SseService/SseRedDot/SseRedDot';

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {boolean} props.isArrow
 * @returns
 */
const GOOGLE_PLAY_STORE_LINK = 'market://details?id=com.dalicious.kurrant';
// 구글 플레이 스토어가 설치되어 있지 않을 때 웹 링크
const GOOGLE_PLAY_STORE_WEB_LINK =
  'https://play.google.com/store/apps/details?id=com.dalicious.kurrant';
// 애플 앱 스토어 링크
const APPLE_APP_STORE_LINK = 'itms-apps://itunes.apple.com/us/app/id1663407738';
// 애플 앱 스토어가 설치되어 있지 않을 때 웹 링크
const APPLE_APP_STORE_WEB_LINK = 'https://apps.apple.com/us/app/id1663407738';
const Component = ({
  title = '',
  isVersion,
  isArrow = true,
  description,
  effect,
  routeName,
  params,
  isSse,
  latestVersion,
  currentVersion,
}) => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    if (Platform.OS === 'android') {
      handlePress(GOOGLE_PLAY_STORE_LINK, GOOGLE_PLAY_STORE_WEB_LINK);
    } else {
      handlePress(APPLE_APP_STORE_LINK, APPLE_APP_STORE_WEB_LINK);
    }
  }, []);
  const handlePress = useCallback(async (url, alterUrl) => {
    // 만약 어플이 설치되어 있으면 true, 없으면 false
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // 설치되어 있으면
      await Linking.openURL(url);
    } else {
      // 앱이 없으면
      await Linking.openURL(alterUrl);
    }
  }, []);
  return (
    <TitleContainer
      onPress={() =>
        routeName &&
        (params
          ? navigation.navigate(routeName, {
              ...params,
            })
          : navigation.navigate(routeName))
      }>
      <TitleBox>
        <SseRedDotType3
          // sseType3

          isSse={isSse}
          position={'absolute'}
          top={'0px'}
          right={'-8px'}>
          <Title text={'Body05SB'} textColor={themeApp.colors.grey[2]}>
            {title}
          </Title>
        </SseRedDotType3>

        {isVersion && (
          <VersionInfo textColor={themeApp.colors.grey[4]}>
            {currentVersion}
          </VersionInfo>
        )}
      </TitleBox>
      <TailBox>
        <TailTextBox>
          {description && (
            <Description textColor={themeApp.colors.grey[4]}>
              {description}
            </Description>
          )}
          {effect && effect}
        </TailTextBox>
        {isVersion &&
          (latestVersion ? (
            <Description textColor={themeApp.colors.grey[4]}>
              최신버전
            </Description>
          ) : (
            <Pressable onPress={onPress}>
              <Description textColor={themeApp.colors.grey[4]}>
                업데이트
              </Description>
            </Pressable>
          ))}
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

const SseRedDotType3 = styled(SseRedDot)``;
