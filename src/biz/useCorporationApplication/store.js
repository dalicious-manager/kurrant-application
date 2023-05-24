import {atomWithReset} from 'jotai/utils';

// 신청자
export const isCorporationApplicant = atomWithReset({});

// 그룹 postCode
export const isCorpFullAddressAtom = atomWithReset('');
export const isCorpSendAddressAtom = atomWithReset({});
export const isCorpSendAddressInfoAtom = atomWithReset({});

// 배송 날짜
export const corpApplicationDate = atomWithReset('');

// 식사 정보
export const isCorpMealMorningInfoAtom = atomWithReset(null);
export const isCorpMealLunchInfoAtom = atomWithReset(null);
export const isCorpMealDinnerInfoAtom = atomWithReset(null);

export const isCorpMealInfoAtom = atomWithReset([]);

// 요일
export const corpApplicationDaysMorning = atomWithReset({});
export const corpApplicationDaysLunch = atomWithReset({});
export const corpApplicationDaysDinner = atomWithReset({});

// 스팟생성
export const corpApplicationUseMealType = atomWithReset([]);
export const corpApplicationSpotsAtom = atomWithReset({});

// 스팟 postCode
export const isCorpFullSpotAddressAtom = atomWithReset('');
export const isCorpSendSpotAddressAtom = atomWithReset({});
export const isCorpSendSpotAddressInfoAtom = atomWithReset({});

// spot

export const corpApplicationTotalSpotAtom = atomWithReset([]);

// 스팟 신청 조회

export const corpApplicationListAtom = atomWithReset([]);

// skeleton
export const isCorpApplicationLoadingAtom = atomWithReset(false);
