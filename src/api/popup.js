import {getStorage} from '../utils/asyncStorage';
import {isTimeDifferenceLarger} from '../utils/dateFormatter';
import {fetchJson} from '../utils/fetch';

export const popupApis = {
  popupList: async () => {
    const res = await fetchJson(`/boards/notices/popup`, 'GET');

    const timeObject = JSON.parse(
      await getStorage('announcementsClickedOneDate'),
    );

    if (timeObject) {
      if (
        isTimeDifferenceLarger(
          new Date(Object.values(timeObject)[0]),
          new Date(Date.now()),
          7,
        )
      ) {
        return res.data;
      } else {
        return;
      }
    } else {
      return res.data;
    }
  },
};
