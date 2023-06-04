import {useMutation, useQueryClient} from 'react-query';

import {spotApis} from '../api/spot';

export function useApplyMySpot() {
  const queryClient = useQueryClient();
  return useMutation(data => spotApis.applyMySpot(data));
}
