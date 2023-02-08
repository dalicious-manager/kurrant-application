import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {writtenReviewList} from './store';

const useWrittenReview = () => {
  const [WrittenReviewListSupply, setWrittenReviewList] =
    useAtom(writtenReviewList);

  const getWrittenReview = async () => {
    try {
      const res = await Fetch.writtenReviewMockData();
      // console.log(res);
      setWrittenReviewList(res);
    } catch (err) {
      // console.log('에러떳음');
      console.log(err);
    }
  };

  return {getWrittenReview, WrittenReviewListSupply};
};

export default useWrittenReview;
