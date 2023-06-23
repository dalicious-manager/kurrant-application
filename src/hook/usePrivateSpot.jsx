import {useQuery} from 'react-query';

import {privateSpotApis} from '../api/privateSpot';

export function useGetPrivateSpot() {
  return useQuery('privateSpotList', () => {
    return privateSpotApis.getPrivateSpot();
  });
}
