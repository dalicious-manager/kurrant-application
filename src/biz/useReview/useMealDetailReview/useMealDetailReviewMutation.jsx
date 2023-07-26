import {useMutation, useQueryClient} from 'react-query';
import {fetchJson} from '~utils/fetch';

const useMealDetailReviewMutation = () => {
  const queryClient = useQueryClient();

  // 상품 추천 수정
  const {mutate: pressLike} = useMutation(
    async data => {
      const response = await fetchJson('/dailyfoods/review/like', 'POST', {
        body: JSON.stringify(data),
      });

      return response;
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(['review', 'detail', 'getBoard']);
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
