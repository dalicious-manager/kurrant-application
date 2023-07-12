import {useAtom} from 'jotai';
import {useState} from 'react';
import {Alert} from 'react-native';

import * as Fetch from './Fetch';
import {totalWrittenReview, writtenReviewList} from './store';

const useWrittenReview = () => {
  const [reviewList, setWrittenReviewList] = useAtom(writtenReviewList);

  // const [isWrittenReviewLoading, setIsWrittenReviewLoading] = useState(false);

  const [writtenReviewCount, setWrittenReviewCount] =
    useAtom(totalWrittenReview);

  const getWrittenReview = async () => {
    try {
      // const res = await Fetch.writtenReviewMockData();

      const res = await Fetch.getReviewOrderMeal();

      // 데이터 갈아끼우기

      setWrittenReviewCount(res.data.count);
      setWrittenReviewList(res.data.items);
      // setWrittenReviewList(res);
    } catch (err) {
      Alert.alert(
        '작성된리뷰 가져오기',
        err?.toString()?.replace('error: ', ''),
      );
    }
  };

  return {getWrittenReview, reviewList, writtenReviewCount};
};

export default useWrittenReview;
