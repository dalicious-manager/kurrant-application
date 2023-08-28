import {atomWithReset} from 'jotai/utils';

import {dates} from '../../utils/date';

export const isLoadingAtom = atomWithReset(false);
export const heroBannersAtom = atomWithReset([]);
export const heroBuyBannersAtom = atomWithReset([]);
export const tieBannersAtom = atomWithReset([]);
export const weekAtom = atomWithReset(dates); // 경로 바꿔야함
export const foodDetailDataAtom = atomWithReset({});
export const weekServiceAtom = atomWithReset([1, 2, 3, 4, 5, 6, 7, 8, 9]); // 경로 바꿔야함
