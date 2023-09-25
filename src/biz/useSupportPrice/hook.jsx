import {useAtom} from 'jotai';
import {Alert} from 'react-native';

import * as Fetch from './Fetch';
import {supportPriceAtom} from './store';

const useSupportPrices = () => {
  const [supportPrices, setSupportPrices] = useAtom(supportPriceAtom);

  const getSupportPrices = async (spotId, selectedDate) => {
    try {
      const res = await Fetch.GetSupportPrice(spotId, selectedDate);

      setSupportPrices(res.data.supportPrice);
    } catch (err) {
      // Alert.alert('일일 지원금', err?.toString()?.replace('error: ', ''));
      console.log(err.toString()?.replace('error: ', ''));
    }
  };

  return {
    supportPrices,
    getSupportPrices,
  };
};

export default useSupportPrices;
