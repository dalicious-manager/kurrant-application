import { atomWithReset } from 'jotai/utils';

export const noticeAtom = atomWithReset();
export const alarmAtom = atomWithReset();
export const spotNoticeAtom = atomWithReset();
export const isGetNoticeLoadingAtom = atomWithReset(false);
export const isGetAlarmLoadingAtom = atomWithReset(false);
export const isDeleteAlarmLoadingAtom = atomWithReset(false);
export const isGetSpotNoticeLoadingAtom = atomWithReset(false);