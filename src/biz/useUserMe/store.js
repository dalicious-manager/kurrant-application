import { atomWithReset } from 'jotai/utils';

export const isMyInfoAtom = atomWithReset();
export const isMyInfoPersonAtom = atomWithReset();
export const isSNSConnectAtom = atomWithReset([
    { social: 'NAVER', email: '', isConnect: false },
    { social: 'KAKAO', email: '', isConnect: false },
    { social: 'GOOGLE', email: '', isConnect: false },
    { social: 'FACEBOOK', email: '', isConnect: false },
    { social: 'APPLE', email: '', isConnect: false }
]);
export const isMyInfoLoadingAtom = atomWithReset(false);
export const isMyInfoPersonalLoadingAtom = atomWithReset(false);
export const isSNSConnectLoadingAtom = atomWithReset(false);
export const isSNSDisconnectLoadingAtom = atomWithReset(false);
export const isAlarmSettingLoadingAtom = atomWithReset(false);
export const isChangePasswordLoadingAtom = atomWithReset(false);