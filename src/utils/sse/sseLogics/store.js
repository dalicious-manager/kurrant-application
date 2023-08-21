import {atomWithReset} from 'jotai/utils';

// type: 1 전체공지
export const sseType1Atom = atomWithReset({});
// type: 2 스팟공지
export const sseType2Atom = atomWithReset({});
// type: 3 구매후기
export const sseType3Atom = atomWithReset({});
// type: 4 마감시간
export const sseType4Atom = atomWithReset({});
// type: 5 다음주 식사 구매하셨나요?

export const sseType5Atom = atomWithReset({});

// type: 6

export const sseType6Atom = atomWithReset({});
// type: 7

export const sseType7Atom = atomWithReset({});
// type: 8

export const sseType8Atom = atomWithReset({});

///////

// 리뷰 작성 후 sseType3 보낼지 말지 확인하기
export const checkSseType3Atom = atomWithReset(false);
