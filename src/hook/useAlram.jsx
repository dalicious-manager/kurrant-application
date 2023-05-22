import {useMutation, useQuery, useQueryClient} from 'react-query';
import {alramApis} from '../api/arlam';

export function useGetAlramSetting() {
  return useQuery('alramSetting', () => {
    return alramApis.getAlram();
  });
}
export function useSetAlramSetting() {
  const queryClient = useQueryClient();
  return useMutation(data => alramApis.setAlram(data),{
    onSuccess:()=>{
      queryClient.invalidateQueries('alramSetting')
    }
  });
}
