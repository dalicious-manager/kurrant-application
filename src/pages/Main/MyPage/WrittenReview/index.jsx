import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import Toast from '~components/Toast';

import Card from './Card';
import {DefaultProfile} from '../../../../assets';
import {calculateTotalWrittenReviewList} from '../../../../biz/useReview/useWrittenReview/calculation';
import useWrittenReview from '../../../../biz/useReview/useWrittenReview/hook';
import {totalWrittenReview} from '../../../../biz/useReview/useWrittenReview/store';
import {
  convertDateFormat1,
  formattedWeekDate,
} from '../../../../utils/dateFormatter';
import NoOrder from '../NoOrder';

import useSseType3 from '../../../../utils/sse/sseHooks/useSseType3';
import useSse from '../../../../utils/sse/sseLogics/useSse';

export const PAGE_NAME = 'P_MAIN__MYPAGE__WRITTENREVIEW';

const Pages = ({route}) => {
  const pointId = route?.params?.id;
  const flatListRef = useRef(null);

  const [idx, setIdx] = useState(-1);
  const {getWrittenReview, reviewList, writtenReviewCount} = useWrittenReview();

  // 홈에서 checkSseType3가 true일때 리뷰 total이 0 이상인지 판단하기

  // sseType3

  useSseType3();

  const {sseHistory, confirmSseIsRead} = useSse();
  const [sseType8List, setSseType8List] = useState([]);

  // sseType8

  useEffect(() => {
    if (
      Array.isArray(
        sseHistory?.filter(v => v.type === 8)?.map(v => v.commentId),
      ) &&
      sseHistory?.filter(v => v.type === 8)?.map(v => v.commentId).length > 0
    ) {
      setSseType8List(
        sseHistory?.filter(v => v.type === 8)?.map(v => v.commentId),
      );
    }
  }, [sseHistory]);

  useEffect(() => {
    return () => {
      const list = sseHistory?.filter(v => v.type === 8)?.map(v => v.commentId);
      if (Array.isArray(list) && list.length > 0) {
        confirmSseIsRead({type: 8});
      }
    };
  }, []);

  // 포인트 연결 리뷰 id & 리뷰 id 일치하는 index 찾기
  const toast = Toast();

  useEffect(() => {
    getWrittenReview();
  }, []);

  useEffect(() => {
    if (reviewList) {
      const data = reviewList?.findIndex(el => el.reviewId === pointId);
      setIdx(data);
    }
  }, [reviewList]);

  useEffect(() => {
    if (flatListRef.current && idx !== -1) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: idx,
        viewPosition: 0,
      });
    }
  }, [flatListRef, idx, pointId]);

  return (
    <Container>
      {!!reviewList && reviewList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              if (flatListRef?.current)
                flatListRef?.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                  viewPosition: 0,
                });
            });
          }}
          data={[...reviewList, {id: 'filler'}]}
          scrollEnabled={true}
          renderItem={({item, index}) => {
            // 서버 -> 프론트 객체 프로퍼티 이름 치환하기

            if (item.id === 'filler') {
              return <Filler />;
            }

            const item2 = {
              id: item.reviewId,
              createDate: item.createDate,
              updateDate: item.updateDate,
              image: item.imageLocation,
              reviewText: item.content,
              rating: item.satisfaction,
              writtenDate: convertDateFormat1(item.createDate),
              imageLocation: item.imageLocation,
              makersName: item.makersName,
              foodName: item.itemName,
              option: item.option,
              forMakers: item.forMakers,
              commentList: item.commentList,
              dailyFoodId: item.dailyFoodId,
              sseType8List,
            };

            return (
              <View>
                <Card
                  id={item2.id}
                  focusId={pointId}
                  editItem={item2}
                  createDate={item2.createDate}
                  updateDate={item2.updateDate}
                  makersName={item2.makersName}
                  foodName={item2.foodName}
                  writtenDate={item2.writtenDate}
                  option={item2.option}
                  rating={item2.rating}
                  reviewText={item2.reviewText}
                  imageLocation={item2.imageLocation}
                  forMakers={item2.forMakers}
                  commentList={item2.commentList}
                  toast={toast}
                  dailyFoodId={item2.dailyFoodId}
                  sseType8List={item2.sseType8List}
                />
              </View>
            );
          }}
        />
      ) : (
        <NoOrder isArrayEmpty={true} message={`아직 작성한 리뷰가 없어요.`} />
      )}
      <toast.ToastWrap message={'리뷰가 삭제되었습니다.'} icon={'checked'} />
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: 100%;
  height: 100%;
  // padding: 24px 25px;
  padding-top: 0px;
  background-color: #ffffff;
`;

const Filler = styled.View`
  width: 100%;
  height: 40px;
`;
