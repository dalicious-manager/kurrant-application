import {atomWithReset} from 'jotai/utils';

import { dates } from '../../utils/date';

export const isLoadingAtom = atomWithReset(false);
export const heroBannersAtom = atomWithReset([]);
export const heroBuyBannersAtom = atomWithReset([]);
export const tieBannersAtom = atomWithReset([]);
export const weekAtom = atomWithReset(dates);