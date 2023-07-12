import {useMutation, useQueryClient} from 'react-query';
import {fetchJson} from '~utils/fetch';

const useMealDetailReviewMutation = () => {
  const queryClient = useQueryClient();

  // 상품 추천 수정
  const {mutate: pressLike} = useMutation(
    async data => {
      //   console.log('데이터 ');
      //   console.log(data);

      const response = await await fetchJson(
        '/dailyfoods/review/like',
        'POST',
        {
          body: JSON.stringify(data),
        },
      );

      return response;
    },
    {
      onSuccess: data => {
        console.log('상품 추천 수정 success');

        queryClient.invalidateQueries([
          'review',
          'GetMealDetailReviewInfinite',
        ]);
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );

  return {
    pressLike,
  };
};
export default useMealDetailReviewMutation;
