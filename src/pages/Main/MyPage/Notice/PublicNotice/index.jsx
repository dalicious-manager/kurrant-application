import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  View,
} from 'react';
import {FlatList} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Button from '~components/Button';
import Typography from '~components/Typography';
import Wrapper from '~components/Wrapper';

import useBoard from '../../../../../biz/useBoard';
import {
  useGetNoticeDetail,
  useGetNoticeList,
} from '../../../../../hook/useNotice';
import {formattedBoardOptionStatus} from '../../../../../utils/statusFormatter';
import ListBox from '../ListBox';
import {PAGE_NAME as NoticeDetailPageName} from '../NoticeDetail';
import useSse from '../../../../../utils/sse/sseLogics/useSse';
import {sseType1Atom} from '../../../../../utils/sse/sseLogics/store';
import {useAtom} from 'jotai';

export const PAGE_NAME = 'P__MY_PAGE__PUBLIC_NOTICE';

const Pages = ({route}) => {
  const from = route?.params?.from;
  const noticeId = route?.params?.id;
  const themeApp = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {data: noticeDetail, isSuccess: detailLoad} =
    useGetNoticeDetail(noticeId);
  const {data, hasNextPage, fetchNextPage, refetch, isSuccess} =
    useGetNoticeList();

  const dataList = data?.pages;

  const {sseHistory, sseHistoryRefetch, confirmSseIsRead} = useSse();
  const [sseType1List, setSseType1List] = useState([]);

  // sseType1
  const [sseType1] = useAtom(sseType1Atom);

  useEffect(() => {
    if (!!sseType1?.id) {
      refetch();
      sseHistoryRefetch();
    }
  }, [sseType1]);

  useEffect(() => {
    if (
      Array.isArray(
        sseHistory?.filter(v => v.type === 1)?.map(v => v.noticeId),
      ) &&
      sseHistory?.filter(v => v.type === 1)?.map(v => v.noticeId).length > 0
    ) {
      setSseType1List([
        ...new Set(
          sseHistory
            ?.filter(v => v.type === 1)
            ?.map(v => {
              return {id: v.id, noticeId: v.noticeId};
            }),
        ),
      ]);
    } else {
      setSseType1List([]);
    }
  }, [sseHistory]);

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (noticeDetail?.data && detailLoad && from) {
      navigation.navigate(NoticeDetailPageName, {
        noticeData: noticeDetail?.data,
      });
    }
  }, [detailLoad, navigation, noticeDetail?.data, from]);

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
                  sseTypeList={sseType1List}
                  title={formattedBoardOptionStatus(el.boardOption) + el.title}
                  description={el.updated}
                  onPressEvent={() => {
                    // sseType1
                    if (!!sseType1List.map(v => v.noticeId)?.includes(el.id)) {
                      const id = sseType1List.find(
                        v => v.noticeId === el.id,
                      ).id;

                      confirmSseIsRead({
                        type: 1,
                        ids: [id],
                      });
                    }

                    navigation.navigate(NoticeDetailPageName, {
                      noticeData: el,
                    });
                  }}
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
