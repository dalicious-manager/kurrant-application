import { atomWithReset } from 'jotai/utils';

export const isPhoneAuthLoadingAtom = atomWithReset(false);
export const isEmailAuthLoadingAtom = atomWithReset(false);
export const isConfirmPhoneLoadingAtom = atomWithReset(false);
export const isConfirmEmailLoadingAtom = atomWithReset(false);
export const isLoginLoadingAtom = atomWithReset(false);

