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
export const isAlarmLookUpLoadingAtom = atomWithReset(false);
export const alarmAtom = atomWithReset({
    "marketingAgreedDateTime": null,
    "isMarketingInfoAgree": false,
    "isMarketingAlarmAgree": false,
    "isOrderAlarmAgree": false
});
export const isChangePasswordLoadingAtom = atomWithReset(false);
export const cardListAtom = atomWithReset([]);
export const isSettingEmailLoadingAtom = atomWithReset(false);
export const isSettingPhoneNumberLoadingAtom = atomWithReset(false);
export const isCardRegistedLoadingAtom = atomWithReset(false);
export const isCardListLoadingAtom = atomWithReset(false);