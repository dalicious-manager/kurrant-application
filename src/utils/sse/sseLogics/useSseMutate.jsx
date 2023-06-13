import {useMutation} from 'react-query';
import {fetchJson} from '../../fetch';

const useSseMutate = () => {
  // const queryClient = useQueryClient();

  // sse 알림 읽기
  const {mutate: confirmSseIsRead} = useMutation(
    async data => {
      const response = await fetchJson('/notification/read', 'POST', {
        body: JSON.stringify(data),
      });

      return response;
    },
    {
      onSuccess: data => {
        console.log('sse 알림 읽기 success');
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );
  return {confirmSseIsRead};
};

export default useSseMutate;
