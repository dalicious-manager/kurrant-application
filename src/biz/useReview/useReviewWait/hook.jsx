import {useAtom} from 'jotai';
import {useState} from 'react';

import * as Fetch from './Fetch';
import {reviewWaitListAtom} from './store';

const useReviewWait = () => {
  const [reviewWaitList, setReviewWaitList] = useAtom(reviewWaitListAtom);

  const [reviewWaitCount, setReviewWaitCount] = useState(0);

  const getReviewWait = async () => {
    try {
      const res = await Fetch.getReviewOrderMeal();
      // const res = await Fetch.orderMealMockData();

      setReviewWaitCount(res.data.count);
      // setReviewWaitList(res.data.orderFoodList);
      setReviewWaitList([]);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getReviewWait();
  // }, []);

  return {getReviewWait, reviewWaitList, reviewWaitCount};
};

export default useReviewWait;
