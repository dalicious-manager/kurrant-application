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

export const PAGE_NAME = 'P_MAIN__MYPAGE__WRITTENREVIEW';

const Pages = () => {
  const {getWrittenReview, WrittenReviewListSupply} = useWrittenReview();

  const [ReviewList, setReviewList] = useState(undefined);

  const [, setTotalWrittenReviewList] = useAtom(totalWrittenReview);

  useEffect(() => {
    getWrittenReview();
  }, []);

  useEffect(() => {
    if (!!WrittenReviewListSupply) {
      setTotalWrittenReviewList(
        calculateTotalWrittenReviewList(WrittenReviewListSupply),
      );

      setReviewList(WrittenReviewListSupply);
    }
  }, [WrittenReviewListSupply]);

  return (
    <Container
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {!!ReviewList ? (
        <FlatList
          data={ReviewList.writtenReviewList}
          scrollEnabled={true}
          renderItem={({item}) => {
            return (
              <View>
                <Card
                  makersName={item.makersName}
                  foodName={item.foodName}
                  writtenDate={item.writtenDate}
                  option={item.option}
                  rating={item.rating}
                  reviewText={item.reviewText}
                  adminReview={item.adminReview}
                />
              </View>
            );
          }}
        />
      ) : (
        <NoOrder
          isArrayEmpty={!ReviewList}
          message={`아직 작성한 리뷰가 없어요.`}
        />
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
