import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Pressable, FlatList, Alert} from 'react-native';
import styled from 'styled-components';
import Toast from '~components/Toast';

import Button from './components/Button';
import ArrowRight from '../../../../../assets/icons/Arrow/arrowRight.svg';
import useWrittenReview from '../../../../../biz/useReview/useWrittenReview/hook';
import TextLable from '../../../../../components/TextButton';
import Typography from '../../../../../components/Typography';
import {useGetPointList, useGetPointList2} from '../../../../../hook/usePoint';
import {SCREEN_NAME as ReviewScreenName} from '../../../../../screens/Main/Review';
import withCommas from '../../../../../utils/withCommas';
import {PAGE_NAME as purchaseHistory} from '../../PurchaseHistory/Detail/Main';

export const PAGE_NAME = 'P__MY_PAGE__POINT';
const Pages = () => {
  const flatListRef = useRef(null);
  const [touch, setTouch] = useState([0]);
  const navigation = useNavigation();
  const {getWrittenReview, reviewList} = useWrittenReview();
  const {data, hasNextPage, fetchNextPage, refetch, isFetching} =
    useGetPointList(touch[0]);
  const dataList = data?.pages;

  const noData = dataList?.map(el => el.items.pointHistoryDtos.length);

  const detailPress = (id, status) => {
    if (status === 0) {
      const review = reviewList?.filter(el => el.reviewId === id);
      if (review?.length === 0) {
        Alert.alert('리뷰 삭제', '작성한 리뷰가 삭제되었습니다.', [
          {
            text: '확인',
            onPress: () => {},
          },
        ]);
      } else {
        navigation.navigate(ReviewScreenName, {
          from: 'point',
          id: id,
        });
      }
    } else if (status === 2 || status === 3) {
      navigation.navigate(purchaseHistory, {
        id: id,
      });
    }
  };
  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    refetch();
    if (touch) {
      flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
    }
  }, [touch, refetch]);

  useEffect(() => {
    getWrittenReview();
  }, []);

  return (
    <>
      <Wrapper style={{flex: 1}}>
        <PointWrap>
          <AvailablePoint>사용가능한 포인트</AvailablePoint>
          <PointTextWrap>
            <PointText>
              {withCommas(data?.pages[0]?.items?.userPoint)}
              <WonText>P</WonText>
            </PointText>
          </PointTextWrap>
        </PointWrap>
        <BorderBar />
        <ButtonWrap>
          <Button touch={touch} setTouch={setTouch} isDisabled={isFetching} />
        </ButtonWrap>
        {/* 포인트 없을때 VIEW */}
        {noData?.includes(0) && (
          <Wrap
            style={{
              alignItems: 'center',
              justifyContents: 'center',
              marginTop: '70%',
            }}>
            <NodataText>포인트 내역이 없어요</NodataText>
          </Wrap>
        )}
        <FlatList
          style={!hasNextPage && {marginBottom: 50}}
          ref={flatListRef}
          onEndReached={onEndReached}
          data={dataList}
          renderItem={({item}) => {
            return (
              <Wrap>
                {item?.items?.pointHistoryDtos?.map((el, idx) => {
                  const status =
                    el.pointStatus === 0
                      ? '리뷰 적립'
                      : el.pointStatus === 1
                      ? '이벤트 적립'
                      : el.pointStatus === 2
                      ? '환불'
                      : el.pointStatus === 3
                      ? '사용'
                      : el.pointStatus === 4
                      ? '운영자 적립'
                      : el.pointStatus === 5
                      ? '운영자 차감'
                      : el.pointStatus === 6
                      ? '파운더스 적립'
                      : el.pointStatus === 7
                      ? '파운더스 적립'
                      : '운영자 차감';
                  return (
                    <Contents key={idx}>
                      <DateWrap>
                        <DateText>
                          {el.rewardDate} ・ {status}
                        </DateText>
                        {!(el.pointStatus === 4 || el.pointStatus === 5) && (
                          <DetailButton>
                            <TextLable
                              label="상세보기"
                              size="label13R"
                              type="grey5"
                              onPressEvent={() => {
                                detailPress(el.contentId, el.pointStatus);
                              }}
                            />
                            <ArrowIcon />
                          </DetailButton>
                        )}
                      </DateWrap>
                      <InnerContents>
                        <TitleWrap>
                          {el.pointStatus === 4 ? (
                            <TitleText>
                              운영자에 의해 포인트가 적립되었어요
                            </TitleText>
                          ) : el.pointStatus === 5 ? (
                            <TitleText>
                              운영자에 의해 포인트가 차감되었어요
                            </TitleText>
                          ) : el.pointStatus === 6 ? (
                            <TitleText>
                              파운더스 포인트가 적립되었어요
                            </TitleText>
                          ) : el.pointStatus === 7 ? (
                            <TitleText>
                              적립되지 않은 파운더스 포인트가 적립되었어요
                            </TitleText>
                          ) : (
                            <TitleText numberOfLines={2} ellipsizeMode="tail">
                              [{el.makersName}] {el.name}
                            </TitleText>
                          )}
                        </TitleWrap>
                        <BalanceWrap
                          onPress={() => {
                            detailPress(el.contentId, el.pointStatus);
                          }}>
                          {el.pointStatus === 3 || el.pointStatus === 5 ? (
                            <PriceText status={el.pointStatus}>
                              -{withCommas(el.point)}P
                            </PriceText>
                          ) : (
                            <PriceText status={el.pointStatus}>
                              +{withCommas(el.point)}P
                            </PriceText>
                          )}
                          <Balance>잔액 {withCommas(el.leftPoint)}P</Balance>
                        </BalanceWrap>
                      </InnerContents>
                    </Contents>
                  );
                })}
              </Wrap>
            );
          }}
        />
      </Wrapper>
    </>
  );
};

export default Pages;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.grey[0]};
`;

const BorderBar = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const Wrap = styled.View`
  margin: 0px 24px;
`;

const AvailablePoint = styled(Typography).attrs({text: 'Title04SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const PointWrap = styled.View`
  margin: 30px 24px 24px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

const PointText = styled(Typography).attrs({text: 'Title02SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const WonText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[2]};
  position: absolute;
  bottom: 2px;
`;

const PointTextWrap = styled.View`
  flex-direction: row;
`;

const Contents = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.grey[8]};
  padding: 24px 0px;
`;

const DateText = styled(Typography).attrs({text: 'Button10R'})`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const TitleText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme}) => theme.colors.grey[2]};
`;

const DateWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const ArrowIcon = styled(ArrowRight)`
  color: ${({theme}) => theme.colors.grey[5]};
  margin-left: 4px;
`;

const DetailButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const PriceText = styled(Typography).attrs({text: 'Body05SB'})`
  color: ${({theme, status}) =>
    status === 3 || status === 5
      ? theme.colors.red[500]
      : theme.colors.blue[500]};
`;

const TitleWrap = styled.View`
  flex-direction: row;
  width: 70%;
`;

const Balance = styled(Typography).attrs({text: 'CaptionR'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;

const BalanceWrap = styled.Pressable`
  align-items: flex-end;
  width: 30%;
`;

const InnerContents = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const ButtonWrap = styled.View`
  margin: 8px 24px 0px 24px;
`;

const NodataText = styled(Typography).attrs({text: 'Body05R'})`
  color: ${({theme}) => theme.colors.grey[5]};
`;
