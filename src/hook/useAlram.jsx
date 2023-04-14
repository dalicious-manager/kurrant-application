import {useQuery} from 'react-query';
import {alramApis} from '../api/arlam';

export function useGetAlramSetting() {
  return useQuery('alramSetting', () => {
    return alramApis.getAlram();
  });
}
