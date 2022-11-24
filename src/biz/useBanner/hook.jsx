import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {
  isLoadingAtom,
  tieBannersAtom,
  heroBannersAtom,
  heroBuyBannersAtom,
} from './store';

const useBanner = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [heroBanners, setHeroBanners] = useAtom(heroBannersAtom);
  const [tieBanners, setTieBanners] = useAtom(tieBannersAtom);
  const [heroBuyBanners, setHeroBuyBanners] = useAtom(heroBuyBannersAtom);

  const findBanners = async (option = {}) => {
    try {
      setIsLoading(true);
      const fetchRes = await Fetch.findBanners();
      setHeroBanners(fetchRes.items.filter(b => b.type === 'HERO'));
      setTieBanners(fetchRes.items.filter(b => b.type === 'TIE'));
      setHeroBuyBanners(fetchRes.items.filter(b => b.type === 'BUY_HERO'));
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    findBanners,
    readableAtom: {
      isLoading,
      heroBanners,
      tieBanners,
      heroBuyBanners,
    },
  };
};

export default useBanner;
