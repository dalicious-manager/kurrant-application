import {useEffect, useRef, useState} from 'react';
import {useMainReviewInfiniteQuery} from '../../../../../../../biz/useReview/useMealDetailReview/useMainReviewInfiniteQuery';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {reviewDetailDailyFoodIdAtom} from './store';
import useGetMealDetailReview from '../../../../../../../biz/useReview/useMealDetailReview/useGetMealDetailReview';
import {buildCustomUrl} from './logic';

const useMainReviewHook = (dailyFoodId, reviewIdFromWrittenReview) => {
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

  const [allReviewList, setAllReviewList] = useState([]);

  const flatListRef2 = useRef(null);

  const [idx, setIdx] = useState(-1);

  useEffect(() => {
    if (allReviewList.length > 0 && reviewIdFromWrittenReview) {
      const data = allReviewList?.findIndex(
        el => el.reviewId === reviewIdFromWrittenReview,
      );
      setIdx(data);
    }
  }, [allReviewList, reviewIdFromWrittenReview]);

  useEffect(() => {
    if (flatListRef2.current && idx !== -1) {
      flatListRef2?.current?.scrollToIndex({
        animated: true,
        index: idx,
        viewPosition: 0,
      });
    }
  }, [flatListRef2, idx]);

  const theme = useTheme();

  const navigation = useNavigation();

  const [keyword, setKeyword] = useState([]);

  const [stars, setStars] = useState({});
  const [isLast, setIsLast] = useState(false);
  const [foodId, setFoodId] = useState(0);

  const [reviewWrite, setReviewWrite] = useState(0);

  // 베스트순,최신순,리뷰순 (sort)
  // sort : 베스트순(default) -> 0 , 최신순 -> 1, 리뷰순 -> 2

  const [orderFilter, setOrderFilter] = useState(0);

  // 포토리뷰만(photo)
  // photo : 둘다 -> 값 없음,  포토리뷰 없음 -> 0, 포토리뷰만 -> 1

  const [isOnlyPhoto, setIsOnlyPhoto] = useState(false);

  // 별점 필터(starFilter)

  const [rateSelected, setRateSelected] = useState([]);

  // 상품 상세 리뷰 키워드
  const [selectedKeyword, setSelectedKeyword] = useState('');

  const [dailyFoodIdFromAtom, setDailyFoodIdFromAtom] = useAtom(
    reviewDetailDailyFoodIdAtom,
  );

  useEffect(() => {
    if (dailyFoodIdFromAtom === 0) {
      setDailyFoodIdFromAtom(dailyFoodId);
      return;
    }

    if (dailyFoodIdFromAtom !== dailyFoodId) {
      setInitialLoading(true);
    } else {
      setInitialLoading(false);
    }

    setDailyFoodIdFromAtom(dailyFoodId);
  }, [dailyFoodId, isFetching]);

  const {starRatingCounts} = useGetMealDetailReview(dailyFoodId);

  useEffect(() => {
    setUrl(
      buildCustomUrl(
        dailyFoodId,
        orderFilter,
        isOnlyPhoto,
        selectedKeyword,
        rateSelected,
      ),
    );
  }, [dailyFoodId, orderFilter, isOnlyPhoto, selectedKeyword, setUrl]);

  useEffect(() => {
    const review =
      getBoard?.pages.flatMap(page => page.items?.reviewList) ?? [];
    if (getBoard?.pages) {
      const {
        items: {
          starAverage,
          stars,
          isLast,
          foodId,
          totalReview,
          reviewWrite,
          keywords,
        },
      } = getBoard?.pages[0];
      setAllReviewList(review);
      setStarAverage(starAverage);
      setStars(stars);
      setKeyword(keywords);
      setIsLast(isLast);
      setFoodId(foodId);
      setTotalReview(totalReview);
      setReviewWrite(reviewWrite);
    }
  }, [getBoard?.pages]);

  const [showSelectList, setShowSelectList] = useState(false);

  const [bottomModalOpen, setBottomModalOpen] = useState(false);

  const handleSelectBottomModal = id => {
    if (rateSelected.includes(id)) {
      setRateSelected([...rateSelected.filter(v => v !== id)]);
    } else {
      setRateSelected([...rateSelected, id]);
    }
  };

  const showSelectedOrderFilter = orderFilter => {
    if (orderFilter === 0) {
      return '베스트 순';
    } else if (orderFilter === 1) {
      return '최신순';
    } else if (orderFilter === 2) {
      return '리뷰 추천순';
    }
  };

  const handleConfirmPress = () => {
    setUrl(
      buildCustomUrl(
        dailyFoodId,
        orderFilter,
        isOnlyPhoto,
        selectedKeyword,
        rateSelected,
      ),
    );
  };

  const [isFetchingTop, setIsFetchingTop] = useState(false);
  const [isFetchingBottom, setIsFetchingBottom] = useState(false);

  useEffect(() => {
    setIsFetchingTop(true);
  }, [url]);

  useEffect(() => {
    if (isFetching && isFetchingTop) {
      setIsFetchingTop(true);
      setIsFetchingBottom(false);
    } else {
      setIsFetchingTop(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (isFetching) {
      setIsFetchingBottom(true);
    } else {
      setIsFetchingBottom(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (isFetchingBottom && isFetchingTop) {
      setIsFetchingBottom(false);
    }
  }, [isFetchingBottom, isFetchingTop]);

  useEffect(() => {
    return () => {
      setAllReviewList([]);
    };
  }, [setAllReviewList]);

  return {
    starAverage,
    totalReview,
    setTotalReview,
    initialLoading,
    isFetching,
    getNextPage,
    getNextPageIsPossible,
    allReviewList,
    theme,
    keyword,
    reviewWrite,
    orderFilter,
    setOrderFilter,
    isOnlyPhoto,
    setIsOnlyPhoto,
    rateSelected,
    selectedKeyword,
    setSelectedKeyword,
    starRatingCounts,
    showSelectList,
    setShowSelectList,
    bottomModalOpen,
    setBottomModalOpen,
    handleSelectBottomModal,
    showSelectedOrderFilter,
    handleConfirmPress,
    isFetchingTop,
    isFetchingBottom,
    allReviewList,
    setAllReviewList,
  };
};

export default useMainReviewHook;
