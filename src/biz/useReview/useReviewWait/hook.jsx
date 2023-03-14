import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {reviewWaitListAtom} from './store';

const useReviewWait = () => {
  const [ReviewWaitListSupply, setReviewWaitList] = useAtom(reviewWaitListAtom);

  const getReviewWait = async () => {
    try {
      const res = await Fetch.orderMealMockData();
      setReviewWaitList(res);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getReviewWait();
  // }, []);

  return {getReviewWait, ReviewWaitListSupply};
};

export default useReviewWait;
