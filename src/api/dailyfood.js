import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

import {
  monday,
  tuesday,
  wendsday,
  thursday,
  friday,
  saturday,
  sunday,
} from './dummyData';
import mSleep from '../helpers/mSleep';
import {fetchJson} from '../utils/fetch';

export const dailyfoodApis = {
  dailyfood: async (spotId, selectedDate, userRole) => {
    if (userRole === 'ROLE_GUEST') {
      const txt = format(new Date(selectedDate), 'EEE', {locale: ko});
      await mSleep(100);
      switch (txt) {
        case '월':
          return monday;
        case '화':
          return tuesday;
        case '수':
          return wendsday;
        case '목':
          return thursday;
        case '금':
          return friday;
        default:
          break;
      }
    }
    return await fetchJson(
      `/dailyfoods?spotId=${spotId}&selectedDate=${selectedDate}`,
      'GET',
    );
  },
};
