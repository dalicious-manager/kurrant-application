import {getStorage, setStorage} from '../utils/asyncStorage';
import {isTimeDifferenceLarger} from '../utils/dateFormatter';
import {fetchJson} from '../utils/fetch';

export const popupApis = {
  popupList: async () => {
    const res = await fetchJson(`/boards/notices/popup`, 'GET');

    const timeArray = JSON.parse(
      await getStorage('announcementsClickedOneDate'),
    );

    if (timeArray && Array.isArray(timeArray)) {
      const currentDate = new Date(Date.now());

      const matchingItems = res.data.filter(item => {
        const resDataId = item.id;

        const matchingItem = timeArray.find(
          timeItem => timeItem.id === resDataId,
        );

        if (matchingItem) {
          const itemDate = new Date(matchingItem.date);

          if (isTimeDifferenceLarger(itemDate, currentDate, 10)) {
            const removeData = timeArray.filter(el => el.id !== resDataId);

            setStorage(
              'announcementsClickedOneDate',
              JSON.stringify(removeData),
            );

            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      });

      if (matchingItems.length > 0) {
        return matchingItems;
      } else {
        return;
      }
    } else {
      return res.data;
    }
  },
};
