import {useAtom} from 'jotai';
import React from 'react';
import MypageReviewCountAtom from './store';

const useMypageReview = () => {
  const [mypageReviewCount, setMypageReviewCount] = useAtom(
    MypageReviewCountAtom,
  );

  return {mypageReviewCount, setMypageReviewCount};
};

export default useMypageReview;
