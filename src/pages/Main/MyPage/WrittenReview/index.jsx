import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import {DefaultProfile} from '../../../../assets';
import Card from './Card';
import NoOrder from '../NoOrder';
import useWrittenReview from '../../../../biz/useReview/useWrittenReview/hook';
import {useAtom} from 'jotai';
import {totalWrittenReview} from '../../../../biz/useReview/useWrittenReview/store';
import {calculateTotalWrittenReviewList} from '../../../../biz/useReview/useWrittenReview/calculation';
import {convertDateFormat1} from '../../../../utils/dateFormatter';

export const PAGE_NAME = 'P_MAIN__MYPAGE__WRITTENREVIEW';
const sampleAdminReview = {
  pngLink: DefaultProfile,
  adminName: '일품만찬',
  writtenDate: '2022.02.19 작성',
  message:
    '다음에는 더 맛있는 메뉴를준비해보겠습니다. 이용해주셔서 다시한번 감사드리고 새해에는 더더더더더복 많이 받으세요 사랑합니다.',
};

const Pages = () => {
  const {getWrittenReview, reviewList, writtenReviewCount} = useWrittenReview();

  const [, setTotalWrittenReviewList] = useAtom(totalWrittenReview);

  useEffect(() => {
    getWrittenReview();
  }, []);

  // ReviewList -> ReviewList

  useEffect(() => {
    setTotalWrittenReviewList(
      // calculateTotalWrittenReviewList(ReviewList),
      writtenReviewCount,
    );
  }, [writtenReviewCount]);

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {!!reviewList && reviewList.length > 0 ? (
        <FlatList
          data={reviewList}
          scrollEnabled={true}
          renderItem={({item}) => {
            // 서버 -> 프론트 객체 프로퍼티 이름 치환하기

            const item2 = {
              id: item.reviewId,
              image: item.imageLocation,
              reviewText: item.content,
              rating: item.satisfaction,
              writtenDate: convertDateFormat1(item.createDate),

              makersName: item.makersName,
              foodName: item.itemName,
              option: item.option,
            };

            return (
              <View>
                <Card
                  makersName={item2.makersName}
                  foodName={item2.foodName}
                  writtenDate={item2.writtenDate}
                  option={item2.option}
                  rating={item2.rating}
                  reviewText={item2.reviewText}
                  // adminReview={item2.adminReview}
                  adminReview={sampleAdminReview}
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
  background-color: #ffffff;
`;
