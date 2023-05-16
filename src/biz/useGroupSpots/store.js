import {atomWithReset} from 'jotai/utils';

// 스팟 신청 목록 조회
export const applicationListAtom = atomWithReset([]);

// 유저가 속한 그룹/스팟 조회
export const userGroupSpotListAtom = atomWithReset([]);

// 그룹별 스팟 상세 조회
export const groupSpotDetailAtom = atomWithReset({});
export const isCancelSpotAtom = atomWithReset(false);
