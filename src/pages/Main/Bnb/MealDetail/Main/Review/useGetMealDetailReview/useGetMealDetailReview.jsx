import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchJson} from '../../../../../../../utils/fetch';

const useGetMealDetailReview = (url, dailyFoodId) => {
  const [mealDetailReview, setMealDetailReview] = useState([]);
  const [starAverage, setStarAverage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isLast, setIsLast] = useState(false);

  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   console.log('url 확인');
  //   console.log(url);
  // }, [url]);

  // 리뷰 별점 갯수 조회
  const [starRatingCounts, setStarRatingCounts] = useState({});

  // const {refetch: getMealDetailReviewQueryRefetch} = useQuery(
  //   ['review', 'GetMealDetailReview'],

  //   async ({queryKey}) => {
  //     const response = await fetchJson(url, 'GET');

  //     console.log(response.data);

  //     setMealDetailReview(response.data.items);
  //     setStarAverage(response.data.starEverage);
  //     setTotalCount(response.data.total);

  //     return response.data;
  //   },
  //   {
  //     onError: () => {
  //       setIsError(true);
  //     },

  //     enabled: false,
  //     retry: 1,
  //     retryDelay: 800,
  //   },
  // );

  // pageParam이 작동을 안해서 걍 내가 만든다

  const [page, setPage] = useState(1);

  // const {data, hasNextPage, fetchNextPage, refetch, isFetching} =
  //   useInfiniteQuery(
  //     ['review', 'GetMealDetailReviewInfinite'],

  //     // condition, pageParam=1

  //     ({pageParam = 1}) => getMealDetailReview(pageParam, url, page, setPage),

  //     {
  //       getNextPageParam: lastPage => {
  //         // console.log('라스트페이지');
  //         // console.log(lastPage);
  //         // console.log(lastPage.currentPage + 1);

  //         if (!lastPage.isLast) return lastPage.currentPage + 1;
  //         return undefined;
  //       },
  //     },
  //   );

  const {data, refetch: getMealDetailReviewInfiniteQueryRefetch} = useQuery(
    ['review', 'GetMealDetailInfiniteReview'],

    async ({queryKey}) => {
      const response = await fetchJson(`${url}&limit=1&page=${page}`, 'GET');

      return response.data;
    },
    {
      onSuccess: data => {
        console.log('data 라라라라라ㅏ ');
        console.log(data);

        // 스크롤이면 데이터 추가, 필터면 데이터 새로
        setMealDetailReview([...mealDetailReview, ...data.items]);
        // if(){
        //   // 스크롤일경우
        //   setMealDetailReview([...mealDetailReview, ...data.items]);
        // }else{
        //   // 필터일 경우
        //   setMealDetailReview([data.items]);
        // }

        setStarAverage(data.starEverage);
        setTotalCount(data.total);
        setIsLast(data.isLast);

        if (!data.isLast) {
          setPage(prev => prev + 1);
        }
      },
      onError: () => {
        setIsError(true);
      },

      enabled: !isLast,
      retry: 1,
      retryDelay: 800,
    },
  );
  useQuery(['review', 'stars'], async ({queryKey}) => {
    const response = await fetchJson(
      `/users/me/reviews/satisfaction?dailyFoodId=${40681}`,
      'GET',
    );

    setStarRatingCounts(response.data);
  });

  useEffect(() => {
    console.log('page변화 감지하기');
    console.log(page);
  }, [page]);

  return {
    data,
    isLast,
    starAverage,
    totalCount,
    isError,
    mealDetailReview,
    getMealDetailReviewInfiniteQueryRefetch,

    starRatingCounts,
  };
};

export default useGetMealDetailReview;

// const getMealDetailReview = async (pageParam, url, page, setPage) => {
//   console.log('리스폰스 확인');
//   console.log(pageParam);
//   console.log(`${url}&limit=1&page=${pageParam}`);

//   // const res = await fetchJson(`${url}&limit=1&page=${pageParam}`);
//   const res = await fetchJson(`${url}&limit=1&page=${page}`);

//   // console.log(res.data);
//   // console.log('이스 라스트');
//   // console.log(res.data.isLast);
//   const {items, isLast} = res.data;

//   if (isLast) {
//   } else {
//     setPage(prev => prev + 1);
//   }

//   return {items, currentPage: pageParam, isLast};
// };

// const res = useInfiniteQuery(
//   ['infinitePerson'],
//   ({ pageParam = 5 }) => axios.get('http://localhost:8080/person', {
//     params: {
//         id: pageParam
//     }
//   }));
