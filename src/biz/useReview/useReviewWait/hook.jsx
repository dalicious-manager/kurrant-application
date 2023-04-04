import {useAtom} from 'jotai';
import {useState} from 'react';

import * as Fetch from './Fetch';
import {
  redeemablePointsAtom,
  reviewWaitListAtom,
  totalReviewWaitListAtom,
} from './store';

const useReviewWait = () => {
  const [reviewWaitList, setReviewWaitList] = useAtom(reviewWaitListAtom);

  const [reviewWaitCount, setReviewWaitCount] = useState(0);

  const [redeemablePoints, setRedeemablePoints] = useAtom(redeemablePointsAtom);
  const [, setTotalReviewWaitList] = useAtom(totalReviewWaitListAtom);
  const getReviewWait = async () => {
    try {
      const res = await Fetch.getReviewOrderMeal();
      // const res = await Fetch.orderMealMockData();
      setTotalReviewWaitList(res.data.count);
      setReviewWaitCount(res.data.count);
      setReviewWaitList(res.data.orderFoodList);
      setRedeemablePoints(res.data.redeemablePoints);

      // setReviewWaitList([]);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getReviewWait();
  // }, []);

  return {getReviewWait, reviewWaitList, reviewWaitCount, redeemablePoints};
};

export default useReviewWait;
