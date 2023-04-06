import {atomWithReset} from 'jotai/utils';

export const isLoadingAtom = atomWithReset(false);
export const reviewWaitListAtom = atomWithReset([]);
