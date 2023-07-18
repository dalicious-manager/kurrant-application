import {useMutation, useQuery, useQueryClient} from 'react-query';

import {nicknameApis} from '../api/nickname';

export function useSettingNickname() {
  const queryClient = useQueryClient();
  return useMutation(data => nicknameApis.settingNickname(data), {
    onSuccess: () => queryClient.invalidateQueries('userInfo'),
  });
}
