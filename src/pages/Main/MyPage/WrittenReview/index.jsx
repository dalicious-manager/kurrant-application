import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import {DefaultProfile} from '../../../../assets';
import Card from './Card';
import NoOrder from '../NoOrder';
import useWrittenReview from '../../../../biz/useReview/useWrittenReview/hook';
import {useAtom} from 'jotai';
import {totalWrittenReview} from '../../../../biz/useReview/useWrittenReview/store';
import {calculateTotalWrittenReviewList} from '../../../../biz/useReview/useWrittenReview/calculation';
import {convertDateFormat1} from '../../../../utils/dateFormatter';
import {useNavigation} from '@react-navigation/native';

export const PAGE_NAME = 'P_MAIN__MYPAGE__WRITTENREVIEW';
const sampleAdminReview = {
  pngLink: DefaultProfile,
  adminName: '일품만찬',
  writtenDate: '2022.02.19 작성',
  message:
    '다음에는 더 맛있는 메뉴를준비해보겠습니다. 이용해주셔서 다시한번 감사드리고 새해에는 더더더더더복 많이 받으세요 사랑합니다.',
};

const Pages = ({route}) => {
  const pointId = route?.params?.id;
  const flatListRef = useRef(null);

  const {getWrittenReview, reviewList, writtenReviewCount} = useWrittenReview();

  const [, setTotalWrittenReviewList] = useAtom(totalWrittenReview);

  // 포인트 연결 리뷰 id & 리뷰 id 일치하는 index 찾기
  const idx = reviewList?.findIndex(el => el.reviewId === pointId);

  useEffect(() => {
    getWrittenReview();
  }, []);

  useEffect(() => {
    setTotalWrittenReviewList(writtenReviewCount);
  }, [writtenReviewCount]);

  useEffect(() => {
    console.log(reviewList);
  }, [reviewList]);

  return (
    <Container>
      {!!reviewList && reviewList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          initialScrollIndex={idx}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          data={reviewList}
          scrollEnabled={true}
          renderItem={({item}) => {
            // 서버 -> 프론트 객체 프로퍼티 이름 치환하기

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
            };

            return (
              <View>
                <Card
                  id={item2.id}
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
                />
              </View>
            );
          }}
        />
      ) : (
        <NoOrder isArrayEmpty={true} message={`아직 작성한 리뷰가 없어요.`} />
      )}
    </Container>
  );
};

export default Pages;

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 25px;
  padding-top: 0px;
  background-color: #ffffff;
`;
