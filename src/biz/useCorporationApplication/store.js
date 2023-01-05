import { atomWithReset } from 'jotai/utils';

export const isCorporationApplicant = atomWithReset({})

export const isCorpFullAddressAtom = atomWithReset('');
export const isCorpSendAddressAtom = atomWithReset({});
export const isCorpSendAddressInfoAtom = atomWithReset({});

// 배송 날짜 
export const corpApplicationDate = atomWithReset('');

// 식사 정보
export const isCorpMealMorningInfoAtom = atomWithReset(null);
export const isCorpMealLunchInfoAtom = atomWithReset(null);
export const isCorpMealDinnerInfoAtom = atomWithReset(null);

export const isCorpMealInfoAtom = atomWithReset(null);

// 요일

export const corpApplicationWeek = atomWithReset([]);