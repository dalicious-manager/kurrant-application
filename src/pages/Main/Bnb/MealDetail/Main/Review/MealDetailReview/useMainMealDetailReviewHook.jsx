import {useEffect, useState} from 'react';
import {useMainReviewInfiniteQuery} from '../../../../../../../biz/useReview/useMealDetailReview/useMainReviewInfiniteQuery';

const useMainReviewHook = dailyFoodId => {
  const [starAverage, setStarAverage] = useState(1);
  const [totalReview, setTotalReview] = useState(0);
  const [initialLoading, setInitialLoading] = useState(false);
  const [url, setUrl] = useState(`/dailyfoods/${dailyFoodId}/review?sort=0`);
  const {
    getBoard,
    getBoardIsFetching: isFetching,
    getNextPage,
    getNextPageIsPossible,
    getBoardRefetch,
  } = useMainReviewInfiniteQuery(url, dailyFoodId);

  useEffect(() => {
    // const review =
    //   getBoard?.pages.flatMap(page => page.items?.reviewList) ?? [];
    if (getBoard?.pages) {
      const {
        items: {totalReview, starAverage},
      } = getBoard?.pages[0];
      setStarAverage(starAverage);

      setTotalReview(totalReview);
    }
  }, [getBoard?.pages]);

  useEffect(() => {
    getBoardRefetch();
  }, [url]);

  return {
    starAverage,
    setStarAverage,
    totalReview,
    setTotalReview,
    initialLoading,
    setInitialLoading,
    url,
    setUrl,
    getBoard,
    isFetching,
    getNextPage,
    getNextPageIsPossible,
    getBoardRefetch,
  };
};

export default useMainReviewHook;
