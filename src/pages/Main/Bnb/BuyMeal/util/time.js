import {getStorage, setStorage} from '../../../../../utils/asyncStorage';

export const getTime = async (spotId, dailyfoodData, nowPage, time = '') => {
  const localTime = JSON.parse(await getStorage('diningTime'));
  const diningTimesData = dailyfoodData?.filter(v => v.diningType === nowPage);
  if (!diningTimesData || diningTimesData?.length <= 0) return;

  if (localTime?.length > 0) {
    const isSpotId = localTime.find(v => {
      return (
        v.spotId === spotId && v.diningType === diningTimesData[0]?.diningType
      );
    });
    if (isSpotId) {
      if (time !== '') {
        const times = localTime.map(v => {
          if (
            v.spotId === spotId &&
            v.diningType === diningTimesData[0]?.diningType
          ) {
            return {
              spotId: v.spotId,
              diningType: v.diningType,
              time: time,
            };
          }
          return v;
        });
        await setStorage('diningTime', JSON.stringify(times));
        return time;
      }
      return isSpotId.time;
    }
    const times = {
      spotId: spotId,
      diningType: diningTimesData[0]?.diningType,
      time: diningTimesData[0].times[0],
    };
    await setStorage('diningTime', JSON.stringify([...localTime, times]));
    return diningTimesData[0].times[0];
  }
  const times = {
    spotId: spotId,
    diningType: diningTimesData[0].diningType,
    time: diningTimesData[0].times[0],
  };
  await setStorage('diningTime', JSON.stringify([times]));
  return diningTimesData[0].times[0];
};

export const foodDeliveryTimeFilter = (foodData, deliveryTime, setFood) => {
  if (foodData) {
    const lunch = foodData.filter(v => {
      if (v.minTime === null && v.maxTime >= deliveryTime) {
        return true;
      }
      if (v.minTime <= deliveryTime && v.maxTime >= deliveryTime) {
        return true;
      }
      if (v.minTime <= deliveryTime && v.maxTime === null) {
        return true;
      }
      if (v.minTime === null && v.maxTime === null) {
        return true;
      }
    });
    setFood(lunch);
  }
};
