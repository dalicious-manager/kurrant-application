import {useNavigation} from '@react-navigation/core';
import {Alert, View} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import {PAGE_NAME as DietRepoMainPageName} from '~pages/Main/Bnb/DietRepo/Main';
import {SCREEN_NAME as MainScreenName} from '~screens/Main/Bnb';

import {toStringByFormatting} from '../../../../utils/dateFormatter';
import {fetchJson} from '../../../../utils/fetch';

const useDietRepoMutation = date => {
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  // 유저 커스텀 식단 추가

  const {mutate: addCustomMeal} = useMutation(
    async data => {
      const response = await fetchJson('/users/me/daily/report/me', 'POST', {
        body: JSON.stringify(data),
      });

      return response;
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(['dietRepo', 'main', date]);

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
                    name: DietRepoMainPageName,
                    params: {
                      date: date,
                    },
                  },
                ],
              });
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

  // 리포트 삭제

  const {mutate: deleteMeal} = useMutation(
    async data => {
      const response = await fetchJson(
        `/users/me/daily/report/${data}`,
        'DELETE',
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

  // 식단 추가

  const {mutate: addMeal} = useMutation(
    async data => {
      const response = await fetchJson(`/users/me/daily/report`, 'POST', {
        body: JSON.stringify(data[0]),
      });

      return [response, data[1]];
    },
    {
      onSuccess: data => {
        if (data[1]) {
          data[1](date);
        }
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
      },
    },
  );

  // 특정기간 주문내역 리포트로 저장

  // 식단 리포트 일주일정도로만

  const {mutate: saveMeal, status: saveMealStatus} = useMutation(
    async data => {
      const response = await fetchJson('/users/me/daily/report/food', 'POST', {
        body: JSON.stringify({
          startDate: data[0],
          endDate: data[1],
        }),
      });

      return [response, data[2]];
    },
    {
      onSuccess: data => {
        if (data[1]) {
          data[1]();
        }
      },
      onError: err => {
        console.log(
          '특정기간 주문내역 이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요',
        );
        console.log(err);
      },
    },
  );

  return {
    addCustomMeal,
    addMeal,
    deleteMeal,
    saveMeal,
    saveMealStatus,
  };
};
export default useDietRepoMutation;
