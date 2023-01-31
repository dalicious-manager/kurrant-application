import { atomWithReset } from 'jotai/utils';


export const isLoadMealCartAtom = atomWithReset([]);
export const isLoadMealLoadingAtom = atomWithReset(false);
export const userPointAtom = atomWithReset();
export const isQuantityAtom = atomWithReset(0);
export const mealCartSpotAtom = atomWithReset([]);
export const loadSoldOutMealAtom = atomWithReset([]);
export const soldOutChangeAtom = atomWithReset([]);
export const clientStatusAtom = atomWithReset([]);