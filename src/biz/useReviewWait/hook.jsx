import {useAtom} from 'jotai';
import React, {useEffect} from 'react';

import * as Fetch from './Fetch';
import {reviewWaitListAtom} from './store';

const useReviewWait = () => {
  const [reviewWaitList, setReviewWaitList] = useAtom(reviewWaitListAtom);

  const getReviewWait = async () => {
    try {
      const res = await Fetch.orderMealMockData();
      setReviewWaitList(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReviewWait();
  }, []);

  return {getReviewWait, reviewWaitList};
};

export default useReviewWait;
