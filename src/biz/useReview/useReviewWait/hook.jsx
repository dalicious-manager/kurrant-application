import {useAtom} from 'jotai';
import {useState} from 'react';
import {Alert} from 'react-native';

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
    // 주의! 이거 보낼떄마다 sseType3를

    try {
      const res = await Fetch.getReviewOrderMeal();

      // const res = await Fetch.orderMealMockData();
      setTotalReviewWaitList(res.data.count);
      setReviewWaitCount(res.data.count);
      setReviewWaitList(res.data.orderFoodList);
      setRedeemablePoints(res.data.redeemablePoints);
    } catch (err) {
      Alert.alert('작성할 리뷰', err?.toString()?.replace('error: ', ''));
    }
  };

  // useEffect(() => {
  //   getReviewWait();
  // }, []);

  return {getReviewWait, reviewWaitList, reviewWaitCount, redeemablePoints};
};

export default useReviewWait;
