import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {writtenReviewList} from './store';

const useWrittenReview = () => {
  const [WrittenReviewListSupply, setWrittenReviewList] =
    useAtom(writtenReviewList);

  const getWrittenReview = async () => {
    try {
      const res = await Fetch.writtenReviewMockData();

      setWrittenReviewList(res);
    } catch (err) {
      console.log(err);
    }
  };

  return {getWrittenReview, WrittenReviewListSupply};
};

export default useWrittenReview;
