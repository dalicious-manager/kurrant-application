import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {isLoadingAtom, reviewWaitListAtom} from './store';

const useBanner = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [reviewWaitList, setReviewWaitList] = useAtom(reviewWaitListAtom);

  const findBanners = async (option = {}) => {
    try {
      setIsLoading(true);
      const fetchRes = await Fetch.findReviewWaitList();

      setReviewWaitList(fetchRes);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    findBanners,
    readableAtom: {
      isLoading,
      reviewWaitList,
    },
  };
};

export default useBanner;
