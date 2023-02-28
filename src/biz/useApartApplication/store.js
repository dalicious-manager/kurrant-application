import {atomWithReset} from 'jotai/utils';

// 개벼 ㄹ (삭제해야함)
export const isApartUserNameAtom = atomWithReset('');
export const isApartUserPhoneAtom = atomWithReset('');
export const isApartUserEmailAtom = atomWithReset('');

// 사용하고 있는거
export const isApartmentApplicant = atomWithReset({});

export const isApartFullAddressAtom = atomWithReset('');
export const isApartSendAddressAtom = atomWithReset({});
export const isApartSendAddressInfoAtom = atomWithReset({});

export const isApartMealInfoAtom = atomWithReset([]);

export const apartDeliveryAtom = atomWithReset('');

export const apartMemoAtom = atomWithReset('');

// 배송 날짜
export const apartApplicationDate = atomWithReset('');

// Fecth Atom

export const isApartApplicationCheckAtom = atomWithReset([]);

// 신청 응답값

export const apartApplicationResAtom = atomWithReset({});

// 요일
export const apartApplicationDaysMorning = atomWithReset({});
export const apartApplicationDaysLunch = atomWithReset({});
export const apartApplicationDaysDinner = atomWithReset({});
export const apartApplicationWeek = atomWithReset([]);

// 식사타입

export const apartApplicationDiningTypeAtom = atomWithReset([]);

export const isApartMealMorningInfoAtom = atomWithReset(null);
export const isApartMealLunchInfoAtom = atomWithReset(null);
export const isApartMealDinnerInfoAtom = atomWithReset(null);

// 검색

export const apartSearchAtom = atomWithReset([]);

// skeleton
export const isApartApplicationLoadingAtom = atomWithReset(false);
