import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';

import {useGetSpotNoticeList} from '../../../../../hook/useNotice';
import {formattedBoardOptionStatus} from '../../../../../utils/statusFormatter';
import ListBox from '../ListBox';
import {PAGE_NAME as NoticeDetailPageName} from '../NoticeDetail';
import useSse from '../../../../../utils/sse/sseLogics/useSse';
import {sseType2Atom} from '../../../../../utils/sse/sseLogics/store';
import {useAtom} from 'jotai';

export const PAGE_NAME = 'P__MY_PAGE__SPOT_NOTICE';

const Pages = () => {
  const themeApp = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {data, hasNextPage, fetchNextPage, refetch, isFetching} =
    useGetSpotNoticeList();
  const dataList = data?.pages;

  // sseType2

  const {sseHistory, sseHistoryRefetch, confirmSseIsRead} = useSse();

  const [sseType2List, setSseType2List] = useState([]);

  const [sseType2] = useAtom(sseType2Atom);

  useEffect(() => {
    if (!!sseType2?.id) {
      refetch();
      sseHistoryRefetch();
    }
  }, [sseType2]);

  useEffect(() => {
    if (
      Array.isArray(
        sseHistory?.filter(v => v.type === 2)?.map(v => v.noticeId),
      ) &&
      sseHistory?.filter(v => v.type === 2)?.map(v => v.noticeId).length > 0
    ) {
      setSseType2List([
        ...new Set(
          sseHistory
            ?.filter(v => v.type === 2)
            ?.map(v => {
              return {id: v.id, noticeId: v.noticeId};
            }),
        ),
      ]);
    } else {
      setSseType2List([]);
    }
  }, [sseHistory]);

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
                  id={el.id}
                  title={formattedBoardOptionStatus(el.boardOption) + el.title}
                  description={el.updated}
                  onPressEvent={() => {
                    // sseType2
                    if (!!sseType2List.map(v => v.noticeId)?.includes(el.id)) {
                      const id = sseType2List.find(
                        v => v.noticeId === el.id,
                      ).id;

                      confirmSseIsRead({
                        type: 2,
                        ids: [id],
                      });
                    }
                    navigation.navigate(NoticeDetailPageName, {
                      noticeData: el,
                    });
                  }}
                  sseTypeList={sseType2List}
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
