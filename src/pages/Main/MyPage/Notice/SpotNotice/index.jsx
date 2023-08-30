import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';

import useBoard from '../../../../../biz/useBoard';
import {
  useGetNoticeList,
  useGetSpotNoticeList,
} from '../../../../../hook/useNotice';
import {formattedBoardOptionStatus} from '../../../../../utils/statusFormatter';
import ListBox from '../ListBox';
import {PAGE_NAME as NoticeDetailPageName} from '../NoticeDetail';

export const PAGE_NAME = 'P__MY_PAGE__SPOT_NOTICE';

const Pages = () => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {data, hasNextPage, fetchNextPage, refetch, isFetching} =
    useGetSpotNoticeList();
  const dataList = data?.pages;

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
  //     await getSpotNotice();
  //   };
  //   getUseNotice();
  // }, []);
  return (
    <Wrapper>
      {dataList && dataList[0]?.items?.length === 0 ? (
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
          renderItem={({item}) =>
            item?.items?.map(el => {
              return (
                <ListBox
                  key={el.id}
                  title={formattedBoardOptionStatus(el.boardOption) + el.title}
                  description={el.updated}
                  onPressEvent={() =>
                    navigation.navigate(NoticeDetailPageName, {
                      noticeData: el,
                    })
                  }
                />
              );
            })
          }
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
