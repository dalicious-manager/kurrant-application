import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import useBoard from '../../biz/useBoard';
import {NotificationIcon} from '../../components/Icon';
import Typography from '../../components/Typography';
import Wrapper from '../../components/Wrapper';
import {PAGE_NAME as MainPageName} from '../Main/Bnb/Home/Main';
import SseRedDot from '../../utils/sse/SseService/SseRedDot/SseRedDot';
import {fetchJson} from '../../utils/fetch';
import {PAGE_NAME as NoticeDetailPageName} from '../Main/MyPage/Notice/NoticeDetail';

export const PAGE_NAME = 'P__NOTIFICATION_CENTER';

const alramData = [
  {
    content:
      '조재신님, 주문하신 블루베리 크럼블 케이크 상품이 달리셔스(카페)에 도착하였습니다.',
    dateTime: '2023-08-22 10:03',
    id: '04424322-d6dd-4c37-ad0b-6d29b16bd851',
    isRead: true,
    noticeId: null,
    reviewId: null,
    title: '배송완료',
    type: '주문상태',
    userId: 23,
  },
  {
    content:
      '조재신님, 주문하신 크림라떼 상품이 달리셔스(카페)에 도착하였습니다.',
    dateTime: '2023-08-22 10:03',
    id: '529a2507-b6b0-4a35-ba54-5ff260c0a777',
    isRead: true,
    noticeId: null,
    reviewId: null,
    title: '배송완료',
    type: '주문상태',
    userId: 23,
  },
];

const Pages = () => {
  const themeApp = useTheme();

  const allowReadAlarm = useRef(true);

  const {
    getAlarm,
    readAlarm,
    readableAtom: {alarm},
  } = useBoard();
  const navigation = useNavigation();

  const goToPage = async id => {
    // return;
    try {
      if (id) {
        const res = await fetchJson(`/boards/notices/${id}`);

        navigation.navigate(NoticeDetailPageName, {
          id: id,
          from: 'public',
          noticeData: res.data,
        });
      }
    } catch (err) {
      Alert.alert('', '삭제된 게시물입니다.', [
        {
          text: '확인',
          onPress: () => {},
        },
      ]);
    }
  };
  useEffect(() => {
    const getUseAlarm = async () => {
      await getAlarm();
    };

    getUseAlarm();
  }, []);

  useEffect(() => {
    return () => {
      if (!alarm || alarm.length < 1) return;

      if (allowReadAlarm.current) {
        readAlarm(
          alarm.map(v => v.id),
          false,
        );
      }

      allowReadAlarm.current = true;
    };
  }, [alarm]);

  const handleNotificationBoxPress = id => {
    readAlarm([id], true);
  };

  return (
    <Wrapper>
      {!alarm?.length > 0 ? (
        // {!alramData?.length > 0 ? (
        <NonNotice>
          <Typography text="Body05R" textColor={themeApp.colors.grey[5]}>
            알림 내역이 없어요.
          </Typography>
        </NonNotice>
      ) : (
        <ScrollView>
          {alarm?.map(v => {
            return (
              <NotificationBox
                key={v.id}
                onPress={() => {
                  if (!v.isRead) {
                    handleNotificationBoxPress(v.id);
                    allowReadAlarm.current = false;
                  }
                  goToPage(v.noticeId);
                }}>
                <SseRedDotType6
                  // sseType6
                  isSse={!v.isRead}
                  position={'absolute'}
                  top={'-8px'}
                  right={'-1px'}
                />

                <TitleBox>
                  <TitleBoxFront>
                    <IconBox>
                      <NotificationIcon name={v.type} />
                    </IconBox>
                    <Typography
                      text={'Body05SB'}
                      textColor={themeApp.colors.grey[2]}>
                      {v.title}
                    </Typography>
                  </TitleBoxFront>
                  <Typography
                    text={'CaptionR'}
                    textColor={themeApp.colors.grey[4]}>
                    {v.type}
                  </Typography>
                </TitleBox>
                <ContentBox>
                  <Typography
                    text={'Body06R'}
                    textColor={themeApp.colors.grey[4]}>
                    {v.content}
                  </Typography>
                </ContentBox>
                <Typography
                  text={'CaptionR'}
                  textColor={themeApp.colors.grey[5]}>
                  {v.dateTime}
                </Typography>
              </NotificationBox>
            );
          })}
        </ScrollView>
      )}
    </Wrapper>
  );
};

export default Pages;

const SseRedDotType6 = styled(SseRedDot)``;

const NotificationBox = styled.Pressable`
  padding: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
`;
const TitleBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ContentBox = styled.View`
  margin-top: 4px;
  margin-bottom: 4px;
`;
const TitleBoxFront = styled.View`
  flex-direction: row;
`;
const IconBox = styled.View`
  margin-right: 8px;
`;
const NonNotice = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
