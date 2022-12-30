import { atomWithReset } from 'jotai/utils';

export const isDailyFoodAtom = atomWithReset([]);
export const isMorningFoodAtom = atomWithReset([]);
export const isLunchFoodAtom = atomWithReset([]);
export const isDinnerFoodAtom = atomWithReset([]);

export const isDailyFoodLoadingAtom = atomWithReset(false);
export const isMorningFoodLoadingAtom = atomWithReset(false);
export const isLunchFoodLoadingAtom = atomWithReset(false);
export const isDinnerFoodLoadingAtom = atomWithReset(false);

