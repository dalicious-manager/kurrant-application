import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import ArrowRightIcon from '~assets/icons/Arrow/arrowRight.svg';
import Typography from '~components/Typography';

import SseRedDot from '../../../../../utils/sse/SseService/SseRedDot/SseRedDot';

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
  id,
  isArrow = true,
  description,
  effect,
  onPressEvent,
  sseTypeList,
}) => {
  const themeApp = useTheme();

  return (
    <TitleContainer onPress={onPressEvent}>
      <SseRedDot
        // sseType1, sseType2
        isSse={sseTypeList.map(v => v.noticeId)?.includes(id)}
        position={'absolute'}
        top={'23px'}
        right={'47px'}
      />
      <ContentsBox>
        <TitleBox>
          <Title
            text={'Body05R'}
            textColor={themeApp.colors.grey[2]}
            numberOfLines={1}>
            {title}
          </Title>
          <TailTextBox>
            {description && (
              <Description
                text={'CaptionR'}
                textColor={themeApp.colors.grey[4]}>
                {description}
              </Description>
            )}
          </TailTextBox>
        </TitleBox>

        <TailBox>
          {isVersion && (
            <Description textColor={themeApp.colors.grey[4]}>
              최신버전
            </Description>
          )}
          {isArrow && <ArrowIcon />}
        </TailBox>
      </ContentsBox>
    </TitleContainer>
  );
};

export default Component;

const TitleBox = styled.View`
  width: 90%;
`;
const ContentsBox = styled.View`
  margin-left: 24px;
  margin-right: 30px;
  padding: 17px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
`;
const Title = styled(Typography)``;
const VersionInfo = styled(Typography)`
  margin-left: 6px;
`;
const ArrowIcon = styled(ArrowRightIcon)`
  color: ${props => props.theme.colors.grey[5]};
`;
const TitleContainer = styled.Pressable``;
const Description = styled(Typography)``;
const TailTextBox = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;
const TailBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
