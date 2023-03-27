import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';

import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';
import useBoard from '../../../../../biz/useBoard';

import ListBox from '../ListBox';

import {PAGE_NAME as NoticeDetailPageName} from '../NoticeDetail';

export const PAGE_NAME = 'P__MY_PAGE__SPOT_NOTICE';

const Pages = () => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {
    getNotice,
    readableAtom: {spotNotice, isGetNoticeLoading},
  } = useBoard();
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        tabBarLabelStyle: {
          fontSize: 15,
          lineHeight: 21,
          fontFamily: 'Pretendard-SemiBold',
        },
      });
      return () => {
        navigation.setOptions({
          tabBarLabelStyle: {
            fontSize: 15,
            lineHeight: 21,
            fontFamily: 'Pretendard-Regular',
          },
        });
      };
    }, []),
  );
  useEffect(() => {
    const getUseNotice = async () => {
      await getNotice(1);
    };
    getUseNotice();
  }, []);
  return (
    <Wrapper>
      {spotNotice?.map(v => {
        return (
          <ListBox
            key={v.id}
            title={v.title}
            description={v.created}
            onPressEvent={() =>
              navigation.navigate(NoticeDetailPageName, {
                noticeData: v,
              })
            }
          />
        );
      })}
      {!spotNotice?.length > 0 && (
        <NonNotice>
          <Typography text="Body05R" textColor={themeApp.colors.grey[5]}>
            공지사항 내역이 없어요.
          </Typography>
        </NonNotice>
      )}
    </Wrapper>
  );
};

export default Pages;

const NonNotice = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
