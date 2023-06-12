import {useMutation, useQueryClient} from 'react-query';
import {fetchJson} from '../../../../utils/fetch';
import {Alert, View} from 'react-native';

import {SCREEN_NAME as MainScreenName} from '~screens/Main/Bnb';

import {PAGE_NAME as DietRepoMainPageName} from '~pages/Main/Bnb/DietRepo/Main';
import {useNavigation} from '@react-navigation/core';

const useDietRepoMutation = date => {
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  // 유저 식단 추가
  const {mutate: addMeal} = useMutation(
    async data => {
      const response = await fetchJson('/users/me/daily/report/me', 'POST', {
        body: JSON.stringify(data),
      });

      return response;
    },
    {
      onSuccess: data => {
        Alert.alert('작성 완료', '식단이 추가되었습니다 ', [
          {
            text: '확인',
            onPress: async () => {
              navigation.reset({
                index: 1,
                routes: [
                  {
                    name: MainScreenName,
                  },
                  {
                    // name: DietRepoMainPageName,{date: date}
                    name: DietRepoMainPageName,
                  },
                ],
              });
            },
            style: 'cancel',
          },
        ]);

        // queryClient.invalidateQueries([
        //   'review',
        //   'GetMealDetailReviewInfinite',
        // ]);
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );

  // 리포트 삭제

  const {mutate: deleteMeal} = useMutation(
    async data => {
      const response = await fetchJson(
        `/users/me/daily/report/${data}`,
        'DELETE',
        // {
        //   body: JSON.stringify(data),
        // },
      );

      return response;
    },
    {
      onSuccess: data => {
        Alert.alert('제거 완료', '식단이 제거되었습니다 ', [
          {
            text: '확인',
            onPress: async () => {
              queryClient.invalidateQueries(['dietRepo', 'main']);
            },
            style: 'cancel',
          },
        ]);
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );

  // 특정기간 주문내역 리포트로 저장

  const {mutate: saveMeal} = useMutation(
    async data => {
      //   console.log('데이터 ');
      //   console.log(data);

      const response = await fetchJson('/users/me/daily/report/140', 'DELETE', {
        body: JSON.stringify(data),
      });

      return response;
    },
    {
      onSuccess: data => {},
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );

  return {
    addMeal,
    deleteMeal,
    saveMeal,
  };
};
export default useDietRepoMutation;