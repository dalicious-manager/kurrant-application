import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';

import useBoard from '../../../../../biz/useBoard';
import {useGetNoticeList} from '../../../../../hook/useNotice';
import ListBox from '../ListBox';
import {PAGE_NAME as NoticeDetailPageName} from '../NoticeDetail';

export const PAGE_NAME = 'P__MY_PAGE__PUBLIC_NOTICE';

const Pages = () => {
  const flatListRef = useRef(null);
  const themeApp = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {data, hasNextPage, fetchNextPage, refetch, isFetching} =
    useGetNoticeList();
  const dataList = data?.pages[0].items;

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

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

  // useEffect(() => {
  //   const getUseNotice = async () => {
  //     //   await getNotice(0);
  //     await getMypageNotice();
  //   };
  //   getUseNotice();
  // }, []);
  return (
    <Wrapper>
      {!dataList ? (
        <NonNotice>
          <Typography text="Body05R" textColor={themeApp.colors.grey[5]}>
            공지사항 내역이 없어요.
          </Typography>
        </NonNotice>
      ) : (
        <FlatList
          //ref={flatListRef}
          onEndReached={onEndReached}
          data={dataList}
          renderItem={({item}) => (
            <ListBox
              key={item.id}
              title={item.title}
              description={item.updated}
              onPressEvent={() =>
                navigation.navigate(NoticeDetailPageName, {
                  noticeData: item,
                })
              }
            />
          )}
        />
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
