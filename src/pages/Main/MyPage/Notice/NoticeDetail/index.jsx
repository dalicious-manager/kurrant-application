import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, ScrollView} from 'react-native';
import HTML, {defaultSystemFonts} from 'react-native-render-html';
import styled, {useTheme} from 'styled-components/native';
import Wrapper from '~components/Wrapper';

import {useGetNoticeDetail} from '../../../../../hook/useNotice';
import {width} from '../../../../../theme';
import {formattedBoardOptionStatus} from '../../../../../utils/statusFormatter';

export const PAGE_NAME = 'P__MY_PAGE__NOTICE_DETAIL';

const Pages = ({route}) => {
  const {noticeData} = route.params;

  const systemFonts = [
    ...defaultSystemFonts,
    'Pretendard-Regular',
    'Pretendard-SemiBold',
  ];
  const themeApp = useTheme();

  const source = {
    html: `<div style='padding-left:24px; padding-right:24px; padding-bottom:24px '> 
        <div style="margin:0; padding: 0 ; width:100%; font-weight: 600; fontFamily:'Pretendard-SemiBold'; font-size:20px; line-height:26px; color:${
          themeApp.colors.grey[2]
        }">${
      formattedBoardOptionStatus(noticeData.boardOption) + noticeData.title
    }</div>
        <div style="margin:0; padding: 0 ; margin-top:4px; font-weight: 400; fontFamily:'Pretendard-Regular'; font-size:13px; line-height:19px; color:${
          themeApp.colors.grey[4]
        }">${noticeData.updated}</div>
        <div style="width:100%; height:1px; margin:24px 0px; background-color:${
          themeApp.colors.grey[8]
        }"></div>
        ${noticeData.content}
        </div>`,
  };

  return (
    <Wrapper paddingTop={24}>
      <ContenContainer>
        <HTML
          contentWidth={Dimensions.get('window').width}
          source={source}
          systemFonts={systemFonts}
          tagsStyles={{
            img: {
              width: Dimensions.get('window').width - 48,
            },
            p: {
              margin: 0,
              padding: 0,
            },
          }}
        />
      </ContenContainer>
    </Wrapper>
  );
};

export default Pages;

const ContenContainer = styled(ScrollView)`
  padding-bottom: 24px;
`;
const TitleBtnBox = styled.View`
  min-width: 106px;
  max-width: 110px;
  margin-left: 82px;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const DescriptionBox = styled.View`
  margin: 24px;
  margin-top: 33px;
`;
const Line = styled.View`
  width: 100%;
  height: 12px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;
const FAQBox = styled.View`
  padding: 16px 24px;
`;
