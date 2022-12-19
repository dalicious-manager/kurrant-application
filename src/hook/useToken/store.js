import { atomWithReset } from 'jotai/utils';

export const loginTokenAtom = atomWithReset('');
export const isTokenLoadingAtom = atomWithReset(false);