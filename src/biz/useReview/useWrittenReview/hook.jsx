import {useAtom} from 'jotai';
import {useState} from 'react';

import * as Fetch from './Fetch';
import {writtenReviewList} from './store';

const useWrittenReview = () => {
  const [reviewList, setWrittenReviewList] = useAtom(writtenReviewList);

  const [writtenReviewCount, setWrittenReviewCount] = useState(0);

  const getWrittenReview = async () => {
    try {
      // const res = await Fetch.writtenReviewMockData();
      const res = await Fetch.getReviewOrderMeal();

      // 데이터 갈아끼우기

      setWrittenReviewCount(res.data.count);
      setWrittenReviewList(res.data.items);
      // setWrittenReviewList(res);
    } catch (err) {
      console.log(err);
    }
  };

  return {getWrittenReview, reviewList, writtenReviewCount};
};

export default useWrittenReview;
