import {useQuery} from 'react-query';

import {popupApis} from '../api/popup';

export function useGetPopupList() {
  return useQuery('popupList', () => {
    return popupApis.popupList();
  });
}
