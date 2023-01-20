import { atomWithReset } from 'jotai/utils';

export const isAddMealCartAtom = atomWithReset();
export const isLoadMealCartAtom = atomWithReset([]);
export const deliveryFeeAtom = atomWithReset();
export const userPointAtom = atomWithReset();
export const isQuantityAtom = atomWithReset(0);