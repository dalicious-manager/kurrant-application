import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {supportPriceAtom} from './store';

const useSupportPrices = () => {
  const [supportPrices, setSupportPrices] = useAtom(supportPriceAtom);

  const getSupportPrices = async (spotId, selectedDate) => {
    try {
      const res = await Fetch.GetSupportPrice(spotId, selectedDate);
      console.log('여기여기1');
      console.log(res.data.supportPrice);
      setSupportPrices(res.data.supportPrice);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    supportPrices,
    getSupportPrices,
  };
};

export default useSupportPrices;
