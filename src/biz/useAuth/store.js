import { atomWithReset } from 'jotai/utils';

export const isPhoneAuthLoadingAtom = atomWithReset(false);
export const isEmailAuthLoadingAtom = atomWithReset(false);
export const isConfirmPhoneLoadingAtom = atomWithReset(false);
export const isConfirmEmailLoadingAtom = atomWithReset(false);
export const isCheckedAuthLoadingAtom = atomWithReset(false);
export const isChangePasswordLoadingAtom = atomWithReset(false);
export const isFindEmailLoading = atomWithReset(false);
export const isLoginLoadingAtom = atomWithReset(false);
export const userRoleAtom = atomWithReset("");

