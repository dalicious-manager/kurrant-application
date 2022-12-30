import { atomWithReset } from 'jotai/utils';

export const isFoodDetailAtom = atomWithReset();
export const isFoodDetailLoadingAtom = atomWithReset(false);
